'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';
import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';

interface LTPCredentialsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  pendingMessage?: string | null;
}

export function LTPCredentialsDialog({ 
  open, 
  onOpenChange,
  onSuccess,
  pendingMessage 
}: LTPCredentialsDialogProps) {
  const { user, updateLTPCredentials, error: authError } = useAuth();
  
  const [email, setEmail] = useState(user?.ltpCredentials?.email || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleUpdateCredentials = async () => {
    // Validate inputs
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    try {
      setError(null);
      setSuccess(null);
      setIsUpdating(true);
      
      // First verify the credentials
      const response = await fetch('/api/ltp-calculator/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Invalid LTP Calculator credentials');
      }

      // If verification successful, update credentials
      await updateLTPCredentials(email, password);
      
      setSuccess('LTP credentials verified and updated successfully');
      setPassword(''); // Clear password field for security
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1500); // Give user time to see success message
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update LTP credentials');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-neutral-950 border border-neutral-800 text-neutral-100 p-6 max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-neutral-100">LTP Calculator Credentials</DialogTitle>
          <DialogDescription className="text-neutral-400 mt-2">
            Enter your LTP Calculator credentials to access real-time market data.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-800 rounded-md text-red-400 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-900/20 border border-green-800 rounded-md text-green-400 text-sm">
              {success}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-neutral-400">LTP Email</div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your LTP Calculator email"
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-neutral-100 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm sm:text-base"
                placeholder="Enter LTP username"
                disabled={isUpdating}
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-neutral-400">LTP Password</div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-md text-neutral-100 focus:outline-none focus:ring-1 focus:ring-orange-500 pr-10 text-sm sm:text-base"
                  placeholder="Enter LTP password"
                  disabled={isUpdating}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-300"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isUpdating}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="outline"
              className="text-neutral-400 border-neutral-700 hover:bg-neutral-800"
              onClick={() => onOpenChange(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              className="bg-orange-500 hover:bg-orange-600 text-white"
              onClick={handleUpdateCredentials}
              disabled={isUpdating}
            >
              {isUpdating ? 'Updating...' : 'Save Credentials'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}