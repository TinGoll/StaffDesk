import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmployeesModule } from './modules/employees/employees.module';
import { AssemblyWorkModule } from './modules/assembly-work/assembly-work.module';
import { SectorsModule } from './modules/sectors/sectors.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    EmployeesModule,
    AssemblyWorkModule,
    SectorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
