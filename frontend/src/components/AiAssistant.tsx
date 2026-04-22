import React, { useMemo } from 'react';
import styled from 'styled-components';

/**
 * Экран «ИИ-помощник» только в режиме iframe (VITE_AI_ASSISTANT_EMBED_URL).
 * Встроенный TimeWeb-скрипт: чат открывается с главного меню, без этого экрана (см. App navigateTo).
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

const EmbedWrap = styled.div`
  margin: 0 16px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  min-height: min(72vh, 640px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
`;

const Placeholder = styled.p`
  margin: 0 16px;
  padding: 20px;
  text-align: center;
  color: var(--text-secondary);
  line-height: 1.5;
  code {
    font-family: ui-monospace, monospace;
    font-size: 0.85em;
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

const Subtitle2 = styled.p`
  margin: 0;
  font-size: 0.85rem;
  color: var(--text-primary);
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
  const embedHeight = useMemo(
    () => import.meta.env.VITE_AI_ASSISTANT_EMBED_HEIGHT || 'min(72vh, 640px)',
    []
  );

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
        <EmbedWrap>
          <StyledIframe
            title="ИИ-помощник"
            src={embedUrl}
            style={{ height: embedHeight, minHeight: '320px' }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            referrerPolicy="no-referrer-when-downgrade"
            allow="clipboard-write; microphone *"
          />
        </EmbedWrap>
      ) : (
        <Placeholder>
          Не задан <code>VITE_AI_ASSISTANT_EMBED_URL</code>. С TimeWeb-скриптом чат открывается из главного меню без
          этого раздела.
        </Placeholder>
      )}

      <ContactSection>
        <Subtitle2>Нужен менеджер?</Subtitle2>
        <ContactButton type="button" onClick={handleContactManager}>
          Написать в Telegram
        </ContactButton>
      </ContactSection>
    </Page>
  );
};

export default AiAssistant;
