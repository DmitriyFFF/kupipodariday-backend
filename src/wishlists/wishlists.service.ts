import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishListRepository: Repository<Wishlist>,
  ) {}

  async create(createWishlistDto: CreateWishlistDto): Promise<Wishlist> {
    const wishList = this.wishListRepository.create(createWishlistDto);

    return this.wishListRepository.save(wishList);
  }

  // async findAll(): Promise<Wishlist[]> {
  //   return this.wishListRepository.find();
  // }

  async findOne(id: number): Promise<Wishlist> {
    return this.wishListRepository.findOne({
      where: {
        id,
      },
    });

    // return wishlist;
  }

  async update(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
  ): Promise<Wishlist> {
    await this.wishListRepository.update({ id }, updateWishlistDto);

    return this.wishListRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.wishListRepository.delete(id);

    // return { message: 'WishList has been deleted' };
  }
}
