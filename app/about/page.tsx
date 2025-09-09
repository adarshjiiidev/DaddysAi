import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "About Us | Daddy's AI",
  description: "Learn more about Daddy's AI, our mission, vision, and the team behind our AI-powered financial intelligence platform."
};

export default function AboutPage() {
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
            About Daddy's AI
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Empowering investors with AI-driven insights for the Indian stock market
          </p>
        </div>
        
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-gradient-to-br from-[#0a0d1a] to-[#111827] p-8 rounded-2xl border border-orange-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/10 blur-[80px] rounded-full"></div>
            <h2 className="text-3xl font-semibold mb-6 relative z-10">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed relative z-10">
              At Daddy's AI, our mission is to democratize financial intelligence for Indian investors. We believe that sophisticated market analysis should be accessible to everyone, not just institutional investors with deep pockets.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4 relative z-10">
              We're committed to leveling the playing field by providing retail investors with AI-powered tools that were previously available only to financial institutions and hedge funds.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-[#0a0d1a] to-[#111827] p-8 rounded-2xl border border-orange-500/20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 blur-[80px] rounded-full"></div>
            <h2 className="text-3xl font-semibold mb-6 relative z-10">Our Vision</h2>
            <p className="text-gray-300 leading-relaxed relative z-10">
              We envision a future where every Indian investor, regardless of their background or experience level, can make data-driven investment decisions with confidence.
            </p>
            <p className="text-gray-300 leading-relaxed mt-4 relative z-10">
              By combining cutting-edge AI technology with deep financial expertise, we aim to become the most trusted AI-powered financial intelligence platform in India, helping millions of investors achieve their financial goals.
            </p>
          </div>
        </div>
        
        {/* Our Story */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-10 text-center">Our Story</h2>
          <div className="bg-gradient-to-br from-[#0a0d1a] to-[#111827] p-8 md:p-12 rounded-2xl border border-orange-500/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-60 h-60 bg-orange-500/5 blur-[100px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-amber-500/5 blur-[100px] rounded-full"></div>
            
            <div className="relative z-10 space-y-6 text-gray-300 leading-relaxed">
              <p>
                Daddy's AI was founded in 2023 by a team of financial analysts, data scientists, and software engineers who shared a common frustration: the Indian retail investor was being left behind in the age of AI-powered finance.
              </p>
              <p>
                While working at various financial institutions, our founders witnessed firsthand how AI and machine learning were transforming investment strategies for the wealthy and well-connected. They realized that these powerful tools could benefit everyone, not just the privileged few.
              </p>
              <p>
                Driven by this vision, they left their corporate jobs to build Daddy's AI - a platform that would bring institutional-grade financial intelligence to every Indian investor at an affordable price point.
              </p>
              <p>
                Today, we're proud to serve a growing community of investors who rely on our AI-powered insights to navigate the complexities of the Indian stock market with confidence.
              </p>
            </div>
          </div>
        </div>
        
        {/* Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold mb-10 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Transparency",
                description: "We believe in complete transparency in how our AI models work and how we use your data."
              },
              {
                title: "Accessibility",
                description: "We're committed to making sophisticated financial tools accessible to investors of all backgrounds."
              },
              {
                title: "Innovation",
                description: "We continuously push the boundaries of what's possible with AI in financial analysis."
              },
              {
                title: "Integrity",
                description: "We uphold the highest ethical standards in all aspects of our business."
              }
            ].map((value, index) => (
              <div key={index} className="bg-gradient-to-br from-[#0a0d1a] to-[#111827] p-6 rounded-xl border border-orange-500/20">
                <h3 className="text-xl font-semibold mb-4 text-white">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-gradient-to-br from-[#0a0d1a] to-[#111827] p-8 md:p-12 rounded-2xl border border-orange-500/20 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Us on Our Mission</h2>
          <p className="text-gray-300 max-w-3xl mx-auto mb-8">
            Ready to experience the power of AI-driven financial intelligence? Sign up today and take your investment strategy to the next level.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up" className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300">
              Get Started
            </Link>
            <Link href="/contact" className="bg-transparent border border-orange-500/50 hover:border-orange-500 text-orange-500 font-medium py-3 px-8 rounded-lg transition-all duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}