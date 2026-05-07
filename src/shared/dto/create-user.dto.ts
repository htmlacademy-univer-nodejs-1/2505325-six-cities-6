export class CreateUserDto {
  name!: string;
  email!: string;
  password!: string;
  type!: 'default' | 'pro';
}