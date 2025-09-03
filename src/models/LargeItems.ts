import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class LargeItems {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  largeItemsId: number = 0;
  
  @Column()
  title: string = "";
  
  @Column()
  description: string = "";
  
  @Column()
  url: string = "";
  
  @Column()
  sectionLargeItemsId: number = 0;
}