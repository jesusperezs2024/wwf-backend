import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Source } from "./Source";

@Entity()
export class LinkFooter {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  sourceId: number = 0;
  
  @Column()
  link: string = "";
  
  @Column()
  class: string = "";
  
  @Column()
  status: string = "";
  
  @ManyToOne(() => Source, source => source.linkFooters)  
  @JoinColumn({ name: "sourceId" })
  source!: Source; 
}