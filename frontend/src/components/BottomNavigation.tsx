import React from 'react';
import styled from 'styled-components';
import { HapticFeedback } from '../utils/hapticFeedback';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDarkTheme: boolean;
  hideNavigation?: boolean;
}

const NavigationContainer = styled.div<{ $isDark: boolean; $hideNavigation?: boolean }>`
  position: fixed;
  bottom: -1px;
  left: 0;
  right: 0;
  width: 100%;
  background: ${props => props.$isDark 
    ? 'rgba(40, 40, 45, 0.4)' 
    : 'rgba(255, 252, 248, 0.4)'
  };
  border-top: 1px solid ${props => props.$isDark ? 'rgba(196, 77, 77, 0.3)' : 'rgba(162, 59, 59, 0.2)'};
  backdrop-filter: blur(25px) saturate(1.3) brightness(1.1);
  z-index: 9999;
  padding: 4px 0 6px 0;
  display: ${props => props.$hideNavigation ? 'none' : 'block'};
  margin: 0;
`;

const NavigationContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 16px;
`;

const NavItem = styled.button<{ $active: boolean; $isDark: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 12px;
  width: 60px;
  height: 50px;
  position: relative;
  flex: 1;
  
  ${props => props.$active && `
    background: ${props.$isDark ? 'rgba(196, 77, 77, 0.15)' : 'rgba(162, 59, 59, 0.1)'};
  `}
  
  &:hover {
    background: ${props => props.$isDark ? 'rgba(196, 77, 77, 0.08)' : 'rgba(162, 59, 59, 0.05)'};
  }
`;

const NavIcon = styled.div<{ $active: boolean; $isDark?: boolean }>`
  font-size: 22px;
  margin-bottom: 3px;
  position: relative;
  z-index: 2;
  color: ${props => props.$isDark ? 'white' : 'black'};
`;

const NavLabel = styled.span<{ $active: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 12px;
  font-weight: ${props => props.$active ? '700' : '500'};
  color: ${props => props.$active ? 'var(--matte-red)' : 'var(--text-secondary)'};
  text-align: center;
  line-height: 1.2;
  position: relative;
  z-index: 2;
`;


const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  activeTab, 
  onTabChange, 
  isDarkTheme,
  hideNavigation = false
}) => {
  const handleTabClick = (tab: string) => {
    // Haptic feedback
    if (HapticFeedback.impactOccurred) {
      HapticFeedback.impactOccurred('medium');
    }
    
    onTabChange(tab);
  };

  const navItems = [
    {
      id: 'yuan',
      label: 'Купить юань',
      icon: '¥'
    },
    {
      id: 'main',
      label: 'Главное меню',
      icon: '🏠'
    },
    {
      id: 'profile',
      label: 'Профиль',
      icon: '👤'
    }
  ];

  return (
    <NavigationContainer $isDark={isDarkTheme} $hideNavigation={hideNavigation}>
      <NavigationContent>
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            $active={activeTab === item.id}
            $isDark={isDarkTheme}
            onClick={() => handleTabClick(item.id)}
          >
            <NavIcon $active={activeTab === item.id} $isDark={isDarkTheme}>
              {item.icon}
            </NavIcon>
            <NavLabel $active={activeTab === item.id}>
              {item.label}
            </NavLabel>
          </NavItem>
        ))}
      </NavigationContent>
    </NavigationContainer>
  );
};

export default BottomNavigation;
