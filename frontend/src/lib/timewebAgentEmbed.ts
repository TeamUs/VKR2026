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

/** Крестик в виджете не всегда вызывает window.twc_agent_close — смотрим iframe / большой fixed-слой с чатом. */
function isTimewebWidgetLikelyOpen(): boolean {
  for (const f of document.querySelectorAll('iframe')) {
    const src = f.getAttribute('src') || '';
    if (!src) continue;
    if (/timeweb|cloud-ai|api\/v1\/cloud-ai/i.test(src)) return true;
  }
  for (const el of Array.from(document.body.querySelectorAll('body > *'))) {
    if (!(el instanceof HTMLElement)) continue;
    if (getComputedStyle(el).position !== 'fixed') continue;
    const r = el.getBoundingClientRect();
    if (r.width < 200 || r.height < 200 || r.bottom < 30) continue;
    const t = el.innerText || '';
    if (t.includes('Введите сообщение') || t.includes('Задайте мне')) {
      return true;
    }
  }
  return false;
}

/** Метит первый реальный open — помогает, если панель не попала в селекторы выше. */
export function installTimewebOpenUserMarkerOnce(): void {
  const w = window as unknown as {
    __poizonicTwcOpenPatched?: boolean;
    twc_agent_open?: (...a: unknown[]) => unknown;
  };
  if (w.__poizonicTwcOpenPatched) return;
  if (typeof w.twc_agent_open !== 'function') return;
  w.__poizonicTwcOpenPatched = true;
  const orig = w.twc_agent_open;
  w.twc_agent_open = function (this: unknown, ...a: unknown[]) {
    (window as unknown as { __poizonicTwcUserOpened?: boolean }).__poizonicTwcUserOpened = true;
    return (orig as (...x: unknown[]) => unknown).apply(this, a);
  };
}

/**
 * Переход «панель была открыта → пропала» (крестик), с debounce, чтобы не ловить кратковременные глитчи.
 */
export function startTimewebWidgetDomCloseDetection(
  onUserClosed: () => void,
  debounceMs = 600
): () => void {
  if (!useTimewebScriptEmbed()) return () => undefined;
  let wasOpen = false;
  let closeTimer: number | null = null;
  const tick = () => {
    const open = isTimewebWidgetLikelyOpen();
    if (open) {
      wasOpen = true;
      if (closeTimer != null) {
        window.clearTimeout(closeTimer);
        closeTimer = null;
      }
    } else if (wasOpen) {
      if (closeTimer == null) {
        closeTimer = window.setTimeout(() => {
          closeTimer = null;
          if (!isTimewebWidgetLikelyOpen()) {
            wasOpen = false;
            onUserClosed();
          }
        }, debounceMs);
      }
    }
  };
  const pollId = window.setInterval(tick, 200);
  return () => {
    if (closeTimer != null) window.clearTimeout(closeTimer);
    if (pollId != null) window.clearInterval(pollId);
  };
}

function installTimewebPostMessageCloseListener(notify: () => void): () => void {
  const h = (e: MessageEvent) => {
    const o = String(e.origin || '');
    if (!o.includes('timeweb.cloud') && !o.includes('timeweb.com')) return;
    const d = e.data;
    if (d == null || typeof d !== 'object') return;
    const r = d as { type?: string; event?: string; action?: string; state?: string };
    const t = [r.type, r.event, r.action, r.state]
      .map(x => (x == null ? '' : String(x)))
      .join(' ');
    if (t && /close|hidden|minimize|closed/i.test(t)) {
      notify();
    }
  };
  window.addEventListener('message', h);
  return () => window.removeEventListener('message', h);
}

/**
 * «Крестик» часто не вызывает window.twc_agent_close — дублируем выход: DOM (iframe исчез) + postMessage.
 * Все пути ведут в одно событие, которое ловит AiAssistant.
 */
export function startTimewebUserExitStrategies(): () => void {
  if (!useTimewebScriptEmbed()) return () => undefined;
  const report = () => {
    window.dispatchEvent(new CustomEvent(TIMWEB_USER_CLOSE_EVENT));
  };
  const a = startTimewebWidgetDomCloseDetection(report);
  const b = installTimewebPostMessageCloseListener(report);
  return () => {
    a();
    b();
  };
}

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
    installTimewebOpenUserMarkerOnce();
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
