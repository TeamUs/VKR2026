import React from 'react';
import styled, { keyframes } from 'styled-components';
import { HapticFeedback } from '../utils/hapticFeedback';

// Минималистичные анимации в стиле приложения
const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;


// Стилизованные компоненты
const AboutContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  padding: 0px 0px 100px 0px;
  position: relative;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeIn} 0.8s ease-out forwards;
  
  @media (max-width: 480px) {
    padding: 0px;
  }
`;


const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  margin-top: 0px;
  position: relative;
  padding: 0 16px;
  
  @media (max-width: 480px) {
    margin-top: 0px;
    margin-bottom: 20px;
  }
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  line-height: 1;
  padding: 0;
  margin: 0;
  margin-left: 0px;
  
  @media (max-width: 480px) {
    margin-left: 0px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    background: var(--sand);
    border-color: var(--matte-red);
    color: var(--text-primary);
  }
`;

const Title = styled.h1`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  flex: 1;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Content = styled.div`
  max-width: 450px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 480px) {
    max-width: 400px;
    padding: 0 16px;
  }
`;

const Section = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 25px;
  margin-bottom: 24px;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${fadeIn} 0.6s ease-out forwards;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 30px var(--shadow-card),
      0 4px 12px var(--shadow-soft);
    border-color: var(--matte-red);
  }
  
  @media (max-width: 480px) {
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 12px;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  color: var(--text-primary);
  margin-bottom: 16px;
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 12px;
  }
`;

const SectionDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
  font-size: 1rem;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 16px;
  }
`;

const FeaturesList = styled.ul`
  color: var(--text-secondary);
  line-height: 1.6;
  padding-left: 20px;
  margin: 0;
`;

const FeatureItem = styled.li`
  margin-bottom: 12px;
  font-size: 1rem;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 10px;
  }
`;

const ContactSection = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const ContactButton = styled.button`
  background: var(--matte-red);
  border: 1px solid var(--matte-red);
  border-radius: 12px;
  padding: 10px 18px;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 4px 12px var(--shadow-card),
    0 2px 6px var(--shadow-soft);
  margin-left: 16px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 20px var(--shadow-card),
      0 3px 10px var(--shadow-soft);
    background: var(--terracotta);
    border-color: var(--terracotta);
  }
  
  @media (max-width: 480px) {
    padding: 8px 14px;
    font-size: 0.8rem;
    margin-left: 12px;
  }
`;

const ContactInfo = styled.div`
  color: var(--text-secondary);
  margin-bottom: 15px;
  font-size: 1rem;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ContactRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 16px 20px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
    background: var(--bg-card);
    border-color: var(--matte-red);
    box-shadow: 
      0 4px 16px var(--shadow-card),
      0 2px 8px var(--shadow-soft);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    padding: 12px 16px;
    margin-bottom: 16px;
  }
`;

const ContactText = styled.div`
  color: var(--text-secondary);
  font-size: 1rem;
  flex: 1;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ThemeToggle = styled.div`
  width: 60px;
  height: 30px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 
    0 4px 12px var(--shadow-card),
    0 2px 6px var(--shadow-soft);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 2px;
  margin-right: 0px;
  
  @media (max-width: 480px) {
    margin-right: 0px;
  }

  &:hover {
    box-shadow: 
      0 6px 20px var(--shadow-card),
      0 3px 10px var(--shadow-soft);
  }
`;

const ToggleSlider = styled.div<{ $isDark: boolean }>`
  width: 24px;
  height: 24px;
  background: ${props => props.$isDark ? 'var(--matte-red)' : 'var(--terracotta)'};
  border-radius: 50%;
  transition: all 0.3s ease;
  transform: ${props => props.$isDark ? 'translateX(30px)' : 'translateX(0px)'};
  box-shadow: 0 2px 6px var(--shadow-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: var(--bg-primary);
`;

const ToggleIcon = styled.span<{ $isDark: boolean }>`
  opacity: ${props => props.$isDark ? 1 : 0};
  transition: opacity 0.3s ease;
  position: absolute;
  left: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`;

const ToggleIconDark = styled.span<{ $isDark: boolean }>`
  opacity: ${props => props.$isDark ? 0 : 1};
  transition: opacity 0.3s ease;
  position: absolute;
  right: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`;

interface AboutUsProps {
  onNavigate: (view: string) => void;
  isDark?: boolean;
  onToggleTheme?: () => void;
}

const AboutUs: React.FC<AboutUsProps> = ({ onNavigate, isDark = true, onToggleTheme }) => {
  const handleContactManager = () => {
    if (window.Telegram?.WebApp?.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink('https://t.me/poizonic_manager');
    }
  };

  const handleContactAdManager = () => {
    if (window.Telegram?.WebApp?.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink('https://t.me/Egor_Bardin');
    }
  };

  const features = [
    '🚀 Быстрая доставка: средний срок доставки — около 15 дней',
    '💰 Низкие цены: мы предлагаем конкурентные цены на товары, ниже, чем многие другие посредники',
    '🔒 Гарантия качества: все оригинальные товары проходят строгую проверку перед отправкой!',
    '🔝 Прозрачность: вы всегда знаете, что и за сколько покупаете. Совершенство в каждой детали!',
    '👥 Поддержка на каждом этапе: от оформления заказа и до получения товара — мы всегда на связи!',
    '📦 Функциональность: Мы также выкупаем товары со значком \'≈\' и поможем рассчитать их стоимость'
  ];

  return (
    <AboutContainer>
      <Header>
        <BackButton onClick={() => onNavigate('main')}>
          ‹
        </BackButton>
        <Title>О нас</Title>
        <ThemeToggle onClick={onToggleTheme}>
          <ToggleIcon $isDark={isDark}>🌙</ToggleIcon>
          <ToggleIconDark $isDark={isDark}>☀️</ToggleIconDark>
          <ToggleSlider $isDark={isDark}></ToggleSlider>
        </ThemeToggle>
      </Header>

      <Content>
        <Section>
          <SectionTitle>Poizonic</SectionTitle>
          <SectionDescription>
            Добро пожаловать в мир качественных оригинальных товаров с Poizon! Мы — ваш надежный посредник для заказа товаров с китайского маркетплейса Poizon, специализирующийся на оригинальных брендовых товарах.
          </SectionDescription>
        </Section>

        <Section>
          <SectionTitle>Наши преимущества</SectionTitle>
          <FeaturesList>
            {features.map((feature, index) => (
              <FeatureItem key={index}>{feature}</FeatureItem>
            ))}
          </FeaturesList>
        </Section>

        <Section>
          <SectionTitle>Контакты</SectionTitle>
          <ContactRow>
            <ContactText>Telegram: @poizonic_manager</ContactText>
            <ContactButton onClick={handleContactManager}>
              Связаться
            </ContactButton>
          </ContactRow>
          <ContactRow>
            <ContactText>Telegram: @Egor_Bardin</ContactText>
            <ContactButton onClick={handleContactAdManager}>
              Связаться
            </ContactButton>
          </ContactRow>
        </Section>
      </Content>
    </AboutContainer>
  );
};

export default AboutUs;