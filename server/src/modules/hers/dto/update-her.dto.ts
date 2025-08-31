import { PartialType } from '@nestjs/mapped-types';
import { CreateHerDto } from './create-her.dto';

export class UpdateHerDto extends PartialType(CreateHerDto) {}
