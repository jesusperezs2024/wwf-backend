import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { SectionHorizontalCard } from "./SectionHorizontalCard";
import { BannerContent } from "./BannerContent";

@Entity()
export class HorizontalCard {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  horizontalCardId: number = 0;
  
  @Column()
  title: string = "";
  
  @Column()
  description: string = "";
  
  @Column()
  imageUrl: string = "";
  
  @Column()
  buttonText: string = "";
  
  @Column()
  buttonId: number = 0;
  
  @Column()
  sectionHorizontalCardId: number = 0;
  
  @ManyToOne(() => SectionHorizontalCard, sectionHorizontalCard => sectionHorizontalCard.horizontalCards)
  @JoinColumn({ name: "sectionHorizontalCardId" })
  sectionHorizontalCard!: SectionHorizontalCard ;
  
  @OneToMany(() => BannerContent, bannerContent => bannerContent.horizontalCard)
  bannerContents!: BannerContent[];
}