import { AppDataSource } from '../db/connection';
import { Payment } from '../models/Payment';
import { Repository } from 'typeorm';

export class PaymentService {
  private paymentRepository: Repository<Payment>;

  constructor() {
    this.paymentRepository = AppDataSource.getRepository(Payment);
  }

  // Guardar preferencia de pago único
  async savePaymentPreference(preferenceData: any) {
    const payment = new Payment();
    payment.preferenceId = preferenceData.id;
    payment.status = 'pending';
    payment.type = 'single';

    // Calcular el monto total de todos los items
    payment.amount = preferenceData.items ? 
      preferenceData.items.reduce((total: number, item: any) => 
        total + (Number(item.unit_price) * Number(item.quantity)), 0) : 
      0;
    
    // Guardar metadata adicional si existe
    if (preferenceData.metadata) {
      payment.metadata = preferenceData.metadata;
    }
    
    return this.paymentRepository.save(payment);
  }

  // Guardar preferencia de suscripción
  async saveSubscription(subscriptionData: any) {
    const payment = new Payment();
    payment.subscriptionId = subscriptionData.id;
    payment.preferenceId = subscriptionData.preapproval_plan_id || '';
    payment.status = subscriptionData.status || 'pending';
    payment.type = 'subscription';
    
    // Información de la suscripción
    if (subscriptionData.auto_recurring) {
      payment.amount = Number(subscriptionData.auto_recurring.transaction_amount) || 0;
      
      // Determinar la frecuencia
      const frequency = subscriptionData.auto_recurring.frequency || 1;
      const frequencyType = subscriptionData.auto_recurring.frequency_type || 'months';
      payment.frequency = `${frequency}_${frequencyType}`;
      
      // Calcular próxima fecha de cobro
      const nextBillingDate = new Date();
      if (frequencyType === 'days') {
        nextBillingDate.setDate(nextBillingDate.getDate() + frequency);
      } else if (frequencyType === 'months') {
        nextBillingDate.setMonth(nextBillingDate.getMonth() + frequency);
      }
      payment.nextBillingDate = nextBillingDate;
    }
    
    // Guardar metadata adicional
    if (subscriptionData.metadata) {
      payment.metadata = subscriptionData.metadata;
    }
    
    return this.paymentRepository.save(payment);
  }

  // Guardar pago directo
  async saveDirectPayment(paymentData: any): Promise<Payment> {
    try {
      const payment = new Payment();
      payment.status = paymentData.status;
      payment.amount = paymentData.amount;
      payment.type = 'direct';
      payment.processedAt = new Date();
      payment.metadata = paymentData.metadata || {};
      
      // La entidad Payment no tiene estos campos directamente, los guardamos en metadata
      if (paymentData.description) {
        payment.metadata.description = paymentData.description;
      }
      
      if (paymentData.paymentMethod) {
        payment.metadata.paymentMethod = paymentData.paymentMethod;
      }
      
      if (paymentData.email) {
        payment.metadata.email = paymentData.email;
      }
      
      return this.paymentRepository.save(payment);
    } catch (error) {
      console.error('Error saving direct payment:', error);
      throw error;
    }
  }

  // Procesar pago único
  async processPayment(paymentData: {
    paymentId: string, 
    status: string, 
    amount: number,
    metadata?: any
  }): Promise<Payment> {
    // Buscar primero por preferenceId (que es lo que normalmente usamos para relacionar)
    let payment = await this.paymentRepository.findOne({ 
      where: { preferenceId: paymentData.paymentId } 
    });

    // Si no lo encontramos, intentar buscar por el ID de MercadoPago en metadata
    if (!payment) {
      payment = await this.paymentRepository.findOne({
        where: { metadata: { mercadoPagoId: paymentData.paymentId } }
      });
    }

    if (payment) {
      payment.status = paymentData.status || 'unknown';
      payment.amount = paymentData.amount || payment.amount;
      payment.processedAt = new Date();
      
      // Actualizar metadata si existe
      if (paymentData.metadata) {
        payment.metadata = {
          ...payment.metadata || {},
          ...paymentData.metadata
        };
      }

      return this.paymentRepository.save(payment);
    } else {
      // Si no encontramos el pago, creamos uno nuevo con la información disponible
      const newPayment = new Payment();
      newPayment.preferenceId = paymentData.paymentId;
      newPayment.status = paymentData.status || 'unknown';
      newPayment.amount = paymentData.amount || 0;
      newPayment.type = 'single';
      newPayment.processedAt = new Date();
      newPayment.metadata = paymentData.metadata || { mercadoPagoId: paymentData.paymentId };
      
      return this.paymentRepository.save(newPayment);
    }
  }

