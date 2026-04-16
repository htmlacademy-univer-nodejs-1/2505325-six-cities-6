export interface CreateUserDto {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  type: 'default' | 'pro';
}
