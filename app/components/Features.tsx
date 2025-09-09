'use client'

import { useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const features = [
  {
    title: "AI-Powered Predictions",
    description: "Our advanced machine learning models analyze historical data and market trends to predict stock movements with high accuracy.",
    icon: "📈",
  },
  {
    title: "Indian Market Focus",
    description: "Specialized algorithms trained specifically on Indian stock market data, accounting for local factors and regulations.",
    icon: "🇮🇳",
  },
  {
    title: "Real-time Analytics",
    description: "Get instant insights with our real-time data processing pipeline that monitors market changes as they happen.",
    icon: "⚡",
  },
  {
    title: "Personalized Portfolios",
    description: "AI-generated portfolio recommendations based on your risk tolerance, investment goals, and market conditions.",
    icon: "🔍",
  },
  {
    title: "Sentiment Analysis",
    description: "Track market sentiment by analyzing news, social media, and financial reports to gauge investor mood.",
    icon: "😊",
  },
  {
    title: "Risk Assessment",
    description: "Comprehensive risk evaluation for every stock and portfolio to help you make informed decisions.",
    icon: "⚠️",
  },
]

export function Features() {
  const container = useRef(null)
  
  useEffect(() => {
    // Animation will be added later when GSAP is properly configured
  }, [])

  return (
    <section id="features" ref={container} className="py-12 sm:py-16 md:py-20 bg-[#050714] relative overflow-hidden">
      {/* Grid background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      {/* Glowing dots */}
      <div className="absolute top-40 left-1/5 w-2 h-2 rounded-full bg-orange-500 blur-sm animate-pulse" />
      <div className="absolute bottom-60 right-1/4 w-3 h-3 rounded-full bg-orange-400 blur-sm animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-medium mb-2 sm:mb-3 md:mb-4">
            ADVANCED FEATURES
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 text-white px-4">
            Powerful Features for <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">Smart Investors</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto px-4">
            Daddy's AI combines cutting-edge technology with financial expertise to give you an edge in the Indian stock market.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 px-4 sm:px-0">
          {features.map((feature, index) => (
            <Card key={index} className="feature-card bg-[#0a0d1a] border-orange-500/20 hover:shadow-lg hover:shadow-orange-500/10 hover:border-orange-500/40 transition-all duration-300 h-full">
              <CardHeader className="pb-1 sm:pb-2 pt-4 sm:pt-5 px-4 sm:px-6">
                <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 md:mb-4 bg-orange-500/10 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center text-orange-400">{feature.icon}</div>
                <CardTitle className="text-base sm:text-lg md:text-xl bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 pb-4 sm:pb-5">
                <p className="text-xs sm:text-sm md:text-base text-gray-400">{feature.description}</p>
                
                {/* Feature card decorative elements */}
                <div className="mt-2 sm:mt-3 md:mt-4 pt-2 sm:pt-3 md:pt-4 border-t border-orange-500/10 flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span className="text-xs text-orange-400">AI Powered</span>
                  </div>
                  <div className="text-orange-500 text-xs">→</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Decorative element */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      </div>
    </section>
  )
}
