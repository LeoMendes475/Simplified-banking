import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('role')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['admin', 'editor', 'user'],
    default: 'user',
  })
  name: string;

  @OneToMany(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}
