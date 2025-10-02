import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import AchievementsModal from './AchievementsModal';
import LevelsModal from './LevelsModal';
import { HapticFeedback } from '../utils/hapticFeedback';

// Плавная анимация появления
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

const floatAnimation = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
    opacity: 0.1; 
  }
  50% { 
    transform: translateY(-10px) rotate(2deg); 
    opacity: 0.2; 
  }
`;

const floatChaotic = keyframes`
  0% { transform: translate(0px, 0px) rotate(0deg); }
  25% { transform: translate(10px, -5px) rotate(1deg); }
  50% { transform: translate(-5px, -10px) rotate(-1deg); }
  75% { transform: translate(-8px, 5px) rotate(0.5deg); }
  100% { transform: translate(0px, 0px) rotate(0deg); }
`;

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

interface ProfileData {
  user: {
    telegram_id: string;
    full_name: string | null;
    phone_number: string | null;
    preferred_currency: string;
    commission: number;
    created_at: string;
    avatar_url?: string;
  };
  statistics: {
    orders: {
      total_orders: number;
      completed_orders: number;
    };
    referrals: {
      total_referrals: number;
      total_clicks: number;
    };
    yuan_purchases: {
      total_purchases: number;
      total_spent_rub: number;
      total_bought_cny: number;
      total_savings: number;
    };
  };
  gamification: {
    level: string;
    levelProgress: number;
    nextLevel: string;
    ordersToNext: number;
    achievements: Array<{
      id: string;
      name: string;
      icon: string;
    }>;
  };
}

interface ProfileProps {
  telegramId: string;
  isDarkTheme: boolean;
  toggleTheme: () => void;
  onNavigate: (page: string) => void;
}

const ProfileContainer = styled.div<{ $isDark: boolean }>`
  padding: 0px 0px 100px 0px;
  min-height: 100vh;
  background: transparent;
  color: var(--text-primary);
  position: relative;
  z-index: 1;
  transition: all 0.5s ease;
  animation: ${fadeIn} 0.8s ease-out forwards;
  isolation: isolate;
`;

const BackgroundHieroglyphs = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  transform: translateZ(0);
`;

const Hieroglyph = styled.div`
  position: fixed;
  font-family: 'Noto Sans SC', serif;
  color: var(--pattern-color);
  text-shadow: 
    0 0 6px var(--glow-terracotta),
    0 0 12px var(--glow-terracotta);
  animation: ${floatChaotic} 25s ease-in-out infinite;
  opacity: 0.5;
  font-weight: 500;
  font-size: 1.4rem;
  transition: none;
  z-index: 0;
  transform: translateZ(0);
  
  &:nth-child(1) { top: 10%; left: 5%; font-size: 2rem; animation-delay: 0s; }
  &:nth-child(2) { top: 20%; left: 15%; font-size: 1.5rem; animation-delay: 2s; }
  &:nth-child(3) { top: 30%; left: 8%; font-size: 1.8rem; animation-delay: 4s; }
  &:nth-child(4) { top: 15%; left: 25%; font-size: 1.2rem; animation-delay: 6s; }
  &:nth-child(5) { top: 25%; left: 35%; font-size: 1.6rem; animation-delay: 8s; }
  &:nth-child(6) { top: 40%; left: 12%; font-size: 1.4rem; animation-delay: 10s; }
  &:nth-child(7) { top: 50%; left: 28%; font-size: 1.7rem; animation-delay: 12s; }
  &:nth-child(8) { top: 60%; left: 18%; font-size: 1.3rem; animation-delay: 14s; }
  &:nth-child(9) { top: 70%; left: 32%; font-size: 1.5rem; animation-delay: 16s; }
  &:nth-child(10) { top: 80%; left: 22%; font-size: 1.1rem; animation-delay: 18s; }
  &:nth-child(11) { top: 5%; right: 10%; font-size: 1.8rem; animation-delay: 3s; }
  &:nth-child(12) { top: 18%; right: 20%; font-size: 1.4rem; animation-delay: 5s; }
  &:nth-child(13) { top: 35%; right: 15%; font-size: 1.6rem; animation-delay: 7s; }
  &:nth-child(14) { top: 45%; right: 25%; font-size: 1.2rem; animation-delay: 9s; }
  &:nth-child(15) { top: 55%; right: 12%; font-size: 1.7rem; animation-delay: 11s; }
  &:nth-child(16) { top: 65%; right: 22%; font-size: 1.3rem; animation-delay: 13s; }
  &:nth-child(17) { top: 75%; right: 18%; font-size: 1.5rem; animation-delay: 15s; }
  &:nth-child(18) { top: 85%; right: 28%; font-size: 1.1rem; animation-delay: 17s; }
`;


const Header = styled.div`
  text-align: center;
  margin-top: 0;
  margin-bottom: 24px;
  padding-top: 0;
  padding: 0 16px;
  position: relative;
`;

const AdminButton = styled.button<{ $isDark: boolean }>`
  position: absolute;
  top: 0;
  left: 16px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  &:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    background: var(--bg-secondary);
  }

  &:active {
    transform: translateY(0) scale(1);
  }
`;

const ProfileTitle = styled.h1<{ $isDark: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-top: 0;
  margin-bottom: 8px;
  text-shadow: ${props => props.$isDark ? '0 0 10px var(--glow-red)' : 'none'};
`;

const ThemeToggle = styled.div`
  position: fixed;
  top: 10px;
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

const UserCard = styled.div<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? 'rgba(42, 42, 42, 0.95)' : 'rgba(230, 211, 179, 0.95)'};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px var(--shadow-card);
  margin: 0 16px 20px 16px;
  border: 1px solid var(--border-color);
  position: relative;
  backdrop-filter: blur(10px);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const UserAvatar = styled.div<{ $isDark: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--matte-red), var(--terracotta));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-right: 16px;
  box-shadow: 0 4px 12px var(--shadow-soft);
