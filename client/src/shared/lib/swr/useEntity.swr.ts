import useSWR, { mutate, type SWRConfiguration } from 'swr';
import type { SWRMutationConfiguration } from 'swr/mutation';
import useSWRMutation from 'swr/mutation';

import { fetcher } from './fetcher.swr';

export type EntityID = string | number;

export interface BaseEntity {
  id: EntityID;
}

export interface MutationCallbacks<T> {
  onSuccess?: (result: T) => void;
  onError?: (error: Error) => void;
}

export interface UseEntityOptions<R extends BaseEntity> {
  endpoint: string;
  swrConfig?: SWRConfiguration<R[]>;
  transform?: (data: R[]) => R[];
  mutationConfig?: SWRMutationConfiguration<any, Error, string, any>;
  extraKeysToRevalidate?: string[];
}

export function useEntity<
  R extends BaseEntity,
  C = Omit<R, 'id'>,
  U = Partial<C>,
>({
  endpoint,
  swrConfig,
  transform,
  mutationConfig,
  extraKeysToRevalidate = [],
}: UseEntityOptions<R>) {
  const { data, error, isLoading } = useSWR<R[], Error>(
    endpoint,
    (url: string) => fetcher({ url }),
    swrConfig,
  );

  const items = data ? (transform ? transform(data) : data) : [];

  const revalidateExtraKeys = () => {
    extraKeysToRevalidate.forEach((key) => mutate(key));
  };

  // --- CREATE ---
  const { trigger: createTrigger, ...createMutation } = useSWRMutation<
    R,
    Error,
    string,
    C
  >(
    endpoint,
    (url, { arg }) => fetcher<R, C>({ url, method: 'POST', data: arg }),
    {
      ...mutationConfig,
      onSuccess: () => revalidateExtraKeys(),
    },
  );

  /**
   * Создает новую сущность.
   * @param newItem - Данные для создания.
   * @param options - Опциональные колбэки onSuccess и onError.
   */
  const create = async (newItem: C, options?: MutationCallbacks<R>) => {
    // Оптимистичное обновление
    await mutate(
      endpoint,
      (current: R[] = []) => [
        { ...newItem, id: 'temp-id' } as unknown as R,
        ...current,
      ],
      { revalidate: false },
    );

    try {
      const savedItem = await (createTrigger as (arg: C) => Promise<R>)(
        newItem,
      );

      // Замена временного элемента на реальный
      await mutate(
        endpoint,
        (current: R[] = []) =>
          current.map((item) => (item.id === 'temp-id' ? savedItem : item)),
        { revalidate: false },
      );

      options?.onSuccess?.(savedItem);
      return savedItem;
    } catch (e) {
      const error = e as Error;
      options?.onError?.(error);
      await mutate(endpoint);
      throw error;
    }
  };

  // --- UPDATE ---
  const { trigger: updateTrigger, ...updateMutation } = useSWRMutation<
    R,
    Error,
    string,
    { id: EntityID; data: U }
  >(
    endpoint,
    (_, { arg: { id, data } }) =>
      fetcher<R, U>({ url: `${endpoint}/${id}`, method: 'PUT', data }),
    {
      ...mutationConfig,
      onSuccess: () => revalidateExtraKeys(),
    },
  );

  /**
   * Обновляет существующую сущность.
   * @param id - ID сущности для обновления.
   * @param updates - Данные для обновления.
   * @param options - Опциональные колбэки onSuccess и onError.
   */
  const update = async (
    id: EntityID,
    updates: U,
    options?: MutationCallbacks<R>,
  ) => {
    // Оптимистичное обновление
    await mutate(
      endpoint,
      (current: R[] = []) =>
        current.map((item) =>
          item.id === id ? { ...item, ...updates } : item,
        ),
      { revalidate: false },
    );

    try {
      const updatedItem = await updateTrigger({ id, data: updates });
      options?.onSuccess?.(updatedItem);
      return updatedItem;
    } catch (e) {
      const error = e as Error;
      options?.onError?.(error);
      await mutate(endpoint);
      throw error;
    }
  };

  // --- DELETE ---
  const { trigger: deleteTrigger, ...deleteMutation } = useSWRMutation<
    void,
    Error,
    string,
    EntityID
  >(
    endpoint,
    (_, { arg: id }) =>
      fetcher<void>({ url: `${endpoint}/${id}`, method: 'DELETE' }),
    {
      ...mutationConfig,
      onSuccess: () => revalidateExtraKeys(),
    },
  );

  /**
   * Удаляет сущность.
   * @param id - ID сущности для удаления.
   * @param options - Опциональные колбэки onSuccess и onError.
   */
  const remove = async (id: EntityID, options?: MutationCallbacks<void>) => {
    // Оптимистичное обновление
    await mutate(
      endpoint,
      (current: R[] = []) => current.filter((item) => item.id !== id),
      { revalidate: false },
    );

    try {
      await deleteTrigger(id);
      options?.onSuccess?.();
    } catch (e) {
      const error = e as Error;
      options?.onError?.(error);
      await mutate(endpoint);
      throw error;
    }
  };

  return {
    data: items,
    error,
    isLoading,
    create: { trigger: create, ...createMutation },
    update: { trigger: update, ...updateMutation },
    remove: { trigger: remove, ...deleteMutation },
  };
}
