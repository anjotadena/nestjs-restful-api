import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class UserUpdateDto {
  first_name?: string;

  last_name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
