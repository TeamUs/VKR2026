import React from 'react';
import styled, { keyframes } from 'styled-components';
import { HapticFeedback } from '../utils/hapticFeedback';

// Минималистичные анимации в стиле скандинавского минимализма
const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(8px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const subtleGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 8px rgba(139, 69, 19, 0.15);
  }
  50% { 
    box-shadow: 0 0 12px rgba(139, 69, 19, 0.25);
  }
`;

// Потрясающие технологичные компоненты в китайском стиле
const MainContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  position: relative;
  z-index: 1;
  padding: 0px;
  animation: ${fadeIn} 0.8s ease-out forwards;
  transition: all 0.5s ease;
  
  @media (max-width: 480px) {
    padding: 0px;
  }
`;


const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 450px;
  margin: 0 auto;
  padding-top: 0px;
  
  @media (max-width: 480px) {
    max-width: 400px;
    padding-top: 0px;
  }
`;

const DragonHeader = styled.div`
  margin-bottom: 10px;
  position: relative;
  
  @media (max-width: 480px) {
    margin-bottom: 8px;
  }
`;

// Убираем дракона из главного меню - он не нужен здесь

const titleGlow = keyframes`
  0% { 
    text-shadow: 0 0 20px var(--glow-terracotta);
    filter: brightness(1);
  }
  100% { 
    text-shadow: 0 0 35px var(--glow-terracotta), 0 0 50px var(--glow-red);
    filter: brightness(1.1);
  }
`;

const WelcomeTitle = styled.h1`
  position: relative;
  z-index: 2;
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 15px;
  letter-spacing: -0.02em;
  text-shadow: 0 0 20px var(--glow-terracotta);
  background: linear-gradient(45deg, var(--matte-red), var(--terracotta), var(--dark-beige));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: titleGlow 4s ease-in-out infinite alternate;
  
  @media (max-width: 480px) {
    font-size: 2.4rem;
    margin-bottom: 12px;
  }
`;

const WelcomeSubtitle = styled.p`
  position: relative;
  z-index: 2;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 40px;
  opacity: 1;
  font-weight: 500;
  line-height: 1.5;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 0 15px var(--glow-gold);
  padding: 0 20px;
  
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 30px;
    max-width: 280px;
    line-height: 1.4;
  }
`;

const AboutUsButton = styled.button`
  position: fixed;
  top: 10px;
  left: 20px;
  padding: 12px 20px;
  border: 1px solid var(--border-color);
  border-radius: 15px;
  background: var(--bg-card);
  color: var(--text-primary);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 12px var(--shadow-card),
    0 2px 6px var(--shadow-soft);
  backdrop-filter: blur(10px);
  letter-spacing: 0.02em;
  z-index: 1000;
  min-width: 80px;
  
  @media (max-width: 480px) {
    padding: 10px 16px;
    font-size: 0.9rem;
    top: 8px;
    left: 15px;
    min-width: 70px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 20px var(--shadow-card),
      0 3px 10px var(--shadow-soft);
    background: var(--sand);
    border-color: var(--matte-red);
    color: var(--text-primary);
  }
  
  &:active {
    transform: translateY(-1px);
    box-shadow: 
      0 4px 15px var(--shadow-card),
      0 2px 8px var(--shadow-soft);
  }
`;


const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 360px;
  margin: 0 auto;
  padding: 0 20px;
  justify-items: center;
  
  @media (max-width: 480px) {
    gap: 16px;
    max-width: 320px;
    padding: 0 15px;
  }
`;

const MenuButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  position: relative;
  z-index: 2;
  padding: 20px;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  background: ${props => props.$variant === 'primary' 
    ? 'var(--matte-red)' 
    : 'var(--bg-card)'};
  color: ${props => props.$variant === 'primary' ? 'var(--bg-primary)' : 'var(--text-primary)'};
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  backdrop-filter: blur(10px);
  letter-spacing: 0.02em;
  overflow: hidden;
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 480px) {
    width: 130px;
    height: 130px;
    padding: 18px;
    font-size: 0.95rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.$variant === 'primary' 
      ? 'linear-gradient(45deg, var(--matte-red), var(--terracotta), var(--dark-beige))'
      : 'linear-gradient(45deg, var(--dark-beige), var(--terracotta), var(--matte-red))'};
    border-radius: 16px;
    padding: 1px;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover {
    transform: translateY(-6px) scale(1.03);
    box-shadow: 
      0 12px 40px var(--shadow-card),
      0 6px 20px var(--shadow-soft);
    background: ${props => props.$variant === 'primary' 
      ? 'var(--terracotta)' 
      : 'rgba(164, 151, 132, 0.3)'};
    border-color: var(--matte-red);
    color: ${props => props.$variant === 'primary' ? 'var(--bg-primary)' : 'var(--text-primary)'};
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:active {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 
      0 8px 30px var(--shadow-card),
      0 4px 15px var(--shadow-soft);
  }
`;

const ButtonIcon = styled.span<{ $isDark?: boolean }>`
  display: block;
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: inherit;
  opacity: 0.9;
  text-shadow: 0 0 10px currentColor;
  transition: all 0.3s ease;
  filter: ${props => props.$isDark ? 'brightness(2.5) contrast(1.5) saturate(1.2)' : 'none'};
  
  @media (max-width: 480px) {
    font-size: 2.3rem;
    margin-bottom: 8px;
  }
  
  ${MenuButton}:hover & {
    transform: scale(1.1);
    opacity: 1;
    text-shadow: 0 0 15px currentColor;
  }
`;

const ButtonText = styled.span`
  display: block;
  font-size: 1.05rem;
  line-height: 1.3;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-align: center;
  transition: all 0.3s ease;
  
  @media (max-width: 480px) {
    font-size: 0.95rem;
    line-height: 1.2;
  }
  
  ${MenuButton}:hover & {
    transform: translateY(-2px);
    color: var(--text-primary);
  }
`;

const ChineseAccent = styled.div`
  position: absolute;
  top: 11px;
  right: 11px;
  font-family: 'Noto Sans SC', serif;
  font-size: 1.25rem;
  opacity: 0.8;
  color: var(--text-primary);
  font-weight: 700;
  transition: all 0.3s ease;
  
  @media (max-width: 480px) {
    top: 9px;
    right: 9px;
    font-size: 1.15rem;
  }
  
  ${MenuButton}:hover & {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const ThemeToggle = styled.div`
  position: fixed;
  top: 10px;
  right: 20px;
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
  z-index: 1000;

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

interface MainMenuProps {
  onNavigate: (view: string) => void;
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNavigate, toggleTheme, isDarkTheme }) => {
  const handleButtonClick = (view: string) => {
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }
    onNavigate(view);
  };

  return (
    <MainContainer className="main-container">
      {/* Декоративные элементы */}
      <div className="mystic-seal" style={{top: '8%', left: '3%'}}></div>
      <div className="mystic-seal" style={{bottom: '12%', right: '5%'}}></div>
      <div className="mystic-seal" style={{top: '50%', left: '2%', transform: 'rotate(45deg) scale(0.7)'}}></div>
      <div className="mystic-seal" style={{top: '30%', right: '2%', transform: 'rotate(-45deg) scale(0.8)'}}></div>
      
      <ContentWrapper>
        <DragonHeader>
          <WelcomeTitle>poizonic</WelcomeTitle>
        </DragonHeader>
        <WelcomeSubtitle>Доставляем оригинальные товары из Китая с гарантией качества и прозрачными ценами</WelcomeSubtitle>
        
        <MenuGrid>
          <MenuButton 
            $variant="primary" 
            onClick={() => handleButtonClick('order')}
          >
            <ButtonIcon>🏮</ButtonIcon>
            <ButtonText>Сделать заказ</ButtonText>
            <ChineseAccent>福</ChineseAccent>
          </MenuButton>
          
          <MenuButton onClick={() => handleButtonClick('calculator')}>
            <ButtonIcon>💰</ButtonIcon>
            <ButtonText>Расчет стоимости</ButtonText>
            <ChineseAccent>財</ChineseAccent>
          </MenuButton>
          
          <MenuButton onClick={() => handleButtonClick('tracking')}>
            <ButtonIcon>📦</ButtonIcon>
            <ButtonText>Отследить заказ</ButtonText>
            <ChineseAccent>追</ChineseAccent>
          </MenuButton>
          
          <MenuButton onClick={() => handleButtonClick('referral')}>
            <ButtonIcon>🔗</ButtonIcon>
            <ButtonText>Реферальная система</ButtonText>
            <ChineseAccent>運</ChineseAccent>
          </MenuButton>
          
          <MenuButton onClick={() => handleButtonClick('faq')}>
            <ButtonIcon>❓</ButtonIcon>
            <ButtonText>FAQ</ButtonText>
            <ChineseAccent>智</ChineseAccent>
          </MenuButton>
          
          <MenuButton onClick={() => handleButtonClick('instructions')}>
            <ButtonIcon>📖</ButtonIcon>
            <ButtonText>Инструкции</ButtonText>
            <ChineseAccent>學</ChineseAccent>
          </MenuButton>
          
          <MenuButton onClick={() => handleButtonClick('exchange-rate')}>
            <ButtonIcon>📊</ButtonIcon>
            <ButtonText>Курс юаня</ButtonText>
            <ChineseAccent>匯</ChineseAccent>
          </MenuButton>
          
          <MenuButton onClick={() => handleButtonClick('reviews')}>
            <ButtonIcon>⭐</ButtonIcon>
            <ButtonText>Отзывы</ButtonText>
            <ChineseAccent>譽</ChineseAccent>
          </MenuButton>
        </MenuGrid>
      </ContentWrapper>
      
      <AboutUsButton onClick={() => handleButtonClick('about')}>
        О нас
      </AboutUsButton>
      
      <ThemeToggle onClick={toggleTheme}>
        <ToggleIcon $isDark={isDarkTheme}>🌙</ToggleIcon>
        <ToggleIconDark $isDark={isDarkTheme}>☀️</ToggleIconDark>
        <ToggleSlider $isDark={isDarkTheme}></ToggleSlider>
      </ThemeToggle>
    </MainContainer>
  );
};

export default MainMenu;