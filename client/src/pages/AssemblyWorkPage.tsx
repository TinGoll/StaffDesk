import { css } from '@emotion/css';
import { type FC } from 'react';

import { AssemblyWorkCard } from '@features/assembly-work-manager';

const styles = css`
  display: flex;
  justify-content: center;
  min-height: 340px;
  > div {
    margin-top: 28px;
  }
`;

export const AssemblyWorkPage: FC = () => {
  return (
    <div className={styles}>
      <AssemblyWorkCard />
    </div>
  );
};
