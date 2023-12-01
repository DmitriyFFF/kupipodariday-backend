import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';
import { ForbiddenException } from '@nestjs/common/exceptions';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  async create(createWishDto: CreateWishDto): Promise<Wish> {
    const wish = this.wishRepository.create(createWishDto);

    return this.wishRepository.save(wish);
  }

  // async findAll(): Promise<Wish[]> {
  //   return this.wishRepository.find();
  // }

  async findOne(id: number): Promise<Wish> {
    // return this.wishRepository.findOne({
    //   where: {
    //     id,
    //   },
    // });

    const wish = await this.wishRepository.findOne({
      where: {
        id,
      },
      relations: {
        owner: true,
      },
    });

    return wish;
  }

  // async updateOne(id: number, updateWishDto: UpdateWishDto): Promise<Wish> {
  //   await this.wishRepository.update({ id }, updateWishDto);

  //   return this.wishRepository.findOne({
  //     where: {
  //       id,
  //     },
  //   });
  // }
  async updateOne(id: number, userId: number, updateWishDto: UpdateWishDto) {
    const wish = await this.findOne(id);
    if (userId === wish.owner.id) {
      return await this.wishRepository.update(id, updateWishDto);
    } else {
      throw new ForbiddenException('Невозможно редактировать чужие желания');
    }
  }

  async removeOne(id: number, userId: number) {
    // await this.wishRepository.delete(id);
    const wish = await this.findOne(id);
    if (userId === wish.owner.id) {
      return await this.wishRepository.delete(id);
    } else {
      throw new ForbiddenException('Невозможно удалить чужие желания');
    }
    // return { message: 'Wish has been deleted' };
  }
}
