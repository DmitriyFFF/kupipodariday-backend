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
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Body() createOfferDto: CreateOfferDto): Promise<Offer> {
    return this.offersService.create(createOfferDto);
  }

  // @Get()
  // findAll() {
  //   return this.offersService.findAll();
  // }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Offer> {
    const offer = await this.offersService.findOne(id);
    if (!offer) {
      throw new NotFoundException('Offer does not exist!');
    } else {
      return offer;
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateOfferDto: UpdateOfferDto,
  ): Promise<Offer> {
    return this.offersService.updateOne(id, updateOfferDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<any> {
    const offer = await this.offersService.findOne(id);
    if (!offer) {
      throw new NotFoundException('Offer does not exist!');
    }
    return this.offersService.removeOne(id);
  }
}
