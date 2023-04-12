import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authInterface } from './auth.model';
import { AuthCredentialDto } from './auth.dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup') // auth/signup
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {
        return this.authService.signUp(authCredentialDto)
    }
    //  ValidationPipe????? 뭔지 알아내자
    @Post('/login') // auth/login
    login(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<string> {
        return this.authService.login(authCredentialDto)
    }
}
