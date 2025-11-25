import React from 'react';
import styled from 'styled-components';

interface Level {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  xpRequired: number;
  rewards: string[];
}

interface LevelsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLevel: string;
  isDarkTheme: boolean;
  modalPosition: { top: string; transform: string };
  onModalStateChange?: (isOpen: boolean) => void;
}

const ModalOverlay = styled.div<{ $isOpen: boolean; $modalPosition: { top: string; transform: string } }>`
  position: fixed;
  top: -20px;
  left: 0;
  right: 0;
  bottom: -20px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  padding: 80px 0 0 0;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ModalContent = styled.div<{ $isDark: boolean; $modalPosition: { top: string; transform: string } }>`
  background: ${props => props.$isDark ? 'var(--bg-card)' : 'var(--bg-card)'};
  border-radius: 24px;
  padding: 0;
  max-width: 95vw;
  max-height: 90vh;
  width: 95vw;
  overflow: hidden;
  box-shadow: 
    0 24px 48px rgba(0, 0, 0, 0.25),
    0 8px 16px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--border-color);
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateY(var(--scroll-position, 0px)) translateX(-50%);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  background: var(--bg-card);
  border-radius: 24px 24px 0 0;
  padding: 24px 28px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  position: relative;
`;

const ModalTitle = styled.h2`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.3px;
  color: var(--text-primary);
  margin: 0;
`;

const CloseButton = styled.button<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? 'var(--bg-secondary)' : 'transparent'};
  border: 1px solid var(--matte-red);
  border-radius: 50%;
  width: 36px;
  height: 36px;
  min-width: 36px;
  min-height: 36px;
  color: var(--matte-red);
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--matte-red);
    color: white;
  }
`;

const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 28px;
`;

const LevelsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LevelCard = styled.div<{ $isDark: boolean; $isCurrent: boolean; $color: string }>`
  background: ${props => props.$isDark ? 'var(--bg-secondary)' : 'var(--bg-secondary)'};
  border: ${props => props.$isCurrent ? '2px solid var(--matte-red)' : '1px solid var(--border-color)'};
  border-radius: 20px;
  padding: 24px;
  color: ${props => props.$isCurrent ? 'var(--text-primary)' : 'var(--text-primary)'};
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  ${props => props.$isCurrent && `
    box-shadow: 
      0 0 0 4px rgba(220, 38, 38, 0.1),
      0 8px 24px rgba(220, 38, 38, 0.2),
      0 4px 12px rgba(220, 38, 38, 0.15);
  `}
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${props => props.$isCurrent 
      ? `0 0 0 4px rgba(220, 38, 38, 0.15), 0 12px 32px rgba(220, 38, 38, 0.3), 0 6px 16px rgba(220, 38, 38, 0.2)`
      : '0 4px 16px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.08)'
    };
  }
`;

const LevelHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const LevelIcon = styled.div<{ $isCurrent: boolean }>`
  font-size: 36px;
  margin-right: 16px;
  filter: ${props => props.$isCurrent ? 'none' : 'grayscale(60%)'};
  opacity: ${props => props.$isCurrent ? 1 : 0.7};
  transition: all 0.3s ease;
`;

const LevelInfo = styled.div`
  flex: 1;
`;

const LevelName = styled.h3<{ $isCurrent: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 26px;
  font-weight: 600;
  letter-spacing: -0.5px;
  margin: 0 0 6px 0;
  color: ${props => props.$isCurrent ? 'var(--matte-red)' : 'var(--text-primary)'};
  transition: color 0.3s ease;
`;

