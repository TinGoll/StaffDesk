import { PartialType } from '@nestjs/mapped-types';
import { CreateAssemblyWorkDto } from './create-assembly-work.dto';

export class UpdateAssemblyWorkDto extends PartialType(CreateAssemblyWorkDto) {}
