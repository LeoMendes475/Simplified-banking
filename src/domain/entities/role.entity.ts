import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { RoleEnum } from '../../aplication/enum/role.enum';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.USER,
  })
  name: RoleEnum;

  @OneToMany(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}
