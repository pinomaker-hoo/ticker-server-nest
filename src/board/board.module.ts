import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { BoardService } from "./application/board.service"
import { BoardRepository } from "./infrastructure/board.repository"
import { BoardController } from "./ui/board.controller"

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository])],
  providers: [BoardService],
  controllers: [BoardController],
  exports: [BoardService],
})
export class BoardModule {}
