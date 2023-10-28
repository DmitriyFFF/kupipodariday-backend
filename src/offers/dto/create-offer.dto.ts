import { IsBoolean, IsNumber } from 'class-validator';

export class CreateOfferDto {
  @IsBoolean()
  hidden: boolean;

  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;
}
