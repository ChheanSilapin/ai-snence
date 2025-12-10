import React from 'react';
import { Film, ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  onBack: () => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, onBack }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden p-6">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>

      <button 
        onClick={onBack}
        className="absolute top-6 left-6 z-20 flex items-center text-zinc-500 hover:text-white transition-colors text-sm group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <div className="z-10 w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-black/80 backdrop-blur-sm border border-zinc-800 p-8 shadow-2xl relative">
          
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 rounded-full bg-zinc-900 border border-zinc-800">
                <Film className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white mb-2">{title}</h1>
            <p className="text-zinc-400 text-sm">{subtitle}</p>
          </div>

          {children}

        </div>
      </div>
    </div>
  );
};