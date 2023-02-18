"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardStatusValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const boards_status_enum_1 = require("../boards-status.enum");
class BoardStatusValidationPipe {
    constructor() {
        this.StatusOptions = [
            boards_status_enum_1.BoardStatus.PRIVATE,
            boards_status_enum_1.BoardStatus.PUBLIC
        ];
    }
    transform(value) {
        console.log(value);
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new common_1.BadRequestException('${value} isnt right status');
        }
        return value;
    }
    isStatusValid(status) {
        console.log(status);
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
}
exports.BoardStatusValidationPipe = BoardStatusValidationPipe;
//# sourceMappingURL=board-status-validation.pipe.js.map