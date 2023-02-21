import { Injectable, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { BoardStatus } from "./boards-status.enum";
import { DataSource } from 'typeorm';
import { User } from 'src/auth/user.entity';



@Injectable()
export class BoardsService {
	constructor(
		// @InjectRepository(BoardRepository)
		private boardRepository: BoardRepository,
		private dataSource: DataSource
	) {}


	createBoard(createBoardDto: CreateBoardDto, user: User) : Promise<Board> {
		return this.boardRepository.createBoard(createBoardDto, user);
	}

	async deleteBoard(id: number, user: User): Promise<void> {
		const result = await this.boardRepository.delete({ id});
		//const result = await this.boardRepository.delete({ id, user});
		if (result.affected === 0)
			throw new NotFoundException(`Cant't find id ${id}`)
		console.log('result', result);
	}

	async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
		const board = await this.getBoardById(id);

		board.status = status;
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

	async getAllBoards(): Promise <Board[]> {
		return this.boardRepository.find();
		//find 함수에 아무 인자가 없으면 모든 정보를 리턴한다.
	}

	async getMyBoard(
		user: User,
	): Promise <Board[]>{
		const query = this.boardRepository.createQueryBuilder('board');
		//typeOrm 에서는 findOne() 같은 함수도 있지만 쿼리를 직접적으로 적어서 
		// 복잡한 로직을 완성할 수도 있다. 
		query.where('board.userId = :userId', {userId: user.id})
		const boards = await query.getMany(); //전체를 가져온다.
		return boards;
	}

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
