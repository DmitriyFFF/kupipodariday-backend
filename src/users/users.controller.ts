import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  // Delete,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Wish } from 'src/wishes/entities/wish.entity';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  @Get('me')
  async findOwn(@Req() req): Promise<User> {
    const user = await this.usersService.findOne(req.user.id);
    if (!user) {
      throw new NotFoundException('Пользователь не найден!');
    } else {
      return user;
    }
  }

  @Patch('me')
  async update(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateOne(req.user.id, updateUserDto);
  }

  @Get('me/wishes')
  async getOwnWishes(@Req() req): Promise<Wish[]> {
    return await this.usersService.getWishesById(req.user.id);
  }

  @Get(':username')
  async findOne(@Param('username') username: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('Пользователь с таким именем не найден!');
    } else {
      return user;
    }
  }

  @Get(':username/wishes')
  async getWishes(@Param('username') username: string): Promise<Wish[]> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('Пользователь с таким именем не найден!');
    }
    return this.usersService.getWishesByUsername(user.username);
  }

  @Post('find')
  async findMany(@Body() dto: UpdateUserDto): Promise<User[]> {
    return await this.usersService.findMany(dto);
  }

  // @Get(':id')
  // async findOne(@Param('id') id: number): Promise<User> {
  //   const user = await this.usersService.findOne(id);
  //   if (!user) {
  //     throw new NotFoundException('User does not exist!');
  //   } else {
  //     return user;
  //   }
  // }

  // @Patch(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): Promise<User> {
  //   return this.usersService.updateOne(id, updateUserDto);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: number): Promise<any> {
  //   const user = await this.usersService.findOne(id);
  //   if (!user) {
  //     throw new NotFoundException('User does not exist!');
  //   }
  //   return this.usersService.removeOne(id);
  // }
}
