import { Injectable } from '@nestjs/common';
import { UserRepository } from '../infrastructure/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
}
