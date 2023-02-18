import { Repository } from "typeorm";
import { Board } from "./board.entity";
export declare class BoardRepository {
    private readonly boardRepository;
    constructor(boardRepository: Repository<Board>);
}
