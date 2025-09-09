import Link from 'next/link';

export const metadata = {
  title: "FAQ | Daddy's AI",
  description: "Frequently asked questions about Daddy's AI trading platform, features, pricing, and support."
};

export default function FAQPage() {
  const faqs = [
    {
      question: "What is Daddy's AI?",
      answer: "Daddy's AI is an advanced trading platform that uses artificial intelligence to analyze the Indian stock market and provide actionable insights, predictions, and trading strategies to help investors make more informed decisions."
    },
    {
      question: "How does the AI prediction system work?",
      answer: "Our AI system analyzes vast amounts of market data, including price movements, trading volumes, option chain data, news sentiment, and macroeconomic indicators. It uses machine learning algorithms to identify patterns and predict potential market movements with a high degree of accuracy."
    },
    {
      question: "Is Daddy's AI suitable for beginners?",
      answer: "Yes, Daddy's AI is designed to be accessible for investors of all experience levels. For beginners, we provide educational resources, simplified insights, and clear recommendations. The platform grows with you as you gain more experience and knowledge."
    },
    {
      question: "What markets and securities does Daddy's AI cover?",
      answer: "Currently, Daddy's AI focuses on the Indian stock market, including stocks listed on NSE and BSE, index futures, and options. We provide analysis for Nifty, Bank Nifty, and other major indices, as well as individual stocks across various sectors."
    },
    {
      question: "How accurate are the predictions?",
      answer: "While no prediction system can be 100% accurate, our AI models have demonstrated a high degree of accuracy in identifying market trends and potential movements. We continuously refine our algorithms based on performance data to improve accuracy over time. We provide transparency by showing historical accuracy metrics for all our predictions."
    },
    {
      question: "What subscription plans do you offer?",
      answer: "We offer several subscription tiers to meet different needs and budgets. These range from a basic plan with essential features to premium plans with advanced analytics, real-time alerts, and personalized strategy recommendations. Visit our pricing page for detailed information on current plans and pricing."
    },
    {
      question: "Can I try Daddy's AI before subscribing?",
      answer: "Yes, we offer a free trial period that gives you access to a limited set of features so you can experience the platform's capabilities before committing to a subscription. No credit card is required to start your free trial."
    },
    {
      question: "How do I get started with Daddy's AI?",
      answer: "Getting started is simple. Just sign up for an account, complete your profile with your investment preferences and goals, and you'll immediately gain access to our dashboard with AI-powered insights. We also provide an onboarding tutorial to help you navigate the platform effectively."
    },
    {
      question: "Does Daddy's AI provide real-time data?",
      answer: "Yes, our premium plans include real-time market data and alerts. Our basic plans may have a slight delay in data updates. The specifics of data refresh rates are detailed in our plan comparison chart."
    },
    {
      question: "Can I connect my trading account to Daddy's AI?",
      answer: "We're working on integrations with major Indian brokers to allow for seamless connection of your trading accounts. Currently, you can manually track your portfolio within our platform, and we'll notify you when direct broker integrations become available."
    },
    {
      question: "What kind of customer support do you provide?",
      answer: "We offer multiple support channels including email support, live chat during business hours, and an extensive knowledge base. Premium subscribers also get priority support and access to scheduled consultation calls with our market analysts."
    },
    {
      question: "Is my data secure with Daddy's AI?",
      answer: "Absolutely. We implement bank-level security measures to protect your personal and financial data. We use encryption for all sensitive information, secure authentication protocols, and regular security audits. We never share your personal data with third parties without your explicit consent."
    },
    {
      question: "Can I use Daddy's AI on mobile devices?",
      answer: "Yes, Daddy's AI is fully responsive and works on all modern mobile devices through your web browser. We also have dedicated mobile apps for iOS and Android that provide an optimized experience for on-the-go trading and market monitoring."
    },
    {
      question: "Do you provide educational resources?",
      answer: "Yes, we offer a comprehensive library of educational content including articles, videos, webinars, and tutorials covering everything from basic trading concepts to advanced strategies using our AI tools. These resources are available to all subscribers."
    },
    {
      question: "How often are the AI models updated?",
      answer: "Our AI models are continuously learning and improving. We push major algorithm updates monthly, with minor refinements happening weekly. After significant market events, we may perform special updates to incorporate new patterns and behaviors."
    },
    {
      question: "What if I want to cancel my subscription?",
      answer: "You can cancel your subscription at any time through your account settings. If you cancel, you'll continue to have access to your subscription features until the end of your current billing period. We don't offer refunds for partial billing periods, but you won't be charged again once you've canceled."
    }
  ];

  return (
    <div className="bg-[#050714] min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="mb-8">
          <Link href="/" className="text-orange-500 hover:text-orange-600 transition-colors">
            ← Back to Home
          </Link>
        </div>
        
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about Daddy's AI platform
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <input 
              type="text" 
              placeholder="Search for questions..." 
              className="w-full px-5 py-4 rounded-lg bg-[#0a0d1a] border border-orange-500/30 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-white placeholder-gray-500 transition-all duration-300"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* FAQ Accordion */}
        <div className="space-y-6 mb-16">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-orange-500/20 rounded-lg overflow-hidden bg-gradient-to-br from-[#0a0d1a] to-[#111827] hover:border-orange-500/40 transition-all duration-300">
              <details className="group">
                <summary className="flex items-center justify-between cursor-pointer p-6">
                  <h3 className="text-xl font-medium text-white pr-8">{faq.question}</h3>
                  <span className="relative flex-shrink-0 ml-1.5 w-5 h-5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-5 h-5 opacity-100 group-open:opacity-0 transition-opacity duration-300 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-5 h-5 opacity-0 group-open:opacity-100 transition-opacity duration-300 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              </details>
            </div>
          ))}
        </div>
        
        {/* Still Have Questions */}
        <div className="bg-gradient-to-br from-[#0a0d1a] to-[#111827] p-8 rounded-2xl border border-orange-500/20 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Our support team is here to help. Reach out to us and we'll get back to you as soon as possible.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Contact Support
            </Link>
            <Link href="#" className="inline-flex items-center gap-2 bg-transparent hover:bg-orange-500/10 text-orange-500 border border-orange-500/50 px-6 py-3 rounded-lg font-medium transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Read Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}