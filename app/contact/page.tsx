import Link from 'next/link';

export const metadata = {
  title: "Contact Us | Daddy's AI",
  description: "Get in touch with the Daddy's AI team for support, partnership inquiries, or general questions about our AI-powered trading platform."
};

export default function ContactPage() {
  return (
    <div className="bg-[#050714] min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="mb-8">
          <Link href="/" className="text-orange-500 hover:text-orange-600 transition-colors">
            ← Back to Home
          </Link>
        </div>
        
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions or need assistance? We're here to help.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-[#0a0d1a] to-[#111827] p-8 rounded-2xl border border-orange-500/20 order-2 lg:order-1">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="John Doe" 
                    className="px-4 py-3 border border-orange-500/30 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500/50 bg-[#0a0d1a]/70 text-gray-300 placeholder-gray-500 transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="john@example.com" 
                    className="px-4 py-3 border border-orange-500/30 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500/50 bg-[#0a0d1a]/70 text-gray-300 placeholder-gray-500 transition-all duration-300"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-300">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  placeholder="How can we help you?" 
                  className="px-4 py-3 border border-orange-500/30 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500/50 bg-[#0a0d1a]/70 text-gray-300 placeholder-gray-500 transition-all duration-300"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">Your Message</label>
                <textarea 
                  id="message" 
                  rows={6} 
                  placeholder="Please provide details about your inquiry..." 
                  className="px-4 py-3 border border-orange-500/30 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500/50 bg-[#0a0d1a]/70 text-gray-300 placeholder-gray-500 transition-all duration-300 resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:from-orange-600 hover:to-amber-700 border-none py-3.5 rounded-lg font-medium text-base transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 hover:scale-[1.02]"
              >
                Send Message
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="order-1 lg:order-2">
            <div className="bg-gradient-to-br from-[#0a0d1a] to-[#111827] p-8 rounded-2xl border border-orange-500/20 mb-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Email Us</h3>
                    <p className="text-gray-400 mb-2">For general inquiries:</p>
                    <a href="mailto:info@daddysai.com" className="text-orange-500 hover:text-orange-400 transition-colors">info@daddysai.com</a>
                    <p className="text-gray-400 mt-2 mb-2">For support:</p>
                    <a href="mailto:support@daddysai.com" className="text-orange-500 hover:text-orange-400 transition-colors">support@daddysai.com</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Call Us</h3>
                    <p className="text-gray-400 mb-2">Customer Support:</p>
                    <a href="tel:+919876543210" className="text-orange-500 hover:text-orange-400 transition-colors">+91 98765 43210</a>
                    <p className="text-gray-400 mt-2 mb-2">Business Hours:</p>
                    <p className="text-gray-300">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Office Location</h3>
                    <p className="text-gray-400 mb-2">Headquarters:</p>
                    <p className="text-gray-300">
                      123 Financial District<br />
                      Bandra Kurla Complex<br />
                      Mumbai, Maharashtra 400051<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#0a0d1a] to-[#111827] p-8 rounded-2xl border border-orange-500/20">
              <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
              <p className="text-gray-400 mb-6">
                Follow us on social media for the latest updates, market insights, and more.
              </p>
              
              <div className="flex gap-4">
                {[
                  { name: "Twitter", icon: "X", url: "https://twitter.com" },
                  { name: "LinkedIn", icon: "in", url: "https://linkedin.com" },
                  { name: "Facebook", icon: "f", url: "https://facebook.com" },
                  { name: "Instagram", icon: "Ig", url: "https://instagram.com" }
                ].map((social) => (
                  <a 
                    key={social.name} 
                    href={social.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 hover:bg-orange-500/20 hover:border-orange-500/50 hover:text-orange-300 hover:scale-110 transition-all duration-300"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <span className="text-sm font-medium">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Find quick answers to common questions, or contact us for more specific inquiries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How quickly can I expect a response?",
                answer: "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please use our live chat support available on the dashboard for premium users."
              },
              {
                question: "Do you offer technical support?",
                answer: "Yes, we provide technical support for all our users. Premium subscribers get priority support with faster response times and dedicated support specialists."
              },
              {
                question: "Can I request a demo before subscribing?",
                answer: "Absolutely! You can request a personalized demo by contacting our sales team. We'll walk you through the platform and answer any questions you might have."
              },
              {
                question: "How can I report a bug or suggest a feature?",
                answer: "We welcome your feedback! You can report bugs or suggest features through our contact form or by emailing support@daddysai.com with details of your experience or ideas."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gradient-to-br from-[#0a0d1a] to-[#111827] p-6 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                <h3 className="text-lg font-medium text-white mb-3">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/faq" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-medium transition-colors">
              View all FAQs
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}