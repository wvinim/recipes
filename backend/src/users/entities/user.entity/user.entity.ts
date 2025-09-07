import { Recipe } from 'src/recipes/entities/recipes.entity/recipes.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  @OneToMany(() => Recipe, recipe => recipe.user)
  recipes: Recipe[];
}