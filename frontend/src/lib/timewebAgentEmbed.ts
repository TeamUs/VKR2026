/** Скрипт TimeWeb embed.js: предзагрузка и открытие при навигации «ИИ-помощник». */

const DEFAULT_TIMEWEB_EMBED_SCRIPT =
  'https://timeweb.cloud/api/v1/cloud-ai/agents/545b3436-0c1a-423f-bfa2-a8445797a751/embed.js?collapsed=true';
export const TIMWEB_EMBED_SCRIPT_ID = 'poizonic-timeweb-ai-embed-js';

let inFlight: Promise<void> | null = null;
/** true только при вызове tryCloseTimewebAgent (размонтирование / уход с экрана) — не путать с закрытием по крестику */
let twcCloseInitiatedByApp = false;

export function getAiAssistantIframeUrl(): string {
  return (import.meta.env.VITE_AI_ASSISTANT_EMBED_URL || '').trim();
}

export function useTimewebScriptEmbed(): boolean {
  return !getAiAssistantIframeUrl();
}

export function getTimewebScriptUrl(): string {
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

export function tryCloseTimewebAgent(): void {
  twcCloseInitiatedByApp = true;
  try {
    window.twc_agent_close?.();
  } catch {
    /* ignore */
  } finally {
    twcCloseInitiatedByApp = false;
  }
}

const TIMWEB_USER_CLOSE_EVENT = 'timeweb-embed-closed-by-user';

/** TimeWeb: один раз оборачиваем twc_agent_close, чтобы отличать закрытие из приложения от крестика в виджете. */
function installTimewebCloseUserHookOnce(): void {
  if (typeof window.twc_agent_close !== 'function') return;
  if ((window as unknown as { __twcCloseHookInstalled?: boolean }).__twcCloseHookInstalled) {
    return;
  }
  (window as unknown as { __twcCloseHookInstalled?: boolean }).__twcCloseHookInstalled = true;
  const orig = window.twc_agent_close;
  window.twc_agent_close = function (this: unknown, ...args: unknown[]) {
    const fromApp = twcCloseInitiatedByApp;
    const r = (orig as (...a: unknown[]) => unknown).apply(this, args);
    if (!fromApp) {
      window.dispatchEvent(new CustomEvent(TIMWEB_USER_CLOSE_EVENT));
    }
    return r;
  };
}

export const timewebUserCloseEvent = TIMWEB_USER_CLOSE_EVENT;

let lastJitterCancel: (() => void) | null = null;

export function cancelAllTimewebOpenJitter(): void {
  lastJitterCancel?.();
  lastJitterCancel = null;
}

let closeHookWatchId: number | null = null;

/**
 * Пока embed.js не положил twc_agent_close в window, опрашиваем и один раз ставим хук на «крестик».
 */
export function startWatchForTimewebCloseUserHook(maxMs = 15000): () => void {
  if (!useTimewebScriptEmbed()) return () => undefined;
  if (closeHookWatchId != null) {
    window.clearInterval(closeHookWatchId);
    closeHookWatchId = null;
  }
  const t0 = performance.now();
  const id = window.setInterval(() => {
    installTimewebCloseUserHookOnce();
    const w = window as unknown as { __twcCloseHookInstalled?: boolean };
    if (w.__twcCloseHookInstalled || performance.now() - t0 > maxMs) {
      window.clearInterval(id);
      if (closeHookWatchId === id) closeHookWatchId = null;
    }
  }, 200);
  closeHookWatchId = id;
  return () => {
    if (closeHookWatchId != null) {
      window.clearInterval(closeHookWatchId);
      closeHookWatchId = null;
    }
  };
}

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
 * После первого успешного `open` все оставшиеся таймеры снимаются (иначе через секунды чат откроется снова после крестика).
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

export function startTimewebOpenPoll(intervalMs = 200, maxAttempts = 50): (() => void) | null {
  if (!useTimewebScriptEmbed()) return null;
  if (tryOpenTimewebAgent()) {
    return () => undefined;
  }
  let n = 0;
  const pollId = window.setInterval(() => {
    n += 1;
    if (tryOpenTimewebAgent() || n >= maxAttempts) {
      if (pollId != null) window.clearInterval(pollId);
    }
  }, intervalMs);
  return () => {
    if (pollId != null) window.clearInterval(pollId);
  };
}
