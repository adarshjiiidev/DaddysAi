'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import { Logo } from './Logo'
import { useAuth } from '@/app/contexts/AuthContext'

export function Footer() {
  const { isAuthenticated } = useAuth()
  
  return (
    <footer className="border-t border-orange-500/20 py-20 bg-[#050714] relative">
      {/* Grid background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="absolute top-10 left-1/4 w-2 h-2 rounded-full bg-orange-500 blur-sm animate-pulse" />
      <div className="absolute bottom-20 right-1/3 w-1 h-1 rounded-full bg-orange-400 blur-sm animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-40 right-1/4 w-3 h-3 rounded-full bg-orange-300 blur-sm animate-pulse" style={{ animationDelay: '3s' }} />
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-60 h-60 rounded-full bg-orange-500/10 filter blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-amber-500/10 filter blur-[80px]" />
      
      <div className="container relative z-10 px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Logo and description section - 4 columns on desktop */}
          <div className="md:col-span-4 space-y-6">
            <Logo size="lg" className="mb-4" />
            <p className="text-gray-400 leading-relaxed text-base">
              AI-powered financial intelligence for the Indian stock market. Empowering investors with data-driven insights.
            </p>
            
            {/* Social links */}
            <div className="flex gap-5 mt-8">
              {[
                { name: "twitter", icon: "X", url: "https://twitter.com" },
                { name: "linkedin", icon: "in", url: "https://linkedin.com" },
                { name: "facebook", icon: "f", url: "https://facebook.com" },
                { name: "instagram", icon: "Ig", url: "https://instagram.com" }
              ].map((social) => (
                <a 
                  key={social.name} 
                  href={social.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 hover:bg-orange-500/20 hover:border-orange-500/50 hover:text-orange-300 hover:scale-110 transition-all duration-300"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <span className="text-xs font-medium">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Product links - 2 columns on desktop */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="font-semibold text-white text-lg relative inline-block">
              Product
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></span>
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="#features" className="hover:text-orange-500 transition-colors flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-orange-500/50 rounded-full group-hover:bg-orange-500 transition-colors"></span>
                <span className="group-hover:translate-x-1 transition-transform">Features</span>
              </Link></li>
              <li><Link href="#visualization" className="hover:text-orange-500 transition-colors flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-orange-500/50 rounded-full group-hover:bg-orange-500 transition-colors"></span>
                <span className="group-hover:translate-x-1 transition-transform">Market Insights</span>
              </Link></li>
              <li><Link href="#pricing" className="hover:text-orange-500 transition-colors flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-orange-500/50 rounded-full group-hover:bg-orange-500 transition-colors"></span>
                <span className="group-hover:translate-x-1 transition-transform">Pricing</span>
              </Link></li>
              <li><Link href="#testimonials" className="hover:text-orange-500 transition-colors flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-orange-500/50 rounded-full group-hover:bg-orange-500 transition-colors"></span>
                <span className="group-hover:translate-x-1 transition-transform">Testimonials</span>
              </Link></li>
            </ul>
          </div>
          
          {/* Company links - 2 columns on desktop */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="font-semibold text-white text-lg relative inline-block">
              Company
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></span>
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link href="/about" className="hover:text-orange-500 transition-colors flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-orange-500/50 rounded-full group-hover:bg-orange-500 transition-colors"></span>
                <span className="group-hover:translate-x-1 transition-transform">About Us</span>
              </Link></li>
              <li><Link href="/careers" className="hover:text-orange-500 transition-colors flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-orange-500/50 rounded-full group-hover:bg-orange-500 transition-colors"></span>
                <span className="group-hover:translate-x-1 transition-transform">Careers</span>
              </Link></li>
              <li><Link href="/blog" className="hover:text-orange-500 transition-colors flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-orange-500/50 rounded-full group-hover:bg-orange-500 transition-colors"></span>
                <span className="group-hover:translate-x-1 transition-transform">Blog</span>
              </Link></li>
              <li><Link href="/contact" className="hover:text-orange-500 transition-colors flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-orange-500/50 rounded-full group-hover:bg-orange-500 transition-colors"></span>
                <span className="group-hover:translate-x-1 transition-transform">Contact</span>
              </Link></li>
              <li><Link href="/faq" className="hover:text-orange-500 transition-colors flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 bg-orange-500/50 rounded-full group-hover:bg-orange-500 transition-colors"></span>
                <span className="group-hover:translate-x-1 transition-transform">FAQ</span>
              </Link></li>
              {!isAuthenticated ? (
                <>
                <li><Link href="/sign-in" className="hover:text-orange-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-orange-500/50 rounded-full group-hover:bg-orange-500 transition-colors"></span>
                  <span className="group-hover:translate-x-1 transition-transform">Sign In</span>
                </Link></li>
                <li><Link href="/sign-up" className="hover:text-orange-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-orange-500/50 rounded-full group-hover:bg-orange-500 transition-colors"></span>
                  <span className="group-hover:translate-x-1 transition-transform">Sign Up</span>
                </Link></li>
                </>
              ) : (
                <li><Link href="/dashboard" className="hover:text-orange-500 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 bg-orange-500/50 rounded-full group-hover:bg-orange-500 transition-colors"></span>
                  <span className="group-hover:translate-x-1 transition-transform">Dashboard</span>
                </Link></li>
              )}
            </ul>
          </div>
          
          {/* Newsletter section - 4 columns on desktop */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="font-semibold text-white text-lg relative inline-block">
              Stay Updated
              <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-gradient-to-r from-orange-500 to-transparent"></span>
            </h4>
            <p className="text-gray-400 leading-relaxed">
              Subscribe to our newsletter for the latest market insights and AI-powered trading tips.
            </p>
            <div className="flex flex-col gap-4">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="px-4 py-3.5 pl-5 border border-orange-500/30 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-orange-500/50 bg-[#0a0d1a]/70 text-gray-300 placeholder-gray-500 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500/5 to-amber-600/5 pointer-events-none"></div>
              </div>
              <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white hover:from-orange-600 hover:to-amber-700 border-none py-6 rounded-lg font-medium text-base transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 hover:scale-[1.02]">
                Subscribe Now
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
        
        {/* Bottom section with copyright and links */}
        <div className="border-t border-orange-500/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <div className="mr-3">
              <Logo size="sm" showText={false} />
            </div>
            <p className="text-gray-500 text-sm flex items-center">
              © {new Date().getFullYear()} Daddy's AI. All rights reserved.
            </p>
          </div>
          <div className="flex gap-8 mt-6 md:mt-0">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-orange-500 transition-colors flex items-center gap-1.5 group">
              <span className="w-1 h-1 bg-orange-500/70 rounded-full group-hover:scale-125 transition-transform"></span>
              <span className="group-hover:underline underline-offset-4">Privacy Policy</span>
            </Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-orange-500 transition-colors flex items-center gap-1.5 group">
              <span className="w-1 h-1 bg-orange-500/70 rounded-full group-hover:scale-125 transition-transform"></span>
              <span className="group-hover:underline underline-offset-4">Terms of Service</span>
            </Link>
            <Link href="/faq" className="text-sm text-gray-500 hover:text-orange-500 transition-colors flex items-center gap-1.5 group">
              <span className="w-1 h-1 bg-orange-500/70 rounded-full group-hover:scale-125 transition-transform"></span>
              <span className="group-hover:underline underline-offset-4">FAQ</span>
            </Link>
            <Link href="/blog" className="text-sm text-gray-500 hover:text-orange-500 transition-colors flex items-center gap-1.5 group">
              <span className="w-1 h-1 bg-orange-500/70 rounded-full group-hover:scale-125 transition-transform"></span>
              <span className="group-hover:underline underline-offset-4">Blog</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
