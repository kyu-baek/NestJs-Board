import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepository;
    private dataSource;
    private jwtService;
    constructor(userRepository: UserRepository, dataSource: DataSource, jwtService: JwtService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signUpTransaction(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signUpTransaction2(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
}
