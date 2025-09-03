import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Checkout } from "./Checkout";

@Entity()
export class LinkCheckout {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  checkoutId: number = 0;
  
  @Column()
  link: string = "";
  
  @Column()
  description: string = "";
  
  @Column()
  status: string = "";
  
  @Column()
  checkoutId2: number = 0;
  
  @ManyToOne(() => Checkout, checkout => checkout.linkCheckouts)
  @JoinColumn({ name: "checkoutId" })
  checkout!: Checkout;
}
