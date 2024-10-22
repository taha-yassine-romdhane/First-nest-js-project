import { IsNotEmpty, IsSemVer, IsString } from "class-validator";

export class CreateUserPostsDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}