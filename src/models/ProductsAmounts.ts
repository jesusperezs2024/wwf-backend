import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ProductsGeneral } from "./ProductsGeneral";

@Entity()
export class ProductsAmounts {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  productAmountId: number = 0;
  
  @Column()
  number: number = 0;
  
  @Column()
  productsGeneralId: number = 0;
  
  @Column()
  typeAmount: string = "";
  
  @ManyToOne(() => ProductsGeneral, productsGeneral => productsGeneral.productsAmounts)
  @JoinColumn({ name: "productsGeneralId" })
  productsGeneral!: ProductsGeneral;
}