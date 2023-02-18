import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
	constructor(
		@InjectRepository(BoardRepository)
		private boardRepository: BoardRepository, 
	) {}


	// private boards: Board[] = [];

	// getAllBoards() : Board[] {
	// 	return this.boards;
	// }

	// createBoard(createBoardDto: CreateBoardDto) {
	// 	const {title, description} = createBoardDto;
	// 	const board: Board = {
	// 		/*
	// 		자바스크립트에서는 이름이 같을 때 이름만 적어도 동일하게 동작
	// 		title,	
	// 		description,
	// 		 */
	// 		id: uuid(), //유니크한 값을 임의로 넣기 위해 uuid 함수를 이용.
	// 		title: title,
	// 		description: description,
	// 		status: BoardStatus.PUBLIC
	// 	}
	// 	this.boards.push(board);
	// 	return board;
	// }

	async createBoard(createBoardBto: CreateBoardDto) : Promise<Board> {
		const { title, description } = createBoardBto;

		const board = this.boardRepository.create({
			title,
			description,
			status: BoardStatus.PUBLIC
		})
		await this.boardRepository.save(board);
		return board;
	}

	async getBoardById(id: number): Promise <Board> {
		const found = await this.boardRepository.findOne({ where: { id } });

		if (!found) {
			throw new NotFoundException(`Can't find Board with id ${id}`)
		}
		return found;
	}

	// getBoardById(id: string) : Board {

	// 	const found = this.boards.find((board) => board.id === id);
	// 	if (!found)
	// 		throw new NotFoundException("nothing!");
	// 	return found;
	// }

	// deleteboard(id: string): void {
	// 	const found = this.getBoardById(id);
	// 	this.boards = this.boards.filter((board) => board.id !== found.id);
	// }

	// updateBoardStatus(id: string, status: BoardStatus): Board {
	// 	const board = this.getBoardById(id);
	// 	board.status = status;
	// 	return board;
	// }

 }
