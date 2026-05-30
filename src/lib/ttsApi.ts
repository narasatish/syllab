/**
 * ttsApi — natural neural narration via the backend (Gemini TTS).
 *
 * The backend /api/tts endpoint:
 *   • (optionally) translates the text to the chosen language
 *   • generates natural speech with Gemini TTS
 *   • caches the audio in Firebase Storage and returns a URL
 *
 * The frontend just asks for a URL and plays it with an <audio> element.
 * If the backend is unavailable, callers fall back to the browser Web Speech API.
 */

import { API_URL } from './api';

export type TtsLang = 'en' | 'hi' | 'te' | 'ta' | 'kn';
export type TtsVoice = 'warm' | 'friendly' | 'calm' | 'bright';

export const TTS_LANGUAGES: { code: TtsLang; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi',   native: 'हिंदी' },
  { code: 'te', label: 'Telugu',  native: 'తెలుగు' },
  { code: 'ta', label: 'Tamil',   native: 'தமிழ்' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
];

// In-memory cache so the same slide isn't re-requested within a session
const memCache = new Map<string, string>();

/**
 * Request natural-voice audio for a piece of text. Returns a playable URL,
 * or null if the backend can't produce it (caller should fall back to Web Speech).
 */
export async function getNaturalAudioUrl(
  text: string,
  opts: { lang?: TtsLang; voice?: TtsVoice } = {},
): Promise<string | null> {
  const lang = opts.lang || 'en';
  const voice = opts.voice || 'warm';
  const clean = text.trim().slice(0, 800); // cap length for cost + latency
  if (!clean) return null;

  const key = `${lang}|${voice}|${clean}`;
  if (memCache.has(key)) return memCache.get(key)!;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 30000);
    const res = await fetch(`${API_URL}/api/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: clean, lang, voice }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = await res.json();
    const url: string | undefined = data?.url || data?.audioUrl;
    if (url) { memCache.set(key, url); return url; }
    // Some setups return base64 data instead of a URL
    if (data?.audioBase64) {
      const dataUrl = `data:${data.mime || 'audio/wav'};base64,${data.audioBase64}`;
      memCache.set(key, dataUrl);
      return dataUrl;
    }
    return null;
  } catch {
    return null; // network error / timeout → caller uses Web Speech fallback
  }
}
