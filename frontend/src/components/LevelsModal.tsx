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
  border-radius: 20px;
  padding: 0;
  max-width: 95vw;
  max-height: 90vh;
  width: 95vw;
  overflow: hidden;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 10px 20px var(--shadow-card);
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
  border-radius: 20px 20px 0 0;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  position: relative;
`;

const ModalTitle = styled.h2`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 22px;
  font-weight: 600;
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
  padding: 24px;
`;

const LevelsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LevelCard = styled.div<{ $isDark: boolean; $isCurrent: boolean; $color: string }>`
  background: ${props => props.$isDark ? 'var(--bg-secondary)' : 'var(--bg-secondary)'};
  border: 2px solid ${props => props.$isCurrent ? 'var(--matte-red)' : 'var(--border-color)'};
  border-radius: 16px;
  padding: 20px;
  color: ${props => props.$isCurrent ? 'var(--text-primary)' : 'var(--text-primary)'};
  position: relative;
  transition: all 0.3s ease;
  
  ${props => props.$isCurrent && `
    box-shadow: 
      0 0 20px rgba(220, 38, 38, 0.4),
      0 0 40px rgba(220, 38, 38, 0.2),
      inset 0 0 20px rgba(220, 38, 38, 0.1);
  `}
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.$isCurrent 
      ? `0 8px 25px rgba(220, 38, 38, 0.5), 0 0 20px rgba(220, 38, 38, 0.4)`
      : '0 4px 12px var(--shadow-soft)'
    };
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
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 4px 0;
  color: ${props => props.$isCurrent ? 'var(--matte-red)' : 'var(--text-primary)'};
`;

const LevelDescription = styled.p<{ $isCurrent: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 16px;
  margin: 0;
  color: ${props => props.$isCurrent ? 'var(--text-secondary)' : 'var(--text-secondary)'};
`;

const LevelRequirements = styled.div<{ $isCurrent: boolean }>`
  margin-bottom: 12px;
`;

const RequirementsTitle = styled.h4<{ $isCurrent: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: ${props => props.$isCurrent ? 'var(--text-primary)' : 'var(--text-primary)'};
`;

const RequirementItem = styled.div<{ $isCurrent: boolean }>`
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  margin-bottom: 4px;
  color: ${props => props.$isCurrent ? 'var(--text-secondary)' : 'var(--text-secondary)'};
`;

const LevelRewards = styled.div<{ $isCurrent: boolean }>`
  margin-bottom: 12px;
`;

const RewardsTitle = styled.h4<{ $isCurrent: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: ${props => props.$isCurrent ? 'var(--text-primary)' : 'var(--text-primary)'};
`;

const RewardItem = styled.div<{ $isCurrent: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 14px;
  margin-bottom: 4px;
  color: ${props => props.$isCurrent ? 'var(--text-secondary)' : 'var(--text-secondary)'};
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
        'Комиссия 0₽ навсегда (полное освобождение)',
        'Специальные предложения на покупку юаней',
        'Повышенные бонусы для рефералов'
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
                {level.id === 'bronze' && (
                  <RequirementItem $isCurrent={level.id === currentLevel.toLowerCase()}>
                    • Начальный уровень
                  </RequirementItem>
                )}
                {level.id !== 'bronze' && (
                  <>
                    <RequirementItem $isCurrent={level.id === currentLevel.toLowerCase()}>
                      • 100 XP за подтвержденный заказ
                    </RequirementItem>
                    <RequirementItem $isCurrent={level.id === currentLevel.toLowerCase()}>
                      • 50 XP за приведенного реферала
                    </RequirementItem>
                    <RequirementItem $isCurrent={level.id === currentLevel.toLowerCase()}>
                      • 1 XP за каждые 100₽ потраченных на юани
                    </RequirementItem>
                  </>
                )}
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

