import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SellDescriptionProduct } from "./SellDescriptionProduct";

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  productId: number = 0;
  
  @Column()
  contentId: number = 0;

  @Column()
  speciesId: number = 0;
  
  @Column()
  status: string = "";
  
  @Column()
  productsGeneralId: number = 0;
  
  @OneToMany(() => SellDescriptionProduct, sellDescription => sellDescription.product)
  sellDescriptionProducts!: SellDescriptionProduct[];
}
