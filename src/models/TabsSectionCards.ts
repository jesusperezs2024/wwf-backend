import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Tabs } from "./Tabs";

@Entity()
export class TabsSectionCards {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  tabId: number = 0;
  
  @Column()
  title: string = "";
  
  @Column()
  sectionCardsId: number = 0;
  
  @Column()
  tabsId: number = 0;
  
  @ManyToOne(() => Tabs, tabs => tabs.tabsSectionCards)
  @JoinColumn({ name: "tabsId" })
  tabs!: Tabs;
}