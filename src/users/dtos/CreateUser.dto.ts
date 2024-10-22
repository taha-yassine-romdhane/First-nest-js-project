import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;
  @IsString()
  @Length(4, 20)
  password: string;
}
