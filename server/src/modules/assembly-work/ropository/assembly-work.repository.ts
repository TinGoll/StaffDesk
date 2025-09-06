import { CreateAssemblyWorkDto } from '../dto/create-assembly-work.dto';
import { UpdateAssemblyWorkDto } from '../dto/update-assembly-work.dto';
import { AssemblyWork } from '../entities/assembly-work.entity';

export interface AssemblyWorksRepository {
  findAll(): Promise<AssemblyWork[]>;
  findById(id: number): Promise<AssemblyWork | undefined>;
  create(employee: CreateAssemblyWorkDto): Promise<AssemblyWork>;
  update(id: number, employee: UpdateAssemblyWorkDto): Promise<AssemblyWork>;
  remove(id: number): Promise<void>;
}
