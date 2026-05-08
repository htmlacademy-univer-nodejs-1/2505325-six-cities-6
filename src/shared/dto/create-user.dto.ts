import { Expose } from 'class-transformer';

export class CreateUserDto {
  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  password!: string;

  @Expose()
  type!: 'default' | 'pro';
}