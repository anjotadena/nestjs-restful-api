import { IsNotEmpty, IsNumber } from 'class-validator';

export class RoleCreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  permission_ids: number[];
}
