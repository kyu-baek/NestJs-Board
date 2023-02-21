import { UseGuards } from '@nestjs/common';
import { Body, Controller, Post, Req, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';


@Controller('auth')
export class AuthController {
	constructor(
		// @InjectRepository(BoardRepository)
		private authService: AuthService
	) {}

	@Post('/signup')
	signUp(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto): Promise<void> {
		return this.authService.signUp(authcredentialsDto);
	}

	@Post('/signin')
	signIn(@Body(ValidationPipe) authcredentialsDto: AuthCredentialsDto ) :Promise<{accessToken: string}> {
		return this.authService.signIn(authcredentialsDto);
	}

	//유저 객체 가져오는 함수1111
	//req 전체를 찾기
	@Post('/authTest')
	@UseGuards(AuthGuard())
	authTest(@Req() req) {
		console.log(req);
	}

		//유저 객체 가져오는 함수222
	//커스텀 데코레이터로 req.user 를 가져오기
	@Post('/authTestCustom')
	@UseGuards(AuthGuard())
	test(@GetUser() user: User) {
		console.log('user', user);
	}

}
