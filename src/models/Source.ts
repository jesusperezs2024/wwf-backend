import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { LinkFooter } from "./LinkFooter";

@Entity()
export class Source {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  sourceId: number = 0;
  
  @Column()
  name: string = "";
  
  @Column()
  type: string = "";
  
  @OneToMany(() => LinkFooter, linkFooter => linkFooter.source)  
  linkFooters!: LinkFooter[];  
}