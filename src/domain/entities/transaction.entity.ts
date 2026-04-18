import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PayerEntity } from './payer.entity';
import { BankingEntity } from './banking.entity';
import { CategoryEntity } from './category.entity';

@Entity('transaction')
export class TransactionEntity {
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  value: number;

  @OneToOne(() => PayerEntity, (payer) => payer.id)
  payer: PayerEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.id)
  category: CategoryEntity;

  @OneToOne(() => BankingEntity, (banking) => banking.id)
  banking: BankingEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
