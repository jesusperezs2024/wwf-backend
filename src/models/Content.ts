import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Category } from "./Category";

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  contentId: number = 0;
  
  @Column()
  name: string = "";
  
  @Column()
  publicationDate: Date = new Date;
  
  @Column()
  status: string = "";
  
  @Column()
  plannedPublication: Date = new Date;
  
  @Column()
  description: string = "";
  
  @Column()
  categoryId: number = 0;
  
  @Column()
  link: string = "";

  @Column()
  linkOther: string = "";
  
  @Column()
  alternateName: string = "";
  
  @Column()
  charLimit: number = 0;
  
  @ManyToOne(() => Category, category => category.contents)
  @JoinColumn({ name: "categoryId" })
  category!: Category;
}