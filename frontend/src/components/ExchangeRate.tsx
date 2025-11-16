import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { HapticFeedback } from '../utils/hapticFeedback';

const refreshSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Стилизованные компоненты
const ExchangeContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  padding: 0px 0px 100px 0px;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

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
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  flex: 1;
  text-align: center;
  
  @media (max-width: 480px) {
    font-size: 1.6rem;
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
  position: relative;
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
`;

const ToggleIconDark = styled.span<{ $isDark: boolean }>`
  opacity: ${props => props.$isDark ? 0 : 1};
  transition: opacity 0.3s ease;
  position: absolute;
  right: 8px;
  font-size: 0.7rem;
`;


const RateCard = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 30px;
  margin: 0 16px 25px 16px;
  backdrop-filter: blur(15px);
  text-align: center;
  position: relative;
  z-index: 2;
  max-width: 500px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 4px 16px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.15),
      0 6px 20px rgba(0, 0, 0, 0.08);
  }
  
  @media (max-width: 480px) {
    padding: 25px;
  }
`;

const RateTitle = styled.h2`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
  opacity: 0.9;
`;

const RateValue = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--matte-red);
  margin-bottom: 15px;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  letter-spacing: -0.02em;
  
  @media (max-width: 480px) {
    font-size: 3rem;
  }
`;

const RateSubtitle = styled.div`
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 25px;
  opacity: 0.8;
  font-weight: 500;
`;

const LastUpdated = styled.div`
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-bottom: 20px;
  opacity: 0.7;
  font-style: italic;
`;

const RefreshButton = styled.button`
  background: var(--matte-red);
  border: 1px solid var(--matte-red);
  border-radius: 16px;
  padding: 14px 24px;
  color: var(--bg-primary);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
  pointer-events: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  
  &:hover {
    transform: translateY(-2px);
    background: var(--terracotta);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 3px solid var(--border-color);
  border-radius: 50%;
  border-top-color: var(--matte-red);
  animation: ${refreshSpin} 1s ease-in-out infinite;
  margin-right: 12px;
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: var(--text-secondary);
  font-size: 1rem;
  font-weight: 500;
  min-height: 60px;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  z-index: 10;
`;

const ErrorMessage = styled.div`
  color: var(--matte-red);
  font-size: 0.9rem;
  margin-top: 5px;
`;


const InfoSection = styled.div<{ $isDark?: boolean }>`
  background: transparent;
  border: 2px solid var(--matte-red);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: none;
  position: relative;
  z-index: 2;
  max-width: 500px;
  margin: 0 16px;
  box-shadow: 0 0 20px rgba(162, 59, 59, 0.3), 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 25px rgba(162, 59, 59, 0.4), 0 12px 40px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 480px) {
    padding: 25px;
  }
`;

const InfoTitle = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: var(--matte-red);
    border-radius: 2px;
  }
`;

const InfoText = styled.div`
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 20px;
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
`;

const UpdateInfo = styled.div<{ $isDark?: boolean }>`
  background: transparent;
  border: none;
  border-radius: 0;
  padding: 0;
  margin-top: 20px;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--matte-red), transparent);
  }
`;

const UpdateText = styled.div`
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.6;
  margin: 0;
  padding: 15px 0;
  font-style: italic;
  opacity: 0.8;
  
  &::before {
    content: '⏰ ';
    margin-right: 8px;
    opacity: 0.7;
  }
`;

interface ExchangeRateProps {
  onNavigate: (view: string) => void;
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const ExchangeRate: React.FC<ExchangeRateProps> = ({ onNavigate, isDarkTheme, toggleTheme }) => {
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    loadExchangeRate();
  }, []);

  const loadExchangeRate = async () => {
    console.log('Loading exchange rate...');
    setIsLoading(true);
    setError(null);

    try {
      console.log('Fetching from /api/exchange-rate');
      const response = await fetch('/api/exchange-rate');
      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setExchangeRate(data.rate);
        setLastUpdated(new Date());
        console.log('Exchange rate updated:', data.rate);
      } else {
        throw new Error(data.error || 'Ошибка получения курса');
      }
    } catch (error) {
      console.error('Error loading exchange rate:', error);
      setError('Ошибка соединения с сервером');
      // Устанавливаем значение по умолчанию
      setExchangeRate(12.5);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    console.log('Refresh button clicked');
    HapticFeedback.medium();
    loadExchangeRate();
  };

  return (
    <ExchangeContainer>
      <Header>
        <BackButton onClick={() => onNavigate('main')}>
          ‹
        </BackButton>
        <Title>Курс юаня</Title>
        <ThemeToggle onClick={toggleTheme}>
          <ToggleIcon $isDark={isDarkTheme}>🌙</ToggleIcon>
          <ToggleIconDark $isDark={isDarkTheme}>☀️</ToggleIconDark>
          <ToggleSlider $isDark={isDarkTheme} />
        </ThemeToggle>
      </Header>

      <RateCard>
        <RateTitle>Текущий курс</RateTitle>
        <RateValue>
          {exchangeRate ? `${exchangeRate.toFixed(2)} ₽` : '—'}
        </RateValue>
        <RateSubtitle>за 1 китайский юань</RateSubtitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {lastUpdated && (
          <LastUpdated>
            Обновлено: {lastUpdated.toLocaleTimeString('ru-RU')}
          </LastUpdated>
        )}
        <RefreshButton onClick={handleRefresh} disabled={isLoading}>
          Обновить курс
        </RefreshButton>
        {isLoading && (
          <LoadingOverlay>
            <LoadingContainer>
              <LoadingSpinner />
              <span>Обновляем курс...</span>
            </LoadingContainer>
          </LoadingOverlay>
        )}
      </RateCard>

        <InfoSection $isDark={isDarkTheme}>
          <InfoTitle>О курсе</InfoTitle>
          <InfoText>
            Курс юаня к рублю рассчитывается специально для покупки валюты и расчета стоимости.
          </InfoText>
          <InfoText>
            Курс берется напрямую с ЦБРФ и обновляется в режиме реального времени.
          </InfoText>
          
          <UpdateInfo $isDark={isDarkTheme}>
            <UpdateText>
              Курс автоматически обновляется каждые 30 минут с сайта ЦБРФ
            </UpdateText>
          </UpdateInfo>
      </InfoSection>
    </ExchangeContainer>
  );
};

export default ExchangeRate;