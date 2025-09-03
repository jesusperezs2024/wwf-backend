import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { HorizontalCard } from "./HorizontalCard";

@Entity()
export class SectionHorizontalCard {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  sectionHorizontalCardId: number = 0;
  
  @Column()
  title: string = "";
  
  @Column()
  description: string= "";
  
  @Column()
  status: string= "";
  
  @Column()
  bannerId: number = 0;
  
  @OneToMany(() => HorizontalCard, horizontalCard => horizontalCard.sectionHorizontalCard)
  horizontalCards!: HorizontalCard[];
}