'use client'

import { useRef, useEffect } from 'react'

// Removed Three.js imports as we're using a video instead of 3D visualization

export function StockVisualization() {
  const container = useRef(null)
  
  useEffect(() => {
    // Animation will be added later when GSAP is properly configured
  }, [])

  return (
    <section id="visualization" ref={container} className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#050714] relative overflow-hidden">
      {/* Grid background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      <div className="absolute top-40 right-1/5 w-2 h-2 rounded-full bg-orange-500 blur-sm animate-pulse" />
      <div className="absolute bottom-60 left-1/4 w-3 h-3 rounded-full bg-orange-400 blur-sm animate-pulse" style={{ animationDelay: '1.5s' }} />
      
      <div className="container relative z-10 px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10 md:mb-16">
          <div className="inline-block px-3 py-1 sm:py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-medium tracking-wider mb-2 sm:mb-3 md:mb-4">
            MARKET INTELLIGENCE
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-white font-montserrat px-2">
            Interactive <span className="bg-gradient-to-r from-orange-500 to-amber-600 bg-clip-text text-transparent">Market Visualizations</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-3xl mx-auto px-2">
            Explore complex market data through our intuitive 3D visualizations. 
            Understand trends, patterns, and correlations that traditional 2D charts can't reveal.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          <div className="visualization-content w-full lg:w-1/2 space-y-4 sm:space-y-6 md:space-y-8 px-1 sm:px-0">
            <div className="bg-[#0a0d1a] border border-orange-500/20 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 shadow-lg shadow-orange-500/5">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 md:mb-4 text-white">Advanced Market Analysis</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-400 mb-3 sm:mb-4 md:mb-6">
                Our AI-powered platform processes vast amounts of market data to identify patterns and trends that human analysts might miss.
              </p>
              <ul className="space-y-2 sm:space-y-3 md:space-y-5">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5 sm:mt-1 bg-orange-500/10 p-1 sm:p-1.5 rounded-full">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-2 sm:ml-3 text-gray-300 text-xs sm:text-sm md:text-base">3D trend analysis for better pattern recognition</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5 sm:mt-1 bg-orange-500/10 p-1 sm:p-1.5 rounded-full">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-2 sm:ml-3 text-gray-300 text-xs sm:text-sm md:text-base">Real-time data streaming for up-to-the-minute insights</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5 sm:mt-1 bg-orange-500/10 p-1 sm:p-1.5 rounded-full">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="ml-2 sm:ml-3 text-gray-300 text-xs sm:text-sm md:text-base">Customizable views for different analysis approaches</p>
                </li>
              </ul>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 bg-orange-500/5 border border-orange-500/10 rounded-lg p-3 sm:p-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-medium text-sm sm:text-base">Real-time Updates</h4>
                <p className="text-gray-400 text-xs sm:text-sm">Data refreshes every 5 seconds during market hours</p>
              </div>
            </div>
          </div>
          
          <div className="stock-video w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] lg:w-1/2 relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden border border-orange-500/30 shadow-xl shadow-orange-500/10 bg-gradient-to-br from-[#0a0d1a] to-[#050714] mt-6 sm:mt-8 lg:mt-0">
            {/* Decorative elements */}
            <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 z-10 flex items-center gap-1.5 sm:gap-2 bg-[#0a0d1a]/80 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-md border border-orange-500/20">
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[10px] sm:text-xs text-orange-400 font-mono tracking-wider">LIVE MARKET</span>
            </div>
            
            {/* Video player */}
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="/204306-923909642.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* UI overlay elements */}
            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 z-10 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-md bg-[#0a0d1a]/80 backdrop-blur-sm border border-orange-500/30 text-orange-400 text-[10px] sm:text-xs font-mono tracking-wider">
              VOLUME: 1.2B SHARES
            </div>
            
            <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 z-10 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-md bg-[#0a0d1a]/80 backdrop-blur-sm border border-orange-500/30 text-orange-400 text-[10px] sm:text-xs font-mono tracking-wider">
              NIFTY 50: <span className="text-orange-300">+1.2%</span>
            </div>
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050714]/90 via-transparent to-[#050714]/40" />
          </div>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
    </section>
  )
}
