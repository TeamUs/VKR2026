import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProgressBar from './ProgressBar';

interface TrackingFormProps {
  isDark?: boolean;
  onNavigate?: (view: string) => void;
  toggleTheme?: () => void;
}

// Контейнер для всего компонента (как в OrderForm)
const TrackingContainer = styled.div`
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

// Стили для шапки (точно как в OrderForm)
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  margin-top: 0px;
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 12px var(--shadow-card),
    0 2px 6px var(--shadow-soft);
  backdrop-filter: blur(10px);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 20px var(--shadow-card),
      0 3px 10px var(--shadow-soft);
    border-color: var(--matte-red);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Title = styled.h1`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  flex: 1;
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
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

const Container = styled.div<{ $isDark?: boolean }>`
  padding: 20px;
  background: ${props => props.$isDark ? 'var(--bg-card-dark)' : 'var(--bg-card)'};
  border-radius: 16px;
  border: 1px solid ${props => props.$isDark ? 'var(--border-color-dark)' : 'var(--border-color)'};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;


const InputGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label<{ $isDark?: boolean }>`
  display: block;
  margin-bottom: 8px;
  color: ${props => props.$isDark ? 'var(--text-secondary-dark)' : 'var(--text-secondary)'};
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input<{ $isDark?: boolean }>`
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 2px solid ${props => props.$isDark ? 'var(--border-color-dark)' : 'var(--border-color)'};
  background: ${props => props.$isDark ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.$isDark ? 'var(--text-primary-dark)' : 'var(--text-primary)'};
  font-size: 1rem;
  font-family: 'JetBrains Mono', monospace;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;
  backdrop-filter: blur(10px);

  &:focus {
    border-color: var(--matte-red);
    box-shadow: 0 0 0 3px rgba(162, 59, 59, 0.1);
    background: ${props => props.$isDark ? 'rgba(45, 55, 72, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
  }

  &::placeholder {
    text-transform: none;
    letter-spacing: normal;
  }
`;

const Button = styled.button<{ $isDark?: boolean }>`
  width: 100%;
  padding: 14px 20px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, var(--matte-red), var(--terracotta));
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(162, 59, 59, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(162, 59, 59, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div<{ $isDark?: boolean }>`
  padding: 12px 16px;
  margin-top: 16px;
  background: rgba(231, 76, 60, 0.1);
  border: 1px solid #e74c3c;
  border-radius: 12px;
  color: #e74c3c;
  text-align: center;
  font-size: 0.9rem;
`;

const LoadingMessage = styled.div<{ $isDark?: boolean }>`
  padding: 12px 16px;
  margin-top: 16px;
  background: rgba(52, 152, 219, 0.1);
  border: 1px solid #3498db;
  border-radius: 12px;
  color: #3498db;
  text-align: center;
  font-size: 0.9rem;
`;

const TrackingInfo = styled.div<{ $isDark?: boolean }>`
  margin-top: 20px;
  padding: 16px;
  background: ${props => props.$isDark ? 'var(--bg-secondary-dark)' : 'var(--bg-secondary)'};
  border-radius: 12px;
  border: 1px solid ${props => props.$isDark ? 'var(--border-color-dark)' : 'var(--border-color)'};
`;

const InfoRow = styled.div<{ $isDark?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  color: ${props => props.$isDark ? 'var(--text-primary-dark)' : 'var(--text-primary)'};
  font-size: 0.9rem;

  span:first-child {
    color: ${props => props.$isDark ? 'var(--text-secondary-dark)' : 'var(--text-secondary)'};
  }

  span:last-child {
    font-weight: bold;
  }
`;

