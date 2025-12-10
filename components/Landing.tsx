import React from 'react';
import { Button } from './Button';
import { Film, ArrowRight } from 'lucide-react';

interface LandingProps {
  onLogin: () => void;
  onRegister: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onLogin, onRegister }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Abstract Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-sm">
            <Film className="w-5 h-5" />
          </div>
          <span className="font-bold tracking-tight text-lg">Veo Noir</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onLogin}
            className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Log in
          </button>
          <Button 
            onClick={onRegister} 
            variant="primary" 
            className="px-4 py-2 text-xs"
          >
            Sign Up
          </Button>
        </div>
      </nav>
      
      {/* Content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-6 z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
        
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-600 max-w-4xl">
          Cinematic AI Video.
        </h1>
        
        <p className="text-xl text-zinc-400 mb-10 leading-relaxed font-light max-w-2xl">
          Generate stunning, high-definition videos from text prompts. 
          The future of film is here, rendered in stark monochrome simplicity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-sm">
          <Button onClick={onRegister} fullWidth className="group h-12 text-base">
            Start Creating
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button onClick={onLogin} variant="outline" fullWidth className="h-12 text-base">
            Existing User
          </Button>
        </div>
        
        <div className="mt-8">
           <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            Requires paid Google Veo API access
          </a>
        </div>
      </div>
    </div>
  );
};