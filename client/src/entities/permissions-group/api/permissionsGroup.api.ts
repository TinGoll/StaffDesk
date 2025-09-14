import type { PermissionsGroup } from '@shared/contracts/permissionsGroup.contract';
import { useEntity } from '@shared/lib/swr';

export const usePermissionsGroup = () =>
  useEntity<PermissionsGroup>({
    endpoint: 'permissions-group',
    transform: (data) => data,
  });
