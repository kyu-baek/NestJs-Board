import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { CustomRepository } from "./typeorm-ex.decorator";
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from "./boards-status.enum";

@CustomRepository (Board)
export class BoardRepository extends Repository<Board> {

	async createBoard(createBoardDto: CreateBoardDto) : Promise<Board> {
		const { title, description } = createBoardDto;

		const board = this.create({
			title,
			description,
			status: BoardStatus.PUBLIC
		})
		await this.save(board);
		return board;
	}
}


// @Injectable()
// export class BoardRepository {
//   constructor(
//     @InjectRepository(Board)
//     private readonly boardRepository: Repository<Board>,
//   ) {}
// }