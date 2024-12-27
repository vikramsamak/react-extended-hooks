export interface useSpeechSynthesisProps {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: SpeechSynthesisErrorEvent) => void;
  rate?: number;
  pitch?: number;
  volume?: number;
  voiceURI?: string;
}

export interface SpeechSynthesisDetails {
  isSpeaking: boolean;
  voices: SpeechSynthesisVoice[];
  speak: (text: string) => void;
  cancel: () => void;
}
