import { useState, useEffect, useRef } from 'react';
import { SpeechSynthesisDetails, useSpeechSynthesisProps } from '../types';

function useSpeechSynthesis({
  onStart,
  onEnd,
  onError,
  rate = 1,
  pitch = 1,
  volume = 1,
  voiceURI,
}: useSpeechSynthesisProps = {}): SpeechSynthesisDetails {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const handleVoicesChanged = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    if ('speechSynthesis' in window) {
      window.speechSynthesis.addEventListener(
        'voiceschanged',
        handleVoicesChanged
      );
      handleVoicesChanged();
    } else {
      console.warn('SpeechSynthesis API is not supported in this browser.');
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.removeEventListener(
          'voiceschanged',
          handleVoicesChanged
        );
      }
    };
  }, []);

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis API is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      console.warn('Speech is already in progress.');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    if (voiceURI) {
      const selectedVoice = voices.find((voice) => voice.voiceURI === voiceURI);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      } else {
        console.warn(
          'Specified voiceURI not found. Default voice will be used.'
        );
      }
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      onStart?.();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      onEnd?.();
    };

    utterance.onerror = (event) => {
      setIsSpeaking(false);
      onError?.(event);
    };

    window.speechSynthesis.speak(utterance);
  };

  const cancel = () => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return {
    speak,
    cancel,
    isSpeaking,
    voices,
  };
}

export default useSpeechSynthesis;
