import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

export interface PaymentIntentData {
  amount: number; // in cents
  currency: string;
  customerEmail: string;
  customerName: string;
  metadata?: {
    bookingId?: string;
    consultantId?: string;
    clientId?: string;
    serviceType?: string;
    [key: string]: any;
  };
  description?: string;
}

export interface CreateCustomerData {
  email: string;
  name: string;
  phone?: string;
  metadata?: {
    userId?: string;
    [key: string]: any;
  };
}

export interface CreateProductData {
  name: string;
  description?: string;
  price: number; // in cents
  currency: string;
  metadata?: {
    serviceId?: string;
    consultantId?: string;
    [key: string]: any;
  };
}

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.initializeStripe();
  }

  private initializeStripe() {
    try {
      const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

      if (stripeSecretKey) {
        this.stripe = new Stripe(stripeSecretKey, {
          apiVersion: '2023-10-16',
        });
      } else {
        console.warn('Stripe secret key not found. Payment integration disabled.');
      }
    } catch (error) {
      console.error('Error initializing Stripe:', error);
    }
  }

  async createPaymentIntent(paymentData: PaymentIntentData): Promise<Stripe.PaymentIntent> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: paymentData.amount,
        currency: paymentData.currency,
        receipt_email: paymentData.customerEmail,
        metadata: paymentData.metadata,
        description: paymentData.description,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw new Error('Failed to create payment intent');
    }
  }

  async confirmPayment(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
      return paymentIntent;
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw new Error('Failed to confirm payment');
    }
  }

  async cancelPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      const paymentIntent = await this.stripe.paymentIntents.cancel(paymentIntentId);
      return paymentIntent;
    } catch (error) {
      console.error('Error cancelling payment intent:', error);
      throw new Error('Failed to cancel payment intent');
    }
  }

  async refundPayment(
    paymentIntentId: string,
    amount?: number,
    reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer'
  ): Promise<Stripe.Refund> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      const refundParams: any = {
        payment_intent: paymentIntentId,
        reason: reason || 'requested_by_customer',
      };

      if (amount) {
        refundParams.amount = amount;
      }

      const refund = await this.stripe.refunds.create(refundParams);
      return refund;
    } catch (error) {
      console.error('Error processing refund:', error);
      throw new Error('Failed to process refund');
    }
  }

  async createCustomer(customerData: CreateCustomerData): Promise<Stripe.Customer> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      const customer = await this.stripe.customers.create({
        email: customerData.email,
        name: customerData.name,
        phone: customerData.phone,
        metadata: customerData.metadata,
      });

      return customer;
    } catch (error) {
      console.error('Error creating customer:', error);
      throw new Error('Failed to create customer');
    }
  }

  async getCustomer(customerId: string): Promise<Stripe.Customer> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      const customer = await this.stripe.customers.retrieve(customerId);
      return customer as Stripe.Customer;
    } catch (error) {
      console.error('Error getting customer:', error);
      throw new Error('Failed to get customer');
    }
  }

  async updateCustomer(
    customerId: string,
    updateData: Partial<CreateCustomerData>
  ): Promise<Stripe.Customer> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      const customer = await this.stripe.customers.update(customerId, {
        name: updateData.name,
        email: updateData.email,
        phone: updateData.phone,
        metadata: updateData.metadata,
      });

      return customer as Stripe.Customer;
    } catch (error) {
      console.error('Error updating customer:', error);
      throw new Error('Failed to update customer');
    }
  }

  async createProduct(productData: CreateProductData): Promise<{ product: Stripe.Product; price: Stripe.Price }> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      // Create product
      const product = await this.stripe.products.create({
        name: productData.name,
        description: productData.description,
        metadata: productData.metadata,
      });

      // Create price
      const price = await this.stripe.prices.create({
        product: product.id,
        unit_amount: productData.price,
        currency: productData.currency,
      });

      return { product, price };
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  }

  async getProduct(productId: string): Promise<Stripe.Product> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      const product = await this.stripe.products.retrieve(productId);
      return product;
    } catch (error) {
      console.error('Error getting product:', error);
      throw new Error('Failed to get product');
    }
  }

  async createInvoice(customerId: string, items: Array<{
    price: string;
    quantity?: number;
  }>, options?: {
    description?: string;
    metadata?: { [key: string]: any };
    dueDate?: Date;
  }): Promise<Stripe.Invoice> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      const invoice = await this.stripe.invoices.create({
        customer: customerId,
        collection_method: 'send_invoice',
        days_until_due: options?.dueDate ? Math.ceil((options.dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 30,
        description: options?.description,
        metadata: options?.metadata,
        ...items,
      });

      return invoice;
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw new Error('Failed to create invoice');
    }
  }

  async sendInvoice(invoiceId: string): Promise<Stripe.Invoice> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      const invoice = await this.stripe.invoices.sendInvoice(invoiceId);
      return invoice;
    } catch (error) {
      console.error('Error sending invoice:', error);
      throw new Error('Failed to send invoice');
    }
  }

  async getPaymentMethods(customerId: string): Promise<Stripe.PaymentMethod[]> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      const paymentMethods = await this.stripe.paymentMethods.list({
        customer: customerId,
        type: 'card',
      });

      return paymentMethods.data;
    } catch (error) {
      console.error('Error getting payment methods:', error);
      throw new Error('Failed to get payment methods');
    }
  }

  async createSetupIntent(customerId: string): Promise<Stripe.SetupIntent> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      const setupIntent = await this.stripe.setupIntents.create({
        customer: customerId,
        payment_method_types: ['card'],
      });

      return setupIntent;
    } catch (error) {
      console.error('Error creating setup intent:', error);
      throw new Error('Failed to create setup intent');
    }
  }

  async createConsultationPayment(
    clientEmail: string,
    consultantId: string,
    bookingId: string,
    amount: number,
    currency: string = 'usd',
    description?: string
  ): Promise<Stripe.PaymentIntent> {
    try {
      const paymentData: PaymentIntentData = {
        amount,
        currency,
        customerEmail: clientEmail,
        customerName: 'Consultation Client',
        metadata: {
          bookingId,
          consultantId,
          serviceType: 'consultation',
        },
        description: description || `Consultation payment for booking ${bookingId}`,
      };

      return await this.createPaymentIntent(paymentData);
    } catch (error) {
      console.error('Error creating consultation payment:', error);
      throw new Error('Failed to create consultation payment');
    }
  }

  async processRefund(
    paymentIntentId: string,
    amount?: number,
    reason: 'duplicate' | 'fraudulent' | 'requested_by_customer' = 'requested_by_customer'
  ): Promise<Stripe.Refund> {
    try {
      return await this.refundPayment(paymentIntentId, amount, reason);
    } catch (error) {
      console.error('Error processing refund:', error);
      throw new Error('Failed to process refund');
    }
  }

  async getPaymentHistory(customerId: string): Promise<Stripe.PaymentIntent[]> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      const paymentIntents = await this.stripe.paymentIntents.list({
        customer: customerId,
        limit: 50,
      });

      return paymentIntents.data;
    } catch (error) {
      console.error('Error getting payment history:', error);
      throw new Error('Failed to get payment history');
    }
  }

  async calculateApplicationFee(
    amount: number,
    feePercentage: number = 0.029, // 2.9% Stripe fee
    fixedFee: number = 30 // $0.30 fixed fee
  ): Promise<{ subtotal: number; fee: number; total: number }> {
    const fee = Math.round(amount * feePercentage) + fixedFee;
    const total = amount + fee;

    return {
      subtotal: amount,
      fee,
      total,
    };
  }

  async createWebhookEndpoint(url: string, events: string[]): Promise<Stripe.WebhookEndpoint> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      const webhookEndpoint = await this.stripe.webhookEndpoints.create({
        url,
        enabled_events: events,
        description: 'Consultation Booking Webhook',
      });

      return webhookEndpoint;
    } catch (error) {
      console.error('Error creating webhook endpoint:', error);
      throw new Error('Failed to create webhook endpoint');
    }
  }

  async constructEvent(payload: string | Buffer, signature: string, webhookSecret: string): Promise<Stripe.Event> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      return this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (error) {
      console.error('Error constructing webhook event:', error);
      throw new Error('Failed to construct webhook event');
    }
  }

  async handleWebhookEvent(event: Stripe.Event): Promise<void> {
    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
          break;
        case 'payment_intent.payment_failed':
          await this.handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
          break;
        case 'invoice.payment_succeeded':
          await this.handleInvoicePaid(event.data.object as Stripe.Invoice);
          break;
        case 'invoice.payment_failed':
          await this.handleInvoiceFailed(event.data.object as Stripe.Invoice);
          break;
        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
    } catch (error) {
      console.error('Error handling webhook event:', error);
      throw error;
    }
  }

  private async handlePaymentSucceeded(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    console.log('Payment succeeded:', paymentIntent.id);
    // Update booking status, send notifications, etc.
  }

  private async handlePaymentFailed(paymentIntent: Stripe.PaymentIntent): Promise<void> {
    console.log('Payment failed:', paymentIntent.id);
    // Update booking status, send notifications, etc.
  }

  private async handleInvoicePaid(invoice: Stripe.Invoice): Promise<void> {
    console.log('Invoice paid:', invoice.id);
    // Update booking status, send notifications, etc.
  }

  private async handleInvoiceFailed(invoice: Stripe.Invoice): Promise<void> {
    console.log('Invoice failed:', invoice.id);
    // Update booking status, send notifications, etc.
  }
}
