import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { BoardStatus } from "./boards-status.enum";
import { DataSource } from 'typeorm';
import { User } from 'src/auth/user.entity';
export declare class BoardsService {
    private boardRepository;
    private dataSource;
    constructor(boardRepository: BoardRepository, dataSource: DataSource);
    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board>;
    deleteBoard(id: number, user: User): Promise<void>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board>;
    getBoardById(id: number): Promise<Board>;
    getAllBoards(): Promise<Board[]>;
    getMyBoard(user: User): Promise<Board[]>;
}
