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

// Изящная анимация дыхания дракона
const dragonBreath = keyframes`
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 8px rgba(255, 107, 53, 0.4));
  }
  50% {
    transform: scale(1.02);
    filter: drop-shadow(0 0 12px rgba(255, 107, 53, 0.6));
  }
`;

// Мерцание глаз дракона
const dragonEyeGlow = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 3px rgba(255, 107, 53, 0.8)) drop-shadow(0 0 6px rgba(255, 107, 53, 0.4));
  }
  25% {
    filter: drop-shadow(0 0 8px rgba(255, 107, 53, 1)) drop-shadow(0 0 15px rgba(255, 107, 53, 0.7)) drop-shadow(0 0 25px rgba(255, 107, 53, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 5px rgba(255, 107, 53, 0.9)) drop-shadow(0 0 10px rgba(255, 107, 53, 0.5));
  }
  75% {
    filter: drop-shadow(0 0 7px rgba(255, 107, 53, 1)) drop-shadow(0 0 12px rgba(255, 107, 53, 0.6)) drop-shadow(0 0 20px rgba(255, 107, 53, 0.2));
  }
`;

// Плавное покачивание
const dragonSway = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(1deg);
  }
  75% {
    transform: rotate(-1deg);
  }
`;

// Потрясающие технологичные компоненты в китайском стиле
const MainContainer = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  background: transparent;
  position: relative;
  z-index: 1;
  padding: 0px;
  animation: ${fadeIn} 0.8s ease-out forwards;
  transition: all 0.5s ease;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  
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
  margin-top: 0px;
  
  @media (max-width: 480px) {
    max-width: 400px;
    padding-top: 0px;
    margin-top: 0px;
  }
`;

const DragonHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  margin-top: 10px;
  position: relative;
  
  @media (max-width: 480px) {
    margin-bottom: 3px;
    margin-top: 10px;
  }
`;

// Стилизованный компонент для изображения дракона
const DragonImage = styled.img`
  width: 120px;
  height: auto;
  margin-left: 20px;
  filter: drop-shadow(0 0 8px rgba(255, 107, 53, 0.4));
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 12px rgba(255, 107, 53, 0.6));
  }
  
  @media (max-width: 480px) {
    width: 90px;
    margin-left: 15px;
  }
`;

// Убираем дракона из главного меню - он не нужен здесь

const WelcomeTitle = styled.h1`
  position: relative;
  z-index: 2;
  font-family: 'Music Warrior', 'Noto Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif;
  font-size: 3rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 5px;
  letter-spacing: -0.02em;
  text-shadow: 0 0 20px rgba(162, 59, 59, 0.4);
  background: linear-gradient(90deg, 
    var(--matte-red) 0%, 
    var(--terracotta) 50%, 
    var(--dark-beige) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin: 0;
  margin-top: 12px;
  text-transform: uppercase;
  
  @media (max-width: 480px) {
    font-size: 2.6rem;
    margin-top: 10px;
  }
  
  @media (max-height: 700px) {
    font-size: 2.4rem;
    margin-top: 8px;
    margin-bottom: 3px;
  }
  
  @media (max-height: 700px) and (max-width: 480px) {
    font-size: 2rem;
  }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const WelcomeSubtitle = styled.p`
  position: relative;
  z-index: 2;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.95rem;
  color: var(--text-primary);
  margin-bottom: 25px;
  opacity: 1;
  font-weight: 500;
  line-height: 1.4;
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 0 15px var(--glow-gold);
  padding: 0 20px;
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 20px;
    max-width: 280px;
    line-height: 1.35;
  }
  
  @media (max-height: 700px) {
    margin-bottom: 15px;
    font-size: 0.85rem;
  }
