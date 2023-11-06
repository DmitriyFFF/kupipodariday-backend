import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<Offer> {
    const offer = this.offerRepository.create(createOfferDto);

    return this.offerRepository.save(offer);
  }

  // async findAll(): Promise<Offer[]> {
  //   return this.offerRepository.find();
  // }

  async findOne(id: number): Promise<Offer> {
    return this.offerRepository.findOne({
      where: {
        id,
      },
    });

    // return offer;
  }

  async updateOne(id: number, updateOfferDto: UpdateOfferDto): Promise<Offer> {
    await this.offerRepository.update({ id }, updateOfferDto);

    return this.offerRepository.findOne({
      where: {
        id,
      },
    });
  }

  async removeOne(id: number): Promise<void> {
    await this.offerRepository.delete(id);
  }
}
