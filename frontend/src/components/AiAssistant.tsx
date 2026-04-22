import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

/** Скрипт с панели TimeWeb «Вставка»; collapsed=true + явный twc_agent_open() после загрузки (как в примере). */
const DEFAULT_TIMEWEB_EMBED_SCRIPT =
  'https://timeweb.cloud/api/v1/cloud-ai/agents/545b3436-0c1a-423f-bfa2-a8445797a751/embed.js?collapsed=true';
const TIMWEB_EMBED_SCRIPT_ID = 'poizonic-timeweb-ai-embed-js';
const TW_OPEN_POLL_MS = 200;
const TW_OPEN_MAX_ATTEMPTS = 50;

/**
 * Экран ИИ-помощника.
 * · TimeWeb: подключается embed.js, после onload вызывается window.twc_agent_open() (иначе панель может остаться свёрнутой).
 * · VITE_TIMEWEB_AI_EMBED_SCRIPT — полный URL из вкладки «Вставка».
 * · VITE_AI_ASSISTANT_EMBED_URL — приоритетно: вместо скрипта используется iframe.
 */

const Page = styled.div`
  min-height: 100vh;
  background: transparent;
  padding: 0 0 100px 0;
  position: relative;
  z-index: 1;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 0 16px;
  position: relative;
  z-index: 20;
`;

const BackButton = styled.button`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  line-height: 1;
  padding: 0;
  &:hover {
    transform: translateY(-2px);
    background: var(--sand);
    border-color: var(--matte-red);
  }
`;

const TitleBlock = styled.div`
  flex: 1;
  text-align: center;
  padding: 0 8px;
`;

const Title = styled.h1`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.45rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 4px 0;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.35;
`;

const ThemeToggle = styled.div`
  position: relative;
  width: 60px;
  height: 30px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 2px;
  box-shadow: 0 4px 12px var(--shadow-card);
`;

const ToggleSlider = styled.div<{ $isDark: boolean }>`
  width: 24px;
  height: 24px;
  background: ${props => (props.$isDark ? 'var(--matte-red)' : 'var(--terracotta)')};
  border-radius: 50%;
  transition: transform 0.3s ease;
  transform: ${props => (props.$isDark ? 'translateX(30px)' : 'translateX(0)')};
`;

const ToggleIcon = styled.span<{ $isDark: boolean }>`
  opacity: ${props => (props.$isDark ? 1 : 0)};
  transition: opacity 0.3s ease;
  position: absolute;
  left: 8px;
  font-size: 0.7rem;
`;

const ToggleIconDark = styled.span<{ $isDark: boolean }>`
  opacity: ${props => (props.$isDark ? 0 : 1)};
  transition: opacity 0.3s ease;
  position: absolute;
  right: 8px;
  font-size: 0.7rem;
`;

const EmbedWrap = styled.div<{ $clip?: boolean }>`
  margin: 0 16px;
  border-radius: 16px;
  overflow: ${p => (p.$clip ? 'hidden' : 'visible')};
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  min-height: min(72vh, 640px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  position: relative;
`;

const ScriptEmbedPanel = styled.div`
  min-height: min(64vh, 580px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 16px 28px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
`;

const EmbedNote = styled.p`
  margin: 0;
  max-width: 32rem;
  code {
    font-family: ui-monospace, monospace;
    font-size: 0.82em;
    background: var(--bg-secondary);
    padding: 2px 6px;
    border-radius: 6px;
  }
`;

const StyledIframe = styled.iframe`
  width: 100%;
  border: none;
  display: block;
  background: var(--bg-secondary);
`;

const ContactSection = styled.div`
  margin: 16px 16px 0;
  padding: 14px;
  border-radius: 16px;
  border: 2px solid var(--matte-red);
  text-align: center;
  background: transparent;
`;

const ContactButton = styled.button`
  margin-top: 10px;
  background: var(--matte-red);
  border: none;
  border-radius: 12px;
  padding: 10px 18px;
  color: var(--bg-primary);
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: var(--terracotta);
  }
`;

const OpenChatButton = styled.button`
  margin-top: 16px;
  background: var(--terracotta);
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  color: var(--bg-primary);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 4px 12px var(--shadow-card);
  &:hover {
    filter: brightness(1.05);
  }
`;

