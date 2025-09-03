import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Testimony } from "./Testimony";

@Entity()
export class TestimonySection {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  testimonyId: number = 0;
  
  @Column()
  title: string = "";
  
  @Column()
  description: string = "";
  
  @Column()
  status: string = "";
  
  @ManyToOne(() => Testimony, testimony => testimony.testimonySections)
  @JoinColumn({ name: "testimonyId" })
  testimony!: Testimony;
}