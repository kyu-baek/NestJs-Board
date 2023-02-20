import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { BoardStatus } from "./boards-status.enum";
export declare class BoardsService {
    private boardRepository;
    constructor(boardRepository: BoardRepository);
    createBoard(createBoardDto: CreateBoardDto): Promise<Board>;
    deleteBoard(id: number): Promise<void>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board>;
    getBoardById(id: number): Promise<Board>;
    getAllBoards(): Promise<Board[]>;
}