`;

const UserDetails = styled.div`
  flex: 1;
`;

const UserName = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 4px;
`;

const UserId = styled.p`
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--text-accent);
  margin-bottom: 8px;
`;

const UserStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 16px;
`;

const StatItem = styled.div<{ $isDark: boolean }>`
  text-align: center;
  padding: 12px;
  background: ${props => props.$isDark ? 'rgba(42, 42, 42, 0.95)' : 'rgba(230, 211, 179, 0.95)'};
  border-radius: 12px;
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
`;

const StatValue = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 20px;
  font-weight: 700;
  color: var(--matte-red);
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 12px;
  color: var(--text-secondary);
`;

const LevelCard = styled.div<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? 'rgba(42, 42, 42, 0.95)' : 'rgba(230, 211, 179, 0.95)'};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px var(--shadow-card);
  margin: 0 16px 20px 16px;
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
`;

const LevelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const LevelInfo = styled.div`
  display: flex;
  align-items: center;
`;

const LevelIcon = styled.div<{ $level: string }>`
  font-size: 32px;
  margin-right: 12px;
  ${props => {
    switch (props.$level) {
      case 'Bronze': return 'color: #CD7F32;';
      case 'Silver': return 'color: #C0C0C0;';
      case 'Gold': return 'color: #FFD700;';
      default: return 'color: var(--matte-red);';
    }
  }}
`;

const LevelText = styled.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
`;

const LevelName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
`;

const LevelProgress = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
`;

const ProgressBar = styled.div<{ $isDark: boolean }>`
  width: 100%;
  height: 8px;
  background: ${props => props.$isDark ? 'var(--bg-secondary)' : 'var(--bg-secondary)'};
  border-radius: 4px;
  overflow: hidden;
  margin-top: 12px;
`;

const ProgressFill = styled.div<{ $progress: number; $isDark: boolean }>`
  height: 100%;
  width: ${props => props.$progress}%;
  background: linear-gradient(90deg, var(--matte-red), var(--terracotta));
  border-radius: 4px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 8px var(--glow-red);
`;

const AchievementsSection = styled.div<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? 'rgba(42, 42, 42, 0.95)' : 'rgba(230, 211, 179, 0.95)'};
  border-radius: 16px;
  padding: 20px;
  margin: 0 16px 20px 16px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px var(--shadow-card);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
`;

const SectionTitle = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Section = styled.div<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? '#2a2a2a' : '#ffffff'};
  border: 1px solid ${props => props.$isDark ? '#444' : '#e0e0e0'};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
`;

const AchievementItem = styled.div<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? 'rgba(42, 42, 42, 0.95)' : 'rgba(230, 211, 179, 0.95)'};
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow-soft);
  }
`;

const HistorySection = styled.div<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? 'rgba(42, 42, 42, 0.95)' : 'rgba(230, 211, 179, 0.95)'};
  border-radius: 16px;
  padding: 20px;
  margin: 0 16px 20px 16px;
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
`;

const HistoryTitle = styled.div<{ $isDark: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: var(--matte-red);
  }
`;

const HistoryArrow = styled.span<{ $isExpanded: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: var(--matte-red);
  color: white;
  font-size: 14px;
  font-weight: bold;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => props.$isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  box-shadow: 0 2px 8px rgba(162, 59, 59, 0.3);
  position: absolute;
  right: 0;
`;

const HistoryList = styled.div<{ $isExpanded: boolean }>`
  max-height: ${props => props.$isExpanded ? '400px' : '0'};
  overflow: ${props => props.$isExpanded ? 'auto' : 'hidden'};
  transition: max-height 0.3s ease;
  
  /* Стилизация скроллбара */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

const HistoryItem = styled.div<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? 'rgba(42, 42, 42, 0.95)' : '#F8F5ED'};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const HistoryItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const HistoryItemDate = styled.div<{ $isDark: boolean }>`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 12px;
  color: ${props => props.$isDark ? 'var(--text-primary)' : '#999999'};
  font-weight: 400;
`;

const HistoryItemStatus = styled.div<{ $status: string }>`
  background: #5cb85c;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const HistoryItemType = styled.div<{ $isDark: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  
  .type-icon {
    font-size: 14px;
  }
  
  .type-text {
    font-family: 'Inter', Arial, sans-serif;
    font-size: 12px;
    color: ${props => props.$isDark ? 'var(--text-primary)' : '#666666'};
    font-weight: 500;
  }
`;

const HistoryItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const HistoryDetail = styled.div<{ $isDark: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 13px;
  
  span:first-child {
    color: ${props => props.$isDark ? 'var(--text-primary)' : '#666666'};
    font-weight: 400;
    font-size: 13px;
  }
  
  span:last-child {
    color: ${props => props.$isDark ? 'var(--text-primary)' : '#333333'};
    font-weight: 500;
    font-size: 13px;
  }
`;

const AchievementIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

const AchievementName = styled.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: var(--text-primary);
`;

const ViewAllButton = styled.button<{ $isDark: boolean }>`
  background: var(--matte-red);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 16px;
  width: 100%;
  
  &:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow-soft);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Button = styled.button<{ $isDark: boolean }>`
  background: linear-gradient(135deg, #A23B3B, #8B2A2A);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
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
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: var(--text-secondary);
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: var(--matte-red);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
`;

