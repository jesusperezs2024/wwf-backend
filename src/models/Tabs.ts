import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TabsSectionCards } from "./TabsSectionCards";

@Entity()
export class Tabs {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  tabsId: number = 0;
  
  @Column()
  title: string = "";
  
  @Column()
  name: string = "";
  
  @OneToMany(() => TabsSectionCards, tabsSectionCards => tabsSectionCards.tabs)
  tabsSectionCards!: TabsSectionCards[];
}