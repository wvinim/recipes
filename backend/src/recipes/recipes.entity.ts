import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'simple-array' })
  ingredients: string[];

  @Column({ type: 'text' })
  instructions: string;

  @ManyToOne(() => User, user => user.recipes)
  user: User;
}