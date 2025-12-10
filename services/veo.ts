import { GoogleGenAI } from "@google/genai";
import { VideoGenerationConfig } from "../types";

// Helper to get a fresh AI client (needed to pick up potentially new API keys)
const getAiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found. Please select a key.");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateVideo = async (
  config: VideoGenerationConfig,
  onProgress: (msg: string) => void
): Promise<string> => {
  const ai = getAiClient();
  const { prompt, aspectRatio, resolution, model } = config;

  onProgress("Initializing generation request...");

  // 1. Start the operation
  let operation = await ai.models.generateVideos({
    model: model,
    prompt: prompt,
    config: {
      numberOfVideos: 1,
      resolution: resolution,
      aspectRatio: aspectRatio,
    },
  });

  onProgress("Request accepted. Rendering video...");

  // 2. Poll for completion
  // Veo generation can take a minute or more.
  const pollInterval = 5000; // 5 seconds
  const maxRetries = 60; // 5 minutes max roughly
  let attempts = 0;

  while (!operation.done && attempts < maxRetries) {
    await new Promise((resolve) => setTimeout(resolve, pollInterval));
    
    // Rotate messages to keep user engaged
    const messages = [
      "Dreaming up pixels...",
      "Composing frames...",
      "Rendering light and shadow...",
      "Almost there...",
      "Finalizing output...",
    ];
    onProgress(messages[attempts % messages.length]);
    
    // Refresh operation status
    operation = await ai.operations.getVideosOperation({ operation: operation });
    attempts++;
  }

  if (!operation.done) {
    throw new Error("Video generation timed out.");
  }

  if (operation.error) {
     throw new Error(`Generation failed: ${operation.error.message || 'Unknown error'}`);
  }

  // 3. Extract the URI
  const generatedVideo = operation.response?.generatedVideos?.[0];
  const downloadUri = generatedVideo?.video?.uri;

  if (!downloadUri) {
    throw new Error("No video URI returned from the API.");
  }

  onProgress("Downloading secure video stream...");

  // 4. Fetch the actual video content
  // We must append the API key to the fetch URL
  const apiKey = process.env.API_KEY;
  const response = await fetch(`${downloadUri}&key=${apiKey}`);

  if (!response.ok) {
    throw new Error(`Failed to download video: ${response.statusText}`);
  }

  const blob = await response.blob();
  return URL.createObjectURL(blob);
};