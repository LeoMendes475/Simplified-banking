import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { PayerEntity } from './payer.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => RoleEntity, (role) => role.id)
  role: RoleEntity;

  @OneToOne(() => PayerEntity, (payer) => payer.user)
  @JoinColumn()
  payer: PayerEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor(params?: {
    username: string;
    password: string;
    role: RoleEntity;
    payer: PayerEntity;
  }) {
    if (params) {
      this.username = params.username ?? this.username;
      this.password = params.password ?? this.password;
      this.role = params.role ?? this.role;
      this.payer = params.payer ?? this.payer;
    }
  }
}
