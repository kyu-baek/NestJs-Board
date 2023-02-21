import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(authcredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authcredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
    authTest(req: any): void;
    test(user: User): void;
}
