export interface VideoGenerationConfig {
  prompt: string;
  aspectRatio: '16:9' | '9:16';
  resolution: '720p' | '1080p';
  model: 'veo-3.1-fast-generate-preview' | 'veo-3.1-generate-preview';
}

export interface VideoGenerationResult {
  videoUrl: string;
  mimeType: string;
}

export interface GenerationStatus {
  isGenerating: boolean;
  message: string;
  error?: string;
}

// Augment the existing AIStudio interface to include the methods we need.
// This avoids conflicts with the existing window.aistudio declaration.
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
}