const Profile: React.FC<ProfileProps> = ({ telegramId, isDarkTheme, toggleTheme, onNavigate }) => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAchievements, setShowAchievements] = useState(false);
  const [allAchievements, setAllAchievements] = useState<Achievement[]>([]);
  const [showLevels, setShowLevels] = useState(false);
  const [telegramUser, setTelegramUser] = useState<any>(null);
  const [achievementsModalPosition, setAchievementsModalPosition] = useState({ top: '50%', transform: 'translateY(-50%)' });
  const [levelsModalPosition, setLevelsModalPosition] = useState({ top: '50%', transform: 'translateY(-50%)' });
  const [yuanHistory, setYuanHistory] = useState<any[]>([]);
  const [ordersHistory, setOrdersHistory] = useState<any[]>([]);
  const [ordersHistoryExpanded, setOrdersHistoryExpanded] = useState(false);
  const [combinedHistory, setCombinedHistory] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordModalPosition, setPasswordModalPosition] = useState({ top: '50%', left: '50%' });
  const [isMobile, setIsMobile] = useState(false);
  
  // Состояния для заказов в пути
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Проверяем права доступа к админке
  useEffect(() => {
    const checkAdminAccess = () => {
      const tg = window.Telegram?.WebApp;
      const user = tg?.initDataUnsafe?.user;
      const userId = user?.id?.toString();
      
      // Временно даем доступ всем для разработки
      // const adminIds = ['7696515351', '690296532'];
      // return adminIds.includes(userId || '');
      return true; // Временно открываем доступ всем
    };

    setIsAdmin(checkAdminAccess());
  }, []);

  useEffect(() => {
    // Получаем данные пользователя из Telegram WebApp
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      setTelegramUser(window.Telegram.WebApp.initDataUnsafe.user);
    }
    
    fetchProfileData();
    fetchYuanHistory();
    fetchOrdersHistory();
    fetchUserOrders();
  }, [telegramId]);

  useEffect(() => {
    if (profileData) {
      generateAllAchievements();
    }
  }, [profileData]);

  // Объединяем и сортируем историю по дате
  useEffect(() => {
    const combined = [
      ...yuanHistory.map(item => ({ ...item, type: 'yuan', sortDate: new Date(item.created_at) })),
      ...ordersHistory.map(item => ({ ...item, type: 'order', sortDate: new Date(item.created_at) }))
    ].sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return dateB.getTime() - dateA.getTime();
    });
    
    setCombinedHistory(combined);
  }, [yuanHistory, ordersHistory]);

  const generateAllAchievements = () => {
    const achievements: Achievement[] = [
      // Заказы
      {
        id: 'first_order',
        name: 'Первый заказ',
        description: 'Сделайте свой первый заказ',
        icon: '🎯',
        category: 'Заказы',
        requirement: '1 заказ',
        unlocked: profileData?.statistics.orders.total_orders ? profileData.statistics.orders.total_orders >= 1 : false,
        progress: Math.min((profileData?.statistics.orders.total_orders || 0) / 1 * 100, 100)
      },
      {
        id: 'five_orders',
        name: 'Постоянный клиент',
        description: 'Сделайте 5 заказов',
        icon: '⭐',
        category: 'Заказы',
        requirement: '5 заказов',
        unlocked: profileData?.statistics.orders.total_orders ? profileData.statistics.orders.total_orders >= 5 : false,
        progress: Math.min((profileData?.statistics.orders.total_orders || 0) / 5 * 100, 100)
      },
      {
        id: 'ten_orders',
        name: 'VIP клиент',
        description: 'Сделайте 10 заказов',
        icon: '👑',
        category: 'Заказы',
        requirement: '10 заказов',
        unlocked: profileData?.statistics.orders.total_orders ? profileData.statistics.orders.total_orders >= 10 : false,
        progress: Math.min((profileData?.statistics.orders.total_orders || 0) / 10 * 100, 100)
      },
      {
        id: 'twenty_orders',
        name: 'Мастер покупок',
        description: 'Сделайте 20 заказов',
        icon: '🛍️',
        category: 'Заказы',
        requirement: '20 заказов',
        unlocked: profileData?.statistics.orders.total_orders ? profileData.statistics.orders.total_orders >= 20 : false,
        progress: Math.min((profileData?.statistics.orders.total_orders || 0) / 20 * 100, 100)
      },
      {
        id: 'fifty_orders',
        name: 'Легенда покупок',
        description: 'Сделайте 50 заказов',
        icon: '🏆',
        category: 'Заказы',
        requirement: '50 заказов',
        unlocked: profileData?.statistics.orders.total_orders ? profileData.statistics.orders.total_orders >= 50 : false,
        progress: Math.min((profileData?.statistics.orders.total_orders || 0) / 50 * 100, 100)
      },

      // Рефералы
      {
        id: 'first_referral',
        name: 'Пригласил друга',
        description: 'Пригласите первого друга',
        icon: '🤝',
        category: 'Рефералы',
        requirement: '1 реферал',
        unlocked: profileData?.statistics.referrals.total_referrals ? profileData.statistics.referrals.total_referrals >= 1 : false,
        progress: Math.min((profileData?.statistics.referrals.total_referrals || 0) / 1 * 100, 100)
      },
      {
        id: 'five_referrals',
        name: 'Амбассадор',
        description: 'Пригласите 5 друзей',
        icon: '🌟',
        category: 'Рефералы',
        requirement: '5 рефералов',
        unlocked: profileData?.statistics.referrals.total_referrals ? profileData.statistics.referrals.total_referrals >= 5 : false,
        progress: Math.min((profileData?.statistics.referrals.total_referrals || 0) / 5 * 100, 100)
      },
      {
        id: 'ten_referrals',
        name: 'Мастер приглашений',
        description: 'Пригласите 10 друзей',
        icon: '🎪',
        category: 'Рефералы',
        requirement: '10 рефералов',
        unlocked: profileData?.statistics.referrals.total_referrals ? profileData.statistics.referrals.total_referrals >= 10 : false,
        progress: Math.min((profileData?.statistics.referrals.total_referrals || 0) / 10 * 100, 100)
      },
      {
        id: 'hundred_clicks',
        name: 'Популярная ссылка',
        description: 'Получите 100 кликов по реферальной ссылке',
        icon: '🔥',
        category: 'Рефералы',
        requirement: '100 кликов',
        unlocked: profileData?.statistics.referrals.total_clicks ? profileData.statistics.referrals.total_clicks >= 100 : false,
        progress: Math.min((profileData?.statistics.referrals.total_clicks || 0) / 100 * 100, 100)
      },

      // Покупки юаня
      {
        id: 'first_yuan',
        name: 'Покупатель юаня',
        description: 'Купите юани впервые',
        icon: '¥',
        category: 'Юань',
        requirement: '1 покупка юаня',
        unlocked: profileData?.statistics.yuan_purchases.total_purchases ? profileData.statistics.yuan_purchases.total_purchases >= 1 : false,
        progress: Math.min((profileData?.statistics.yuan_purchases.total_purchases || 0) / 1 * 100, 100)
      },
      {
        id: 'yuan_saver',
        name: 'Экономист',
        description: 'Сэкономьте 1000 рублей',
        icon: '💎',
        category: 'Юань',
        requirement: '1000₽ экономии',
        unlocked: profileData?.statistics.total_savings?.total ? profileData.statistics.total_savings.total >= 1000 : false,
        progress: Math.min((profileData?.statistics.total_savings?.total || 0) / 1000 * 100, 100)
      },
      {
        id: 'yuan_master',
        name: 'Мастер юаня',
        description: 'Купите юани на сумму 100,000 рублей',
        icon: '🏦',
        category: 'Юань',
        requirement: '100,000₽ потрачено',
        unlocked: profileData?.statistics.yuan_purchases.total_spent_rub ? profileData.statistics.yuan_purchases.total_spent_rub >= 100000 : false,
        progress: Math.min((profileData?.statistics.yuan_purchases.total_spent_rub || 0) / 100000 * 100, 100)
      },

      // Специальные достижения
      {
        id: 'early_bird',
        name: 'Ранняя пташка',
        description: 'Зарегистрируйтесь в первые 30 дней',
        icon: '🐦',
        category: 'Специальные',
        requirement: 'Регистрация в первые 30 дней',
        unlocked: profileData?.user.created_at ? 
          (new Date().getTime() - new Date(profileData.user.created_at).getTime()) / (1000 * 60 * 60 * 24) <= 30 : false
      },
      {
        id: 'loyal_customer',
        name: 'Лояльный клиент',
        description: 'Делайте заказы регулярно в течение 3 месяцев',
        icon: '💝',
        category: 'Специальные',
        requirement: '3 месяца активности',
        unlocked: profileData?.user.created_at ? 
          (new Date().getTime() - new Date(profileData.user.created_at).getTime()) / (1000 * 60 * 60 * 24) >= 90 : false
      },
      {
        id: 'big_spender',
        name: 'Большой покупатель',
        description: 'Потратьте более 50,000 рублей на заказы',
        icon: '💸',
        category: 'Специальные',
        requirement: '50,000₽ потрачено',
        unlocked: false // Это нужно будет рассчитывать на основе заказов
      },

      // Достижения по времени
      {
        id: 'week_warrior',
        name: 'Недельный воин',
        description: 'Делайте заказы 7 дней подряд',
        icon: '⚔️',
        category: 'Время',
        requirement: '7 дней подряд',
        unlocked: false
      },
      {
        id: 'month_master',
        name: 'Мастер месяца',
        description: 'Делайте заказы каждый день в течение месяца',
        icon: '📅',
        category: 'Время',
        requirement: '30 дней подряд',
        unlocked: false
      },
      {
        id: 'night_owl',
        name: 'Ночная сова',
        description: 'Сделайте заказ между 23:00 и 06:00',
        icon: '🦉',
        category: 'Время',
        requirement: 'Заказ ночью',
        unlocked: false
      },

      // Достижения по суммам
      {
        id: 'thousand_rub',
        name: 'Тысячник',
        description: 'Потратьте 1,000 рублей за один заказ',
        icon: '💵',
        category: 'Суммы',
        requirement: '1,000₽ за заказ',
        unlocked: false
      },
      {
        id: 'five_thousand',
        name: 'Пятитысячник',
        description: 'Потратьте 5,000 рублей за один заказ',
        icon: '💴',
        category: 'Суммы',
        requirement: '5,000₽ за заказ',
        unlocked: false
      },
      {
        id: 'ten_thousand',
        name: 'Десятитысячник',
        description: 'Потратьте 10,000 рублей за один заказ',
        icon: '💶',
        category: 'Суммы',
        requirement: '10,000₽ за заказ',
        unlocked: false
      },

      // Достижения по активности
      {
        id: 'social_butterfly',
        name: 'Социальная бабочка',
        description: 'Получите 50 кликов по реферальной ссылке за день',
        icon: '🦋',
        category: 'Активность',
        requirement: '50 кликов за день',
        unlocked: false
      },
      {
        id: 'viral_marketer',
        name: 'Вирусный маркетолог',
        description: 'Получите 100 кликов по реферальной ссылке за день',
        icon: '📈',
        category: 'Активность',
        requirement: '100 кликов за день',
        unlocked: false
      },
      {
        id: 'influencer',
        name: 'Инфлюенсер',
        description: 'Пригласите 20 друзей за месяц',
        icon: '🌟',
        category: 'Активность',
        requirement: '20 рефералов за месяц',
        unlocked: false
      },

      // Достижения по юаню
      {
        id: 'yuan_collector',
        name: 'Коллекционер юаня',
        description: 'Купите юани 10 раз',
        icon: '🪙',
        category: 'Юань',
        requirement: '10 покупок юаня',
        unlocked: profileData?.statistics.yuan_purchases.total_purchases ? profileData.statistics.yuan_purchases.total_purchases >= 10 : false,
        progress: Math.min((profileData?.statistics.yuan_purchases.total_purchases || 0) / 10 * 100, 100)
      },
      {
        id: 'yuan_whale',
        name: 'Кит юаня',
        description: 'Купите юани на 500,000 рублей',
        icon: '🐋',
        category: 'Юань',
        requirement: '500,000₽ потрачено',
        unlocked: profileData?.statistics.yuan_purchases.total_spent_rub ? profileData.statistics.yuan_purchases.total_spent_rub >= 500000 : false,
        progress: Math.min((profileData?.statistics.yuan_purchases.total_spent_rub || 0) / 500000 * 100, 100)
      },

      // Достижения по сезонам
      {
        id: 'spring_buyer',
        name: 'Весенний покупатель',
        description: 'Сделайте заказ весной',
        icon: '🌸',
        category: 'Сезоны',
        requirement: 'Заказ весной',
        unlocked: false
      },
      {
        id: 'summer_shopper',
        name: 'Летний шопер',
        description: 'Сделайте заказ летом',
        icon: '☀️',
        category: 'Сезоны',
        requirement: 'Заказ летом',
        unlocked: false
      },
      {
        id: 'autumn_collector',
        name: 'Осенний коллекционер',
        description: 'Сделайте заказ осенью',
        icon: '🍂',
        category: 'Сезоны',
        requirement: 'Заказ осенью',
        unlocked: false
      },
      {
        id: 'winter_warrior',
        name: 'Зимний воин',
        description: 'Сделайте заказ зимой',
        icon: '❄️',
        category: 'Сезоны',
        requirement: 'Заказ зимой',
        unlocked: false
      }
    ];

    setAllAchievements(achievements);
  };


  const fetchYuanHistory = async () => {
    try {
      const response = await fetch(`/api/yuan-purchases?telegram_id=${telegramId}`);
      if (response.ok) {
        const data = await response.json();
        setYuanHistory(data.purchases || []);
      }
    } catch (error) {
      console.error('Ошибка загрузки истории покупок юаней:', error);
    }
  };

  const fetchOrdersHistory = async () => {
    try {
      const response = await fetch(`/api/orders-history?telegram_id=${telegramId}`);
      if (response.ok) {
        const data = await response.json();
        setOrdersHistory(data.orders || []);
      }
    } catch (error) {
      console.error('Ошибка загрузки истории заказов:', error);
    }
  };

  // Загрузка заказов пользователя
  const fetchUserOrders = async () => {
    setLoadingOrders(true);
    try {
      const response = await fetch('/api/user/orders', {
        headers: {
          'x-telegram-init-data': (window as any).Telegram?.WebApp?.initData || ''
        }
      });
      
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

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      
      // Проверяем, что telegramId валидный
      if (!telegramId || telegramId === '0' || telegramId === 'undefined') {
        setError('Необходимо авторизоваться через Telegram');
        setLoading(false);
        return;
      }
      
      // ДЕМО-ДАННЫЕ для разработки (убрать перед продакшеном!)
      if (telegramId === 'demo') {
        const demoData: ProfileData = {
          user: {
            telegram_id: 'demo',
            full_name: 'Демо Пользователь',
            phone_number: '+7 (999) 123-45-67',
            preferred_currency: 'RUB',
            commission: 0.05,
            created_at: '2024-01-15T10:30:00Z',
            avatar_url: null
          },
          statistics: {
            orders: {
              total_orders: 12,
              completed_orders: 12
            },
            referrals: {
              total_referrals: 4,
              total_clicks: 41
            },
            yuan_purchases: {
              total_purchases: 5,
              total_spent_rub: 72000,
              total_bought_cny: 5800,
              total_savings: 1230
            }
          },
          gamification: {
            level: 'Silver',
            levelProgress: 40,
            nextLevel: 'Gold',
            ordersToNext: 9,
            achievements: [
              { id: 'first_order', name: 'Первый заказ', icon: '🎯' },
              { id: 'loyal_customer', name: 'Постоянный клиент', icon: '⭐' },
              { id: 'vip_customer', name: 'VIP клиент', icon: '👑' },
              { id: 'referrer', name: 'Пригласил друга', icon: '🤝' },
              { id: 'yuan_buyer', name: 'Покупатель юаня', icon: '¥' }
            ]
          }
        };
        
        setProfileData(demoData);
        setLoading(false);
        return;
      }
      
      // Получаем РЕАЛЬНЫЕ данные профиля из БД
      const profileResponse = await fetch(`/api/profile?telegram_id=${telegramId}`);
      
      if (!profileResponse.ok) {
        if (profileResponse.status === 404) {
          setError('Пользователь не найден. Создайте заказ для регистрации.');
        } else {
          throw new Error('Ошибка загрузки профиля');
        }
        return;
      }
      
      const profileData = await profileResponse.json();
      
      // Основные данные профиля уже содержат всю необходимую информацию
      // из таблиц users, orders, referrals, yuan_purchases
      
      setProfileData(profileData);
    } catch (err) {
      console.error('Ошибка загрузки профиля:', err);
      setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
    } finally {
      setLoading(false);
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Bronze': return '🥉';
      case 'Silver': return '🥈';
      case 'Gold': return '🥇';
      default: return '🏆';
    }
  };


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(amount);
  };

  // Функция для проверки пароля
  const checkPassword = async (inputPassword: string) => {
    try {
      // Хешируем пароль для сравнения
      const encoder = new TextEncoder();
      const data = encoder.encode(inputPassword);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      // Хеш пароля "root" (SHA-256)
      const rootHash = '4813494d137e1631bba301d5acab6e7bb7aa74ce1185d456565ef51d737677b2';
      
      return hashHex === rootHash;
    } catch (error) {
      console.error('Ошибка проверки пароля:', error);
      return false;
    }
  };

  // Отслеживание размера экрана для адаптивности
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Динамическое позиционирование модального окна пароля
  useEffect(() => {
    const updateModalPosition = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      
      // Центрируем модальное окно относительно видимой области
      const top = scrollY + (viewportHeight / 2);
      const left = viewportWidth / 2;

      setPasswordModalPosition({ top: `${top}px`, left: `${left}px` });
    };

    if (showPasswordModal) {
      updateModalPosition(); // Устанавливаем начальную позицию
      window.addEventListener('scroll', updateModalPosition);
      window.addEventListener('resize', updateModalPosition);
    }

    return () => {
      window.removeEventListener('scroll', updateModalPosition);
      window.removeEventListener('resize', updateModalPosition);
    };
  }, [showPasswordModal]);

  // Обработчик нажатия на кнопку админки
  const handleAdminClick = () => {
    HapticFeedback.medium();
    setShowPasswordModal(true);
    setPassword('');
    setPasswordError('');
  };

  // Обработчик подтверждения пароля
  const handlePasswordSubmit = async () => {
    if (!password.trim()) {
      setPasswordError('Введите пароль');
      return;
    }

    const isValid = await checkPassword(password);
    if (isValid) {
      setShowPasswordModal(false);
      setPassword('');
      setPasswordError('');
      onNavigate('admin');
    } else {
      setPasswordError('Неверный пароль');
      HapticFeedback.error();
    }
  };

  // Обработчик закрытия модального окна
  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
    setPassword('');
    setPasswordError('');
  };


  if (loading) {
    return (
      <ProfileContainer $isDark={isDarkTheme}>
        <LoadingSpinner>Загрузка профиля...</LoadingSpinner>
      </ProfileContainer>
    );
  }

  if (error) {
    return (
      <ProfileContainer $isDark={isDarkTheme}>
        <ErrorMessage>{error}</ErrorMessage>
      </ProfileContainer>
    );
  }

  if (!profileData) {
    return (
      <ProfileContainer $isDark={isDarkTheme}>
        <ErrorMessage>Данные профиля не найдены</ErrorMessage>
      </ProfileContainer>
    );
  }

  return (
    <ProfileContainer $isDark={isDarkTheme}>
      <BackgroundHieroglyphs>
        <Hieroglyph>龍</Hieroglyph>
        <Hieroglyph>福</Hieroglyph>
        <Hieroglyph>壽</Hieroglyph>
        <Hieroglyph>喜</Hieroglyph>
        <Hieroglyph>財</Hieroglyph>
        <Hieroglyph>吉</Hieroglyph>
        <Hieroglyph>祥</Hieroglyph>
        <Hieroglyph>安</Hieroglyph>
        <Hieroglyph>康</Hieroglyph>
        <Hieroglyph>樂</Hieroglyph>
        <Hieroglyph>智</Hieroglyph>
        <Hieroglyph>德</Hieroglyph>
        <Hieroglyph>義</Hieroglyph>
        <Hieroglyph>和</Hieroglyph>
        <Hieroglyph>信</Hieroglyph>
        <Hieroglyph>禮</Hieroglyph>
        <Hieroglyph>仁</Hieroglyph>
        <Hieroglyph>勇</Hieroglyph>
      </BackgroundHieroglyphs>
      
      <Header>
        {isAdmin && (
          <AdminButton 
            $isDark={isDarkTheme}
            onClick={handleAdminClick}
            title="Админка"
          >
            👨🏻‍💻
          </AdminButton>
        )}
        <ProfileTitle $isDark={isDarkTheme}>Профиль</ProfileTitle>
      </Header>

      <ThemeToggle onClick={toggleTheme}>
        <ToggleIcon $isDark={isDarkTheme}>🌙</ToggleIcon>
        <ToggleIconDark $isDark={isDarkTheme}>☀️</ToggleIconDark>
        <ToggleSlider $isDark={isDarkTheme}></ToggleSlider>
      </ThemeToggle>

      <UserCard $isDark={isDarkTheme}>
        <UserInfo>
          <UserAvatar $isDark={isDarkTheme}>
            {telegramUser?.photo_url ? (
              <img 
                src={telegramUser.photo_url} 
                alt="Avatar" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  borderRadius: '50%', 
                  objectFit: 'cover' 
                }} 
              />
            ) : (
              '👤'
            )}
          </UserAvatar>
          <UserDetails>
            <UserName>
              {telegramUser?.first_name && telegramUser?.last_name 
                ? `${telegramUser.first_name} ${telegramUser.last_name}`
                : telegramUser?.first_name || profileData.user.full_name || 'Пользователь'
              }
            </UserName>
            <UserId>ID: {profileData.user.telegram_id}</UserId>
            <div style={{ fontSize: '12px', color: 'var(--text-accent)' }}>
              Участник с {formatDate(profileData.user.created_at)}
            </div>
          </UserDetails>
        </UserInfo>
        
        <UserStats>
          <StatItem $isDark={isDarkTheme}>
            <StatValue>{profileData.statistics.orders.total_orders}</StatValue>
            <StatLabel>Заказов</StatLabel>
          </StatItem>
          <StatItem $isDark={isDarkTheme}>
            <StatValue>{profileData.statistics.referrals.total_referrals}</StatValue>
            <StatLabel>Рефералов</StatLabel>
          </StatItem>
          <StatItem $isDark={isDarkTheme}>
            <StatValue>{profileData.statistics.yuan_purchases.total_purchases}</StatValue>
            <StatLabel>Покупок юаня</StatLabel>
          </StatItem>
          <StatItem $isDark={isDarkTheme}>
            <StatValue>{formatCurrency(profileData.statistics.total_savings?.total || 0)}</StatValue>
            <StatLabel>Сэкономлено</StatLabel>
          </StatItem>
        </UserStats>
      </UserCard>

      <LevelCard $isDark={isDarkTheme}>
        <LevelHeader 
          onClick={() => {
            // Вычисляем позицию модального окна чуть ниже центра видимой области
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const modalTop = scrollTop + (windowHeight / 2) + 50; // Чуть ниже центра экрана
            
            setLevelsModalPosition({
              top: `${modalTop}px`,
              transform: 'translateY(-50%)'
            });
            
            setShowLevels(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          <LevelInfo>
            <LevelIcon $level={profileData.gamification.level}>
              {getLevelIcon(profileData.gamification.level)}
            </LevelIcon>
            <LevelText>
              <LevelName>{profileData.gamification.level} Уровень</LevelName>
              <LevelProgress>
                {profileData.gamification.levelProgress.toFixed(0)}% до {profileData.gamification.nextLevel}
              </LevelProgress>
            </LevelText>
          </LevelInfo>
        </LevelHeader>
        
        <ProgressBar $isDark={isDarkTheme}>
          <ProgressFill 
            $progress={profileData.gamification.levelProgress} 
            $isDark={isDarkTheme}
          />
        </ProgressBar>
        
        {profileData.gamification.ordersToNext > 0 && (
          <div style={{ 
            marginTop: '12px', 
            fontSize: '14px', 
            color: 'var(--text-secondary)',
            textAlign: 'center'
          }}>
            До следующего уровня: {profileData.gamification.ordersToNext} заказов
          </div>
        )}
      </LevelCard>

      {profileData.gamification.achievements.length > 0 && (
        <AchievementsSection $isDark={isDarkTheme}>
          <SectionTitle>
            🏆 Достижения
          </SectionTitle>
          <AchievementsGrid>
            {profileData.gamification.achievements.map((achievement) => (
              <AchievementItem 
                key={achievement.id} 
                $isDark={isDarkTheme}
              >
                <AchievementIcon>{achievement.icon}</AchievementIcon>
                <AchievementName>{achievement.name}</AchievementName>
              </AchievementItem>
            ))}
          </AchievementsGrid>
          <ViewAllButton 
            $isDark={isDarkTheme}
            onClick={() => {
              // Вычисляем позицию модального окна чуть ниже центра видимой области
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              const windowHeight = window.innerHeight;
              const modalTop = scrollTop + (windowHeight / 2) + 50; // Чуть ниже центра экрана
              
              setAchievementsModalPosition({
                top: `${modalTop}px`,
                transform: 'translateY(-50%)'
              });
              
              setShowAchievements(true);
            }}
          >
            Посмотреть все достижения
          </ViewAllButton>
        </AchievementsSection>
      )}

      {/* Заказы в пути */}
      {userOrders && userOrders.length > 0 && (
        <HistorySection $isDark={isDarkTheme}>
          <HistoryTitle $isDark={isDarkTheme}>
            📦 Заказы в пути
          </HistoryTitle>
          <HistoryList $isExpanded={true}>
            {userOrders
              .filter(order => order.delivery_status !== 'Доставлен')
              .map((order, index) => (
                <HistoryItem key={`order-${order.order_id}-${index}`} $isDark={isDarkTheme}>
                  <HistoryItemHeader>
                    <HistoryItemDate $isDark={isDarkTheme}>
                      Заказ #{order.order_id}
                    </HistoryItemDate>
                    <HistoryItemStatus $status={getStatusColor(order.delivery_status)}>
                      {getStatusEmoji(order.delivery_status)} {order.delivery_status || 'Создан'}
                    </HistoryItemStatus>
                  </HistoryItemHeader>
                  <HistoryItemContent>
                    <div style={{ marginBottom: '8px' }}>
                      <strong>🔍 Трек-номер:</strong> {order.internal_tracking_number || 'Не назначен'}
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <strong>📍 ПВЗ:</strong> {order.pickup_point || 'Не указан'}
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <strong>📅 Создан:</strong> {new Date(order.created_at).toLocaleDateString('ru-RU')}
                    </div>
                    {order.last_updated && (
                      <div style={{ marginBottom: '8px' }}>
                        <strong>⏰ Обновлен:</strong> {new Date(order.last_updated).toLocaleString('ru-RU')}
                      </div>
                    )}
                    <div style={{ 
                      marginTop: '12px',
                      padding: '8px 12px',
                      background: 'linear-gradient(135deg, rgba(162, 59, 59, 0.1), rgba(157, 78, 61, 0.05))',
                      borderRadius: '8px',
                      border: '1px solid var(--matte-red)',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)'
                    }}>
                      💡 Используйте трек-номер для отслеживания в разделе "Отследить заказ"
                    </div>
                  </HistoryItemContent>
                </HistoryItem>
              ))}
          </HistoryList>
        </HistorySection>
      )}

      {/* История заказов и покупок юаней */}
      {combinedHistory && combinedHistory.length > 0 && (
        <HistorySection $isDark={isDarkTheme}>
          <HistoryTitle $isDark={isDarkTheme} onClick={() => setOrdersHistoryExpanded(!ordersHistoryExpanded)}>
            История заказов
            <HistoryArrow $isExpanded={ordersHistoryExpanded}>▼</HistoryArrow>
          </HistoryTitle>
          <HistoryList $isExpanded={ordersHistoryExpanded}>
            {combinedHistory.map((item, index) => (
              <HistoryItem key={`${item.type}-${item.id || item.order_id}-${index}`} $isDark={isDarkTheme}>
                <HistoryItemHeader>
                  <HistoryItemDate $isDark={isDarkTheme}>
                    {new Date(item.created_at).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}, {new Date(item.created_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                  </HistoryItemDate>
                  <HistoryItemStatus $status={item.status || 'completed'}>
                    ЗАВЕРШЕНО
                  </HistoryItemStatus>
                </HistoryItemHeader>
                
                <HistoryItemType $isDark={isDarkTheme}>
                  <span className="type-icon">
                    {item.type === 'order' ? '📦' : '💰'}
                  </span>
                  <span className="type-text">
                    {item.type === 'order' ? 'Оформление заказа' : 'Покупка юаней'}
                  </span>
                </HistoryItemType>
                
                <HistoryItemDetails>
                  {item.type === 'order' ? (
                    <>
                      <HistoryDetail $isDark={isDarkTheme}>
                        <span>Размер:</span>
                        <span>{item.product_size}</span>
                      </HistoryDetail>
                      <HistoryDetail $isDark={isDarkTheme}>
                        <span>Получатель:</span>
                        <span>{item.full_name}</span>
                      </HistoryDetail>
                      <HistoryDetail $isDark={isDarkTheme}>
                        <span>Телефон:</span>
                        <span>{item.phone_number}</span>
                      </HistoryDetail>
                      <HistoryDetail $isDark={isDarkTheme}>
                        <span>Пункт выдачи:</span>
                        <span>{item.pickup_point_address}</span>
                      </HistoryDetail>
                      <HistoryDetail $isDark={isDarkTheme}>
                        <span>Ссылка:</span>
                        <span style={{ fontSize: '12px', wordBreak: 'break-all' }}>
                          {item.product_link?.substring(0, 50)}...
                        </span>
                      </HistoryDetail>
                    </>
                  ) : (
                    <>
                      <HistoryDetail $isDark={isDarkTheme}>
                        <span>Потрачено:</span>
                        <span>{item.amount_rub.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽</span>
                      </HistoryDetail>
                      <HistoryDetail $isDark={isDarkTheme}>
                        <span>Получено:</span>
                        <span>{item.amount_cny.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ¥</span>
                      </HistoryDetail>
                      <HistoryDetail $isDark={isDarkTheme}>
                        <span>Курс:</span>
                        <span>{item.favorable_rate} ₽</span>
                      </HistoryDetail>
                      <HistoryDetail $isDark={isDarkTheme}>
                        <span>Экономия:</span>
                        <span>{item.savings.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽</span>
                      </HistoryDetail>
                    </>
                  )}
                </HistoryItemDetails>
              </HistoryItem>
            ))}
          </HistoryList>
        </HistorySection>
      )}


      <AchievementsModal
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
        achievements={allAchievements}
        isDarkTheme={isDarkTheme}
        modalPosition={achievementsModalPosition}
      />


      <LevelsModal
        isOpen={showLevels}
        onClose={() => setShowLevels(false)}
        currentLevel={profileData?.gamification.level || 'Bronze'}
        isDarkTheme={isDarkTheme}
        modalPosition={levelsModalPosition}
      />

      {/* Модальное окно для ввода пароля */}
      {showPasswordModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
          }}
          onClick={handlePasswordModalClose}
        >
          <div 
            style={{
              position: 'absolute',
              top: passwordModalPosition.top,
              left: passwordModalPosition.left,
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'var(--bg-card)',
              borderRadius: '16px',
              padding: isMobile ? '20px' : '24px',
              width: isMobile ? '95%' : '90%',
              maxWidth: '400px',
              minWidth: isMobile ? '260px' : '280px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              maxHeight: '90vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{
              color: 'var(--text-primary)',
              marginBottom: '20px',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              🔐 Введите пароль
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль для доступа к админке"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handlePasswordSubmit();
                  }
                }}
                autoFocus
              />
              {passwordError && (
                <p style={{
                  color: 'var(--matte-red)',
                  fontSize: '0.9rem',
                  marginTop: '8px',
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}>
                  {passwordError}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handlePasswordModalClose}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                Отмена
              </button>
              <button
                onClick={handlePasswordSubmit}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, var(--matte-red), var(--terracotta))',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(162, 59, 59, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(162, 59, 59, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(162, 59, 59, 0.3)';
                }}
              >
                Войти
              </button>
            </div>
          </div>
        </div>
      )}

    </ProfileContainer>
  );
};

// Вспомогательные функции для статусов доставки
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

export default Profile;