  // Procesar actualización de suscripción
  async processSubscriptionUpdate(data: {
    subscriptionId: string,
    status: string,
    lastPaymentDate?: Date,
    metadata?: any
  }): Promise<Payment | null> {
    const subscription = await this.paymentRepository.findOne({
      where: { subscriptionId: data.subscriptionId }
    });

    if (subscription) {
      subscription.status = data.status;
      
      if (data.lastPaymentDate) {
        subscription.processedAt = new Date(data.lastPaymentDate);
        
        // Actualizar próxima fecha de cobro si existe la frecuencia
        if (subscription.frequency) {
          const [count, type] = subscription.frequency.split('_');
          const nextBillingDate = new Date(data.lastPaymentDate);
          
          if (type === 'days') {
            nextBillingDate.setDate(nextBillingDate.getDate() + parseInt(count, 10));
          } else if (type === 'months') {
            nextBillingDate.setMonth(nextBillingDate.getMonth() + parseInt(count, 10));
          }
          
          subscription.nextBillingDate = nextBillingDate;
        }
      }
      
      // Actualizar metadata si existe
      if (data.metadata) {
        subscription.metadata = {
          ...subscription.metadata || {},
          ...data.metadata
        };
      }

      return this.paymentRepository.save(subscription);
    }
    
    return null;
  }

  // Actualizar estado de suscripción
  async updateSubscriptionStatus(subscriptionId: string, status: string): Promise<Payment | null> {
    const subscription = await this.paymentRepository.findOne({
      where: { subscriptionId }
    });

    if (subscription) {
      subscription.status = status;
      // No hay campo updatedAt en la entidad, actualizamos processedAt
      subscription.processedAt = new Date();
      return this.paymentRepository.save(subscription);
    }

    return null;
  }

  // Actualizar estado de pago
  async updatePaymentStatus(paymentId: string, status: string): Promise<Payment | null> {
    // Intentar buscar por id numérico si es posible convertirlo
    let payment = null;
    const numericId = Number(paymentId);
    
    if (!isNaN(numericId)) {
      payment = await this.paymentRepository.findOne({
        where: { paymentId: numericId }
      });
    }

    // Si no se encuentra, intentar buscar por preferenceId
    if (!payment) {
      payment = await this.paymentRepository.findOne({
        where: { preferenceId: paymentId }
      });
    }

    // Si sigue sin encontrarse, intentar por metadata
    if (!payment) {
      const payments = await this.paymentRepository.find();
      payment = payments.find((p: any) => 
        p.metadata && p.metadata.mercadoPagoId === paymentId
      );
    }

    if (payment) {
      payment.status = status;
      payment.processedAt = new Date(); // Usamos processedAt ya que no hay updatedAt
      return this.paymentRepository.save(payment);
    }

    return null;
  }

  // Obtener pagos por ID de cliente
  async getPaymentsByCustomerId(customerId: string): Promise<Payment[]> {
    // Como no podemos hacer búsqueda directa en campos JSON en todas las bases de datos,
    // hacemos una búsqueda completa y filtramos en memoria
    const allPayments = await this.paymentRepository.find({
      order: {
        createdAt: 'DESC'
      }
    });
    
    // Filtrar pagos que tengan el customer_id en su metadata
    return allPayments.filter((payment: any) => 
      payment.metadata && 
      payment.metadata.customer_id === customerId
    );
  }
}