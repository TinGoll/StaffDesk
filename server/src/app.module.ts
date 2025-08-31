import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { HersModule } from './modules/hers/hers.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { AssemblyWorkModule } from './modules/assembly-work/assembly-work.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    HersModule,
    EmployeesModule,
    AssemblyWorkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
