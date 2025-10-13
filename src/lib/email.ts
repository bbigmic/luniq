import nodemailer from 'nodemailer';

// Email configuration
const emailConfig = {
  host: process.env.SMTP_SERVER || 's134.cyber-folks.pl',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_EMAIL || 'test@feliztradeltd.store',
    pass: process.env.SMTP_PASSWORD || 'Ecommerce!@3456',
  },
};

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter(emailConfig);
};

// Email templates
export const emailTemplates = {
  contactForm: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => ({
    subject: `New Contact Form Submission: ${data.subject}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #007bff; margin-top: 0;">Contact Details</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
        </div>
        
        <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h3 style="color: #333; margin-top: 0;">Message</h3>
          <p style="line-height: 1.6; color: #555;">${data.message.replace(/\n/g, '<br>')}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
          <p>This email was sent from the contact form on your e-commerce website.</p>
          <p>Sent at: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `,
    text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
Sent at: ${new Date().toLocaleString()}
    `,
  }),

  orderConfirmation: (data: {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    total: string;
    items: Array<{ name: string; quantity: number; price: string }>;
  }) => ({
    subject: `Order Confirmation - ${data.orderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #28a745; padding-bottom: 10px;">
          Order Confirmation
        </h2>
        
        <div style="background-color: #d4edda; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #155724; margin-top: 0;">Thank you for your order!</h3>
          <p style="color: #155724; margin-bottom: 0;">Order Number: <strong>${data.orderNumber}</strong></p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Order Details</h3>
          <p><strong>Customer:</strong> ${data.customerName}</p>
          <p><strong>Email:</strong> ${data.customerEmail}</p>
          <p><strong>Total:</strong> $${data.total}</p>
        </div>
        
        <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h3 style="color: #333; margin-top: 0;">Order Items</h3>
          ${data.items.map(item => `
            <div style="padding: 10px 0; border-bottom: 1px solid #eee;">
              <strong>${item.name}</strong><br>
              Quantity: ${item.quantity} | Price: $${item.price}
            </div>
          `).join('')}
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
          <p>Thank you for shopping with us!</p>
          <p>Order placed at: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `,
    text: `
Order Confirmation

Thank you for your order!

Order Number: ${data.orderNumber}
Customer: ${data.customerName}
Email: ${data.customerEmail}
Total: $${data.total}

Order Items:
${data.items.map(item => `- ${item.name} (Qty: ${item.quantity}) - $${item.price}`).join('\n')}

---
Order placed at: ${new Date().toLocaleString()}
    `,
  }),
};

// Send email function
export const sendEmail = async (options: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"E-Commerce Platform" <${emailConfig.auth.user}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Test email connection
export const testEmailConnection = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('Email server connection verified');
    return { success: true, message: 'Email server connection verified' };
  } catch (error) {
    console.error('Email server connection failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Connection failed' 
    };
  }
};
