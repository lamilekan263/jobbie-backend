import { IsEmail, IsString, Length } from 'class-validator';



export class CreateUserDto {
    @IsString()
    @Length(4, 20)
    public name: string;

    @IsEmail()
    public email: string

    @IsString()
    @Length(6)
    public password: string


}


export class LoginUserDto {

    @IsEmail()
    public email: string


    @IsString()
    public password: string
}