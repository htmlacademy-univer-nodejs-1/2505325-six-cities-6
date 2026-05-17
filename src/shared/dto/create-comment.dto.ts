import { Expose } from 'class-transformer';
import { IsString, MinLength, MaxLength, IsNumber, Min, Max, IsDate } from 'class-validator';

export class CreateCommentDto {
  @Expose()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
    text!: string;

  @Expose()
  @IsNumber()
  @Min(1)
  @Max(5)
    rating!: number;

  @Expose()
  @IsString()
    author!: string;

  @Expose()
  @IsString()
    offer!: string;

  @Expose()
  @IsDate()
    publishDate!: Date;
}