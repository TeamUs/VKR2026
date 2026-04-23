/** TimeWeb embed.js: предзагрузка и открытие по кнопке «ИИ-помощник». */

const DEFAULT_TIMEWEB_EMBED_SCRIPT =
  'https://timeweb.cloud/api/v1/cloud-ai/agents/545b3436-0c1a-423f-bfa2-a8445797a751/embed.js?collapsed=true';
const TIMWEB_EMBED_SCRIPT_ID = 'poizonic-timeweb-ai-embed-js';

let inFlight: Promise<void> | null = null;

function getAiAssistantIframeUrl(): string {
  return (import.meta.env.VITE_AI_ASSISTANT_EMBED_URL || '').trim();
}

export function useTimewebScriptEmbed(): boolean {
  return !getAiAssistantIframeUrl();
}

function getTimewebScriptUrl(): string {
  const fromEnv = (import.meta.env.VITE_TIMEWEB_AI_EMBED_SCRIPT || '').trim();
  return fromEnv || DEFAULT_TIMEWEB_EMBED_SCRIPT;
}

export function tryOpenTimewebAgent(): boolean {
  if (typeof window.twc_agent_open !== 'function') return false;
  try {
    window.twc_agent_open();
    return true;
  } catch {
    return false;
  }
}

let lastJitterCancel: (() => void) | null = null;

/**
 * Вставляет embed.js один раз и возвращает Promise по `load` (идемпотентно).
 */
export function ensureTimewebAgentScript(): Promise<void> {
  if (!useTimewebScriptEmbed()) {
    return Promise.resolve();
  }
  if (inFlight) return inFlight;

  const existing = document.getElementById(TIMWEB_EMBED_SCRIPT_ID) as HTMLScriptElement | null;
  if (existing) {
    if (existing.dataset.timewebReady === '1' || typeof window.twc_agent_open === 'function') {
      existing.dataset.timewebReady = '1';
      return Promise.resolve();
    }
    inFlight = new Promise((resolve, reject) => {
      const ok = () => {
        existing.dataset.timewebReady = '1';
        inFlight = null;
        resolve();
      };
      const bad = () => {
        inFlight = null;
        reject(new Error('Timeweb embed load failed'));
      };
      if (typeof window.twc_agent_open === 'function') {
        ok();
        return;
      }
      existing.addEventListener('load', ok, { once: true });
      existing.addEventListener('error', bad, { once: true });
    });
    return inFlight;
  }

  inFlight = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.id = TIMWEB_EMBED_SCRIPT_ID;
    s.async = true;
    s.src = getTimewebScriptUrl();
    s.onload = () => {
      s.dataset.timewebReady = '1';
      inFlight = null;
      resolve();
    };
    s.onerror = () => {
      inFlight = null;
      reject(new Error('Timeweb embed load failed'));
    };
    document.body.appendChild(s);
  });

  return inFlight;
}

/**
 * Сразу после клика «ИИ-помощник» — несколько попыток `twc_agent_open`, пока API не оживёт.
 * После первого успешного `open` остальные таймеры снимаются.
 */
export function scheduleTimewebAgentOpenJitter(): () => void {
  lastJitterCancel?.();
  lastJitterCancel = null;
  if (!useTimewebScriptEmbed()) return () => undefined;
  const delayMs = [0, 30, 80, 150, 300, 500, 800, 1200, 2000, 3500, 5000, 7000];
  const ids: number[] = [];
  const fullCancel = () => {
    ids.forEach(tid => window.clearTimeout(tid));
    ids.length = 0;
    if (lastJitterCancel === fullCancel) lastJitterCancel = null;
  };
  delayMs.forEach(ms => {
    const tid = window.setTimeout(() => {
      if (tryOpenTimewebAgent()) {
        fullCancel();
      }
    }, ms);
    ids.push(tid);
  });
  lastJitterCancel = fullCancel;
  return fullCancel;
}
