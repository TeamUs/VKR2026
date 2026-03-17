import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { HapticFeedback } from '../utils/hapticFeedback';

// Минималистичные анимации в стиле главного меню
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

const slideIn = keyframes`
  from { 
    transform: translateX(100%); 
    opacity: 0; 
  }
  to { 
    transform: translateX(0); 
    opacity: 1; 
  }
`;

const titleGlow = keyframes`
  0% { 
    text-shadow: 0 0 20px var(--glow-terracotta); 
  }
  50% { 
    text-shadow: 0 0 30px var(--glow-red), 0 0 40px var(--glow-terracotta); 
  }
  100% { 
    text-shadow: 0 0 20px var(--glow-terracotta); 
  }
`;

// Стилизованные компоненты
const ReferralContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  padding: 0px 0px 100px 0px;
  position: relative;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 480px) {
    padding: 0px;
  }
`;


const ReferralForm = styled.div`
  position: relative;
  z-index: 2;
  max-width: 500px;
  margin: 0 auto;
  background: var(--bg-card);
  border-radius: 16px;
  padding: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  animation: ${fadeIn} 0.6s ease-out;
  
  @media (max-width: 480px) {
    max-width: 100%;
    padding: 20px;
    margin: 0 10px;
  }
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const InfoCard = styled.div<{ $isDark?: boolean }>`
  background: transparent;
  border: 2px solid var(--matte-red);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  margin: 0 16px 25px 16px;
  backdrop-filter: blur(5px);
  box-shadow: 0 0 15px rgba(162, 59, 59, 0.3), 0 2px 8px var(--shadow-soft);
`;

const InfoTitle = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 15px;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const InfoText = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 0 10px 0;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ReferralCodeCard = styled.div<{ $isDark?: boolean }>`
  background: ${props => props.$isDark ? 'var(--bg-secondary)' : 'var(--bg-card)'};
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 25px;
  margin: 0 16px 25px 16px;
  backdrop-filter: blur(5px);
  text-align: center;
  
  @media (max-width: 480px) {
    padding: 15px;
    margin-bottom: 25px;
  }
`;

const ReferralCode = styled.div<{ $isDark?: boolean }>`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--matte-red);
  background: ${props => props.$isDark ? 'var(--bg-card)' : '#FFFFFF'};
  border: 2px solid var(--matte-red);
  border-radius: 8px;
  padding: 12px;
  margin: 10px 0;
  letter-spacing: 0.5px;
  text-shadow: 0 0 8px var(--glow-red);
  word-break: break-all;
  overflow-wrap: break-word;
  hyphens: auto;
  line-height: 1.4;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 10px;
    letter-spacing: 0.3px;
  }
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary'; $isDark?: boolean }>`
  width: 100%;
  padding: 15px 25px;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
  pointer-events: auto;
  margin-top: 15px;
  
  ${props => props.$variant === 'primary' 
    ? css`
      background: var(--matte-red);
      color: var(--bg-primary);
      box-shadow: 
        0 4px 12px var(--shadow-soft),
        0 2px 6px var(--shadow-card);
      
      &:hover {
        transform: translateY(-3px);
        background: var(--terracotta);
        box-shadow: 
          0 8px 20px var(--shadow-card),
          0 4px 12px var(--shadow-soft);
        border-color: var(--matte-red);
      }
    `
    : css`
      background: ${props.$isDark ? 'var(--bg-card)' : '#FFFFFF'};
      color: var(--text-primary);
      box-shadow: 
        0 4px 12px var(--shadow-soft),
        0 2px 6px var(--shadow-card);
      
      &:hover {
        transform: translateY(-3px);
        background: var(--sand);
        box-shadow: 
          0 8px 20px var(--shadow-card),
          0 4px 12px var(--shadow-soft);
        border-color: var(--matte-red);
      }
    `
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const StatsCard = styled.div<{ $isDark?: boolean }>`
  background: ${props => props.$isDark ? 'var(--bg-secondary)' : 'var(--bg-card)'};
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 25px;
  margin: 0 16px 25px 16px;
  backdrop-filter: blur(5px);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
  margin-top: 15px;
  width: 100%;
  
  @media (max-width: 480px) {
    gap: 8px;
    margin-top: 12px;
  }
`;

const StatItem = styled.div<{ $isDark?: boolean }>`
  text-align: center;
  padding: 16px 12px;
  background: ${props => props.$isDark ? 'var(--bg-card)' : '#FFFFFF'};
  border-radius: 8px;
  border: 1px solid var(--border-color);
  min-width: 0;
  width: 100%;
  
  @media (max-width: 480px) {
    padding: 14px 10px;
  }
`;

const StatValue = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--matte-red);
  margin-bottom: 4px;
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
    margin-bottom: 3px;
  }
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: var(--text-primary);
  font-weight: 500;
  line-height: 1.2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 480px) {
    font-size: 0.75rem;
    line-height: 1.15;
  }
