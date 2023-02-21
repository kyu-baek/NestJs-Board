import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import {AuthCredentialsDto} from './dto/auth-credential.dto'
import { UserRepository } from './user.repository';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		// @InjectRepository(BoardRepository)
		private userRepository: UserRepository,
		private dataSource: DataSource,
		private jwtService: JwtService
	) {}

	async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		return this.userRepository.createUser(authCredentialsDto);
	}

	async signUpTransaction(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();
		
		try {
			const {username, password} = authCredentialsDto;
			const salt = await bcrypt.genSalt();
			const hashedPassword = await bcrypt.hash(password, salt);
	
			const user = this.userRepository.create({username, password: hashedPassword});
			await queryRunner.manager.save(user);
		}
		catch (error) {
			if (error.code === '23505')
			{
				console.log("can not save user cause there is same username")
				await queryRunner.rollbackTransaction();
			}
			else
				throw new InternalServerErrorException();
		} finally {
			await queryRunner.release();
		}
	}

	async signUpTransaction2(authCredentialsDto: AuthCredentialsDto): Promise<void> {
		await this.dataSource.transaction(async manager => {
			const {username, password} = authCredentialsDto;
			const salt = await bcrypt.genSalt();
			const hashedPassword = await bcrypt.hash(password, salt);
	
			const user = this.userRepository.create({username, password: hashedPassword});
			await manager.save(user);
		})
	}

	async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
		const { username, password} = authCredentialsDto;
		const user = await this.userRepository.findOne({ where: {username} });

		if (user && (await bcrypt.compare(password, user.password))) {
			//토큰 생성 (시크릿 + 페이로드)
			const payload = { username };
			const accessToken = await this.jwtService.sign(payload);			

			return { accessToken };
		} else {
			throw new UnauthorizedException('login failed')
		}
	}
}
