import { IsInt, IsNotEmpty, IsNumber, IsUrl, Length } from 'class-validator';

export class CreateWishDto {
  @IsNotEmpty()
  @Length(1, 250)
  name: string;

  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsUrl()
  image: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  raised: number;

  @IsInt()
  copied: number;

  @Length(1, 1024)
  description: string;
}
