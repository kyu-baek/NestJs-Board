import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {

	@IsString()
	@MinLength(4)
	@MaxLength(15)
	username: string;

	@IsString()
	@MinLength(4)
	@MaxLength(15)
	@Matches(/^[a-zA-Z0-9]*$/, {
		message: 'password only accepts Englich and number'
	})
	password: string;
}