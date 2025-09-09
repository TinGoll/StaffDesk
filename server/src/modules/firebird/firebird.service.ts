import { Injectable, Inject, OnModuleDestroy } from '@nestjs/common';
import { Firebird } from './Firebird';
import { FIREBIRD_OPTIONS, type FirebirdOptions } from './firebird-constants';

@Injectable()
export class FirebirdService implements OnModuleDestroy {
  private db: Firebird | null = null;
  constructor(
    @Inject(FIREBIRD_OPTIONS)
    private readonly firebirdOptions: FirebirdOptions,
  ) {}
  onModuleDestroy() {
    this.detach();
  }

  async attach(): Promise<Firebird> {
    if (!this.db) {
      this.db = await new Firebird().create(this.firebirdOptions);
    }
    return this.db;
  }

  detach(): void {
    if (this.db) {
      try {
        this.db.detach();
        this.db = null;
      } catch (e) {
        console.error('Ошибка при закрытии соединения Firebird:', e);
        throw e;
      }
    }
  }
}
