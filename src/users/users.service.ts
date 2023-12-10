import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    const { password, ...result } = user;
    const saltOrRounds = 10; //вынести в константы
    const hash = await bcrypt.hash(password, saltOrRounds);

    return this.userRepository.save({ ...result, password: hash });
  }

  // async findAll(): Promise<User[]> {
  //   return this.userRepository.find();
  // }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });

    return user;
  }

  // async findMany(user: { query: any }): Promise<User[]> {
  //   const users = this.userRepository.find({
  //     where: [{ username: user.query }, { email: user.query }],
  //   });
  //   return users;
  // }

  async findMany(query: string): Promise<User[]> {
    const users = await this.userRepository.find({
      where: [{ username: query }, { email: query }],
    });
    return users;
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const saltOrRounds = 10; //вынести в константы
    if (updateUserDto.password) {
      const hash = await bcrypt.hash(updateUserDto.password, saltOrRounds);
      updateUserDto.password = hash;
    }
    await this.userRepository.update({ id }, updateUserDto);
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async removeOne(id: number): Promise<void> {
    await this.userRepository.delete(id);

    // return { message: 'User has been deleted' };
  }

  async getWishesById(id: number): Promise<Wish[]> {
    const { wishes } = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        wishes: true,
      },
    });
    return wishes;
  }

  // async getWishesByUsername(username: string): Promise<Wish[]> {
  //   const { wishes } = await this.userRepository.findOne({
  //     where: {
  //       username,
  //     },
  //     relations: {
  //       wishes: true,
  //     },
  //   });
  //   return wishes;
  // }
}
