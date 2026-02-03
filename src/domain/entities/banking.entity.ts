import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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
  payer: PayerEntity;

  @Column({ nullable: false })
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
