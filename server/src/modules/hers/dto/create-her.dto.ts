import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateHerDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  diameter?: number;
}
