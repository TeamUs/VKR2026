import React from 'react';
import styled from 'styled-components';

interface Level {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  requirements: {
    orders: number;
    referrals: number;
    yuanSpent: number;
  };
  rewards: string[];
  benefits: string[];
}

interface LevelsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: string;
  isDarkTheme: boolean;
  modalPosition: { top: string; transform: string };
}

const ModalOverlay = styled.div<{ $isOpen: boolean; $modalPosition: { top: string; transform: string } }>`
  position: fixed;
  top: -100px;
  left: 0;
  right: 0;
  bottom: -100px;
  background: rgba(0, 0, 0, 0.8);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;
`;

const ModalContent = styled.div<{ $isDark: boolean; $modalPosition: { top: string; transform: string } }>`
  background: ${props => props.$isDark ? 'var(--bg-card)' : 'var(--bg-card)'};
  border-radius: 20px;
  padding: 0;
  max-width: 95vw;
  max-height: 85vh;
  overflow: hidden;
  box-shadow: 0 10px 30px var(--shadow-soft);
  border: 1px solid var(--border-color);
  position: absolute;
  top: ${props => props.$modalPosition.top};
  left: 50%;
  transform: ${props => props.$modalPosition.transform} translateX(-50%);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  background: var(--bg-card);
  border-radius: 20px 20px 0 0;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const ModalTitle = styled.h2`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`;

const CloseButton = styled.button<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? 'var(--bg-secondary)' : 'var(--bg-secondary)'};
  border: 1px solid var(--matte-red);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--matte-red);
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--matte-red);
    color: white;
  }
`;

const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

const LevelsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LevelCard = styled.div<{ $isDark: boolean; $isCurrent: boolean; $color: string }>`
  background: ${props => props.$isCurrent 
    ? `linear-gradient(135deg, ${props.$color}, var(--terracotta))`
    : (props.$isDark ? 'var(--bg-secondary)' : 'var(--bg-secondary)')
  };
  border: 2px solid ${props => props.$isCurrent ? props.$color : 'var(--border-color)'};
  border-radius: 16px;
  padding: 20px;
  color: ${props => props.$isCurrent ? 'white' : 'var(--text-primary)'};
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow-soft);
  }
`;

const LevelHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const LevelIcon = styled.div<{ $isCurrent: boolean }>`
  font-size: 32px;
  margin-right: 16px;
  filter: ${props => props.$isCurrent ? 'none' : 'grayscale(100%)'};
  opacity: ${props => props.$isCurrent ? 1 : 0.6};
`;

const LevelInfo = styled.div`
  flex: 1;
`;

