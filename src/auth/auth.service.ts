import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { authInterface } from './auth.model';
import { User } from './auth.schema';
import { AuthCredentialDto } from './auth.dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) 
    private userModel: mongoose.Model<User>
    ) {}
// ----------------------------------------------------------------------
    async exUser(email: string): Promise<User> {
        const exUser = await this.userModel.findOne({ email });
        return exUser;
    }
// ----------------------------------------------------------------------
    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        const { email, password } = authCredentialDto;
        const exUser = await this.exUser(email);

        if (exUser) {
            throw new ConflictException('This email address is already registered');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await this.userModel.create({ email, password: hashedPassword });
    }
// ----------------------------------------------------------------------
    async login(authCredentialDto: AuthCredentialDto): Promise<string> {   // Promise<string> 이런건 결과값을 정의하는거같네..
        const { email, password } = authCredentialDto;
        const exUser = await this.exUser(email);

        if (exUser && await bcrypt.compare(password, exUser.password)) {
            return 'login success' 
        } else {
            throw new UnauthorizedException('login failed')
        }
    }
// ----------------------------------------------------------------------
}


// <error>

// BadRequestException: 클라이언트의 잘못된 요청이 서버에 전달되었을 때 발생하는 예외. 400 에러와 같은 역할을 한다.

// UnauthorizedException: 인증되지 않은 사용자가 보호된 엔드포인트에 액세스하려고 할 때 발생하는 예외. 401 에러와 같은 역할을 한다.

// ForbiddenException: 사용자가 리소스에 액세스할 권한이 없는 경우 발생하는 예외. 403 에러와 같은 역할을 한다.

// NotFoundException: 클라이언트가 요청한 리소스를 찾을 수 없는 경우 발생하는 예외. 404 에러와 같은 역할을 한다.

// ConflictException: 클라이언트가 요청한 작업이 리소스의 현재 상태와 충돌하는 경우 발생하는 예외. 409 에러와 같은 역할을 한다.

// InternalServerErrorException: 서버 내부에서 예기치 않은 예외가 발생한 경우 발생하는 예외. 500 에러와 같은 역할을 한다.

// NotImplementedException: 요청된 작업이 아직 구현되지 않은 경우 발생하는 예외.

// BadGatewayException: 게이트웨이에서 요청을 처리할 수 없는 경우 발생하는 예외.

// ServiceUnavailableException: 서비스가 일시적으로 사용 불가능한 경우 발생하는 예외.

// GatewayTimeoutException: 게이트웨이가 일정 시간 내에 요청에 응답하지 않는 경우 발생하는 예외.