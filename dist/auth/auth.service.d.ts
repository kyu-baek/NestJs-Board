import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
export declare class AuthService {
    private userRepository;
    constructor(userRepository: UserRepository);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
}
