import { Expose } from 'class-transformer';

export class CreateCommentDto {
  @Expose()
  text!: string;

  @Expose()
  rating!: number;

  @Expose()
  author!: string;

  @Expose()
  offer!: string;
}
