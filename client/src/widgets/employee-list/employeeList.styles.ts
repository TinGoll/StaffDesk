import { css } from '@emotion/css';

export const employeeListStyles = css`
  position: relative;
  display: flex;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  background-color: var(--app-header-background-color);
  flex: 1;

  & .employee-list-header {
    position: sticky;
    top: 0;
    left: 0;
    border-bottom: 1px solid var(--app-devider-color);
    background-color: var(--app-body-background-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 10;
    padding: 0 8px;
    height: var(--app-header-height);
    & .header-title {
      font-size: 16px;
      font-weight: 600;
    }
  }

  & .employee-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px;
    flex: 1;
  }
`;
