import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TestimonySection } from "./TestimonySection";

@Entity()
export class Testimony {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  name: string = "";
  
  @Column()
  description: string = "";
  
  @Column()
  role: string = "";
  
  @Column()
  date: Date = new Date;
  
  @Column({ type: "text" })
  testimonyContent: string = "";
  
  @Column()
  status: string = "";
  
  @OneToMany(() => TestimonySection, testimonySection => testimonySection.testimony)
  testimonySections!: TestimonySection[];
}