import React, { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { AuthLayout } from './AuthLayout';

interface LoginProps {
  onLogin: () => void;
  onNavigateRegister: () => void;
  onBack: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onNavigateRegister, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    onLogin();
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Enter your credentials to access your studio."
      onBack={onBack}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          label="Email" 
          type="email" 
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <div className="space-y-1">
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex justify-end">
            <button type="button" className="text-xs text-zinc-500 hover:text-white transition-colors">
              Forgot password?
            </button>
          </div>
        </div>

        <Button type="submit" fullWidth isLoading={isLoading}>
          Log In
        </Button>

        <div className="pt-4 text-center text-sm text-zinc-500">
          Don't have an account?{' '}
          <button 
            type="button" 
            onClick={onNavigateRegister}
            className="text-white hover:underline decoration-zinc-500 underline-offset-4"
          >
            Sign up
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};