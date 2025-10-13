import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, emailTemplates } from '@/lib/email';

// Force dynamic rendering for this API route
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be less than 100 characters' },
        { status: 400 }
      );
    }

    if (subject.length > 200) {
      return NextResponse.json(
        { error: 'Subject must be less than 200 characters' },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: 'Message must be less than 2000 characters' },
        { status: 400 }
      );
    }

    // Prepare email data
    const emailData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    };

    // Generate email template
    const emailTemplate = emailTemplates.contactForm(emailData);

    // Send email to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@ecommerce.com';
    const emailResult = await sendEmail({
      to: adminEmail,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      text: emailTemplate.text,
    });

    if (!emailResult.success) {
      console.error('Failed to send contact form email:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    // Send confirmation email to user
    const confirmationEmail = {
      subject: 'Thank you for contacting us',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #28a745; padding-bottom: 10px;">
            Thank you for contacting us!
          </h2>
          
          <div style="background-color: #d4edda; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p style="color: #155724; margin: 0;">
              Hi ${emailData.name},
            </p>
            <p style="color: #155724; margin: 10px 0 0 0;">
              Thank you for reaching out to us. We have received your message and will get back to you within 24 hours.
            </p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Message:</h3>
            <p><strong>Subject:</strong> ${emailData.subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
              ${emailData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>Best regards,<br>The E-Commerce Team</p>
            <p>If you have any urgent questions, please call us at +1 (555) 123-4567</p>
          </div>
        </div>
      `,
      text: `
Thank you for contacting us!

Hi ${emailData.name},

Thank you for reaching out to us. We have received your message and will get back to you within 24 hours.

Your Message:
Subject: ${emailData.subject}
Message: ${emailData.message}

Best regards,
The E-Commerce Team

If you have any urgent questions, please call us at +1 (555) 123-4567
      `,
    };

    // Send confirmation email (optional - don't fail if this fails)
    try {
      await sendEmail({
        to: emailData.email,
        subject: confirmationEmail.subject,
        html: confirmationEmail.html,
        text: confirmationEmail.text,
      });
    } catch (confirmationError) {
      console.warn('Failed to send confirmation email:', confirmationError);
      // Don't fail the main request if confirmation email fails
    }

    return NextResponse.json({
      message: 'Message sent successfully! We will get back to you within 24 hours.',
      success: true,
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
