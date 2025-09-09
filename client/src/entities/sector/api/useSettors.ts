import type { Sector } from '@shared/contracts/sector.contract';
import { useEntity } from '@shared/lib/swr';

export const useSectors = () =>
  useEntity<Sector, { sectors: Sector[] }>({
    endpoint: 'sectors',
    transform: (data) => ({
      sectors: data.items,
    }),
  });
