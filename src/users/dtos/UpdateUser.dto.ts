import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  password: string;
}