`;

const ErrorMessage = styled.div`
  color: var(--matte-red);
  font-size: 0.9rem;
  margin-top: 5px;
  text-shadow: 0 0 8px var(--glow-red);
`;

const SuccessMessage = styled.div`
  color: var(--terracotta);
  font-size: 0.9rem;
  margin-top: 5px;
  text-shadow: 0 0 8px var(--glow-terracotta);
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalPositioner = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
   top: -16vh;
 
   @media (max-width: 480px) {
     top: -14vh;
   }
`;

const SuccessModal = styled.div`
  background: var(--bg-card);
  border-radius: 20px;
  padding: 20px;
  max-width: 80vw;
  max-height: 70vh;
  width: 80%;
  text-align: center;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 10px 20px var(--shadow-card);
  animation: ${slideIn} 0.4s ease-out;
  overflow-y: auto;

  @media (max-width: 480px) {
    width: 90%;
    max-width: 90vw;
    padding: 18px;
    max-height: 75vh;
  }
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.6s ease-out 0.2s both;
`;

const SuccessTitle = styled.h2`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 15px;
`;

const ModalSuccessMessage = styled.p`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 25px;
`;

const CloseButton = styled.button`
  background: var(--matte-red);
  color: var(--bg-primary);
  border: none;
  border-radius: 12px;
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px var(--shadow-soft);
  
  &:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--shadow-card);
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
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
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

interface ReferralSystemProps {
  onNavigate: (page: string) => void;
  toggleTheme: () => void;
  isDarkTheme: boolean;
  onModalStateChange?: (isOpen: boolean) => void;
}

const lockPageScroll = () => {
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
};

const unlockPageScroll = () => {
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
};

