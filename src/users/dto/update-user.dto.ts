import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsEmail,
  // IsNotEmpty,
  IsUrl,
  Length,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // @IsNotEmpty()
  @IsOptional()
  @Length(2, 30)
  username: string;

  @IsOptional()
  @Length(2, 200)
  about: string;

  @IsOptional()
  @IsUrl()
  avatar: string;

  //@IsNotEmpty()
  @IsOptional()
  @IsEmail()
  email: string;

  //@IsNotEmpty()
  @IsOptional()
  password: string;
}
