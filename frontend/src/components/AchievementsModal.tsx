import React from 'react';
import styled from 'styled-components';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirement: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
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
  padding: 20px;
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
  text-align: center;
  flex: 1;
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

const CategorySection = styled.div`
  margin-bottom: 24px;
`;

const CategoryTitle = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--border-color);
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
`;

const AchievementCard = styled.div<{ $isDark: boolean; $unlocked: boolean }>`
  background: ${props => props.$unlocked 
    ? (props.$isDark ? 'var(--bg-secondary)' : 'var(--bg-secondary)')
    : 'var(--bg-secondary)'
  };
  border: 2px solid ${props => props.$unlocked ? 'var(--matte-red)' : 'var(--border-color)'};
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => props.$unlocked ? 1 : 0.6};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow-soft);
  }
`;

const AchievementHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const AchievementIcon = styled.div<{ $unlocked: boolean }>`
  font-size: 24px;
  margin-right: 12px;
  filter: ${props => props.$unlocked ? 'none' : 'grayscale(100%)'};
`;

const AchievementInfo = styled.div`
  flex: 1;
`;

const AchievementName = styled.div<{ $unlocked: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.$unlocked ? 'var(--text-primary)' : 'var(--text-secondary)'};
  margin-bottom: 4px;
`;

const AchievementDescription = styled.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 8px;
`;

const AchievementRequirement = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--text-accent);
  background: var(--bg-primary);
  padding: 4px 8px;
  border-radius: 6px;
  display: inline-block;
`;

const ProgressBar = styled.div<{ $isDark: boolean }>`
  width: 100%;
  height: 6px;
  background: ${props => props.$isDark ? 'var(--bg-primary)' : 'var(--bg-primary)'};
  border-radius: 3px;
  overflow: hidden;
  margin-top: 8px;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${props => props.$progress}%;
  background: linear-gradient(90deg, var(--matte-red), var(--terracotta));
  border-radius: 3px;
  transition: width 0.3s ease;
`;

const AchievementsModal: React.FC<AchievementsModalProps> = ({ 
  isOpen, 
  onClose, 
  achievements, 
  isDarkTheme,
  modalPosition
}) => {
  if (!isOpen) return null;

  // Группируем достижения по категориям
  const groupedAchievements = achievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

  return (
    <ModalOverlay $isOpen={isOpen} $modalPosition={modalPosition} onClick={onClose}>
      <ModalContent $isDark={isDarkTheme} $modalPosition={modalPosition} onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>🏆 Достижения</ModalTitle>
          <CloseButton $isDark={isDarkTheme} onClick={onClose}>
            ×
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          {Object.entries(groupedAchievements).map(([category, categoryAchievements]) => (
          <CategorySection key={category}>
            <CategoryTitle>{category}</CategoryTitle>
            <AchievementsGrid>
              {categoryAchievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  $isDark={isDarkTheme}
                  $unlocked={achievement.unlocked}
                  onClick={() => {
                    // Здесь можно добавить логику для показа детальной информации
                    console.log('Achievement clicked:', achievement);
                  }}
                >
                  <AchievementHeader>
                    <AchievementIcon $unlocked={achievement.unlocked}>
                      {achievement.icon}
                    </AchievementIcon>
                    <AchievementInfo>
                      <AchievementName $unlocked={achievement.unlocked}>
                        {achievement.name}
                      </AchievementName>
                    </AchievementInfo>
                  </AchievementHeader>
                  
                  <AchievementDescription>
                    {achievement.description}
                  </AchievementDescription>
                  
                  <AchievementRequirement>
                    {achievement.requirement}
                  </AchievementRequirement>

                  {!achievement.unlocked && achievement.progress !== undefined && (
                    <ProgressBar $isDark={isDarkTheme}>
                      <ProgressFill $progress={achievement.progress} />
                    </ProgressBar>
                  )}
                </AchievementCard>
              ))}
            </AchievementsGrid>
          </CategorySection>
        ))}
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AchievementsModal;

