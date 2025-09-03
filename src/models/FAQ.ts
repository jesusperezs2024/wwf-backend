import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class FAQ {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  faqId: number = 0;
  
  @Column()
  question: string = "";
  
  @Column({ type: "text" })
  answer: string = "";
  
  @Column()
  status: string = "";
  
  @Column()
  sectionFAQId: number = 0;
}