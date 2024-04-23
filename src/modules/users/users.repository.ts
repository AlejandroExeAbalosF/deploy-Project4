import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

type IUser = {
  id: number;

  email: string;

  name: string;

  password: string;

  address: string;

  phone: string;

  country?: string | undefined;

  city?: string | undefined;
};
@Injectable()
export class UsersRepository {
  private users: IUser[] = [
    {
      id: 1,

      email: 'pC4p9@example.com',

      name: 'Kamil Myśliwiec',

      password: '12345678',

      address: 'calle falsa 123',

      phone: '123456789',

      country: 'Colombia',

      city: 'Medellin',
    },

    {
      id: 2,
      email: 'jDoe@example.com',
      name: 'John Doe',
      password: 'password123',
      address: '123 Main Street',
      phone: '987654321',
      country: 'USA',
      city: 'New York',
    },
    {
      id: 3,
      email: 'jSmith@example.com',
      name: 'Jane Smith',
      password: 'pass123',
      address: '456 Elm Avenue',
      phone: '555666777',
      country: 'Canada',
      city: 'Toronto',
    },
    {
      id: 4,
      email: 'mJohnson@example.com',
      name: 'Mary Johnson',
      password: 'password456',
      address: '789 Oak Street',
      phone: '111222333',
      country: 'USA',
      city: 'Los Angeles',
    },
    {
      id: 5,
      email: 'aGarcia@example.com',
      name: 'Ana Garcia',
      password: 'pass1234',
      address: '321 Pine Avenue',
      phone: '444555666',
      country: 'Mexico',
      city: 'Mexico City',
    },
  ];

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers(page, limit): Promise<User[]> {
    const start = (page - 1) * limit;
    const end = start + limit;
    return await this.userRepository.find({
      skip: start,
      take: end,
      select: ['id', 'name', 'email', 'address', 'phone', 'country', 'city'],
    });
    // const userP = this.users.slice(start, end);
    // return userP.map(({ password, ...u }) => u);
  }

  async getUser(idU) {
    const user = await this.userRepository.find({
      where: { id: idU },
      relations: ['orders'],
    });
    const { password, isAdmin, ...u } = user[0];
    return u;
  }

  async postUser(user: Partial<User>) {
    // console.log(user);
    try {
      const newUser = await this.userRepository.create({
        name: user.name,
        email: user.email,
        password: user.password,
        address: user.address,
        phone: Number(user.phone),
        country: user.country,
        city: user.city,
      });

      await this.userRepository.save(newUser);
      return newUser.id;
    } catch (error) {
      throw new Error('No se pudo registrar el usuario');
    }
  }

  async putUser(user: Partial<User>, idU: string) {
    const userE = await this.userRepository.findOne({
      where: { id: idU },
    });
    // console.log(userE);
    if (userE) {
      userE.email = user?.email ? user.email : userE.email;
      userE.name = user?.name ? user.name : userE.name;
      userE.password = user?.password
        ? await bcrypt.hash(user.password, 10)
        : userE.password;
      userE.address = user?.address ? user.address : userE.address;
      userE.phone = user?.phone ? user.phone : userE.phone;
      userE.country = user?.country ? user.country : userE.country;
      userE.city = user?.city ? user.city : userE.city;

      await this.userRepository.save(userE);
      // this.users[idU] = userE;
      return userE.id;
    }
    return 'No se encontro el usuario';
  }

  updateUser(id: number, user: any) {
    const idU = Number(user.id);
    const userE = this.users.find((u) => u.id === idU);

    if (!userE) {
      return 'No se encontro el usuario';
    }
    const updateUser = { ...userE, ...user };

    const index = this.users.findIndex((u) => u.id === idU);
    this.users[index] = updateUser;
    return updateUser.id;
  }

  async deleteUser(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return 'No se encontro el usuario';
    }
    await this.userRepository.delete(user);
    return 'Usuario eliminado';
  }

  async searchEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }
}
