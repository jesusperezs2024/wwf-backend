import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Sell } from "./Sell";

@Entity()
export class Coupons {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  couponId: number = 0;
  
  @Column()
  code: string = "";
  
  @Column()
  description: string = "";
  
  @Column()
  expirationDate!: Date;
  
  @Column()
  status: boolean = true;
  
  @Column()
  sellId: number = 0;
  
  @Column()
  createdAt: Date = new Date;
  
  @Column()
  updatedAt: Date = new Date;
  
  @Column()
  category: string = "";
  
  @ManyToOne(() => Sell, sell => sell.coupons)
  @JoinColumn({ name: "sellId" })
  sell!: Sell
}