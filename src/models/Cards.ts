import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { SectionCards } from "./SectionCards";

@Entity()
export class Cards {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  cardsId: number = 0;
  
  @Column()
  title: string = "";
  
  @Column()
  description: string = "";
  
  @Column()
  url: string = "";
  
  @Column()
  buttonMobility: string = "";
  
  @Column()
  buttonText: string = "";
  
  @Column()
  sectionCardsId: number = 0;
  
  @ManyToOne(() => SectionCards, sectionCards => sectionCards.cards)
  @JoinColumn({ name: "sectionCardsId" })
  sectionCards!: SectionCards;
}