import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class SectionInformation {
  @PrimaryGeneratedColumn()
  id: number = 0;
  
  @Column()
  sectionInformationId: number = 0;
  
  @Column()
  title: string = "";
  
  @Column()
  description: string = "";
  
  @Column()
  buttonText: string = "";
  
  @Column()
  buttonUrl: string = "";
  
  @Column()
  buttonMobility: string = "";
  
  @Column()
  categoryId: number = 0;
  
  @Column()
  status: string = "";
}