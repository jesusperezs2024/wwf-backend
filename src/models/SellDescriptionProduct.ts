import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Products } from "./Products";

@Entity()
export class SellDescriptionProduct {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  sellDescriptionProductId: number = 0;
  
  @Column()
  description: string = "";
  
  @Column()
  productId: number = 0;
  
  @Column()
  amount: number = 0;
  
  @Column()
  date: Date = new Date;
  
  @Column()
  expiredDate: Date = new Date;
  
  @Column()
  status: string = "";
  
  @Column()
  number: number = 0;
  
  @Column()
  reference: string = "";
  
  @ManyToOne(() => Products, products => products.sellDescriptionProducts)
  @JoinColumn({ name: "productId" })
  product!: Products;
}