const ReferralSystem: React.FC<ReferralSystemProps> = ({ onNavigate, toggleTheme, isDarkTheme, onModalStateChange }) => {
  const [referralCode, setReferralCode] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [stats, setStats] = useState({
    currentCommission: 1000,
    discountActive: false,
    discountExpiresAt: null,
    totalReferrals: 0,
    totalClicks: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCopyModal, setShowCopyModal] = useState(false);

  // Username бота для реферальной ссылки (для ВКР задаётся VITE_BOT_USERNAME в .env.production)
  const botUsername = import.meta.env.VITE_BOT_USERNAME || 'poizonic_bot';

  useEffect(() => {
    // Генерируем реферальную ссылку как в боте
    const generateReferralLink = () => {
      const telegramId = (window as any).Telegram?.WebApp?.initDataUnsafe?.user?.id || 'user';
      const refLink = `https://t.me/${botUsername}?start=${telegramId}`;
      setReferralCode(telegramId.toString());
      setReferralLink(refLink);
    };

    generateReferralLink();
    loadReferralStats();
  }, [botUsername]);

  const loadReferralStats = async () => {
    try {
      const telegramId = (window as any).Telegram?.WebApp?.initDataUnsafe?.user?.id;
      console.log('🔍 Telegram ID:', telegramId);
      console.log('🔍 Telegram WebApp:', (window as any).Telegram?.WebApp);
      
      if (!telegramId) {
        console.log('⚠️ Telegram ID не найден - используем значения по умолчанию');
        return;
      }

      console.log('📡 Отправляем запрос к API с Telegram ID:', telegramId);
      const response = await fetch('api/referral-stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telegramId }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('📊 Получены данные статистики:', result);
        if (result.success) {
          setStats(result.data);
        }
      } else {
        console.log('❌ Ошибка API:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('❌ Ошибка загрузки статистики:', error);
    }
  };

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setShowCopyModal(true);
      setError('');
      HapticFeedback.success();
      lockPageScroll();
      onModalStateChange?.(true);
    } catch (error) {
      setError('Не удалось скопировать ссылку');
      HapticFeedback.error();
    }
  };

  const handleCloseCopyModal = () => {
    setShowCopyModal(false);
    unlockPageScroll();
    onModalStateChange?.(false);
  };

  useEffect(() => {
    return () => {
      unlockPageScroll();
      onModalStateChange?.(false);
    };
  }, []);

  const shareReferralLink = () => {
    HapticFeedback.medium();
    
    // Структурированное сообщение с отступом и стрелочкой
    const message = `⬆️ Переходи по ссылке выше!

🎁 Привет! Я использую сервис Poizonic для заказа товаров из Китая.
✨ Присоединяйся и получи скидку на комиссию!
💡 Скидка применяется автоматически при переходе по ссылке!`;
    
    if ((window as any).Telegram?.WebApp?.openTelegramLink) {
      const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(message)}`;
      (window as any).Telegram.WebApp.openTelegramLink(telegramUrl);
    } else {
      // Fallback для обычного браузера
      if (navigator.share) {
        navigator.share({
          title: 'Реферальная ссылка Poizonic',
          text: message,
          url: referralLink
        });
      } else {
        copyReferralLink();
      }
    }
  };

  return (
    <ReferralContainer>

      <Header>
        <BackButton onClick={() => onNavigate('main')}>
          ‹
        </BackButton>
        <Title>Реферальная система</Title>
        <ThemeToggle onClick={toggleTheme}>
          <ToggleIcon $isDark={isDarkTheme}>🌙</ToggleIcon>
          <ToggleIconDark $isDark={isDarkTheme}>☀️</ToggleIconDark>
          <ToggleSlider $isDark={isDarkTheme}></ToggleSlider>
        </ThemeToggle>
      </Header>

      <ReferralCodeCard $isDark={isDarkTheme}>
        <InfoTitle>Ваша реферальная ссылка</InfoTitle>
        <ReferralCode $isDark={isDarkTheme}>{referralLink}</ReferralCode>
        <Button 
          onClick={copyReferralLink}
          $variant="primary"
          $isDark={isDarkTheme}
        >
          📋 Скопировать ссылку
        </Button>
        <Button 
          onClick={shareReferralLink}
          $variant="secondary"
          $isDark={isDarkTheme}
        >
          📤 Поделиться с друзьями
        </Button>
      </ReferralCodeCard>

      <StatsCard $isDark={isDarkTheme}>
        <InfoTitle>Ваша статистика</InfoTitle>
        <StatsGrid>
          <StatItem $isDark={isDarkTheme}>
            <StatValue>{stats.currentCommission} ₽</StatValue>
            <StatLabel>Текущая комиссия</StatLabel>
          </StatItem>
          <StatItem $isDark={isDarkTheme}>
            <StatValue>
              {stats.currentCommission === 1000 ? 'Ꝏ' : 
               stats.discountActive && stats.discountExpiresAt ? 
               new Date(stats.discountExpiresAt).toLocaleDateString('ru-RU') : 
               'Истекла'}
            </StatValue>
            <StatLabel>Срок действия</StatLabel>
          </StatItem>
          <StatItem $isDark={isDarkTheme}>
            <StatValue>{stats.totalReferrals}</StatValue>
            <StatLabel>Приглашенных пользователей</StatLabel>
          </StatItem>
        </StatsGrid>
      </StatsCard>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}

      <InfoCard $isDark={isDarkTheme}>
        <InfoTitle>Условия программы</InfoTitle>
        <InfoText>
          • Новый пользователь получает скидку на 2 недели
        </InfoText>
        <InfoText>
          • Пригласивший получает скидку на 1 неделю
        </InfoText>
        <InfoText>
          • Комиссия снижается с 1000₽ до 400₽ для обеих сторон
        </InfoText>
        <InfoText>
          • Скидки можно накапливать при приглашении новых пользователей
        </InfoText>
        <InfoText>
          • Скидка применяется автоматически при переходе по ссылке
        </InfoText>
      </InfoCard>

      {showCopyModal && (
        <ModalOverlay onClick={handleCloseCopyModal}>
          <ModalPositioner>
            <SuccessModal onClick={(e) => e.stopPropagation()}>
              <SuccessIcon>✅</SuccessIcon>
              <SuccessTitle>Ссылка скопирована!</SuccessTitle>
              <ModalSuccessMessage>
                Реферальная ссылка успешно скопирована в буфер обмена. 
                Делитесь этой ссылкой с друзьями и получайте скидку на комиссию!
              </ModalSuccessMessage>
              <CloseButton onClick={handleCloseCopyModal}>
                Закрыть
              </CloseButton>
            </SuccessModal>
          </ModalPositioner>
        </ModalOverlay>
      )}
    </ReferralContainer>
  );
};

export default ReferralSystem;