import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PayerEntity } from './payer.entity';
import { BankingEntity } from './banking.entity';
import { CategoryEntity } from './category.entity';

@Entity('transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  value: number;

  @OneToOne(() => PayerEntity, (payer) => payer.id)
  payer: PayerEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.id)
  category: CategoryEntity;

  @OneToOne(() => BankingEntity, (banking) => banking.id)
  banking: BankingEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
