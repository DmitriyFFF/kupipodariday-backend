import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  async create(
    @Body() createWishlistDto: CreateWishlistDto,
  ): Promise<Wishlist> {
    return this.wishlistsService.create(createWishlistDto);
  }

  // @Get()
  // findAll() {
  //   return this.wishlistsService.findAll();
  // }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Wishlist> {
    const wishList = await this.wishlistsService.findOne(id);
    if (!wishList) {
      throw new NotFoundException('WishList does not exist!');
    } else {
      return wishList;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ): Promise<Wishlist> {
    return this.wishlistsService.updateOne(id, updateWishlistDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const wishList = await this.wishlistsService.findOne(id);
    if (!wishList) {
      throw new NotFoundException('WishList does not exist!');
    }
    return this.wishlistsService.removeOne(id);
  }
}
