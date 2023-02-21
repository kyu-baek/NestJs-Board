import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CustomRepository } from "../typeOrmCustomRepo/typeorm-ex.decorator";
import {AuthCredentialsDto} from './dto/auth-credential.dto'
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

@CustomRepository(User)
export class UserRepository extends Repository<User> {

	async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {

		const {username, password} = authCredentialsDto;
		//비번 암호화
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = this.create({username, password: hashedPassword});
		try {
			await user.save();
		} catch (error) {
			if (error.code === '23505')
				throw new ConflictException('Existing username');
			else
				throw new InternalServerErrorException();
		} 
	}
}