const TrackingForm: React.FC<TrackingFormProps> = ({ isDark = false, onNavigate, toggleTheme }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Состояния для заказов пользователя
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  // Загрузка заказов пользователя при открытии
  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = async () => {
    setLoadingOrders(true);
    try {
      // В тестовом режиме используем endpoint без авторизации
      const isTestMode = !(window as any).Telegram?.WebApp?.initData;
      const endpoint = isTestMode 
        ? '/api/test-user-orders'
        : '/api/user/orders';
      
      const headers = isTestMode 
        ? {}
        : { 'x-telegram-init-data': (window as any).Telegram?.WebApp?.initData || '' };
      
      const response = await fetch(endpoint, { headers });
      
      if (response.ok) {
        const data = await response.json();
        setUserOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Ошибка загрузки заказов:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError('Введите номер отслеживания');
      return;
    }

    setLoading(true);
    setError('');
    setTrackingData(null);

    try {
      // В тестовом режиме используем endpoint без авторизации
      const isTestMode = !(window as any).Telegram?.WebApp?.initData;
      const endpoint = isTestMode 
        ? `/api/test-tracking/${trackingNumber.trim()}`
        : `/api/tracking/${trackingNumber.trim()}`;
      
      const headers = isTestMode 
        ? {}
        : { 'x-telegram-init-data': (window as any).Telegram?.WebApp?.initData || '' };
      
      const response = await fetch(endpoint, { headers });

      const data = await response.json();

      if (response.ok && data.success) {
        setTrackingData(data);
        
        // Автоскролл к результатам отслеживания
        setTimeout(() => {
          const trackingContainer = document.querySelector('[data-tracking-results]');
          if (trackingContainer) {
            trackingContainer.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }
        }, 100);
        
        // Haptic feedback при успехе
        if ((window as any).Telegram?.WebApp?.HapticFeedback) {
          (window as any).Telegram.WebApp.HapticFeedback.notificationOccurred('success');
        }
      } else {
        setError(data.error || 'Заказ не найден');
        
        // Haptic feedback при ошибке
        if ((window as any).Telegram?.WebApp?.HapticFeedback) {
          (window as any).Telegram.WebApp.HapticFeedback.notificationOccurred('error');
        }
      }
    } catch (err) {
      console.error('Ошибка отслеживания:', err);
      setError('Ошибка подключения к серверу');
      
      if ((window as any).Telegram?.WebApp?.HapticFeedback) {
        (window as any).Telegram.WebApp.HapticFeedback.notificationOccurred('error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      handleTrack();
    }
  };

  return (
    <TrackingContainer>
      {/* Шапка с кнопками */}
      <Header>
        <BackButton onClick={() => onNavigate?.('main')}>
          ‹
        </BackButton>
        <Title>Отслеживание<br/>заказа</Title>
        <ThemeToggle onClick={toggleTheme}>
          <ToggleIcon $isDark={isDark}>🌙</ToggleIcon>
          <ToggleIconDark $isDark={isDark}>☀️</ToggleIconDark>
          <ToggleSlider $isDark={isDark}></ToggleSlider>
        </ThemeToggle>
      </Header>
      

      {/* Окно отслеживания заказа (первое) */}
      <Container $isDark={isDark}>

        <InputGroup>
          <Label $isDark={isDark}>
            Введите номер отслеживания:
          </Label>
          <Input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
            onKeyPress={handleKeyPress}
            placeholder="POIZONIC-000001"
            maxLength={15}
            $isDark={isDark}
          />
        </InputGroup>

        <Button 
          onClick={handleTrack} 
          disabled={loading}
          $isDark={isDark}
        >
          {loading ? '⏳ Поиск...' : '🔍 Отследить'}
        </Button>

        {error && (
          <ErrorMessage $isDark={isDark}>
            ❌ {error}
          </ErrorMessage>
        )}

        {loading && (
          <LoadingMessage $isDark={isDark}>
            ⏳ Загрузка информации о доставке...
          </LoadingMessage>
        )}

        {trackingData && !loading && (
          <>
            {/* Информация о заказе */}
            <TrackingInfo $isDark={isDark}>
              <InfoRow $isDark={isDark}>
                <span>📦 Номер заказа:</span>
                <span>#{trackingData.orderId}</span>
              </InfoRow>
              <InfoRow $isDark={isDark}>
                <span>🔍 Трек-номер:</span>
                <span>{trackingData.trackingNumber}</span>
              </InfoRow>
              <InfoRow $isDark={isDark}>
                <span>⏰ Последнее обновление:</span>
                <span>{new Date(trackingData.lastUpdated).toLocaleString('ru-RU')}</span>
              </InfoRow>
            </TrackingInfo>
          </>
        )}
      </Container>

      {/* Список заказов пользователя (второй) */}
      {userOrders.length > 0 && (
        <Container $isDark={isDark}>
          <div style={{
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: 'var(--text-primary)',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            📦 Ваши заказы
          </div>
          
          <div style={{ display: 'grid', gap: '12px' }}>
            {userOrders.map((order: any) => (
              <div
                key={order.order_id}
                style={{
                  padding: '12px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setExpandedOrder(expandedOrder === order.order_id ? null : order.order_id)}
              >
                {/* Свернутый вид */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                      Заказ #{order.order_id}
                    </div>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: 'var(--text-secondary)',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}>
                      {order.internal_tracking_number || 'Нет трек-номера'}
                    </div>
                  </div>
                  <div style={{ 
                    padding: '4px 8px',
                    borderRadius: '6px',
                    background: getStatusColor(order.delivery_status),
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 'bold'
                  }}>
                    {getStatusEmoji(order.delivery_status)} {order.delivery_status || 'Создан'}
                  </div>
                </div>

                {/* Развернутый вид */}
                {expandedOrder === order.order_id && (
                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                    <div style={{ marginBottom: '8px' }}>
                      <strong>👤 Клиент:</strong> {order.full_name || 'Не указано'}
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <strong>📱 Телефон:</strong> {order.phone_number || 'Не указан'}
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <strong>📍 ПВЗ:</strong> {order.pickup_point || 'Не указан'}
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <strong>📅 Создан:</strong> {new Date(order.created_at).toLocaleDateString('ru-RU')}
                    </div>
                    {order.last_updated && (
                      <div style={{ marginBottom: '12px' }}>
                        <strong>⏰ Обновлен:</strong> {new Date(order.last_updated).toLocaleString('ru-RU')}
                      </div>
                    )}
                    
                    {/* Кнопка для отслеживания */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setTrackingNumber(order.internal_tracking_number);
                        setTrackingData({
                          trackingNumber: order.internal_tracking_number,
                          status: order.delivery_status,
                          lastUpdated: order.last_updated,
                          orderId: order.order_id
                        });
                        setExpandedOrder(null);
                        
                        // Автоскролл к результатам отслеживания
                        setTimeout(() => {
                          const trackingContainer = document.querySelector('[data-tracking-results]');
                          if (trackingContainer) {
                            trackingContainer.scrollIntoView({ 
                              behavior: 'smooth', 
                              block: 'start' 
                            });
                          }
                        }, 100);
                      }}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        background: 'linear-gradient(135deg, var(--matte-red), var(--terracotta))',
                        color: 'white',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      🔍 Отследить этот заказ
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      )}

      {/* Объединенный прогресс-бар (горизонтальный + детальный) */}
      {trackingData && !loading && (
        <div 
          data-tracking-results
          style={{
            margin: '20px 16px',
            padding: '20px',
            background: isDark 
              ? 'linear-gradient(135deg, rgba(30, 30, 30, 0.95), rgba(40, 40, 40, 0.9))'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(250, 250, 250, 0.9))',
            borderRadius: '16px',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            boxShadow: isDark 
              ? '0 4px 20px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)'
              : '0 4px 20px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(20px)',
            position: 'relative'
          }}
        >
          {/* Заголовок */}
          <div style={{
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <div style={{
              fontSize: '1.1rem',
              fontWeight: '600',
              color: isDark ? '#ffffff' : '#1a1a1a',
              marginBottom: '6px'
            }}>
              Статус доставки
            </div>
            <div style={{
              fontSize: '0.85rem',
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
              fontWeight: '400'
            }}>
              Текущий этап: <span style={{ 
                color: 'var(--terracotta)', 
                fontWeight: '600' 
              }}>{trackingData.status}</span>
            </div>
          </div>

          {/* Горизонтальный прогресс-бар */}
          <div style={{
            position: 'relative',
            height: '50px',
            margin: '20px 0'
          }}>
            {/* Линия прогресса */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              right: '0',
              height: '2px',
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
              borderRadius: '1px',
              transform: 'translateY(-50%)'
            }} />
            
            {/* Заполненная часть линии */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              width: `${getProgressPercentage(trackingData.status)}%`,
              height: '2px',
              background: 'var(--matte-red)',
              borderRadius: '1px',
              transform: 'translateY(-50%)',
              transition: 'width 0.6s ease'
            }} />

            {/* Точки этапов */}
            {getDeliverySteps().map((step, index) => {
              const isCompleted = index < getCurrentStepIndex(trackingData.status);
              const isCurrent = index === getCurrentStepIndex(trackingData.status);
              const progress = getProgressPercentage(trackingData.status);
              const pointPosition = 10 + (index / (getDeliverySteps().length - 1)) * 80;
              
              // Специальная обработка для флага России
              const isRussiaStep = step.id === 'Доставка в РФ';
              const displayIcon = isRussiaStep ? '🇷🇺' : (isCompleted ? '✓' : step.icon);
              
              return (
                <div
                  key={step.id}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: `${pointPosition}%`,
                    transform: 'translate(-50%, -50%)',
                    width: isRussiaStep ? '36px' : '32px',
                    height: isRussiaStep ? '36px' : '32px',
                    borderRadius: isRussiaStep ? '6px' : '50%',
                    background: isCompleted 
                      ? '#27ae60'
                      : isCurrent 
                        ? 'var(--terracotta)'
                        : isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    border: isCompleted || isCurrent 
                      ? '2px solid white' 
                      : `1px solid ${isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isRussiaStep ? '1.2rem' : '0.9rem',
                    color: isCompleted || isCurrent ? 'white' : (isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'),
                    boxShadow: isCurrent 
                      ? '0 0 0 4px rgba(157, 78, 61, 0.2)' 
                      : 'none',
                    transition: 'all 0.3s ease',
                    zIndex: 2
                  }}
                >
                  {displayIcon}
                </div>
              );
            })}
          </div>

          {/* Подписи этапов */}
          <div style={{
            position: 'relative',
            height: '25px',
            marginTop: '8px',
            marginBottom: '20px',
            fontSize: '0.85rem'
          }}>
            {getDeliverySteps().map((step, index) => {
              const isCurrent = index === getCurrentStepIndex(trackingData.status);
              const isCompleted = index < getCurrentStepIndex(trackingData.status);
              const pointPosition = 10 + (index / (getDeliverySteps().length - 1)) * 80;
              return (
                <div
                  key={step.id}
                  style={{
                    position: 'absolute',
                    left: `${pointPosition}%`,
                    transform: 'translateX(-50%)',
                    top: '5px',
                    textAlign: 'center',
                    width: '60px',
                    color: isCurrent 
                      ? 'var(--terracotta)' 
                      : isCompleted 
                        ? '#27ae60' 
                        : (isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)'),
                    fontWeight: isCurrent ? '600' : isCompleted ? '500' : '400',
                    fontSize: '0.85rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {step.shortTitle}
                </div>
              );
            })}
          </div>

          {/* Детальный прогресс-бар (без заголовка) */}
          <div style={{
            borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            paddingTop: '20px'
          }}>
            <ProgressBar currentStatus={trackingData.status} isDark={isDark} hideTitle={true} />
          </div>
        </div>
      )}
    </TrackingContainer>
  );
};

// Вспомогательные функции для статусов
function getStatusColor(status: string) {
  switch (status) {
    case 'Создан': return 'linear-gradient(135deg, #95a5a6, #7f8c8d)';
    case 'Доставка внутри Китая': return 'linear-gradient(135deg, #3498db, #2980b9)';
    case 'На складе в Китае': return 'linear-gradient(135deg, #f39c12, #e67e22)';
    case 'Отправлен на таможню': return 'linear-gradient(135deg, #9b59b6, #8e44ad)';
    case 'Доставка в РФ': return 'linear-gradient(135deg, #e74c3c, #c0392b)';
    case 'Доставлен': return 'linear-gradient(135deg, #27ae60, #229954)';
    default: return 'linear-gradient(135deg, #95a5a6, #7f8c8d)';
  }
}

function getStatusEmoji(status: string) {
  switch (status) {
    case 'Создан': return '📝';
    case 'Доставка внутри Китая': return '🚚';
    case 'На складе в Китае': return '📦';
    case 'Отправлен на таможню': return '🏛️';
    case 'Доставка в РФ': return '🇷🇺';
    case 'Доставлен': return '✅';
    default: return '📝';
  }
}

// Вспомогательные функции для прогресс-бара
function getDeliverySteps() {
  return [
    { id: 'Создан', icon: '📝', shortTitle: 'Создан' },
    { id: 'Доставка внутри Китая', icon: '🚚', shortTitle: 'Китай' },
    { id: 'На складе в Китае', icon: '📦', shortTitle: 'Склад' },
    { id: 'Отправлен на таможню', icon: '🏛️', shortTitle: 'Таможня' },
    { id: 'Доставка в РФ', icon: '🇷🇺', shortTitle: 'РФ' },
    { id: 'Доставлен', icon: '✅', shortTitle: 'Готово' }
  ];
}

function getCurrentStepIndex(status: string) {
  const steps = getDeliverySteps();
  const index = steps.findIndex(step => step.id === status);
  return index >= 0 ? index : 0;
}

function getProgressPercentage(status: string) {
  const steps = getDeliverySteps();
  const currentIndex = getCurrentStepIndex(status);
  return (currentIndex / (steps.length - 1)) * 100;
}

export default TrackingForm;

