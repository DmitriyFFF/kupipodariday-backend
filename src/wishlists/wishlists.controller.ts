import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  async findAll() {
    return this.wishlistsService.findAll();
  }

  @Post()
  async create(
    @Req() req,
    @Body() createWishlistDto: CreateWishlistDto,
  ): Promise<Wishlist> {
    return this.wishlistsService.create(req.user, createWishlistDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Wishlist> {
    const wishList = await this.wishlistsService.findOne(id);
    if (!wishList) {
      throw new NotFoundException('Список желаний отсутствует!');
    } else {
      return wishList;
    }
  }

  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: number,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    const wishList = await this.wishlistsService.findOne(id);
    if (!wishList) {
      throw new NotFoundException('Список желаний отсутствует!');
    }
    return this.wishlistsService.update(id, req.user.id, updateWishlistDto);
  }

  @Delete(':id')
  async remove(@Req() req, @Param('id') id: number) {
    const wishList = await this.wishlistsService.findOne(id);
    if (!wishList) {
      throw new NotFoundException('Список желаний отсутствует!');
    }
    return this.wishlistsService.removeOne(id, req.user.id);
  }
}
