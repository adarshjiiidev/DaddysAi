'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import { useEffect, useState, useCallback, useRef } from 'react'
import { Logo } from './Logo'
import { useAuth } from '@/app/contexts/AuthContext'
import { Menu, X, ChevronDown, ChevronRight, Home, BarChart3, Users, Tag } from 'lucide-react'
import { UserButton } from '@/components/auth'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, isAuthenticated } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const navRef = useRef<HTMLElement>(null)
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)
  
  // Check if a link is active
  const isActive = useCallback((path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    if (path.startsWith('/#')) {
      // For hash links, we can't rely on pathname
      return false
    }
    return pathname.startsWith(path)
  }, [pathname])

  // Handle scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when screen size changes to desktop or when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    // If we're not on the homepage, navigate there first
    if (pathname !== '/') {
      router.push('/')
      // Need to wait for navigation to complete before scrolling
      setTimeout(() => {
        const section = document.getElementById(sectionId)
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
          setIsMenuOpen(false) // Close mobile menu after clicking a link
        }
      }, 300)
    } else {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
        setIsMenuOpen(false) // Close mobile menu after clicking a link
      }
    }
  }

  return (
    <header 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 shadow-lg backdrop-blur-md' : 'bg-black/50 backdrop-blur-sm'} border-b ${isScrolled ? 'border-white/15' : 'border-white/5'}`}
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Logo size="md" className="py-2" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main navigation">
            <Link 
              href="/" 
              className={`text-sm font-medium ${isActive('/') ? 'text-white' : 'text-gray-300'} hover:text-white transition-colors relative group py-2 flex items-center gap-1.5`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
              {isActive('/') && (
                <motion.span 
                  layoutId="desktopActiveIndicator"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/#features" 
              onClick={(e) => scrollToSection(e, 'features')}
              className={`text-sm font-medium ${isActive('/#features') ? 'text-white' : 'text-gray-300'} hover:text-white transition-colors relative group py-2 flex items-center gap-1.5`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Features</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/#testimonials" 
              onClick={(e) => scrollToSection(e, 'testimonials')}
              className={`text-sm font-medium ${isActive('/#testimonials') ? 'text-white' : 'text-gray-300'} hover:text-white transition-colors relative group py-2 flex items-center gap-1.5`}
            >
              <Users className="w-4 h-4" />
              <span>Testimonials</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link 
              href="/#pricing" 
              onClick={(e) => scrollToSection(e, 'pricing')}
              className={`text-sm font-medium ${isActive('/#pricing') ? 'text-white' : 'text-gray-300'} hover:text-white transition-colors relative group py-2 flex items-center gap-1.5`}
            >
              <Tag className="w-4 h-4" />
              <span>Pricing</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link href="/sign-in">
                  <Button 
                    variant="ghost" 
                    className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-lg flex items-center gap-1.5"
                    aria-label="Sign in to your account"
                  >
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      Sign In
                    </motion.span>
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button 
                    className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-200 rounded-lg flex items-center gap-1.5"
                    aria-label="Create a new account"
                  >
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Sign Up
                    </motion.span>
                  </Button>
                </Link>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <UserButton />
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white hover:bg-white/10 p-2 touch-action-manipulation rounded-lg transition-colors duration-200"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Using AnimatePresence for smooth animation with glass effect */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div 
            id="mobile-menu"
            className="md:hidden bg-black/80 backdrop-blur-xl border-t border-white/10 overflow-hidden absolute w-full z-40"
            aria-hidden={!isMenuOpen}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="grid grid-cols-2 gap-3 mb-4" aria-label="Mobile navigation">
                <Link 
                  href="/" 
                  className={`${isActive('/') ? 'text-white bg-white/15 font-medium' : 'text-gray-200'} hover:text-white transition-all duration-200 py-3 px-4 rounded-lg hover:bg-white/10 active:bg-white/20 flex items-center gap-2 relative overflow-hidden group`}
                  onClick={closeMenu}
                >
                  <Home className="w-4 h-4 text-orange-500" />
                  <span className="flex-1 text-base">Home</span>
                  {isActive('/') && (
                    <motion.span 
                      layoutId="mobileActiveIndicator"
                      className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-orange-500 to-amber-600 rounded-r-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
                <Link 
                  href="/#features" 
                  className={`${isActive('/#features') ? 'text-white bg-white/15 font-medium' : 'text-gray-200'} hover:text-white transition-all duration-200 py-3 px-4 rounded-lg hover:bg-white/10 active:bg-white/20 flex items-center gap-2 relative overflow-hidden group`}
                  onClick={(e) => scrollToSection(e, 'features')}
                >
                  <BarChart3 className="w-4 h-4 text-orange-500" />
                  <span className="flex-1 text-base">Features</span>
                  {isActive('/#features') && (
                    <motion.span 
                      layoutId="mobileActiveIndicator"
                      className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-orange-500 to-amber-600 rounded-r-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
                <Link 
                  href="/#testimonials" 
                  className={`${isActive('/#testimonials') ? 'text-white bg-white/15 font-medium' : 'text-gray-200'} hover:text-white transition-all duration-200 py-3 px-4 rounded-lg hover:bg-white/10 active:bg-white/20 flex items-center gap-2 relative overflow-hidden group`}
                  onClick={(e) => scrollToSection(e, 'testimonials')}
                >
                  <Users className="w-4 h-4 text-orange-500" />
                  <span className="flex-1 text-base">Testimonials</span>
                  {isActive('/#testimonials') && (
                    <motion.span 
                      layoutId="mobileActiveIndicator"
                      className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-orange-500 to-amber-600 rounded-r-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
                <Link 
                  href="/#pricing" 
                  className={`${isActive('/#pricing') ? 'text-white bg-white/15 font-medium' : 'text-gray-200'} hover:text-white transition-all duration-200 py-3 px-4 rounded-lg hover:bg-white/10 active:bg-white/20 flex items-center gap-2 relative overflow-hidden group`}
                  onClick={(e) => scrollToSection(e, 'pricing')}
                >
                  <Tag className="w-4 h-4 text-orange-500" />
                  <span className="flex-1 text-base">Pricing</span>
                  {isActive('/#pricing') && (
                    <motion.span 
                      layoutId="mobileActiveIndicator"
                      className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-orange-500 to-amber-600 rounded-r-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </nav>
              {!isAuthenticated ? (
                <motion.div 
                  className="flex space-x-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link href="/sign-in" onClick={closeMenu} className="flex-1">
                    <Button 
                      variant="outline" 
                      className="w-full border-white/20 text-white hover:bg-white/10 py-2 text-sm font-medium rounded-lg transition-all duration-200 backdrop-blur-sm bg-white/5 hover:bg-white/10"
                      aria-label="Sign in to your account"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up" onClick={closeMenu} className="flex-1">
                    <Button 
                      className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white border-none py-2 text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                      aria-label="Create a new account"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </motion.div>
              ) : (
                <motion.div 
                  className="border-t border-white/10 pt-3 mt-2 backdrop-blur-sm bg-white/5 p-3 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <UserButton />
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
