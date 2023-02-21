import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { CreateBoardDto } from './dto/create-board.dto';
import { User } from "src/auth/user.entity";
export declare class BoardRepository extends Repository<Board> {
    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board>;
}
