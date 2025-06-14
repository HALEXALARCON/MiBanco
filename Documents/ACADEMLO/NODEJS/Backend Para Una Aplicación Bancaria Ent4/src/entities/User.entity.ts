import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  BaseEntity
} from 'typeorm';
import { Transaction } from './Transaction.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 100 })
  name!: string;

  @Column({ length: 100, unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ length: 20, unique: true })
  accountNumber!: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  balance!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Transaction, tx => tx.sender)
  sentTransactions!: Transaction[];

  @OneToMany(() => Transaction, tx => tx.receiver)
  receivedTransactions!: Transaction[];
}
