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

  @Column()
  roleId: string;

  @ManyToOne(() => RoleEntity, (role) => role.id)
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity;

  @Column()
  payerId: string;

  @OneToOne(() => PayerEntity, (payer) => payer.user)
  @JoinColumn({ name: 'payerId' })
  payer: PayerEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  constructor(params?: { username: string; password: string; roleId: string; payerId: string }) {
    if (params) {
      this.username = params.username ?? this.username;
      this.password = params.password ?? this.password;
      this.roleId = params.roleId ?? this.roleId;
      this.payerId = params.payerId ?? this.payerId;
    }
  }
}
