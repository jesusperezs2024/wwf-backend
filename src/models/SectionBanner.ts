import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { BannerContent } from "./BannerContent";

@Entity()
export class SectionBanner {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  sectionBannerId: number = 0;
  
  @Column()
  contentType: string = "";
  
  @Column()
  name: string = "";
  
  @Column()
  description: string = "";
  
  @Column()
  status: string = "";
  
  @Column()
  bannerId: number = 0;
  
  @OneToMany(() => BannerContent, bannerContent => bannerContent.sectionBanner)
  bannerContents!: BannerContent[];
}