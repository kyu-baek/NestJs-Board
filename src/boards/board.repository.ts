import { Repository } from "typeorm";
import { Board } from "./board.entity";
import { Injectable } from '@nestjs/common';

// @InjectRepository (Board)
// export class BoardRepository extends Repository<Board> {
	
// }

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}
}