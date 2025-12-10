import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { RoleEntity } from './role.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  cpf: string;

  @ManyToOne(() => RoleEntity, (role) => role.id)
  role: RoleEntity;
}
