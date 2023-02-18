import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Redirect, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
	constructor(private boardsService: BoardsService){ }

	// @Get('/')
	// getAllBoard( ) : Board[] {
	// 	return this.boardsService.getAllBoards();
	// }

	@Get('/:id')
	getBoardById(@Param('id') id: number) : Promise<Board>  {
		return this.boardsService.getBoardById(id);
	}

	@Post()
	@UsePipes(ValidationPipe) // Handler-level Pipes
	createBoard(@Body() createBoardDto: CreateBoardDto) : Promise<Board> {
		return this.boardsService.createBoard(createBoardDto);
	}

	// @Get('/:id')
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
