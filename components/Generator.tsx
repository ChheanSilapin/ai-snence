import React, { useState, useRef } from 'react';
import { Button } from './Button';
import { VideoGenerationConfig } from '../types';
import { generateVideo } from '../services/veo';
import { Video, Download, RefreshCw, AlertCircle, Settings2 } from 'lucide-react';

export const Generator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<VideoGenerationConfig['aspectRatio']>('16:9');
  const [modelType, setModelType] = useState<VideoGenerationConfig['model']>('veo-3.1-fast-generate-preview');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);
    setProgressMsg('Initializing...');

    try {
      const url = await generateVideo({
        prompt,
        aspectRatio,
        resolution: '720p', // Defaulting to 720p for better compatibility/speed
        model: modelType
      }, (msg) => setProgressMsg(msg));

      setVideoUrl(url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (videoUrl) {
      const a = document.createElement('a');
      a.href = videoUrl;
      a.download = `veo-noir-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 flex flex-col md:flex-row gap-8">
      {/* Left Panel: Controls */}
      <div className="w-full md:w-1/3 flex flex-col gap-6 animate-in fade-in slide-in-from-left-4 duration-500">
        <header className="mb-4">
          <h2 className="text-2xl font-bold tracking-tight">Studio</h2>
          <p className="text-zinc-500 text-sm">Configure your scene.</p>
        </header>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe a scene: A cyberpunk city in rain, neon lights reflecting on wet pavement..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-none p-4 text-sm text-white placeholder-zinc-600 focus:ring-1 focus:ring-white focus:border-white focus:outline-none min-h-[160px] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Aspect Ratio</label>
              <div className="flex border border-zinc-800 bg-zinc-900">
                <button
                  onClick={() => setAspectRatio('16:9')}
                  className={`flex-1 py-2 text-xs font-medium transition-colors ${aspectRatio === '16:9' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
                >
                  16:9
                </button>
                <div className="w-px bg-zinc-800"></div>
                <button
                  onClick={() => setAspectRatio('9:16')}
                  className={`flex-1 py-2 text-xs font-medium transition-colors ${aspectRatio === '9:16' ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
                >
                  9:16
                </button>
              </div>
            </div>

            <div>
               <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Model</label>
               <div className="flex border border-zinc-800 bg-zinc-900">
                <button
                  onClick={() => setModelType('veo-3.1-fast-generate-preview')}
                  className={`flex-1 py-2 text-xs font-medium transition-colors ${modelType.includes('fast') ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
                  title="Faster generation"
                >
                  Fast
                </button>
                <div className="w-px bg-zinc-800"></div>
                <button
                  onClick={() => setModelType('veo-3.1-generate-preview')}
                  className={`flex-1 py-2 text-xs font-medium transition-colors ${!modelType.includes('fast') ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}
                  title="Higher quality (slower)"
                >
                  Pro
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-zinc-900">
          <Button 
            onClick={handleGenerate} 
            isLoading={isGenerating} 
            disabled={!prompt.trim()} 
            fullWidth
            className="h-12"
          >
            {isGenerating ? 'Generating...' : 'Generate Video'}
          </Button>
          {error && (
            <div className="mt-4 p-3 bg-red-950/30 border border-red-900/50 text-red-200 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>

      {/* Right Panel: Preview */}
      <div className="flex-1 flex flex-col bg-zinc-950 border border-zinc-900 relative overflow-hidden">
        
        {/* Empty State */}
        {!videoUrl && !isGenerating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-700">
            <Video className="w-16 h-16 mb-4 opacity-20" />
            <p className="text-sm font-mono uppercase tracking-widest">No output generated</p>
          </div>
        )}

        {/* Loading State */}
        {isGenerating && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-10">
            <div className="w-64 h-1 bg-zinc-900 mb-6 overflow-hidden">
              <div className="h-full bg-white animate-progress-indeterminate"></div>
            </div>
            <p className="text-zinc-400 text-sm font-mono animate-pulse">{progressMsg}</p>
          </div>
        )}

        {/* Video Player */}
        {videoUrl && (
          <div className="relative w-full h-full flex items-center justify-center bg-black">
             <video 
              ref={videoRef}
              src={videoUrl} 
              controls 
              autoPlay 
              loop
              className="max-h-full max-w-full shadow-2xl"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button 
                onClick={handleDownload}
                className="p-2 bg-black/50 hover:bg-black text-white border border-white/20 hover:border-white rounded-full transition-all"
                title="Download Video"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes progress-indeterminate {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress-indeterminate {
          animation: progress-indeterminate 2s infinite linear;
        }
      `}</style>
    </div>
  );
};