import React from 'react';
import styled from 'styled-components';

interface ProgressBarProps {
  currentStatus: string;
  isDark?: boolean;
  hideTitle?: boolean;
}

const ProgressContainer = styled.div<{ $isDark?: boolean; $hideTitle?: boolean }>`
  padding: ${props => props.$hideTitle ? '0' : '20px'};
  background: transparent;
  border-radius: ${props => props.$hideTitle ? '0' : '12px'};
  border: none;
  box-shadow: none;
  backdrop-filter: none;
`;

const ProgressTitle = styled.h3<{ $isDark?: boolean }>`
  margin: 0 0 20px 0;
  color: ${props => props.$isDark ? '#D4C19C' : '#1a1a1a'};
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
`;

const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Step = styled.div<{ $isActive: boolean; $isCompleted: boolean; $isDark?: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  margin-bottom: 16px;
  border-radius: 0 20px 20px 0;
  background: ${props => {
    if (props.$isCompleted) return props.$isDark ? 'rgba(39, 174, 96, 0.2)' : 'rgba(39, 174, 96, 0.1)';
    if (props.$isActive) return props.$isDark ? 'rgba(157, 78, 61, 0.2)' : 'rgba(157, 78, 61, 0.1)';
    return props.$isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(139, 69, 19, 0.15)';
  }};
  border: 1px solid ${props => {
    if (props.$isCompleted) return 'rgba(39, 174, 96, 0.3)';
    if (props.$isActive) return 'rgba(157, 78, 61, 0.4)';
    return props.$isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  }};
  box-shadow: ${props => props.$isActive || props.$isCompleted 
    ? '0 4px 12px rgba(0, 0, 0, 0.1)' 
    : '0 2px 6px rgba(0, 0, 0, 0.05)'};
  transition: all 0.3s ease;
  position: relative;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${props => {
      if (props.$isCompleted) return 'linear-gradient(180deg, #27ae60, #2ecc71)';
      if (props.$isActive) return 'linear-gradient(180deg, var(--terracotta), var(--matte-red))';
      return props.$isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';
    }};
    border-radius: 0 2px 2px 0;
    box-shadow: ${props => props.$isActive || props.$isCompleted 
      ? '0 2px 8px rgba(0, 0, 0, 0.2)' 
      : 'none'};
  }
`;

const StepIcon = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  font-weight: bold;
  background: ${props => {
    if (props.$isCompleted) return '#27ae60';
    if (props.$isActive) return 'var(--terracotta)';
    return 'transparent';
  }};
  color: ${props => {
    if (props.$isCompleted) return '#ffffff';
    if (props.$isActive) return '#ffffff';
    return 'var(--text-secondary)';
  }};
  border: 1px solid ${props => {
    if (props.$isCompleted) return '#27ae60';
    if (props.$isActive) return 'var(--terracotta)';
    return 'var(--border-color)';
  }};
  transition: all 0.3s ease;
`;

const StepContent = styled.div<{ $isActive: boolean; $isCompleted: boolean; $isDark?: boolean }>`
  flex: 1;
`;

const StepTitle = styled.div<{ $isActive: boolean; $isCompleted: boolean; $isDark?: boolean }>`
  font-weight: ${props => props.$isActive || props.$isCompleted ? '600' : '500'};
  font-size: 0.95rem;
  color: ${props => {
    if (props.$isCompleted) return '#27ae60';
    if (props.$isActive) return 'var(--terracotta)';
    return props.$isDark ? '#D4C19C' : '#1a1a1a';
  }};
  margin-bottom: 2px;
  transition: all 0.3s ease;
`;

const StepDescription = styled.div<{ $isActive: boolean; $isCompleted: boolean; $isDark?: boolean }>`
  font-size: 0.8rem;
  color: ${props => {
    if (props.$isCompleted) return 'rgba(39, 174, 96, 0.8)';
    if (props.$isActive) return props.$isDark ? '#F4E4BC' : '#000000';
    return props.$isDark ? 'rgba(212, 193, 156, 0.8)' : 'rgba(0, 0, 0, 0.6)';
  }};
  line-height: 1.3;
  transition: all 0.3s ease;
`;

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStatus, isDark = false, hideTitle = false }) => {
  const steps = [
    {
      id: 'Создан',
      title: 'Создан',
      description: 'Заказ создан и ожидает обработки',
      icon: '📝'
    },
    {
      id: 'Доставка внутри Китая',
      title: 'Доставка внутри Китая',
      description: 'Товар доставляется по Китаю',
      icon: '🚚'
    },
    {
      id: 'На складе в Китае',
      title: 'На складе в Китае',
      description: 'Товар прибыл на склад в Китае',
      icon: '📦'
    },
    {
      id: 'Отправлен на таможню',
      title: 'Отправлен на таможню',
      description: 'Товар проходит таможенное оформление',
      icon: '🏛️'
    },
    {
      id: 'Доставка в РФ',
      title: 'Доставка в РФ',
      description: 'Товар доставляется по России',
      icon: '🇷🇺'
    },
    {
      id: 'Доставлен',
      title: 'Доставлен',
      description: 'Товар успешно доставлен',
      icon: '✅'
    }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStatus);
  const currentStep = currentStepIndex >= 0 ? currentStepIndex : 0;

  return (
    <ProgressContainer $isDark={isDark} $hideTitle={hideTitle}>
      {!hideTitle && (
        <ProgressTitle $isDark={isDark}>
          📦 Статус доставки
        </ProgressTitle>
      )}
      
      <StepsContainer>
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          
          return (
            <Step 
              key={step.id} 
              $isActive={isActive} 
              $isCompleted={isCompleted}
              $isDark={isDark}
            >
              <StepIcon $isActive={isActive} $isCompleted={isCompleted}>
                {isCompleted ? '✓' : isActive ? step.icon : index + 1}
              </StepIcon>
              
              <StepContent $isActive={isActive} $isCompleted={isCompleted} $isDark={isDark}>
                <StepTitle $isActive={isActive} $isCompleted={isCompleted} $isDark={isDark}>
                  {step.title}
                </StepTitle>
                <StepDescription $isActive={isActive} $isCompleted={isCompleted} $isDark={isDark}>
                  {step.description}
                </StepDescription>
              </StepContent>
            </Step>
          );
        })}
      </StepsContainer>
    </ProgressContainer>
  );
};

export default ProgressBar;
