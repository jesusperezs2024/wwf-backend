import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  paymentId: number = 0;

  @Column({ nullable: true })
  preferenceId: string = "";

  @Column({ nullable: true })
  subscriptionId: string = "";

  @Column()
  status: string = "";

  @Column({ default: 'single' })
  type: string = "single"; // 'single' para pago único, 'subscription' para suscripción

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number = 0;

  @Column({ nullable: true })
  frequency: string = ""; // Para suscripciones: 'monthly', 'yearly', etc.

  @Column({ nullable: true })
  nextBillingDate: Date = new Date();

  @CreateDateColumn()
  createdAt: Date = new Date();

  @Column({ nullable: true })
  processedAt: Date = new Date();


  @Column({ type: 'json', nullable: true })
  metadata: any;
}