import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { SectionBanner } from "./SectionBanner";
import { HorizontalCard } from "./HorizontalCard";

@Entity()
export class BannerContent {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  bannerContentId: number = 0;
  
  @Column()
  bannerId: number = 0;
  
  @Column()
  sectionHorizontalCardId: number = 0;
  
  @ManyToOne(() => SectionBanner, sectionBanner => sectionBanner.bannerContents)
  @JoinColumn({ name: "bannerId" })
  sectionBanner!: SectionBanner;
  
  @ManyToOne(() => HorizontalCard, horizontalCard => horizontalCard.bannerContents)
  @JoinColumn({ name: "sectionHorizontalCardId" })
  horizontalCard!: HorizontalCard;
}