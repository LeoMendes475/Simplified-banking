import { Entity, Column, CreateDateColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { RoleEnum } from '../../application/enum/role.enum';

@Entity('role')
export class RoleEntity {
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.COSTUMER,
  })
  name: RoleEnum;

  @OneToMany(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @CreateDateColumn()
  created_at: Date;
}
