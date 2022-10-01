import { Injectable } from "@nestjs/common"
import { CommentRepository } from "../infrastructure/comment.repository"

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}
}
