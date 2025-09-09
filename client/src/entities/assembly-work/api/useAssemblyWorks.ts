import type { AssemblyWork } from '@shared/contracts/assemblyWorks.contract';
import { useEntity } from '@shared/lib/swr';

type UseAssemblyWorksReturn = {
  works: AssemblyWork[];
};

export const useAssemblyWorks = () =>
  useEntity<AssemblyWork, UseAssemblyWorksReturn>({
    endpoint: 'assembly-work',
    transform: (data) => ({
      works: data.items,
    }),
  });