`;

const AboutUsButton = styled.button<{ $isDark: boolean }>`
  position: fixed;
  top: 5px;
  left: 20px;
  padding: 6px 16px;
  border: 2px solid ${props => props.$isDark ? 'var(--matte-red)' : 'var(--terracotta)'};
  border-radius: 25px;
  background: ${props => props.$isDark 
    ? 'rgba(162, 59, 59, 0.1)' 
    : 'rgba(139, 69, 19, 0.08)'
  };
  color: var(--text-primary);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(15px);
  letter-spacing: 0.03em;
  z-index: 1000;
  min-width: 80px;
  box-shadow: ${props => props.$isDark 
    ? '0 0 20px rgba(162, 59, 59, 0.2), 0 4px 12px rgba(0, 0, 0, 0.1)' 
    : '0 0 15px rgba(139, 69, 19, 0.15), 0 4px 12px rgba(0, 0, 0, 0.05)'
  };
  position: relative;
  overflow: hidden;
  
  @media (max-width: 480px) {
    padding: 5px 12px;
    font-size: 0.9rem;
    top: 5px;
    left: 16px;
    min-width: 60px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${props => props.$isDark 
      ? 'linear-gradient(90deg, transparent, rgba(162, 59, 59, 0.2), transparent)' 
      : 'linear-gradient(90deg, transparent, rgba(139, 69, 19, 0.2), transparent)'
    };
    transition: left 0.6s ease;
  }
  
  &:hover {
    background: ${props => props.$isDark 
      ? 'rgba(162, 59, 59, 0.15)' 
      : 'rgba(139, 69, 19, 0.12)'
    };
    border-color: ${props => props.$isDark ? 'var(--matte-red)' : 'var(--terracotta)'};
    color: ${props => props.$isDark ? 'var(--matte-red)' : 'var(--terracotta)'};
    transform: translateY(-3px) scale(1.02);
    box-shadow: ${props => props.$isDark 
      ? '0 0 25px rgba(162, 59, 59, 0.3), 0 8px 20px rgba(0, 0, 0, 0.15)' 
      : '0 0 20px rgba(139, 69, 19, 0.2), 0 8px 20px rgba(0, 0, 0, 0.08)'
    };
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px) scale(1.01);
    background: ${props => props.$isDark 
      ? 'rgba(162, 59, 59, 0.2)' 
      : 'rgba(139, 69, 19, 0.15)'
    };
    box-shadow: ${props => props.$isDark 
      ? '0 0 15px rgba(162, 59, 59, 0.25), 0 4px 12px rgba(0, 0, 0, 0.1)' 
      : '0 0 12px rgba(139, 69, 19, 0.18), 0 4px 12px rgba(0, 0, 0, 0.06)'
    };
  }
`;


const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  max-width: 360px;
  margin: 0 auto;
  padding: 12px 20px 70px 20px;
  justify-items: center;
  
  @media (max-width: 480px) {
    gap: 12px;
    max-width: 320px;
    padding: 10px 15px 65px 15px;
  }
  
  @media (max-height: 700px) {
    gap: 11px;
    padding: 10px 20px 60px 20px;
  }
  
  @media (max-height: 700px) and (max-width: 480px) {
    gap: 9px;
    padding: 8px 15px 55px 15px;
  }
`;

const MenuButton = styled.button<{ $variant?: 'primary' | 'secondary'; $isDark: boolean }>`
  position: relative;
  z-index: 2;
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  background: ${props => props.$variant === 'primary' 
    ? 'var(--matte-red)' 
    : props.$isDark ? 'rgba(42, 42, 42, 0.8)' : 'rgba(230, 211, 179, 0.8)'};
  color: ${props => props.$variant === 'primary' ? 'var(--bg-primary)' : 'var(--text-primary)'};
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  backdrop-filter: blur(10px);
  letter-spacing: 0.02em;
  overflow: hidden;
  width: 130px;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 480px) {
    width: 115px;
    height: 115px;
    padding: 14px;
    font-size: 0.85rem;
  }
  
  @media (max-height: 700px) {
    width: 120px;
    height: 120px;
    padding: 12px;
    font-size: 0.8rem;
  }
  
  @media (max-height: 700px) and (max-width: 480px) {
    width: 105px;
    height: 105px;
    padding: 10px;
    font-size: 0.75rem;
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
      : 'transparent'};
    border-radius: 16px;
    padding: 1px;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: ${props => props.$variant === 'primary' ? 0 : 0};
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
    border-color: ${props => props.$variant === 'primary' ? 'var(--matte-red)' : 'var(--border-color)'};
    color: ${props => props.$variant === 'primary' ? 'var(--bg-primary)' : 'var(--text-primary)'};
  }
  
  &:hover::before {
    opacity: ${props => props.$variant === 'primary' ? 1 : 0};
  }
  
  &:active {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 
      0 8px 30px var(--shadow-card),
      0 4px 15px var(--shadow-soft);
  }
  
  &:focus {
    outline: none;
    transform: translateY(0) scale(1);
    box-shadow: 
      0 4px 20px var(--shadow-card),
      0 2px 8px var(--shadow-soft);
  }
  
  &:not(:hover):not(:focus):not(:active) {
    transform: translateY(0) scale(1);
    background: ${props => props.$variant === 'primary' 
      ? 'var(--matte-red)' 
      : props.$isDark ? 'rgba(42, 42, 42, 0.8)' : 'rgba(230, 211, 179, 0.8)'};
    box-shadow: 
      0 4px 20px var(--shadow-card),
      0 2px 8px var(--shadow-soft);
  }
`;

const ButtonIcon = styled.span<{ $isDark?: boolean }>`
  display: block;
  font-size: 2rem;
  margin-bottom: 7px;
  color: inherit;
  opacity: 0.9;
  text-shadow: 0 0 10px currentColor;
  transition: all 0.3s ease;
  filter: ${props => props.$isDark ? 'brightness(2.5) contrast(1.5) saturate(1.2)' : 'none'};
  
  @media (max-width: 480px) {
    font-size: 1.85rem;
    margin-bottom: 6px;
  }
  
  @media (max-height: 700px) {
    font-size: 1.75rem;
    margin-bottom: 6px;
  }
  
  @media (max-height: 700px) and (max-width: 480px) {
    font-size: 1.65rem;
    margin-bottom: 4px;
  }
  
  ${MenuButton}:hover & {
    transform: scale(1.1);
    opacity: 1;
    text-shadow: 0 0 15px currentColor;
  }
`;

