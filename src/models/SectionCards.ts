import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Cards } from "./Cards";

@Entity()
export class SectionCards {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  sectionCardsId: number = 0;
  
  @Column()
  title: string = "";
  
  @Column()
  description: string = "";
  
  @Column()
  contentId: number = 0;
  
  @Column()
  status: string = "";
  
  @OneToMany(() => Cards, cards => cards.sectionCards)
  cards!: Cards[];
}