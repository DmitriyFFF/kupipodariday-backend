import { Injectable } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { Repository } from 'typeorm';

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
    return this.wishRepository.findOne({
      where: {
        id,
      },
    });

    // return wish;
  }

  async update(id: number, updateWishDto: UpdateWishDto): Promise<Wish> {
    await this.wishRepository.update({ id }, updateWishDto);

    return this.wishRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.wishRepository.delete(id);

    // return { message: 'Wish has been deleted' };
  }
}