interface AiAssistantProps {
  onNavigate: (view: string) => void;
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const AiAssistant: React.FC<AiAssistantProps> = ({ onNavigate, toggleTheme, isDarkTheme }) => {
  const embedUrl = useMemo(
    () => (import.meta.env.VITE_AI_ASSISTANT_EMBED_URL || '').trim(),
    []
  );
  const timewebScriptUrl = useMemo(() => {
    const fromEnv = (import.meta.env.VITE_TIMEWEB_AI_EMBED_SCRIPT || '').trim();
    return fromEnv || DEFAULT_TIMEWEB_EMBED_SCRIPT;
  }, []);
  const embedHeight = useMemo(
    () => import.meta.env.VITE_AI_ASSISTANT_EMBED_HEIGHT || 'min(72vh, 640px)',
    []
  );
  const [scriptEmbedError, setScriptEmbedError] = useState<string | null>(null);

  const callTimewebOpen = useCallback((): boolean => {
    if (typeof window.twc_agent_open !== 'function') return false;
    try {
      window.twc_agent_open();
      return true;
    } catch {
      return false;
    }
  }, []);

  const handleOpenChat = useCallback(() => {
    if (callTimewebOpen()) {
      setScriptEmbedError(null);
      return;
    }
    setScriptEmbedError(
      'Чат ещё не готов (twc_agent_open). Подождите пару секунд или убедитесь, что домен страницы совпадает с разрешённым в TimeWeb (включая www / поддомен).'
    );
  }, [callTimewebOpen]);

  useEffect(() => {
    if (embedUrl) return;

    setScriptEmbedError(null);
    document.getElementById(TIMWEB_EMBED_SCRIPT_ID)?.remove();

    let pollId: number | null = null;

    const startOpenPolling = () => {
      if (callTimewebOpen()) return;
      let n = 0;
      pollId = window.setInterval(() => {
        n += 1;
        if (callTimewebOpen() || n >= TW_OPEN_MAX_ATTEMPTS) {
          if (pollId != null) window.clearInterval(pollId);
          pollId = null;
        }
      }, TW_OPEN_POLL_MS);
    };

    const s = document.createElement('script');
    s.id = TIMWEB_EMBED_SCRIPT_ID;
    s.async = true;
    s.src = timewebScriptUrl;
    s.onload = () => {
      if (!callTimewebOpen()) startOpenPolling();
    };
    s.onerror = () =>
      setScriptEmbedError('Не удалось загрузить скрипт embed.js. Проверьте сеть, HTTPS и разрешённые домены в панели TimeWeb AI.');

    document.body.appendChild(s);

    return () => {
      if (pollId != null) window.clearInterval(pollId);
      s.onerror = null;
      s.onload = null;
      try {
        window.twc_agent_close?.();
      } catch {
        /* ignore */
      }
      s.remove();
    };
  }, [embedUrl, timewebScriptUrl, callTimewebOpen]);

  const handleContactManager = () => {
    if (window.Telegram?.WebApp?.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink('https://t.me/poizonic_manager');
    }
  };

  return (
    <Page>
      <Header>
        <BackButton type="button" onClick={() => onNavigate('main')} aria-label="Назад">
          ‹
        </BackButton>
        <TitleBlock>
          <Title>ИИ-помощник</Title>
          <Subtitle>Ответы по доставке и сервису · база знаний</Subtitle>
        </TitleBlock>
        <ThemeToggle onClick={toggleTheme} role="button" aria-label="Тема">
          <ToggleIcon $isDark={isDarkTheme}>🌙</ToggleIcon>
          <ToggleIconDark $isDark={isDarkTheme}>☀️</ToggleIconDark>
          <ToggleSlider $isDark={isDarkTheme} />
        </ThemeToggle>
      </Header>

      {embedUrl ? (
        <EmbedWrap $clip>
          <StyledIframe
            title="ИИ-помощник"
            src={embedUrl}
            style={{ height: embedHeight, minHeight: '320px' }}
            // Разрешите нужные флаги, когда подключите реальный виджет (часто нужны scripts + forms).
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            referrerPolicy="no-referrer-when-downgrade"
            allow="clipboard-write; microphone *"
          />
        </EmbedWrap>
      ) : (
        <EmbedWrap>
          <ScriptEmbedPanel>
            <EmbedNote>
              Окно чата TimeWeb открывается поверх экрана. Если панель не появилась, нажмите кнопку ниже — в панели агента
              тот же вызов, что <code>twc_agent_open()</code>. В разделе «Домены» укажите <strong>точный</strong> хост
              (например, <code>www.poizonic.ru</code> и <code>poizonic.ru</code> — это разные записи) и тот, с которого
              открыт Web App в настройках бота.
            </EmbedNote>
            <OpenChatButton type="button" onClick={handleOpenChat}>
              Открыть чат
            </OpenChatButton>
            {scriptEmbedError && (
              <EmbedNote
                style={{ marginTop: 12, color: 'var(--matte-red, #c45)' }}
                role="alert"
              >
                {scriptEmbedError}
              </EmbedNote>
            )}
          </ScriptEmbedPanel>
        </EmbedWrap>
      )}

      <ContactSection>
        <Subtitle style={{ color: 'var(--text-primary)' }}>Нужен менеджер?</Subtitle>
        <ContactButton type="button" onClick={handleContactManager}>
          Написать в Telegram
        </ContactButton>
      </ContactSection>
    </Page>
  );
};

export default AiAssistant;
