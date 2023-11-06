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
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  async create(@Body() createWishDto: CreateWishDto): Promise<Wish> {
    return this.wishesService.create(createWishDto);
  }

  // @Get()
  // findAll() {
  //   return this.wishesService.findAll();
  // }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Wish> {
    const wish = await this.wishesService.findOne(id);
    if (!wish) {
      throw new NotFoundException('Wish does not exist!');
    } else {
      return wish;
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
  ): Promise<Wish> {
    return this.wishesService.updateOne(id, updateWishDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    const wish = await this.wishesService.findOne(id);
    if (!wish) {
      throw new NotFoundException('Wish does not exist!');
    }
    return this.wishesService.removeOne(id);
  }
}
