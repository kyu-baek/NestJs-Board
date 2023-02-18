import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
export declare class BoardsController {
    private boardsService;
    constructor(boardsService: BoardsService);
    getBoardById(id: number): Promise<Board>;
    createBoard(createBoardDto: CreateBoardDto): Promise<Board>;
}
