import { IsNotEmpty, IsEmail, IsOptional, IsNumber } from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  first_name?: string;

  @IsOptional()
  last_name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  role_id?: number;
}
