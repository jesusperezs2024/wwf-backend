import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class TabsCards {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  tabCardsId: number = 0;
  
  @Column()
  title: string = "";
  
  @Column()
  cardsId: number = 0;
  
  @Column()
  tabsId: number = 0;
}