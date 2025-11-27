
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid email format'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Log the submission
    console.log('Contact form submission:', {
      name: data.name,
      email: data.email,
      company: data.company,
      service: data.service,
      message: data.message,
      timestamp: new Date().toISOString()
    });

    // Send email notification using Resend
    if (env.RESEND_API_KEY) {
      try {
        const emailResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'SummitPeak AI <onboarding@resend.dev>', // Resend's test email (change after domain verification)
            to: 'ljl.swun@gmail.com', // Your email address
            reply_to: data.email, // Allow direct reply to customer
            subject: `New Contact Form: ${data.name} - ${data.service}`,
            html: `
              <!DOCTYPE html>
              <html>
              <head>
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                  .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
                  .field { margin-bottom: 20px; }
                  .label { font-weight: bold; color: #667eea; margin-bottom: 5px; }
                  .value { background: white; padding: 12px; border-radius: 4px; border-left: 3px solid #667eea; }
                  .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h2>🚀 New Contact Form Submission</h2>
                  </div>
                  <div class="content">
                    <div class="field">
                      <div class="label">👤 Name:</div>
                      <div class="value">${data.name}</div>
                    </div>
                    
                    <div class="field">
                      <div class="label">📧 Email:</div>
                      <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
                    </div>
                    
                    ${data.company ? `
                    <div class="field">
                      <div class="label">🏢 Company:</div>
                      <div class="value">${data.company}</div>
                    </div>
                    ` : ''}
                    
                    <div class="field">
                      <div class="label">🎯 Service Interest:</div>
                      <div class="value">${data.service.toUpperCase()}</div>
                    </div>
                    
                    <div class="field">
                      <div class="label">💬 Message:</div>
                      <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
                    </div>
                    
                    <div class="footer">
                      <p>Received at: ${new Date().toLocaleString()}</p>
                      <p>Reply directly to this email to contact ${data.name}</p>
                    </div>
                  </div>
                </div>
              </body>
              </html>
            `,
          }),
        });
        
        const emailResult = await emailResponse.json();
        
        if (!emailResponse.ok) {
          console.error('Resend API error:', emailResult);
          throw new Error('Failed to send email notification');
        }
        
        console.log('Email sent successfully:', emailResult.id);
        
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Continue even if email fails - at least we logged the submission
      }
    } else {
      console.warn('RESEND_API_KEY not configured - email not sent');
    }

    // Return success response
    return new Response(JSON.stringify({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    return new Response(JSON.stringify({
      success: false,
      error: 'Failed to process your request. Please try again.'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

// Handle OPTIONS request for CORS
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
