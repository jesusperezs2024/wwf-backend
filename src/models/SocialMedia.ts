import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class SocialMedia {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  socialMediaId: number = 0;
  
  @Column()
  name: string = "";
  
  @Column()
  link: string = "";
  
  @Column()
  class: string = "";
}