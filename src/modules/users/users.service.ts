import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import bcrypt from 'bcrypt';
import {
  DBResult,
  getErrorDB,
  getErrorField,
} from '../../common/helper/database.helper';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private repo: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const data: User = {
        fullname: createUserDto.fullname,
        nisn: createUserDto.nisn,
        username: createUserDto.username,
        password: hashedPassword,
      };

      const user = await this.repo.create(data);

      const result: DBResult = {
        data: {
          id: user.id,
        },
      };

      return result;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        const result: DBResult = {
          data: false,
          message: getErrorDB(e.code),
          errors: [getErrorField(e.meta.target)],
        };

        return result;
      }
    }
  }
}
