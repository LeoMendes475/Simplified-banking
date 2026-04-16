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

  @OneToOne(() => PayerEntity, (payer) => payer.id)
  @JoinColumn()
  payer: PayerEntity;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
