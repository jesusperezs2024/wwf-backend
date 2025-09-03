import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { LinkCheckout } from "./LinkCheckout";

@Entity()
export class Checkout {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  description: string = "";
  
  @Column()
  name: string = "";
  
  @Column()
  status: string = "";

  @Column()
  userId: number = 0; 
  
  @OneToMany(() => LinkCheckout, linkCheckout => linkCheckout.checkout)
  linkCheckouts!: LinkCheckout[];
}