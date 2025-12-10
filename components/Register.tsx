import React, { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { AuthLayout } from './AuthLayout';

interface RegisterProps {
  onRegister: () => void;
  onNavigateLogin: () => void;
  onBack: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onRegister, onNavigateLogin, onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    onRegister();
  };

  return (
    <AuthLayout 
      title="Create account" 
      subtitle="Start generating cinematic videos today."
      onBack={onBack}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input 
          label="Full Name" 
          type="text" 
          placeholder="Jane Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        
        <Input 
          label="Email" 
          type="email" 
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <Input 
          label="Password" 
          type="password" 
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="pt-2">
          <Button type="submit" fullWidth isLoading={isLoading}>
            Create Account
          </Button>
        </div>

        <div className="pt-4 text-center text-sm text-zinc-500">
          Already have an account?{' '}
          <button 
            type="button" 
            onClick={onNavigateLogin}
            className="text-white hover:underline decoration-zinc-500 underline-offset-4"
          >
            Log in
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};