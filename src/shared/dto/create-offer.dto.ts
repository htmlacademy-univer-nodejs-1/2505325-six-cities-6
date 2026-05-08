import { Expose } from 'class-transformer';
import { HouseType } from '../models/house.type.js';
import { AmenitiesType } from '../models/amentities.type.js';

export class CoordinatesDto {
  @Expose()
  latitude!: number;

  @Expose()
  longitude!: number;
}

export class CreateOfferDto {
  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  publishDate!: Date;

  @Expose()
  city!: string;

  @Expose()
  previewImage!: string;

  @Expose()
  photos!: string[];

  @Expose()
  isPremium!: boolean;

  @Expose()
  isFavorite!: boolean;

  @Expose()
  rating!: number;

  @Expose()
  type!: HouseType;

  @Expose()
  rooms!: number;

  @Expose()
  guests!: number;

  @Expose()
  price!: number;

  @Expose()
  amenities!: AmenitiesType[];

  @Expose()
  author!: string;

  @Expose()
  coordinates!: CoordinatesDto;
}

export class UpdateOfferDto {
  @Expose()
  title?: string;

  @Expose()
  description?: string;

  @Expose()
  publishDate?: Date;

  @Expose()
  city?: string;

  @Expose()
  previewImage?: string;

  @Expose()
  photos?: string[];

  @Expose()
  isPremium?: boolean;

  @Expose()
  isFavorite?: boolean;

  @Expose()
  rating?: number;

  @Expose()
  type?: HouseType;

  @Expose()
  rooms?: number;

  @Expose()
  guests?: number;

  @Expose()
  price?: number;

  @Expose()
  amenities?: AmenitiesType[];

  @Expose()
  coordinates?: CoordinatesDto;
}
