import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Products } from "./Products";

@Entity()
export class Species {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  name: string = "";

  @Column()
  description: string= "";

  @OneToMany(() => Products, product => product.speciesId)
  products!: Products[];
}