import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers(page, limit): Promise<User[]> {
    return this.usersRepository.getUsers(page, limit);
  }

  getUser(id: string) {
    return this.usersRepository.getUser(id);
  }

  postUser(user: any) {
    return this.usersRepository.postUser(user);
  }

  putUser(user: any, id: string) {
    return this.usersRepository.putUser(user, id);
  }

  updateUser(id: string, user: any) {
    return this.usersRepository.updateUser(Number(id), user);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
