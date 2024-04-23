import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRespository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const userValidate = await this.usersRespository.searchEmail(email);
    if (!userValidate) {
      return 'Email o password incorrectos';
    }

    const passwordValidate = await bcrypt.compare(
      password,
      userValidate.password,
    );
    if (!passwordValidate) {
      return 'Email o password incorrectos';
    }

    const payload = {
      id: userValidate.id,
      email: userValidate.email,
      isAdmin: userValidate.isAdmin,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      message: 'User logged in',
    };
  }

  async singUp(user: Partial<User>) {
    const { email } = user;
    const userFound = this.usersRespository.searchEmail(email);
    if (!userFound) {
      throw new BadRequestException('Email already exist');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    return this.usersRespository.postUser({
      ...user,
      password: hashedPassword,
    });
  }
}
