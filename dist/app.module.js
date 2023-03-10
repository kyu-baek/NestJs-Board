"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const boards_module_1 = require("./boards/boards.module");
const typeorm_config_1 = require("./configs/typeorm.config");
const auth_module_1 = require("./auth/auth.module");
const logger_middleware_1 = require("./middleware/logger.middleware");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware, logger_middleware_1.LoggerMiddleware2)
            .exclude({ path: '/users', method: common_1.RequestMethod.GET })
            .forRoutes('/users');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            boards_module_1.BoardsModule,
            typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeORMConfig),
            auth_module_1.AuthModule
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map