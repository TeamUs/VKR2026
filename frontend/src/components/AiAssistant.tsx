import React, { useMemo } from 'react';
import styled from 'styled-components';

/**
 * Экран ИИ-помощника (на месте бывшего FAQ).
 * Встраивание: задайте VITE_AI_ASSISTANT_EMBED_URL на URL виджета/чата с Timeweb (или другого провайдера).
 * См. INTEGRATE_AI_ASSISTANT.md в корне mini_app_vkr.
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

const StyledIframe = styled.iframe`
  width: 100%;
  border: none;
  display: block;
  background: var(--bg-secondary);
`;

const PlaceholderCard = styled.div`
  margin: 0 16px;
  padding: 20px;
  border-radius: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.55;
  box-shadow: 0 2px 12px var(--shadow-soft);

  h2 {
    margin: 0 0 12px 0;
    font-size: 1.1rem;
    color: var(--text-primary);
  }
  ul {
    margin: 8px 0 0 18px;
    padding: 0;
  }
  code {
    font-family: ui-monospace, monospace;
    font-size: 0.82rem;
    background: var(--bg-secondary);
    padding: 2px 6px;
    border-radius: 6px;
  }
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
            // Разрешите нужные флаги, когда подключите реальный виджет (часто нужны scripts + forms).
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            referrerPolicy="no-referrer-when-downgrade"
            allow="clipboard-write; microphone *"
          />
        </EmbedWrap>
      ) : (
        <PlaceholderCard>
          <h2>Подключение ассистента</h2>
          <p>
            Сейчас чат не встроен: задайте переменную окружения при сборке фронта{' '}
            <code>VITE_AI_ASSISTANT_EMBED_URL</code> — полный URL страницы виджета (Timeweb AI / iframe).
          </p>
          <p style={{ marginTop: 10 }}>
            Опционально: <code>VITE_AI_ASSISTANT_EMBED_HEIGHT</code> — высота блока (CSS), по умолчанию{' '}
            <code>min(72vh, 640px)</code>.
          </p>
          <ul>
            <li>Создайте агента и получите URL для встраивания (iframe).</li>
            <li>Добавьте переменные в <code>.env.production</code> на сервере перед <code>npm run build</code>.</li>
            <li>Подробности — файл <code>INTEGRATE_AI_ASSISTANT.md</code> в проекте ВКР.</li>
          </ul>
        </PlaceholderCard>
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
