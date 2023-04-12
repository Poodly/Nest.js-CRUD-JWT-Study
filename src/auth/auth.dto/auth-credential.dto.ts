import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";
// class-validator으로 유효성 체크

export class AuthCredentialDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number' // 에러 메시지
    }) // 영어, 슛자만 가능하게끔
    password: string;
}