const LevelName = styled.h3<{ $isCurrent: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px 0;
  color: ${props => props.$isCurrent ? 'white' : 'var(--text-primary)'};
`;

const LevelDescription = styled.p<{ $isCurrent: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 14px;
  margin: 0;
  color: ${props => props.$isCurrent ? 'rgba(255,255,255,0.9)' : 'var(--text-secondary)'};
`;

const LevelRequirements = styled.div<{ $isCurrent: boolean }>`
  margin-bottom: 12px;
`;

const RequirementsTitle = styled.h4<{ $isCurrent: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: ${props => props.$isCurrent ? 'white' : 'var(--text-primary)'};
`;

const RequirementItem = styled.div<{ $isCurrent: boolean }>`
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  margin-bottom: 4px;
  color: ${props => props.$isCurrent ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)'};
`;

const LevelRewards = styled.div<{ $isCurrent: boolean }>`
  margin-bottom: 12px;
`;

const RewardsTitle = styled.h4<{ $isCurrent: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: ${props => props.$isCurrent ? 'white' : 'var(--text-primary)'};
`;

const RewardItem = styled.div<{ $isCurrent: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 12px;
  margin-bottom: 4px;
  color: ${props => props.$isCurrent ? 'rgba(255,255,255,0.9)' : 'var(--text-secondary)'};
  display: flex;
  align-items: center;
`;

const RewardIcon = styled.span`
  margin-right: 8px;
  font-size: 14px;
`;


const LevelsModal: React.FC<LevelsModalProps> = ({ 
  isOpen, 
  onClose, 
  currentLevel,
  isDarkTheme,
  modalPosition
}) => {
  if (!isOpen) return null;

  const levels: Level[] = [
    {
      id: 'bronze',
      name: 'Бронзовый',
      description: 'Начинающий покупатель',
      icon: '🥉',
      color: '#CD7F32',
      requirements: {
        orders: 0,
        referrals: 0,
        yuanSpent: 0
      },
      rewards: [
        'Добро пожаловать в Poizonic!',
        'Базовые скидки на товары'
      ],
      benefits: [
        'Доступ к каталогу товаров',
        'Базовая поддержка клиентов',
        'Стандартная доставка'
      ]
    },
    {
      id: 'silver',
      name: 'Серебряный',
      description: 'Постоянный клиент',
      icon: '🥈',
      color: '#C0C0C0',
      requirements: {
        orders: 6,
        referrals: 1,
        yuanSpent: 10000
      },
      rewards: [
        'Скидка 3% на все заказы',
        'Приоритетная поддержка',
        'Бонус 100₽ за реферала'
      ],
      benefits: [
        'Ускоренная доставка',
        'Эксклюзивные предложения',
        'Персональные рекомендации'
      ]
    },
    {
      id: 'gold',
      name: 'Золотой',
      description: 'VIP клиент',
      icon: '🥇',
      color: '#FFD700',
      requirements: {
        orders: 21,
        referrals: 5,
        yuanSpent: 50000
      },
      rewards: [
        'Скидка 5% на все заказы',
        'Персональный менеджер',
        'Бонус 200₽ за реферала',
        'Эксклюзивные товары'
      ],
      benefits: [
        'Экспресс доставка',
        'Ранний доступ к новинкам',
        'Персональные скидки',
        'VIP статус'
      ]
    },
    {
      id: 'platinum',
      name: 'Платиновый',
      description: 'Премиум клиент',
      icon: '💎',
      color: '#E5E4E2',
      requirements: {
        orders: 50,
        referrals: 10,
        yuanSpent: 100000
      },
      rewards: [
        'Скидка 7% на все заказы',
        'Персональный консультант',
        'Бонус 500₽ за реферала',
        'Эксклюзивные коллекции',
        'Приглашения на мероприятия'
      ],
      benefits: [
        'Бесплатная доставка',
        'Эксклюзивный доступ',
        'Персональные предложения',
        'Приоритет в очереди'
      ]
    },
    {
      id: 'diamond',
      name: 'Бриллиантовый',
      description: 'Легендарный клиент',
      icon: '💠',
      color: '#B9F2FF',
      requirements: {
        orders: 100,
        referrals: 20,
        yuanSpent: 250000
      },
      rewards: [
        'Скидка 10% на все заказы',
        'Персональный ассистент',
        'Бонус 1000₽ за реферала',
        'Эксклюзивные лимитированные товары',
        'Приглашения на закрытые мероприятия',
        'Персональные подарки'
      ],
      benefits: [
        'Мгновенная доставка',
        'Эксклюзивный доступ к новинкам',
        'Персональные коллекции',
        'Приоритет во всем',
        'Статус легенды'
      ]
    }
  ];

  return (
    <ModalOverlay $isOpen={isOpen} $modalPosition={modalPosition} onClick={onClose}>
      <ModalContent $isDark={isDarkTheme} $modalPosition={modalPosition} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>🏅 Система уровней</ModalTitle>
          <CloseButton $isDark={isDarkTheme} onClick={onClose}>
            ×
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <LevelsList>
          {levels.map((level) => (
            <LevelCard
              key={level.id}
              $isDark={isDarkTheme}
              $isCurrent={level.id === currentLevel.toLowerCase()}
              $color={level.color}
            >
              
              <LevelHeader>
                <LevelIcon $isCurrent={level.id === currentLevel.toLowerCase()}>
                  {level.icon}
                </LevelIcon>
                <LevelInfo>
                  <LevelName $isCurrent={level.id === currentLevel.toLowerCase()}>
                    {level.name}
                  </LevelName>
                  <LevelDescription $isCurrent={level.id === currentLevel.toLowerCase()}>
                    {level.description}
                  </LevelDescription>
                </LevelInfo>
              </LevelHeader>

              <LevelRequirements $isCurrent={level.id === currentLevel.toLowerCase()}>
                <RequirementsTitle $isCurrent={level.id === currentLevel.toLowerCase()}>
                  📋 Требования:
                </RequirementsTitle>
                <RequirementItem $isCurrent={level.id === currentLevel.toLowerCase()}>
                  • {level.requirements.orders} заказов
                </RequirementItem>
                <RequirementItem $isCurrent={level.id === currentLevel.toLowerCase()}>
                  • {level.requirements.referrals} рефералов
                </RequirementItem>
                <RequirementItem $isCurrent={level.id === currentLevel.toLowerCase()}>
                  • {level.requirements.yuanSpent.toLocaleString()}₽ потрачено на юань
                </RequirementItem>
              </LevelRequirements>

              <LevelRewards $isCurrent={level.id === currentLevel.toLowerCase()}>
                <RewardsTitle $isCurrent={level.id === currentLevel.toLowerCase()}>
                  🎁 Награды:
                </RewardsTitle>
                {level.rewards.map((reward, index) => (
                  <RewardItem key={index} $isCurrent={level.id === currentLevel.toLowerCase()}>
                    <RewardIcon>✨</RewardIcon>
                    {reward}
                  </RewardItem>
                ))}
              </LevelRewards>

              <LevelRewards $isCurrent={level.id === currentLevel.toLowerCase()}>
                <RewardsTitle $isCurrent={level.id === currentLevel.toLowerCase()}>
                  ⭐ Привилегии:
                </RewardsTitle>
                {level.benefits.map((benefit, index) => (
                  <RewardItem key={index} $isCurrent={level.id === currentLevel.toLowerCase()}>
                    <RewardIcon>🌟</RewardIcon>
                    {benefit}
                  </RewardItem>
                ))}
              </LevelRewards>
            </LevelCard>
          ))}
        </LevelsList>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LevelsModal;

