import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Content } from "./Content";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = "";

  @Column()
  description: string= "";

  @Column({ nullable: true })
  categoryId: number= 0;

  @Column({ nullable: true })
  subcategory: string= "";

  @OneToMany(() => Content, content => content.category)
  contents!: Content[];
}