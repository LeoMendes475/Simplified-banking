import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { PayerEntity } from './payer.entity';

@Entity('user')
export class UserEntity {
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  roleId: string;

  @ManyToOne(() => RoleEntity, (role) => role.id)
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity;

  @Column({ type: 'varchar' })
  payerId: string;

  @OneToOne(() => PayerEntity, (payer) => payer.user)
  @JoinColumn({ name: 'payerId' })
  payer: PayerEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor(params?: { username: string; password: string; roleId: string; payerId: string }) {
    if (params) {
      this.username = params.username ?? this.username;
      this.password = params.password ?? this.password;
      this.roleId = params.roleId ?? this.roleId;
      this.payerId = params.payerId ?? this.payerId;
    }
  }
}
