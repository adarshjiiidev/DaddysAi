'use client';

import { useState } from 'react';
import Link from 'next/link';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { AuthLayout } from '@/components/auth';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [showSignIn, setShowSignIn] = useState(false);

  const handleBackToSignIn = () => {
    setShowSignIn(true);
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Remember your password?"
      linkText="Sign in"
      linkHref="/sign-in"
    >
      {showSignIn ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6"
        >
          <p className="text-gray-400">
            Click the button below to return to the sign in page.
          </p>
          <Link 
            href="/sign-in" 
            className="bg-gradient-to-r from-[#f97316] to-[#fb923c] hover:from-[#ea580c] hover:to-[#f97316] text-white font-semibold py-3 px-5 rounded-xl transition-all duration-300 inline-block shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            Go to Sign In
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ForgotPasswordForm onBack={handleBackToSignIn} />
        </motion.div>
      )}
    </AuthLayout>
  );
}