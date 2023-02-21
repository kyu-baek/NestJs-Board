import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(UserRepository)
		private userRepository: UserRepository
	){
		//부모 컨포넌트를 사용하기 위해 super
		super({ 
			secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),   //유효한지 확인하기 위해 decrypt 할 비밀키
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() //요청이 들어올 때 bearer 형식으로 들어오기 때문에 
		})
	}

	//만약 유효한 토큰이면 다음에 진행할 로직
	async validate(payload) {
		const  {username } = payload;
		const user: User = await this.userRepository.findOne({where: {username}});

		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}

