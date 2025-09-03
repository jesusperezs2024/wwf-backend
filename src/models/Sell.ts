import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Coupons } from "./Coupons";

@Entity()
export class Sell {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  sellId: number = 0;
  
  @Column()
  description: string = "";
  
  @Column()
  couponId: number = 0;
  
  @Column()
  mail: string = "";
  
  @Column()
  name: string = "";
  
  @Column()
  commentsNumber: number = 0;
  
  @Column()
  status: string = "";
  
  @OneToMany(() => Coupons, coupon => coupon.sell)
  coupons!: Coupons[];
}