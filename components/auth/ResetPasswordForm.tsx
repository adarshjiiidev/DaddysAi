'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/app/contexts/AuthContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface ResetPasswordFormProps {
  email: string;
  token: string;
}

export default function ResetPasswordForm({ email, token }: ResetPasswordFormProps) {
  const { resetPassword, verifyResetToken, error: authError, isLoading } = useAuth();
  const router = useRouter();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Verify token on component mount
  const [tokenVerificationAttempted, setTokenVerificationAttempted] = useState(false);
  
  useEffect(() => {
    const checkToken = async () => {
      if (tokenVerificationAttempted) return;
      
      try {
        setTokenVerificationAttempted(true);
        const isValid = await verifyResetToken(email, token);
        setIsTokenValid(isValid);
      } catch (err) {
        setIsTokenValid(false);
        setError('This password reset link is invalid or has expired.');
      }
    };

    checkToken();
  }, [email, token, verifyResetToken, tokenVerificationAttempted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (!password || !confirmPassword) {
      setError('Both fields are required');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      await resetPassword(email, token, password);
      setSuccess('Your password has been reset successfully!');
      
      // Redirect to sign in page after 3 seconds
      setTimeout(() => {
        router.push('/sign-in');
      }, 3000);
    } catch (err) {
      // Error is already set in the auth context
      console.error('Reset password error:', err);
    }
  };

  // If token is invalid, show error message
  if (isTokenValid === false) {
    return (
      <div className="space-y-6 w-full max-w-md">
        <div className="bg-destructive/15 text-destructive text-sm p-4 rounded-lg flex items-start gap-3 border border-destructive/20 shadow-sm animate-fadeIn">
          <AlertCircle className="mt-0.5" size={18} />
          <div>
            <p className="font-medium mb-1">Invalid Reset Link</p>
            <p>This password reset link is invalid or has expired. Please request a new one.</p>
          </div>
        </div>

        <Button
          type="button"
          className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          onClick={() => router.push('/sign-in')}
        >
          Back to Sign In
        </Button>
      </div>
    );
  }

  // If still checking token validity, show loading
  if (isTokenValid === null) {
    return (
      <div className="space-y-6 w-full max-w-md">
        <div className="flex flex-col items-center justify-center py-6">
          <div className="flex space-x-2 mb-4">
            <div className="w-3 h-3 bg-[#f97316] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-[#fb923c] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-[#fdba74] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <p className="text-sm text-muted-foreground animate-pulse">
            Verifying your reset link...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-md">
      <div className="text-center mb-6">
        <p className="text-sm text-muted-foreground mb-2 bg-gradient-to-r from-orange-300 to-orange-100 bg-clip-text text-transparent font-medium">
          SECURE PASSWORD RESET
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Enter your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-destructive/15 text-destructive text-sm p-4 rounded-lg flex items-start gap-3 border border-destructive/20 shadow-sm animate-fadeIn">
            <AlertCircle className="mt-0.5" size={18} />
            <p>{error}</p>
          </div>
        )}

        {authError && !error && (
          <div className="bg-destructive/15 text-destructive text-sm p-4 rounded-lg flex items-start gap-3 border border-destructive/20 shadow-sm animate-fadeIn">
            <AlertCircle className="mt-0.5" size={18} />
            <p>{authError}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-500/15 text-green-500 text-sm p-4 rounded-lg flex items-start gap-3 border border-green-500/20 shadow-sm animate-fadeIn">
            <CheckCircle2 className="mt-0.5" size={18} />
            <p>{success}</p>
          </div>
        )}

        <motion.div 
          className="space-y-2"
          initial="hidden"
          animate="visible"
          variants={formVariants}
        >
          <label htmlFor="password" className="text-sm font-medium">
            New Password
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading || !!success}
              className="w-full pr-10 bg-background/50 backdrop-blur-sm border-muted-foreground/20 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-300"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Must be at least 8 characters long
          </p>
        </motion.div>

        <motion.div 
          className="space-y-2"
          initial="hidden"
          animate="visible"
          variants={formVariants}
          transition={{ delay: 0.1 }}
        >
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm Password
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading || !!success}
              className="w-full pr-10 bg-background/50 backdrop-blur-sm border-muted-foreground/20 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-300"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </motion.div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl mt-2"
          disabled={isLoading || !!success}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
              Resetting...
            </span>
          ) : (
            'Reset Password'
          )}
        </Button>
      </form>
    </div>
  );
}