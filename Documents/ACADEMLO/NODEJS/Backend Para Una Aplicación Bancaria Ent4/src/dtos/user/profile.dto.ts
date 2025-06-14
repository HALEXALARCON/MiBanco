import { Expose } from 'class-transformer';

export class ProfileDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  accountNumber!: string;

  @Expose()
  balance!: number;

  @Expose()
  createdAt!: Date;
}
