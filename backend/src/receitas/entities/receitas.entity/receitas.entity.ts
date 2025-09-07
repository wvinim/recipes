// src/recipes/recipe.entity.ts
import { User } from 'src/users/entities/user.entity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


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