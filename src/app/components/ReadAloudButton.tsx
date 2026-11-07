'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SupportedLanguage } from '../config/languages';
import { pickVoice, speechLocale, toSpeechText } from '../lib/speech';

interface ReadAloudButtonProps {
  /** Rule strings to read in order; may contain HTML and emoji. */
  segments: string[];
  language: SupportedLanguage;
  /** Emoji to speak as words, e.g. the Joker card's emoji. */
  emojiNames?: Record<string, string>;
  label: string;
  stopLabel: string;
  className?: string;
}

const hasSpeech = () => typeof window !== 'undefined' && 'speechSynthesis' in window;

/**
 * Reads the given rules aloud with the browser's built-in speech synthesis.
 * Renders nothing when the browser lacks speech synthesis or has no voice for the language.
 */
const ReadAloudButton: React.FC<ReadAloudButtonProps> = ({
  segments,
  language,
  emojiNames,
  label,
  stopLabel,
  className,
}) => {
  const [available, setAvailable] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  // Chrome garbage-collects utterances nobody references before their end event fires.
  const utterances = useRef<SpeechSynthesisUtterance[]>([]);

  useEffect(() => {
    if (!hasSpeech()) return;
    const synth = window.speechSynthesis;

    const update = () => {
      const voices = synth.getVoices();
      // An empty list usually means the browser has not loaded its voices yet, so stay optimistic.
      setAvailable(voices.length === 0 || pickVoice(voices, language) !== null);
    };

    update();
    synth.addEventListener('voiceschanged', update);
    return () => synth.removeEventListener('voiceschanged', update);
  }, [language]);

  const stop = useCallback(() => {
    // Detach handlers first so the cancelled utterances cannot flip the state afterwards.
    utterances.current.forEach(utterance => {
      utterance.onend = null;
      utterance.onerror = null;
    });
    utterances.current = [];
    if (hasSpeech()) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  // Stop when the language changes or the button goes away, e.g. when the popup closes.
  useEffect(() => stop, [language, stop]);

  const speak = () => {
    stop();
    const synth = window.speechSynthesis;
    const voice = pickVoice(synth.getVoices(), language);
    const texts = segments.map(segment => toSpeechText(segment, emojiNames)).filter(Boolean);
    if (texts.length === 0) return;

    // One utterance per rule: Chrome cuts off single utterances that run longer than about 15 seconds.
    utterances.current = texts.map(text => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = voice?.lang ?? speechLocale(language);
      if (voice) utterance.voice = voice;
      utterance.onerror = event => {
        // "interrupted" and "canceled" are the normal outcome of stop(); anything else aborts the rest.
        if (event.error !== 'interrupted' && event.error !== 'canceled') synth.cancel();
        setSpeaking(false);
      };
      return utterance;
    });
    utterances.current[utterances.current.length - 1].onend = () => setSpeaking(false);

    setSpeaking(true);
    utterances.current.forEach(utterance => synth.speak(utterance));
  };

  if (!available) return null;

  const currentLabel = speaking ? stopLabel : label;

  return (
    <button
      type="button"
      onClick={speaking ? stop : speak}
      aria-label={currentLabel}
      title={currentLabel}
      className={`read-aloud-button ${className ?? ''}`.trim()}
    >
      <span aria-hidden="true">{speaking ? '⏹️' : '🔊'}</span>
    </button>
  );
};

export default ReadAloudButton;
