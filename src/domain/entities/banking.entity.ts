import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PayerEntity } from './payer.entity';

@Entity('banking')
export class BankingEntity {
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Column({ type: 'varchar', unique: true })
  payerId: string;

  @OneToOne(() => PayerEntity, (payer) => payer.id)
  @JoinColumn()
  payer: PayerEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor(params?: { balance?: number; payerId?: string }) {
    if (params) {
      this.balance = params.balance ?? 0;
      this.payerId = params.payerId!;
    }
  }
}
