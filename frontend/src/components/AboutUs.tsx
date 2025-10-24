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
  line-height: 1.7;
  margin-bottom: 20px;
  font-size: 1.1rem;
  text-align: justify;
  text-justify: inter-word;
  max-width: 100%;
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 16px;
    text-align: left;
  }
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 16px;
`;

const FeatureIcon = styled.span`
  font-size: 1.8rem;
  flex-shrink: 0;
  margin-top: 4px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, 
    rgba(162, 59, 59, 0.1), 
    rgba(157, 78, 61, 0.05)
  );
  border-radius: 50%;
  border: 2px solid rgba(162, 59, 59, 0.2);
  
  @media (max-width: 480px) {
    font-size: 1.5rem;
    width: 40px;
    height: 40px;
  }
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px 24px;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.05), 
    rgba(255, 255, 255, 0.02)
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(162, 59, 59, 0.2);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.05),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, 
      var(--matte-red), 
      var(--terracotta), 
      var(--matte-red)
    );
    opacity: 0;
    transition: all 0.4s ease;
    border-radius: 20px 20px 0 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(162, 59, 59, 0.1) 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    transform: translateY(-50%);
  }
  
  &:hover {
    transform: translateY(-4px) scale(1.02);
    border-color: var(--matte-red);
    box-shadow: 
      0 12px 40px rgba(162, 59, 59, 0.2),
      0 6px 20px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    
    &::before {
      opacity: 1;
      height: 4px;
    }
    
    &::after {
      opacity: 1;
    }
    
    ${FeatureIcon} {
      transform: scale(1.1) rotate(5deg);
      background: linear-gradient(135deg, 
        rgba(162, 59, 59, 0.2), 
        rgba(157, 78, 61, 0.1)
      );
      border-color: var(--matte-red);
    }
  }
  
  @media (max-width: 480px) {
    padding: 16px 20px;
    gap: 12px;
    border-radius: 16px;
  }
`;

const FeatureText = styled.div`
  flex: 1;
  color: var(--text-primary);
  font-size: 1.05rem;
  line-height: 1.6;
  font-weight: 500;
  
  strong {
    color: var(--matte-red);
    font-weight: 700;
    font-size: 1.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    
    strong {
      font-size: 1rem;
    }
  }
`;

const ContactSection = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const ContactButton = styled.button<{ $isDark?: boolean }>`
  background: var(--matte-red);
  border: 1px solid var(--matte-red);
  border-radius: 12px;
  padding: 10px 18px;
  color: ${props => props.$isDark ? 'black' : 'white'};
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


const ContactRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 16px 20px;
  background: var(--bg-secondary);
  border: 2px solid var(--matte-red);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 0 10px rgba(162, 59, 59, 0.3),
    0 0 20px rgba(162, 59, 59, 0.1),
    inset 0 0 10px rgba(162, 59, 59, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    background: var(--bg-card);
    border-color: var(--matte-red);
    box-shadow: 
      0 0 15px rgba(162, 59, 59, 0.5),
      0 0 30px rgba(162, 59, 59, 0.2),
      0 4px 16px var(--shadow-card),
      0 2px 8px var(--shadow-soft),
      inset 0 0 15px rgba(162, 59, 59, 0.2);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: 480px) {
    padding: 12px 16px;
    margin-bottom: 16px;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 4px;
`;

const ContactLabel = styled.div`
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 600;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const ContactText = styled.div`
  color: var(--text-secondary);
  font-size: 1rem;
  
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
    {
      icon: '🚀',
      title: 'Быстрая доставка',
      description: 'средний срок доставки — около 20 дней'
    },
    {
      icon: '💰',
      title: 'Низкие цены',
      description: 'мы предлагаем конкурентные цены на товары, ниже, чем многие другие посредники'
    },
    {
      icon: '🔒',
      title: 'Гарантия качества',
      description: 'все оригинальные товары проходят строгую проверку перед отправкой!'
    },
    {
      icon: '🔝',
      title: 'Прозрачность',
      description: 'вы всегда знаете, что и за сколько покупаете. Совершенство в каждой детали!'
    },
    {
      icon: '👥',
      title: 'Поддержка на каждом этапе',
      description: 'от оформления заказа и до получения товара — мы всегда на связи!'
    },
    {
      icon: '📦',
      title: 'Функциональность',
      description: 'Мы также выкупаем товары со значком \'≈\' и поможем рассчитать их стоимость'
    }
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
              <FeatureItem key={index}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureText>
                  <strong>{feature.title}:</strong> {feature.description}
                </FeatureText>
              </FeatureItem>
            ))}
          </FeaturesList>
        </Section>

        <Section>
          <SectionTitle>Контакты</SectionTitle>
          <ContactRow>
            <ContactInfo>
              <ContactLabel>Менеджер</ContactLabel>
              <ContactText>Telegram: @poizonic_manager</ContactText>
            </ContactInfo>
            <ContactButton $isDark={isDark} onClick={handleContactManager}>
              Связаться
            </ContactButton>
          </ContactRow>
          <ContactRow>
            <ContactInfo>
              <ContactLabel>Менеджер по рекламе</ContactLabel>
              <ContactText>Telegram: @Egor_Bardin</ContactText>
            </ContactInfo>
            <ContactButton $isDark={isDark} onClick={handleContactAdManager}>
              Связаться
            </ContactButton>
          </ContactRow>
        </Section>
      </Content>
    </AboutContainer>
  );
};

export default AboutUs;