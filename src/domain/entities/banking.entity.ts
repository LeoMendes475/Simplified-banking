import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PayerEntity } from './payer.entity';

@Entity('banking')
export class BankingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  payerId: string;

  @OneToOne(() => PayerEntity, (payer) => payer.id)
  @JoinColumn()
  payer: PayerEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor(params?: { balance?: number; payerId?: string }) {
    if (params) {
      this.balance = params.balance ?? 0;
      this.payerId = params.payerId!;
    }
  }
}
