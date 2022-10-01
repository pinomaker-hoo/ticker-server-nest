import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { BoardService } from "./application/board.service"
import { BoardRepository } from "./infrastructure/board.repository"
import { BoardController } from "./ui/board.controller"

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository])],
  providers: [BoardService, BoardRepository],
  controllers: [BoardController],
  exports: [BoardRepository],
})
export class BoardModule {}
