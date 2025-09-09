import nodemailer from 'nodemailer';

// In a production environment, you would use a proper email service like SendGrid, Mailgun, etc.
// For development, we'll use a test account from Ethereal Email
let transporter: nodemailer.Transporter;

async function createTransporter() {
  if (transporter) {
    return transporter;
  }

  // For production
  if (process.env.EMAIL_SERVER && process.env.EMAIL_FROM) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT) || 587,
      secure: process.env.EMAIL_SERVER_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });
    
    // Verify connection configuration
    try {
      await transporter.verify();
      console.log('SMTP connection verified successfully');
    } catch (error) {
      console.error('SMTP connection verification failed:', error);
    }
    
    return transporter;
  }

  // For development - create a test account
  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log('Created test email account:', testAccount.user);
    
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    
    return transporter;
  } catch (error) {
    console.error('Failed to create test email account:', error);
    throw error;
  }
}

export async function sendVerificationEmail(email: string, otp: string) {
  try {
    const transport = await createTransporter();
    
    const mailOptions = {
      from: 'Daddy\'s AI <daddysartificialintelligence@gmail.com>', // Sender name and email
      to: email, // Recipient email
      subject: 'Confirm Your Daddy\'s AI Registration', // Email subject
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
          <style>
            @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 100% 0; }
        }
        @keyframes floatingBubbles {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes floatingElements {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
          100% { transform: translateY(0) translateX(0); }
        }
        @keyframes gridAnimation {
          0% { opacity: 0.2; }
          50% { opacity: 0.4; }
          100% { opacity: 0.2; }
        }
        @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes glowPulse {
            0% { text-shadow: 0 0 5px rgba(249, 115, 22, 0.3), 0 0 10px rgba(249, 115, 22, 0.2), 0 0 15px rgba(249, 115, 22, 0.1); }
            50% { text-shadow: 0 0 10px rgba(249, 115, 22, 0.5), 0 0 20px rgba(249, 115, 22, 0.3), 0 0 30px rgba(249, 115, 22, 0.2); }
            100% { text-shadow: 0 0 5px rgba(249, 115, 22, 0.3), 0 0 10px rgba(249, 115, 22, 0.2), 0 0 15px rgba(249, 115, 22, 0.1); }
          }
            body { margin: 0; padding: 0; font-family: 'Poppins', sans-serif; }
            .animated-gradient {
              background: linear-gradient(270deg, #f97316, #fb923c, #fdba74);
              background-size: 600% 600%;
              animation: gradientShift 8s ease infinite;
              position: relative;
              overflow: hidden;
            }
            .bubble {
              position: absolute;
              bottom: -20px;
              background: rgba(255, 255, 255, 0.15);
              border-radius: 50%;
              animation: floatingBubbles 8s infinite ease-in;
            }
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #1a1a1a; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(145deg, #2a2a2a, #1a1a1a); border-radius: 16px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.25); margin-top: 40px; margin-bottom: 40px;">
            <!-- Header Banner with Animated Background -->
            <div class="animated-gradient" style="padding: 30px 0; text-align: center; background: linear-gradient(270deg, #f97316, #fb923c, #fdba74); background-size: 600% 600%; animation: gradientMove 8s ease infinite; position: relative; overflow: hidden;">
              <!-- Animated Bubbles -->
              <div class="bubble" style="left: 10%; width: 15px; height: 15px; animation-delay: 0s;"></div>
              <div class="bubble" style="left: 20%; width: 25px; height: 25px; animation-delay: 1s;"></div>
              <div class="bubble" style="left: 40%; width: 10px; height: 10px; animation-delay: 2s;"></div>
              <div class="bubble" style="left: 60%; width: 30px; height: 30px; animation-delay: 3s;"></div>
              <div class="bubble" style="left: 80%; width: 20px; height: 20px; animation-delay: 4s;"></div>
              
              <!-- Additional Floating Elements -->
              <div style="position: absolute; top: 15%; left: 15%; width: 8px; height: 8px; background: rgba(255, 255, 255, 0.3); border-radius: 50%; animation: floatingElements 10s infinite ease-in-out;"></div>
              <div style="position: absolute; top: 25%; left: 35%; width: 12px; height: 12px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; animation: floatingElements 8s infinite ease-in-out; animation-delay: 1s;"></div>
              <div style="position: absolute; top: 10%; left: 65%; width: 10px; height: 10px; background: rgba(255, 255, 255, 0.25); border-radius: 50%; animation: floatingElements 12s infinite ease-in-out; animation-delay: 2s;"></div>
              <div style="position: absolute; top: 30%; left: 85%; width: 6px; height: 6px; background: rgba(255, 255, 255, 0.35); border-radius: 50%; animation: floatingElements 9s infinite ease-in-out; animation-delay: 3s;"></div>
              
              <!-- Logo -->
              <div style="margin-bottom: 15px; animation: pulse 2s infinite ease-in-out, shine 3s infinite;" class="shine-effect">
                <img src="https://www.optionforbeginner.com/logos/android-chrome-512x512.png" alt="DaddysAI Logo" width="80" height="80" style="animation: glowPulse 3s infinite alternate;">
              </div>
              
              <h1 style="margin: 0; font-weight: 700; font-size: 28px; color: #ffffff; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Verify Your Email</h1>
              <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">One step away from joining Daddy's AI</p>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 40px; animation: fadeIn 0.8s ease-out forwards;">
              <!-- Greeting -->
              <div style="animation: slideUp 0.5s ease-out forwards;">
                <p style="font-size: 18px; margin-bottom: 25px;">
                  Hi <span style="font-weight: 600; color: #f97316;">${email.split('@')[0]}</span>,
                </p>
                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px; color: #e0e0e0;">
                  Thank you for registering with <strong>Daddy's AI</strong>. To complete your registration, please use the verification code below:
                </p>
              </div>
              
              <!-- OTP Display -->
              <div style="text-align: center; margin: 30px 0; animation: pulse 2s infinite ease-in-out;">
                <div style="background: linear-gradient(145deg, #2d2d2d, #333333); padding: 20px; border-radius: 12px; border-left: 4px solid #f97316; display: inline-block; box-shadow: 0 8px 20px rgba(0,0,0,0.15);">
                  <h2 style="margin: 0; font-size: 36px; letter-spacing: 8px; font-weight: 700; background: linear-gradient(90deg, #f97316, #fb923c); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 2px 10px rgba(249, 115, 22, 0.3), 0 0 20px rgba(249, 115, 22, 0.2), 0 0 30px rgba(249, 115, 22, 0.1); animation: pulse 2s infinite ease-in-out, glowPulse 3s infinite alternate;">${otp}</h2>
                </div>
              </div>
              
              <!-- Instructions -->
              <div style="background: rgba(249, 115, 22, 0.1); border-radius: 12px; padding: 20px; margin: 30px 0; border: 1px solid rgba(249, 115, 22, 0.2); animation: slideUp 0.7s ease-out forwards;">
                <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #e0e0e0;">
                  <strong style="color: #f97316;">⚠️ Important:</strong> This code will expire in <strong>10 minutes</strong>. For security reasons, please do not share this code with anyone.
                </p>
              </div>
              
              <!-- Additional Info -->
              <p style="font-size: 15px; line-height: 1.6; color: #b0b0b0; margin-top: 30px; animation: slideUp 0.9s ease-out forwards;">
                If you did not request this verification, please ignore this email or contact our support team immediately.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background: #222222; padding: 30px; text-align: center; border-top: 1px solid #333333;">
              <p style="margin: 0; font-size: 15px; color: #b0b0b0;">
                Best regards,<br>
                <strong style="color: #f97316;">Team Daddy's AI</strong>
              </p>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #333333; font-size: 13px; color: #888888;">
                <p style="margin: 0;">
                  This is an automated message. Please do not reply directly to this email.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transport.sendMail(mailOptions);
    
    // Log the URL for development environments
    if (!process.env.EMAIL_SERVER) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return info;
  } catch (error) {
    console.error('Failed to send verification email:', error);
    throw error;
  }
}

// Function to send a welcome email after verification
export async function sendWelcomeEmail(email: string, username: string) {
  try {
    const transport = await createTransporter();
    
    const mailOptions = {
      from: 'Daddy\'s AI <daddysartificialintelligence@gmail.com>',
      to: email,
      subject: 'Welcome to Daddy\'s AI!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Daddy's AI</title>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
          <style>
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { transform: translateY(20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0px); }
            }
            @keyframes pulse {
              0% { transform: scale(1); box-shadow: 0 5px 15px rgba(249, 115, 22, 0.2); }
              50% { transform: scale(1.05); box-shadow: 0 5px 15px rgba(249, 115, 22, 0.4); }
              100% { transform: scale(1); box-shadow: 0 5px 15px rgba(249, 115, 22, 0.2); }
            }
            @keyframes gradientBg {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes particleMove {
              0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 0.5; }
              100% { transform: translateY(-120px) translateX(20px) rotate(360deg); opacity: 0; }
            }
            @keyframes shine {
              0% { transform: translateX(-100%) rotate(45deg); }
              100% { transform: translateX(100%) rotate(45deg); }
            }
            body { margin: 0; padding: 0; font-family: 'Poppins', sans-serif; }
            .button-hover:hover {
              transform: translateY(-3px);
              box-shadow: 0 10px 20px rgba(249, 115, 22, 0.4);
              transition: all 0.3s ease;
            }
            .particle {
              position: absolute;
              bottom: 0;
              border-radius: 50%;
              background: rgba(255, 255, 255, 0.2);
              animation: particleMove 15s infinite ease-out;
            }
            .shine-effect {
              position: relative;
              overflow: hidden;
            }
            .shine-effect:after {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 30%;
              height: 100%;
              background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
              transform: translateX(-100%) rotate(45deg);
              animation: shine 3s infinite;
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #1a1a1a; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(145deg, #2a2a2a, #1a1a1a); border-radius: 16px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.25); margin-top: 40px; margin-bottom: 40px;">
t            <!-- Header Banner with Animation -->
            <div style="padding: 40px 0; text-align: center; background: linear-gradient(270deg, #f97316, #fb923c, #fdba74); background-size: 600% 600%; animation: gradientMove 8s ease infinite; position: relative; overflow: hidden;">
              <!-- Animated Particles -->
              <div class="particle" style="left: 10%; width: 8px; height: 8px; animation-delay: 0s;"></div>
              <div class="particle" style="left: 20%; width: 12px; height: 12px; animation-delay: 2s;"></div>
              <div class="particle" style="left: 35%; width: 10px; height: 10px; animation-delay: 4s;"></div>
              <div class="particle" style="left: 50%; width: 14px; height: 14px; animation-delay: 1s;"></div>
              <div class="particle" style="left: 65%; width: 6px; height: 6px; animation-delay: 3s;"></div>
              <div class="particle" style="left: 80%; width: 10px; height: 10px; animation-delay: 5s;"></div>
              <div class="particle" style="left: 90%; width: 8px; height: 8px; animation-delay: 2.5s;"></div>
              
              <!-- Grid Elements for Background -->
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.1; background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cGF0aCBkPSJNMTIuNSAxMmg1djVoLTV6TTIyLjUgMTJoNXY1aC01ek0zMi41IDEyaDV2NWgtNXpNMTIuNSAyMmg1djVoLTV6TTIyLjUgMjJoNXY1aC01ek0zMi41IDIyaDV2NWgtNXpNMTIuNSAzMmg1djVoLTV6TTIyLjUgMzJoNXY1aC01ek0zMi41IDMyaDV2NWgtNXoiIGZpbGw9IiNmZmYiLz48L3N2Zz4='); animation: gridAnimation 4s infinite ease-in-out;"></div>
              
              <!-- Additional Floating Elements -->
              <div style="position: absolute; top: 15%; left: 15%; width: 10px; height: 10px; background: rgba(255, 255, 255, 0.3); border-radius: 50%; animation: floatingElements 10s infinite ease-in-out;"></div>
              <div style="position: absolute; top: 25%; left: 35%; width: 15px; height: 15px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; animation: floatingElements 8s infinite ease-in-out; animation-delay: 1s;"></div>
              <div style="position: absolute; top: 10%; left: 65%; width: 12px; height: 12px; background: rgba(255, 255, 255, 0.25); border-radius: 50%; animation: floatingElements 12s infinite ease-in-out; animation-delay: 2s;"></div>
              <div style="position: absolute; top: 30%; left: 85%; width: 8px; height: 8px; background: rgba(255, 255, 255, 0.35); border-radius: 50%; animation: floatingElements 9s infinite ease-in-out; animation-delay: 3s;"></div>
              
              <div style="animation: float 6s ease-in-out infinite; position: relative; z-index: 2;">
                  <div class="shine-effect" style="display: inline-block; border-radius: 50%; margin-bottom: 15px;">
                    <img src="https://www.optionforbeginner.com/logos/android-chrome-512x512.png" alt="Daddy's AI" style="width: 80px; height: 80px; border-radius: 50%; border: 3px solid white; box-shadow: 0 5px 15px rgba(0,0,0,0.2); animation: glowPulse 3s infinite ease-in-out;">
                  </div>
                <h1 style="margin: 0; font-weight: 700; font-size: 32px; color: #ffffff; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Welcome to Daddy's AI!</h1>
                <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Your journey begins now</p>
              </div>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 40px; animation: fadeIn 0.8s ease-out forwards;">
              <!-- Greeting -->
              <div style="animation: slideUp 0.5s ease-out forwards;">
                <p style="font-size: 18px; margin-bottom: 25px;">
                  Hi <span style="font-weight: 600; color: #f97316;">${username}</span>,
                </p>
                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px; color: #e0e0e0;">
                  Your account has been successfully verified and is now ready to use. We're thrilled to have you join our community!
                </p>
              </div>
              
              <!-- Feature Highlights -->
              <div style="margin: 30px 0; background: linear-gradient(145deg, #2d2d2d, #333333); border-radius: 12px; padding: 25px; box-shadow: 0 8px 20px rgba(0,0,0,0.15); animation: slideUp 0.7s ease-out forwards;">
                <h3 style="margin-top: 0; color: #f97316; font-size: 18px; margin-bottom: 15px;">What you can do with Daddy's AI:</h3>
                <ul style="padding-left: 20px; margin: 0; color: #e0e0e0;">
                  <li style="margin-bottom: 10px;">Access powerful AI-driven trading insights</li>
                  <li style="margin-bottom: 10px;">Analyze market trends with advanced tools</li>
                  <li style="margin-bottom: 10px;">Connect with a community of like-minded traders</li>
                  <li style="margin-bottom: 0;">Get personalized recommendations for your portfolio</li>
                </ul>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 35px 0; animation: pulse 2s infinite ease-in-out;">
                <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard" class="button-hover" style="background: linear-gradient(90deg, #f97316, #fb923c); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(249, 115, 22, 0.3), 0 0 0 rgba(249, 115, 22, 0); position: relative; overflow: hidden;">
                  <span style="position: relative; z-index: 2;">Explore Your Dashboard</span>
                  <span style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(90deg, #fb923c, #f97316); opacity: 0; transition: opacity 0.3s ease; z-index: 1;"></span>
                </a>
                <style>
                  a.button-hover:hover {
                    box-shadow: 0 6px 15px rgba(249, 115, 22, 0.4), 0 0 20px rgba(249, 115, 22, 0.2) !important;
                    transform: translateY(-2px) !important;
                  }
                  a.button-hover:hover span:nth-child(2) {
                    opacity: 1 !important;
                  }
                </style>
              </div>
              
              <!-- Additional Info -->
              <p style="font-size: 15px; line-height: 1.6; color: #b0b0b0; margin-top: 30px; animation: slideUp 0.9s ease-out forwards;">
                If you have any questions or need assistance, our support team is always here to help. Simply reply to this email or contact us through the support section in your dashboard.
              </p>
            </div>
            
            <!-- Footer -->
            <div style="background: #222222; padding: 30px; text-align: center; border-top: 1px solid #333333;">
              <p style="margin: 0; font-size: 15px; color: #b0b0b0;">
                Best regards,<br>
                <strong style="color: #f97316;">Team Daddy's AI</strong>
              </p>
              
              <!-- Social Media Links (if applicable) -->
              <div style="margin: 20px 0;">
                <a href="#" style="display: inline-block; margin: 0 10px; text-decoration: none;" target="_blank">
                  <img src="https://i.imgur.com/twitter-icon.png" alt="Twitter" style="width: 24px; height: 24px;" onerror="this.style.display='none'">
                </a>
                <a href="#" style="display: inline-block; margin: 0 10px; text-decoration: none;" target="_blank">
                  <img src="https://i.imgur.com/linkedin-icon.png" alt="LinkedIn" style="width: 24px; height: 24px;" onerror="this.style.display='none'">
                </a>
              </div>
              
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #333333; font-size: 13px; color: #888888;">
                <p style="margin: 0;">
                  This is an automated message. Please do not reply directly to this email.
                </p>
                <p style="margin: 10px 0 0;">
                  © ${new Date().getFullYear()} Daddy's AI. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transport.sendMail(mailOptions);
    
    // Log the URL for development environments
    if (!process.env.EMAIL_SERVER) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return info;
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    throw error;
  }
}

// Function to send a password reset email
export async function sendPasswordResetEmail(email: string, resetUrl: string) {
  try {
    const transport = await createTransporter();
    
    const mailOptions = {
      from: 'Daddy\'s AI <daddysartificialintelligence@gmail.com>',
      to: email,
      subject: 'Reset Your Daddy\'s AI Password',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
          <style>
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from { transform: translateY(20px); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
            @keyframes pulse {
              0% { transform: scale(1); box-shadow: 0 5px 15px rgba(249, 115, 22, 0.2); }
              50% { transform: scale(1.05); box-shadow: 0 5px 15px rgba(249, 115, 22, 0.4); }
              100% { transform: scale(1); box-shadow: 0 5px 15px rgba(249, 115, 22, 0.2); }
            }
            @keyframes borderPulse {
              0% { border-color: rgba(249, 115, 22, 0.4); }
              50% { border-color: rgba(249, 115, 22, 0.8); }
              100% { border-color: rgba(249, 115, 22, 0.4); }
            }
            @keyframes highlight {
              0% { background-position: -100% 0; }
              100% { background-position: 200% 0; }
            }
            @keyframes floatGrid {
              0% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
              100% { transform: translateY(0); }
            }
            @keyframes glowPulse {
              0% { box-shadow: 0 0 5px rgba(249, 115, 22, 0.5); }
              50% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.8); }
              100% { box-shadow: 0 0 5px rgba(249, 115, 22, 0.5); }
            }
            body { margin: 0; padding: 0; font-family: 'Poppins', sans-serif; }
            .button-hover:hover {
              transform: translateY(-3px);
              box-shadow: 0 10px 20px rgba(249, 115, 22, 0.4);
              transition: all 0.3s ease;
            }
            .highlight-text {
              background: linear-gradient(90deg, rgba(249, 115, 22, 0), rgba(249, 115, 22, 0.3), rgba(249, 115, 22, 0));
              background-size: 200% 100%;
              animation: highlight 2s ease-in-out infinite;
            }
            .grid-item {
              position: absolute;
              width: 20px;
              height: 20px;
              border-radius: 4px;
              background: rgba(249, 115, 22, 0.15);
              animation: floatGrid 8s infinite ease-in-out;
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #1a1a1a; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(145deg, #2a2a2a, #1a1a1a); border-radius: 16px; overflow: hidden; box-shadow: 0 12px 40px rgba(0,0,0,0.25); margin-top: 40px; margin-bottom: 40px;">
            <!-- Header Banner with Security Pattern Background -->
            <div style="padding: 40px 0; text-align: center; background: linear-gradient(270deg, #0f172a, #1e293b, #334155); background-size: 600% 600%; animation: gradientMove 8s ease infinite; position: relative; overflow: hidden;">
              <!-- Animated Grid Elements -->
              <div class="grid-item" style="left: 10%; top: 20%; animation-delay: 0s;"></div>
              <div class="grid-item" style="left: 25%; top: 40%; animation-delay: 1s;"></div>
              <div class="grid-item" style="left: 40%; top: 15%; animation-delay: 2s;"></div>
              <div class="grid-item" style="left: 55%; top: 35%; animation-delay: 1.5s;"></div>
              <div class="grid-item" style="left: 70%; top: 25%; animation-delay: 0.5s;"></div>
              <div class="grid-item" style="left: 85%; top: 45%; animation-delay: 2.5s;"></div>
              
              <!-- Security Pattern Background -->
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; opacity: 0.05; background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cGF0aCBkPSJNMjUgMTBMMTAgMjVsMTUgMTUgMTUtMTV6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjI1IiBjeT0iMjUiIHI9IjgiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIi8+PC9zdmc+'); animation: gridAnimation 20s infinite linear;"></div>
              
              <!-- Additional Floating Elements -->
              <div style="position: absolute; top: 15%; left: 15%; width: 6px; height: 6px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; animation: floatingElements 10s infinite ease-in-out;"></div>
              <div style="position: absolute; top: 25%; left: 35%; width: 8px; height: 8px; background: rgba(255, 255, 255, 0.15); border-radius: 50%; animation: floatingElements 8s infinite ease-in-out; animation-delay: 1s;"></div>
              <div style="position: absolute; top: 10%; left: 65%; width: 5px; height: 5px; background: rgba(255, 255, 255, 0.25); border-radius: 50%; animation: floatingElements 12s infinite ease-in-out; animation-delay: 2s;"></div>
              <div style="position: absolute; top: 30%; left: 85%; width: 7px; height: 7px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; animation: floatingElements 9s infinite ease-in-out; animation-delay: 3s;"></div>
              
              <!-- Logo and Lock Icon -->
              <div style="position: relative; display: inline-block; margin-bottom: 15px; animation: pulse 2s infinite ease-in-out, shine 3s infinite;" class="shine-effect">
                <div style="width: 70px; height: 70px; background: linear-gradient(135deg, #f97316, #fb923c); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 5px 15px rgba(249, 115, 22, 0.3); animation: glowPulse 3s infinite ease-in-out;">
                  <img src="https://www.optionforbeginner.com/logos/android-chrome-512x512.png" alt="Daddy's AI Logo" style="width: 40px; height: 40px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); border-radius: 50%; border: 2px solid white;">
                  
                  <!-- Lock Icon Overlay -->
                  <div style="position: absolute; bottom: -10px; right: -10px; width: 30px; height: 30px; background: #222; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #f97316;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                </div>
              </div>
              
              <h1 style="margin: 0; font-weight: 700; font-size: 28px; color: #ffffff; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">Reset Your Password</h1>
              <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.7;">Secure your account in just a few clicks</p>
            </div>
            
            <!-- Main Content -->
            <div style="padding: 40px; animation: fadeIn 0.8s ease-out forwards;">
              <!-- Greeting -->
              <div style="animation: slideUp 0.5s ease-out forwards;">
                <p style="font-size: 18px; margin-bottom: 25px;">
                  Hi <span style="font-weight: 600; color: #f97316;">${email.split('@')[0]}</span>,
                </p>
                <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px; color: #e0e0e0;">
                  We received a request to reset the password for your <strong>Daddy's AI</strong> account. To proceed with the password reset, please click the button below.
                </p>
              </div>
              
              <!-- Timer Notification -->
              <div class="highlight-text" style="text-align: center; margin: 30px 0; padding: 15px; border-radius: 8px; animation: borderPulse 2s infinite ease-in-out;">
                <p style="margin: 0; font-size: 15px; color: #f97316;">
                  <strong>⏱️ This link will expire in 1 hour</strong>
                </p>
              </div>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 35px 0; animation: pulse 2s infinite ease-in-out;">
                <a href="${resetUrl}" class="button-hover" style="background: linear-gradient(90deg, #f97316, #fb923c); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; font-size: 16px; transition: all 0.3s ease; box-shadow: 0 5px 15px rgba(249, 115, 22, 0.3), 0 0 0 rgba(249, 115, 22, 0); position: relative; overflow: hidden;">
                  <span style="position: relative; z-index: 2;">Reset Password</span>
                  <span style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(90deg, #fb923c, #f97316); opacity: 0; transition: opacity 0.3s ease; z-index: 1;"></span>
                </a>
                <style>
                  a.button-hover:hover {
                    box-shadow: 0 6px 15px rgba(249, 115, 22, 0.4), 0 0 20px rgba(249, 115, 22, 0.2) !important;
                    transform: translateY(-2px) !important;
                  }
                  a.button-hover:hover span:nth-child(2) {
                    opacity: 1 !important;
                  }
                </style>
              </div>
              
              <!-- Alternative Link -->
              <div style="background: rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 20px; margin: 30px 0; border: 1px solid rgba(255, 255, 255, 0.1); animation: slideUp 0.7s ease-out forwards;">
                <p style="margin: 0 0 10px; font-size: 14px; color: #b0b0b0;">
                  If the button doesn't work, copy and paste this URL into your browser:
                </p>
                <p style="margin: 0; font-size: 14px; word-break: break-all; color: #f97316; background: rgba(249, 115, 22, 0.1); padding: 10px; border-radius: 6px; border-left: 3px solid #f97316;">
                  ${resetUrl}
                </p>
              </div>
              
              <!-- Security Notice -->
              <div style="animation: slideUp 0.9s ease-out forwards;">
                <p style="font-size: 15px; line-height: 1.6; color: #b0b0b0; margin-top: 30px;">
                  <strong style="color: #e0e0e0;">Security Tip:</strong> If you didn't request a password reset, please ignore this email or contact our support team immediately. Your account security is important to us.
                </p>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #222222; padding: 30px; text-align: center; border-top: 1px solid #333333;">
              <p style="margin: 0; font-size: 15px; color: #b0b0b0;">
                Best regards,<br>
                <strong style="color: #f97316;">Team Daddy's AI</strong>
              </p>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #333333; font-size: 13px; color: #888888;">
                <p style="margin: 0;">
                  This is an automated message. Please do not reply directly to this email.
                </p>
                <p style="margin: 10px 0 0;">
                  © ${new Date().getFullYear()} Daddy's AI. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const info = await transport.sendMail(mailOptions);
    
    // Log the URL for development environments
    if (!process.env.EMAIL_SERVER) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return info;
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    throw error;
  }
}