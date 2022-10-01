import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { BoardService } from "src/board/application/board.service"
import { BoardModule } from "src/board/board.module"
import { CommentService } from "./application/comment.service"
import { CommentRepository } from "./infrastructure/comment.repository"
import { CommentController } from "./ui/comment.controller"

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository]), BoardModule],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
