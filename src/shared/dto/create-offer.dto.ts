import { Expose, Type } from 'class-transformer';
import { IsString, MinLength, MaxLength, IsIn, IsNumber, Min, Max, IsArray, ValidateNested, IsBoolean, IsDateString, IsDate } from 'class-validator';
import { HouseType } from '../models/house.type.js';
import { AmenitiesType } from '../models/amentities.type.js';

export class CoordinatesDto {
  @Expose()
  @IsNumber()
  @Min(-90)
  @Max(90)
    latitude!: number;

  @Expose()
  @IsNumber()
  @Min(-180)
  @Max(180)
    longitude!: number;
}

export class CreateOfferDto {
  @Expose()
  @IsString()
  @MinLength(10)
  @MaxLength(100)
    title!: string;

  @Expose()
  @IsString()
  @MinLength(20)
  @MaxLength(1024)
    description!: string;

  @Expose()
  @IsDate()
    publishDate!: Date;

  @Expose()
  @IsString()
  @IsIn(['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'])
    city!: string;

  @Expose()
  @IsString()
    previewImage!: string;

  @Expose()
  @IsArray()
  @IsString({ each: true })
    photos!: string[];

  @Expose()
  @IsBoolean()
    isPremium!: boolean;

  @Expose()
  @IsBoolean()
    isFavorite!: boolean;

  @Expose()
  @IsNumber()
  @Min(1)
  @Max(5)
    rating!: number;

  @Expose()
  @IsString()
  @IsIn(['apartment', 'house', 'room', 'hotel'])
    type!: HouseType;

  @Expose()
  @IsNumber()
  @Min(1)
  @Max(8)
    rooms!: number;

  @Expose()
  @IsNumber()
  @Min(1)
  @Max(10)
    guests!: number;

  @Expose()
  @IsNumber()
  @Min(100)
  @Max(100000)
    price!: number;

  @Expose()
  @IsArray()
  @IsIn(['Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge'], { each: true })
    amenities!: AmenitiesType[];

  @Expose()
  @IsString()
    author!: string;

  @Expose()
  @ValidateNested()
  @Type(() => CoordinatesDto)
    coordinates!: CoordinatesDto;
}

export class UpdateOfferDto {
  @Expose()
  @IsString()
  @MinLength(10)
  @MaxLength(100)
    title?: string;

  @Expose()
  @IsString()
  @MinLength(20)
  @MaxLength(1024)
    description?: string;

  @Expose()
  @IsDateString()
    publishDate?: Date;

  @Expose()
  @IsString()
  @IsIn(['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'])
    city?: string;

  @Expose()
  @IsString()
    previewImage?: string;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  @MinLength(6)
  @MaxLength(6)
    photos?: string[];

  @Expose()
  @IsBoolean()
    isPremium?: boolean;

  @Expose()
  @IsBoolean()
    isFavorite?: boolean;

  @Expose()
  @IsNumber()
  @Min(1)
  @Max(5)
    rating?: number;

  @Expose()
  @IsString()
  @IsIn(['apartment', 'house', 'room', 'hotel'])
    type?: HouseType;

  @Expose()
  @IsNumber()
  @Min(1)
  @Max(8)
    rooms?: number;

  @Expose()
  @IsNumber()
  @Min(1)
  @Max(10)
    guests?: number;

  @Expose()
  @IsNumber()
  @Min(100)
  @Max(100000)
    price?: number;

  @Expose()
  @IsArray()
  @IsIn(['Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge'], { each: true })
    amenities?: AmenitiesType[];

  @Expose()
  @ValidateNested()
  @Type(() => CoordinatesDto)
    coordinates?: CoordinatesDto;
}