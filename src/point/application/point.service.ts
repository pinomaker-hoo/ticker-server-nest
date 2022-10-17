import { Injectable } from "@nestjs/common"

@Injectable()
export class PointService {
  constructor(private readonly pointService: PointService) {}
}
