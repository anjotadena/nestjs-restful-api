import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class RoleUpdateDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  permission_ids: number[];
}
