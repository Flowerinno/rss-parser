import { Injectable } from '@nestjs/common';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';

export type User = {
  id: number;
  username: string;
  password: string;
  timestamp: Date;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private repository: Repository<Users>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.repository.findOne({ where: { username } });
  }

  async createUser(userDto: CreateUserDto) {
    try {
      this.repository.save(userDto);
    } catch (error) {
      return 'Failed to create a new user!';
    }
  }
}
