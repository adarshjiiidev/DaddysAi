'use client';

import { useState } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ForgotPasswordFormProps {
  onBack: () => void;
}

export default function ForgotPasswordForm({ onBack }: ForgotPasswordFormProps) {
  const { forgotPassword, error: authError, isLoading } = useAuth();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Animation variants for form elements
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (!email) {
      setError('Email is required');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    try {
      await forgotPassword(email);
      setSuccess('If your email is registered, you will receive a password reset link shortly.');
      setEmail(''); // Clear the form
    } catch (err) {
      // Error is already set in the auth context
      console.error('Forgot password error:', err);
    }
  };

  return (
    <div className="space-y-6 w-full max-w-md">
      <div className="text-center">
        <p className="text-sm text-muted-foreground mt-3"><b>
          Enter your email address and we'll send you a link to reset your password.
          </b>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md flex items-center gap-2">
            <AlertCircle size={16} />
            <p>{error}</p>
          </div>
        )}

        {authError && !error && (
          <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md flex items-center gap-2">
            <AlertCircle size={16} />
            <p>{authError}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-500/15 text-green-500 text-sm p-3 rounded-md flex items-center gap-2">
            <CheckCircle2 size={16} />
            <p>{success}</p>
          </div>
        )}

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={formVariants}
          className="space-y-2"
        >
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            disabled={isLoading || !!success}
            className="w-full bg-background/50 backdrop-blur-sm border-muted-foreground/20 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-300"
            required
          />
        </motion.div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500"
          disabled={isLoading || !!success}
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Button
            type="button"
            variant="ghost"
            className="w-full flex items-center justify-center gap-2 hover:bg-orange-50/10 hover:text-orange-300 transition-all duration-300 border-muted-foreground/20"
            onClick={onBack}
            disabled={isLoading}
          >
            <ArrowLeft size={16} />
            Back to Sign In
          </Button>
        </motion.div>
      </form>
    </div>
  );
}