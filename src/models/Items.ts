import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Items {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  itemsId: number = 0;
  
  @Column()
  title: string = "";
  
  @Column()
  description: string = "";
  
  @Column()
  url: string = "";
  
  @Column()
  sectionItemsId: number = 0;
}