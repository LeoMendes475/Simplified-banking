import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

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

  @CreateDateColumn()
  createdAt: Date;
}