const LevelDescription = styled.p<{ $isCurrent: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 15px;
  line-height: 1.5;
  margin: 0;
  color: var(--text-secondary);
  opacity: 0.85;
`;

const LevelRequirements = styled.div<{ $isCurrent: boolean }>`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
`;

const RequirementsTitle = styled.h4<{ $isCurrent: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.2px;
  margin: 0 0 12px 0;
  color: var(--text-primary);
  opacity: 0.9;
`;

const RequirementItem = styled.div<{ $isCurrent: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 8px;
  color: var(--text-secondary);
  padding-left: 4px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const LevelRewards = styled.div<{ $isCurrent: boolean }>`
  margin-bottom: 0;
`;

const RewardsTitle = styled.h4<{ $isCurrent: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.2px;
  margin: 0 0 12px 0;
  color: var(--text-primary);
  opacity: 0.9;
`;

const RewardItem = styled.div<{ $isCurrent: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 10px;
  color: var(--text-secondary);
  display: flex;
  align-items: flex-start;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const RewardIcon = styled.span`
  margin-right: 10px;
  font-size: 16px;
  margin-top: 2px;
  flex-shrink: 0;
`;

const XPInfoSection = styled.div<{ $isDark: boolean }>`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 28px;
  color: var(--text-primary);
`;

const XPInfoTitle = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.2px;
  margin: 0 0 16px 0;
  color: var(--text-primary);
`;

const XPInfoItem = styled.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 10px;
  color: var(--text-secondary);
  display: flex;
  align-items: flex-start;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const XPInfoIcon = styled.span`
  margin-right: 10px;
  font-size: 16px;
  margin-top: 2px;
  flex-shrink: 0;
`;


const LevelsModal: React.FC<LevelsModalProps> = ({ 
  isOpen, 
  onClose, 
  currentLevel,
  isDarkTheme,
  modalPosition,
  onModalStateChange
}) => {
  if (!isOpen) return null;

  const levels: Level[] = [
    {
      id: 'bronze',
      name: 'Bronze',
      description: 'Начинающий покупатель',
      icon: '🥉',
      color: '#CD7F32',
      xpRequired: 0,
      rewards: [
        'Первый заказ без комиссии за оформление'
      ]
    },
    {
      id: 'silver',
      name: 'Silver',
      description: 'Постоянный клиент',
      icon: '🥈',
      color: '#C0C0C0',
      xpRequired: 1000,
      rewards: [
        'Комиссия 900₽ навсегда (вместо 1000₽)'
      ]
    },
    {
      id: 'gold',
      name: 'Gold',
      description: 'VIP клиент',
      icon: '🥇',
      color: '#FFD700',
      xpRequired: 5000,
      rewards: [
        'Комиссия 700₽ навсегда (вместо 1000₽)'
      ]
    },
    {
      id: 'platinum',
      name: 'Platinum',
      description: 'Премиум клиент',
      icon: '💎',
      color: '#E5E4E2',
      xpRequired: 25000,
      rewards: [
        'Комиссия 400₽ навсегда (вместо 1000₽)'
      ]
    },
    {
      id: 'diamond',
      name: 'Diamond',
      description: 'Легендарный клиент',
      icon: '💠',
      color: '#B9F2FF',
      xpRequired: 100000,
      rewards: [
        'Комиссия 0₽ навсегда',
        'Специальные предложения на покупку юаней',
        'Рефералы получают заказы без комиссии (0₽) на 14 дней при активации реферальной ссылки'
      ]
    }
  ];

  return (
    <ModalOverlay 
      $isOpen={isOpen} 
      $modalPosition={modalPosition} 
      onClick={() => {
        onClose();
        onModalStateChange?.(false);
      }}
    >
      <ModalContent 
        $isDark={isDarkTheme} 
        $modalPosition={modalPosition} 
        style={{
          '--scroll-position': `${window.pageYOffset || document.documentElement.scrollTop}px`
        } as React.CSSProperties}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader>
          <ModalTitle>🏅 Система уровней</ModalTitle>
          <CloseButton $isDark={isDarkTheme} onClick={() => {
            onClose();
            onModalStateChange?.(false);
          }}>
            ×
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <XPInfoSection $isDark={isDarkTheme}>
            <XPInfoTitle>💡 Как получать XP:</XPInfoTitle>
            <XPInfoItem>
              <XPInfoIcon>✅</XPInfoIcon>
              100 XP за подтвержденный заказ
            </XPInfoItem>
            <XPInfoItem>
              <XPInfoIcon>✅</XPInfoIcon>
              50 XP за приведенного реферала
            </XPInfoItem>
            <XPInfoItem>
              <XPInfoIcon>✅</XPInfoIcon>
              1 XP за каждые 100₽ потраченных на юани
            </XPInfoItem>
          </XPInfoSection>
          
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
                  • {level.xpRequired.toLocaleString()} XP
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

            </LevelCard>
          ))}
        </LevelsList>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LevelsModal;

