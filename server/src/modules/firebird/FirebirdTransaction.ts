import { Transaction } from 'node-firebird';

export class FirebirdTransaction {
  private db: Transaction;

  constructor(db: Transaction) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.db = db;
  }

  executeRequest<T>(query: string, params: any[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.db.query(query, params, (err: Error, results: T[]) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }

  executeAndReturning<T>(query: string, params: any[] = []): Promise<T> {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.db.query(query, params, (err: Error, row: any) => {
        if (err) reject(err);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const res: T = row;
        resolve(res);
      });
    });
  }
  execute(query: string, params: any[] = []): Promise<void> {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.db.query(query, params, (err: Error) => {
        if (err) reject(err);
        resolve();
      });
    });
  }

  rollback(): Promise<void> {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.db.rollback((err) => {
        if (err) {
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          reject(err);
        }
        resolve();
      });
    });
  }

  rollbackRetaining(): Promise<void> {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.db.rollbackRetaining((err) => {
        if (err) {
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          reject(err);
        }
        resolve();
      });
    });
  }

  commit(): Promise<void> {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.db.commit((err) => {
        if (err) {
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          reject(err);
        }
        resolve();
      });
    });
  }

  commitRetaining(): Promise<void> {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.db.commitRetaining((err) => {
        if (err) {
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          reject(err);
        }
        resolve();
      });
    });
  }
}
