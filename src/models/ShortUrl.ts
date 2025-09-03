import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ShortUrl {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  url: string = "";
  
  @Column()
  shortUrl: string = "";
  
  @Column()
  description: string = "";
  
  @Column()
  status: string = "";
}
