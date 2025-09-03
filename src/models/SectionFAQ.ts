import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class SectionFAQ {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  sectionFAQId: number = 0;
  
  @Column()
  title: string = "";
  
  @Column()
  categoryId: number = 0;
  
  @Column()
  description: string = "";
  
  @Column()
  status: string = "";
  
  @Column()
  faqId: number = 0;
}