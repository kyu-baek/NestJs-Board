"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const board_repository_1 = require("./board.repository");
const typeorm_1 = require("typeorm");
let BoardsService = class BoardsService {
    constructor(boardRepository, dataSource) {
        this.boardRepository = boardRepository;
        this.dataSource = dataSource;
    }
    createBoard(createBoardDto, user) {
        return this.boardRepository.createBoard(createBoardDto, user);
    }
    async deleteBoard(id, user) {
        const result = await this.boardRepository.delete({ id });
        if (result.affected === 0)
            throw new common_1.NotFoundException(`Cant't find id ${id}`);
        console.log('result', result);
    }
    async updateBoardStatus(id, status) {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);
        return board;
    }
    async getBoardById(id) {
        const found = await this.boardRepository.findOne({ where: { id } });
        if (!found) {
            throw new common_1.NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }
    async getAllBoards() {
        return this.boardRepository.find();
    }
    async getMyBoard(user) {
        const query = this.boardRepository.createQueryBuilder('board');
        query.where('board.userId = :userId', { userId: user.id });
        const boards = await query.getMany();
        return boards;
    }
};
BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [board_repository_1.BoardRepository,
        typeorm_1.DataSource])
], BoardsService);
exports.BoardsService = BoardsService;
//# sourceMappingURL=boards.service.js.map