const ButtonText = styled.span`
  display: block;
  font-size: 0.9rem;
  line-height: 1.2;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-align: center;
  transition: all 0.3s ease;
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    line-height: 1.15;
  }
  
  @media (max-height: 700px) {
    font-size: 0.8rem;
    line-height: 1.15;
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
  
  @media (max-height: 700px) {
    top: 10px;
    right: 10px;
    font-size: 1.1rem;
  }
  
  ${MenuButton}:hover & {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const ThemeToggle = styled.div`
  position: fixed;
  top: 5px;
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
  // Блокируем прокручивание экрана и сбрасываем позицию скролла
  React.useEffect(() => {
    // Сбрасываем позицию скролла на верх страницы
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Блокируем скролл
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = '0';
    
    return () => {
      // Восстанавливаем скролл при размонтировании
      document.body.style.overflow = 'auto';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, []);

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
      
      {/* Шапка с кнопками */}
      <AboutUsButton $isDark={isDarkTheme} onClick={() => handleButtonClick('about')}>
        О нас
      </AboutUsButton>
      
      <ThemeToggle onClick={toggleTheme}>
        <ToggleIcon $isDark={isDarkTheme}>🌙</ToggleIcon>
        <ToggleIconDark $isDark={isDarkTheme}>☀️</ToggleIconDark>
        <ToggleSlider $isDark={isDarkTheme}></ToggleSlider>
      </ThemeToggle>
      
      <ContentWrapper>
        <DragonHeader>
          <WelcomeTitle>poizonic</WelcomeTitle>
        </DragonHeader>
        
        <MenuGrid>
          <MenuButton 
            $variant="primary" 
            $isDark={isDarkTheme}
            onClick={() => handleButtonClick('order')}
          >
            <ButtonIcon>🏮</ButtonIcon>
            <ButtonText>Сделать заказ</ButtonText>
            <ChineseAccent>福</ChineseAccent>
          </MenuButton>
          
          <MenuButton 
            $variant="secondary" 
            $isDark={isDarkTheme} 
            onClick={() => handleButtonClick('calculator')}
            style={{
              transform: 'translateY(0) scale(1)',
              boxShadow: '0 4px 20px var(--shadow-card), 0 2px 8px var(--shadow-soft)',
              background: isDarkTheme ? 'rgba(42, 42, 42, 0.8)' : 'rgba(230, 211, 179, 0.8)',
              borderColor: 'var(--border-color)',
              color: 'var(--text-primary)'
            }}
          >
            <ButtonIcon>💰</ButtonIcon>
            <ButtonText>Расчет стоимости</ButtonText>
            <ChineseAccent>財</ChineseAccent>
          </MenuButton>
          
          <MenuButton $isDark={isDarkTheme} onClick={() => handleButtonClick('tracking')}>
            <ButtonIcon>📦</ButtonIcon>
            <ButtonText>Отследить заказ</ButtonText>
            <ChineseAccent>追</ChineseAccent>
          </MenuButton>
          
          <MenuButton $isDark={isDarkTheme} onClick={() => handleButtonClick('referral')}>
            <ButtonIcon>🔗</ButtonIcon>
            <ButtonText>Реферальная система</ButtonText>
            <ChineseAccent>運</ChineseAccent>
          </MenuButton>
          
          <MenuButton $isDark={isDarkTheme} onClick={() => handleButtonClick('faq')}>
            <ButtonIcon>❓</ButtonIcon>
            <ButtonText>FAQ</ButtonText>
            <ChineseAccent>智</ChineseAccent>
          </MenuButton>
          
          <MenuButton $isDark={isDarkTheme} onClick={() => handleButtonClick('instructions')}>
            <ButtonIcon>📖</ButtonIcon>
            <ButtonText>Инструкции</ButtonText>
            <ChineseAccent>學</ChineseAccent>
          </MenuButton>
          
          <MenuButton $isDark={isDarkTheme} onClick={() => handleButtonClick('exchange-rate')}>
            <ButtonIcon>📊</ButtonIcon>
            <ButtonText>Курс юаня</ButtonText>
            <ChineseAccent>匯</ChineseAccent>
          </MenuButton>
          
          <MenuButton $isDark={isDarkTheme} onClick={() => handleButtonClick('reviews')}>
            <ButtonIcon>⭐</ButtonIcon>
            <ButtonText>Отзывы</ButtonText>
            <ChineseAccent>譽</ChineseAccent>
          </MenuButton>
        </MenuGrid>
      </ContentWrapper>
    </MainContainer>
  );
};

export default MainMenu;