import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class SectionItems {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  sectionItemsId: number = 0;
  
  @Column()
  title: string = "";
  
  @Column()
  description: string = "";
  
  @Column()
  contentId: number = 0;
  
  @Column()
  status: string = "";
}