import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ProductsAmounts } from "./ProductsAmounts";

@Entity()
export class ProductsGeneral {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  productsGeneralId: number = 0;
  
  @Column()
  productId: number = 0;
  
  @Column()
  description: string = "";
  
  @Column()
  name: string = "";
  
  @Column()
  categoryId: number = 0;
  
  @OneToMany(() => ProductsAmounts, productsAmounts => productsAmounts.productsGeneral)
  productsAmounts!: ProductsAmounts[];
}
