'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { AuthLayout } from '@/components/auth';
import { motion } from 'framer-motion';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Extract parameters only once on component mount
  useEffect(() => {
    const emailParam = searchParams.get('email');
    const tokenParam = searchParams.get('token');

    if (!emailParam || !tokenParam) {
      setError('Invalid reset password link. Please request a new one.');
      return;
    }

    setEmail(emailParam);
    setToken(tokenParam);
  }, []); // Empty dependency array ensures this runs only once

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="bg-destructive/15 text-destructive text-sm p-4 rounded-lg flex items-start gap-3 border border-destructive/20 shadow-sm animate-fadeIn">
          <AlertCircle className="mt-0.5" size={18} />
          <div>
            <p className="font-medium mb-1">Invalid Reset Link</p>
            <p>{error}</p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/forgot-password"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white h-10 px-6 py-2"
          >
            Request New Link
          </Link>
        </div>
      </motion.div>
    );
  }

  if (email && token) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ResetPasswordForm email={email} token={token} />
      </motion.div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-[#f97316] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 bg-[#fb923c] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-3 bg-[#fdba74] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Remember your password?"
      linkText="Sign in"
      linkHref="/sign-in"
    >
      <Suspense fallback={
        <div className="flex items-center justify-center py-8">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-[#f97316] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-[#fb923c] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-[#fdba74] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      }>
        <ResetPasswordContent />
      </Suspense>
    </AuthLayout>
  );
}