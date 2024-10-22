import { IsString, Length, MaxLength } from "class-validator";

export class CreateUserProfileDto {

    @IsString()
    
    firstName: string;
    lastName: string;
    age: number;
    job: string;
}