import { IsNotEmpty, IsEmail, IsOptional, IsNumber } from 'class-validator';

export class UserUpdateDto {
  first_name?: string;

  last_name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNotEmpty()
  @IsNumber()
  role_id: number;
}
