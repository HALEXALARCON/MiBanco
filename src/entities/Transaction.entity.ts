import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @ManyToOne(() => User, (user) => user.sentTransactions)
  sender!: User;

  @ManyToOne(() => User, (user) => user.receivedTransactions)
  receiver!: User;

  @CreateDateColumn()
  createdAt!: Date;
}
