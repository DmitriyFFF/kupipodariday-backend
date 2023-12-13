import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
// import { UpdateOfferDto } from './dto/update-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly wishService: WishesService,
  ) {}

  async create(user: User, createOfferDto: CreateOfferDto): Promise<Offer> {
    const offer = this.offerRepository.create({ ...createOfferDto, user });
    const wish = await this.wishService.findOne(createOfferDto.itemId);

    if (user.id === wish.owner.id) {
      throw new ForbiddenException(
        'Нельзя вносить деньги на собственные подарки',
      );
    }

    if (createOfferDto.amount > wish.price) {
      throw new ForbiddenException(
        'Сумма собранных средств не может превышать стоимость подарка',
      );
    }

    return this.offerRepository.save(offer);
  }

  async findAll(): Promise<Offer[]> {
    return this.offerRepository.find();
  }

  async findOne(id: number): Promise<Offer> {
    const offer = await this.offerRepository.findOne({
      where: {
        id,
      },
    });

    return offer;
  }

  // async updateOne(id: number, updateOfferDto: UpdateOfferDto): Promise<Offer> {
  //   await this.offerRepository.update({ id }, updateOfferDto);

  //   return this.offerRepository.findOne({
  //     where: {
  //       id,
  //     },
  //   });
  // }

  // async removeOne(id: number): Promise<void> {
  //   await this.offerRepository.delete(id);
  // }
}
