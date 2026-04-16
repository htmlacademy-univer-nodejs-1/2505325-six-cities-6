import { HouseType } from '../models/house.type.js';
import { AmenitiesType } from '../models/amentities.type.js';

export interface CoordinatesDto {
  latitude: number;
  longitude: number;
}

export interface CreateOfferDto {
  title: string;
  description: string;
  publishDate: Date;
  city: string;
  previewImage: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HouseType;
  rooms: number;
  guests: number;
  price: number;
  amenities: AmenitiesType[];
  author: string;
  coordinates: CoordinatesDto;
}

export interface UpdateOfferDto extends Partial<Omit<CreateOfferDto, 'author'>> {}
