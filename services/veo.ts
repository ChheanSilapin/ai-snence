import { VideoGenerationConfig } from "../types";

export const generateVideo = async (
  config: VideoGenerationConfig,
  onProgress: (msg: string) => void
): Promise<string> => {
  // SIMULATION MODE
  // This replaces the actual Google Veo API call with a mock delay and sample video.
  
  const steps = [
    "Initializing simulation...",
    "Parsing prompts...",
    "Mocking pixels...",
    "Composing static frames...",
    "Rendering light and shadow...",
    "Finalizing demo output..."
  ];

  for (const step of steps) {
    onProgress(step);
    // Simulate processing time (1 second per step)
    await new Promise(resolve => setTimeout(resolve, 800));
  }

  // Return a sample video URL (Big Buck Bunny or similar open source sample)
  // Using a reliable sample video for the static demo
  return "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4";
};