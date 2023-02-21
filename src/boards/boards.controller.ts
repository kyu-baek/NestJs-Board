import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Redirect, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
	private logger = new Logger('BoareController')
	constructor(private boardsService: BoardsService){ }

	@Get()
	getAllBoard( ) : Promise<Board[]> {
		return this.boardsService.getAllBoards();
	}

	@Get('/myboard')
	getMyBoard(
		@GetUser() user:User,
	) : Promise<Board[]> {
		this.logger.verbose(`User ${user.username} trying to get boards`)
		return this.boardsService.getMyBoard(user);
	}

	@Get('/:id')
	getBoardById(@Param('id') id: number) : Promise<Board>  {
		return this.boardsService.getBoardById(id);
	}

	@Post()
	@UsePipes(ValidationPipe) // Handler-level Pipes
	createBoard(
		@Body() createBoardDto: CreateBoardDto,
		@GetUser() user: User) : Promise<Board> {
		this.logger.verbose(`User ${user.username} creating a new  boards. Payload: ${JSON.stringify(createBoardDto)}`)
		return this.boardsService.createBoard(createBoardDto, user);
	}

	@Delete('/:id')
	deleteBoard(
		@Param('id', ParseIntPipe) id,
		@GetUser() user: User
		): Promise<void> {
		return this.boardsService.deleteBoard(id, user);
	}

	@Patch('/:id/status')
	updateBoardStatus(
		@Param('id', ParseIntPipe) id: number,
		@Body('status', BoardStatusValidationPipe) status: BoardStatus,
	): Promise<Board> {
		return this.boardsService.updateBoardStatus(id, status);
	}

	//@Get('/:id')
	// getBoardById(@Param('id') id: string) : Board {
	// 	return this.boardsService.getBoardById(id);
	// }

	
	// @Get('red/dos')
	// @Redirect('https://nestjs.com', 302)
	// getRedirect() {
	// 	return { url: 'https://nestjs.com' };
	// }

	// @Post()
	// @UsePipes(ValidationPipe)		// Handler-level Pipes
	// createBoard(
	// 	@Body() createBoardDto: CreateBoardDto
	// 	) : Board {
	// 	return this.boardsService.createBoard(createBoardDto);
	// }

	// @Delete()
	// deleteBoard(@Param('id') id: string): void {
	// 	this.boardsService.deleteboard(id);
	// }

	// @Patch('/:id/status')
	// updateBoardStatus(
	// 	@Param('id') id: string,
	// 	@Body('status', BoardStatusValidationPipe) status: BoardStatus,
	// ): Board {
	// 	return this.boardsService.updateBoardStatus(id, status);
	// }

}
