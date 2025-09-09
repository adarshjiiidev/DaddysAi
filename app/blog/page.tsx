import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "Blog | Daddy's AI",
  description: "Explore the latest insights, market analysis, and AI-powered trading strategies from Daddy's AI."
};

export default function BlogPage() {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "How AI is Transforming Stock Market Analysis in India",
      excerpt: "Discover how artificial intelligence is revolutionizing the way investors analyze and trade in the Indian stock market.",
      category: "AI & Finance",
      date: "June 15, 2023",
      readTime: "5 min read",
      author: "Ashutosh Kumar",
      authorRole: "Founder & CEO",
      image: "/blog/ai-stock-market.jpg"
    },
    {
      id: 2,
      title: "Understanding Option Chain Analysis for Better Trading Decisions",
      excerpt: "Learn how to interpret option chain data to identify potential market movements and make more informed trading decisions.",
      category: "Options Trading",
      date: "July 2, 2023",
      readTime: "8 min read",
      author: "Priya Patel",
      authorRole: "Head of Financial Research",
      image: "/blog/option-chain.jpg"
    },
    {
      id: 3,
      title: "5 Key Metrics Every Indian Stock Investor Should Track",
      excerpt: "Explore the essential financial metrics that can help you evaluate stocks more effectively in the Indian market.",
      category: "Investing",
      date: "July 18, 2023",
      readTime: "6 min read",
      author: "Rahul Sharma",
      authorRole: "Chief Technology Officer",
      image: "/blog/metrics.jpg"
    },
    {
      id: 4,
      title: "The Role of Sentiment Analysis in Predicting Market Movements",
      excerpt: "How our AI algorithms analyze news, social media, and other sources to gauge market sentiment and predict potential price movements.",
      category: "AI & Finance",
      date: "August 5, 2023",
      readTime: "7 min read",
      author: "Ashutosh Kumar",
      authorRole: "Founder & CEO",
      image: "/blog/sentiment-analysis.jpg"
    },
    {
      id: 5,
      title: "Building a Diversified Portfolio for the Indian Market",
      excerpt: "Strategic approaches to diversification that account for the unique characteristics of the Indian stock market.",
      category: "Portfolio Management",
      date: "August 22, 2023",
      readTime: "9 min read",
      author: "Priya Patel",
      authorRole: "Head of Financial Research",
      image: "/blog/portfolio.jpg"
    },
    {
      id: 6,
      title: "Technical Analysis vs. Fundamental Analysis: Which Works Better in India?",
      excerpt: "A comparative study of technical and fundamental analysis approaches in the context of the Indian stock market.",
      category: "Market Analysis",
      date: "September 10, 2023",
      readTime: "10 min read",
      author: "Rahul Sharma",
      authorRole: "Chief Technology Officer",
      image: "/blog/analysis.jpg"
    },
  ];

  // Categories for filter
  const categories = [
    "All",
    "AI & Finance",
    "Market Analysis",
    "Options Trading",
    "Investing",
    "Portfolio Management"
  ];

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
            Daddy's AI Blog
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Insights, analysis, and strategies for the Indian stock market
          </p>
        </div>
        
        {/* Featured Post */}
        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden border border-orange-500/20 group">
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#050714] via-transparent to-transparent z-10"></div>
            
            {/* Placeholder for featured image */}
            <div className="w-full h-[500px] bg-gradient-to-r from-orange-500/20 to-amber-600/20 group-hover:scale-105 transition-transform duration-500 ease-in-out">
              {/* When you have actual images, replace this with:
              <Image 
                src="/blog/featured-post.jpg" 
                alt="Featured post" 
                fill 
                className="object-cover"
              /> */}
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                  Featured
                </span>
                <span className="text-gray-300 text-sm">
                  September 25, 2023
                </span>
                <span className="text-gray-300 text-sm">
                  12 min read
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                The Future of AI-Powered Trading in the Indian Market
              </h2>
              
              <p className="text-gray-300 mb-6 max-w-3xl">
                Explore how artificial intelligence is set to transform trading strategies and investment approaches in India over the next decade, and how retail investors can prepare for this technological revolution.
              </p>
              
              <Link href="#" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-medium transition-colors">
                Read Full Article
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          {categories.map((category, index) => (
            <button 
              key={index} 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${index === 0 ? 'bg-orange-500 text-white' : 'bg-[#0a0d1a] text-gray-300 hover:bg-orange-500/10 hover:text-orange-500 border border-orange-500/20'}`}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-gradient-to-br from-[#0a0d1a] to-[#111827] rounded-xl border border-orange-500/20 overflow-hidden group hover:border-orange-500/40 transition-all duration-300">
              {/* Post image placeholder */}
              <div className="w-full h-48 bg-gradient-to-r from-orange-500/10 to-amber-600/10 group-hover:from-orange-500/20 group-hover:to-amber-600/20 transition-all duration-500">
                {/* When you have actual images, replace this with:
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  width={400} 
                  height={200} 
                  className="w-full h-full object-cover"
                /> */}
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-500">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {post.date}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-orange-500 transition-colors">
                  <Link href="#">{post.title}</Link>
                </h3>
                
                <p className="text-gray-400 text-sm mb-4">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 font-medium text-xs">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{post.author}</p>
                      <p className="text-xs text-gray-500">{post.authorRole}</p>
                    </div>
                  </div>
                  
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Newsletter Subscription */}
        <div className="bg-gradient-to-br from-[#0a0d1a] to-[#111827] p-8 md:p-12 rounded-2xl border border-orange-500/20 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-gray-300 mb-6">
                Subscribe to our newsletter to receive the latest market insights, trading strategies, and AI research directly in your inbox.
              </p>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Weekly market analysis
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Exclusive trading strategies
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Early access to new features
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-3.5 pl-5 border border-orange-500/30 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500/50 bg-[#0a0d1a]/70 text-gray-300 placeholder-gray-500 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500/5 to-amber-600/5 pointer-events-none"></div>
              </div>
              <button className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:from-orange-600 hover:to-amber-700 border-none py-3.5 rounded-lg font-medium text-base transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 hover:scale-[1.02]">
                Subscribe Now
              </button>
              <p className="text-xs text-gray-500 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
        
        {/* Pagination */}
        <div className="flex justify-center items-center gap-2">
          <button className="w-10 h-10 rounded-lg border border-orange-500/20 flex items-center justify-center text-gray-400 hover:bg-orange-500/10 hover:text-orange-500 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          {[1, 2, 3, 4, 5].map((page) => (
            <button 
              key={page} 
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${page === 1 ? 'bg-orange-500 text-white' : 'border border-orange-500/20 text-gray-400 hover:bg-orange-500/10 hover:text-orange-500'}`}
            >
              {page}
            </button>
          ))}
          
          <button className="w-10 h-10 rounded-lg border border-orange-500/20 flex items-center justify-center text-gray-400 hover:bg-orange-500/10 hover:text-orange-500 transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}