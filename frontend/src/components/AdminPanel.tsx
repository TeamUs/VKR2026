import React, { useState, useEffect, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { HapticFeedback } from '../utils/hapticFeedback';

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

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Стилизованные компоненты
const AdminContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  padding: 0px 0px 100px 0px;
  color: var(--text-primary);
  position: relative;
  z-index: 1;
  transition: all 0.5s ease;
  animation: ${fadeIn} 0.8s ease-out forwards;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  margin-top: 0px;
  padding: 0 16px;
  position: relative;
  
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  line-height: 1;
  padding: 0;
  margin: 0;
  
  &:hover {
    background: linear-gradient(135deg, var(--matte-red), var(--terracotta));
    color: white;
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(162, 59, 59, 0.3);
    border-color: transparent;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const Title = styled.h1`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  transition: color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  padding: 2px;
  margin-right: 0px;
  position: relative;
  
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
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  left: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`;

const ToggleIconDark = styled.span<{ $isDark: boolean }>`
  opacity: ${props => props.$isDark ? 0 : 1};
  transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  right: 8px;
  font-size: 0.7rem;
  color: var(--text-accent);
`;

const Content = styled.div`
  padding: 24px 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
`;

const StatCard = styled.div<{ $isDark: boolean }>`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--matte-red), var(--terracotta));
  }
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const StatValue = styled.div`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 2.4rem;
  font-weight: 700;
  color: var(--matte-red);
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const StatLabel = styled.div`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 500;
  transition: color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  gap: 0;
  background: transparent;
  border-radius: 0;
  padding: 0;
  box-shadow: none;
  backdrop-filter: none;
  border: none;
  position: relative;
`;

const TabButton = styled.button<{ $active: boolean; $isDark: boolean }>`
  background: ${props => props.$active 
    ? 'linear-gradient(135deg, var(--matte-red), var(--terracotta))' 
    : 'var(--bg-secondary)'};
  color: ${props => props.$active ? 'white' : 'var(--text-primary)'};
  border: ${props => props.$active ? 'none' : '1px solid var(--border-color)'};
  border-radius: 12px;
  padding: 12px 8px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  min-width: auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.$active 
    ? '0 4px 16px rgba(162, 59, 59, 0.35)' 
    : '0 2px 8px rgba(0, 0, 0, 0.06)'};
  
  &:hover {
    background: ${props => props.$active 
      ? 'linear-gradient(135deg, var(--terracotta), var(--matte-red))' 
      : 'var(--bg-hover)'};
    transform: translateY(-2px);
    box-shadow: ${props => props.$active 
      ? '0 6px 20px rgba(162, 59, 59, 0.45)' 
      : '0 4px 12px rgba(0, 0, 0, 0.1)'};
    border-color: ${props => props.$active ? 'transparent' : 'var(--matte-red)'};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  ${props => props.$active && `
    box-shadow: 
      0 6px 20px rgba(162, 59, 59, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), transparent);
      border-radius: 16px;
      pointer-events: none;
    }
  `}
`;

const Section = styled.div<{ $isDark: boolean }>`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 28px;
  margin-bottom: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 24px;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, var(--matte-red), var(--terracotta));
    border-radius: 2px;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-color);
`;

const StyledTable = styled.table<{ $isDark: boolean }>`
  width: 100%;
  border-collapse: collapse;
  background: var(--bg-card);
  color: var(--text-primary);
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.95rem;
  
  th, td {
    padding: 16px 20px;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }
  
  th {
    background: var(--bg-secondary);
    font-weight: 600;
    color: var(--text-primary);
    position: sticky;
    top: 0;
    z-index: 1;
    font-size: 1rem;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  tbody tr {
    transition: all 0.2s ease;
    
    &:hover {
      background: var(--bg-secondary);
      transform: scale(1.01);
    }
  }
`;

const RefreshButton = styled.button<{ $isDark: boolean }>`
  background: linear-gradient(135deg, var(--matte-red), var(--terracotta));
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 0 auto 24px auto;
  display: block;
  box-shadow: 0 4px 16px rgba(162, 59, 59, 0.25);
  
  &:hover {
    background: linear-gradient(135deg, var(--terracotta), var(--matte-red));
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(162, 59, 59, 0.35);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const LoadingSpinner = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid rgba(162, 59, 59, 0.2);
  border-top: 4px solid var(--matte-red);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${LoadingSpinner} 1s linear infinite;
  margin: 0 auto 20px auto;
`;

const ErrorMessage = styled.div`
  color: var(--matte-red);
  text-align: center;
  margin-top: 24px;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 20px;
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--text-secondary);
  font-size: 1.1rem;
`;

// Новые компоненты для улучшенного UX
const SearchContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchInput = styled.input<{ $isDark: boolean }>`
  flex: 1;
  min-width: 200px;
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.$isDark ? '#333' : '#e0e0e0'};
  border-radius: 12px;
  background: ${props => props.$isDark ? '#1a1a1a' : '#fff'};
  color: ${props => props.$isDark ? '#fff' : '#333'};
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
  
  &::placeholder {
    color: ${props => props.$isDark ? '#666' : '#999'};
  }
`;

const FilterSelect = styled.select<{ $isDark: boolean }>`
  padding: 0.75rem 1rem;
  border: 2px solid ${props => props.$isDark ? '#333' : '#e0e0e0'};
  border-radius: 12px;
  background: ${props => props.$isDark ? '#1a1a1a' : '#fff'};
  color: ${props => props.$isDark ? '#fff' : '#333'};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding: 1rem 0;
  border-top: 1px solid ${props => props.$isDark ? '#333' : '#e0e0e0'};
`;

const PaginationInfo = styled.span<{ $isDark: boolean }>`
  color: ${props => props.$isDark ? '#888' : '#666'};
  font-size: 0.9rem;
`;

const PaginationControls = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const PageButton = styled.button<{ $isDark: boolean; $active?: boolean }>`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${props => props.$isDark ? '#333' : '#e0e0e0'};
  border-radius: 8px;
  background: ${props => props.$active 
    ? '#007bff' 
    : props.$isDark ? '#1a1a1a' : '#fff'
  };
  color: ${props => props.$active 
    ? '#fff' 
    : props.$isDark ? '#fff' : '#333'
  };
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    background: ${props => props.$active 
      ? '#0056b3' 
      : props.$isDark ? '#333' : '#f8f9fa'
    };
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CompactTable = styled.table<{ $isDark: boolean }>`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
  background: ${props => props.$isDark ? '#1a1a1a' : '#fff'};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    display: none;
  }
`;

// Мобильные карточки
const MobileCardContainer = styled.div<{ $isDark: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileCard = styled.div<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? '#1a1a1a' : '#fff'};
  border: 1px solid ${props => props.$isDark ? '#333' : '#e0e0e0'};
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const MobileCardHeader = styled.div<{ $isDark: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${props => props.$isDark ? '#333' : '#e0e0e0'};
`;

const MobileCardTitle = styled.div<{ $isDark: boolean }>`
  font-weight: 600;
  font-size: 1rem;
  color: ${props => props.$isDark ? '#fff' : '#333'};
`;

const MobileCardStatus = styled.span<{ $status: string; $isDark: boolean }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${props => {
    switch (props.$status) {
      case 'completed': return '#28a745';
      case 'pending': return '#ffc107';
      case 'cancelled': return '#dc3545';
      default: return props.$isDark ? '#333' : '#e0e0e0';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'completed': return '#fff';
      case 'pending': return '#000';
      case 'cancelled': return '#fff';
      default: return props.$isDark ? '#fff' : '#333';
    }
  }};
`;

const MobileCardContent = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const MobileCardRow = styled.div<{ $isDark: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
`;

const MobileCardLabel = styled.span<{ $isDark: boolean }>`
  font-size: 0.8rem;
  color: ${props => props.$isDark ? '#888' : '#666'};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: 80px;
`;

const MobileCardValue = styled.span<{ $isDark: boolean }>`
  font-size: 0.9rem;
  color: ${props => props.$isDark ? '#fff' : '#333'};
  font-weight: 500;
  text-align: right;
  flex: 1;
`;

const MobileCardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${props => props.$isDark ? '#333' : '#e0e0e0'};
`;

const MobileActionButton = styled.button<{ $variant: 'success' | 'danger' | 'primary'; $isDark: boolean }>`
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  background: ${props => {
    switch (props.$variant) {
      case 'success': return '#28a745';
      case 'danger': return '#dc3545';
      case 'primary': return '#007bff';
      default: return props.$isDark ? '#333' : '#e0e0e0';
    }
  }};
  color: #fff;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const CompactTableHeader = styled.th<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? '#2a2a2a' : '#f8f9fa'};
  color: ${props => props.$isDark ? '#fff' : '#333'};
  padding: 0.75rem 0.5rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid ${props => props.$isDark ? '#333' : '#e0e0e0'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$isDark ? '#333' : '#e9ecef'};
  }
`;

const CompactTableRow = styled.tr<{ $isDark: boolean }>`
  border-bottom: 1px solid ${props => props.$isDark ? '#333' : '#e0e0e0'};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$isDark ? '#2a2a2a' : '#f8f9fa'};
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const CompactTableCell = styled.td<{ $isDark: boolean }>`
  padding: 0.75rem 0.5rem;
  color: ${props => props.$isDark ? '#fff' : '#333'};
  border-right: 1px solid ${props => props.$isDark ? '#333' : '#e0e0e0'};
  
  &:last-child {
    border-right: none;
  }
`;

const StatusBadge = styled.span<{ $status: string; $isDark: boolean }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${props => {
    switch (props.$status) {
      case 'completed': return '#28a745';
      case 'pending': return '#ffc107';
      case 'cancelled': return '#dc3545';
      default: return props.$isDark ? '#333' : '#e0e0e0';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'completed': return '#fff';
      case 'pending': return '#000';
      case 'cancelled': return '#fff';
      default: return props.$isDark ? '#fff' : '#333';
    }
  }};
`;

const ActionButton = styled.button<{ $variant: 'success' | 'danger' | 'primary'; $isDark: boolean }>`
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  background: ${props => {
    switch (props.$variant) {
      case 'success': return '#28a745';
      case 'danger': return '#dc3545';
      case 'primary': return '#007bff';
      default: return props.$isDark ? '#333' : '#e0e0e0';
    }
  }};
  color: #fff;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const QuickStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const QuickStatCard = styled.div<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? '#1a1a1a' : '#fff'};
  border: 1px solid ${props => props.$isDark ? '#333' : '#e0e0e0'};
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const QuickStatValue = styled.div<{ $isDark: boolean }>`
  font-size: 2rem;
  font-weight: 700;
  color: ${props => props.$isDark ? '#fff' : '#333'};
  margin-bottom: 0.5rem;
`;

const QuickStatLabel = styled.div<{ $isDark: boolean }>`
  font-size: 0.9rem;
  color: ${props => props.$isDark ? '#888' : '#666'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// Глобальные стили для скрытия скроллбара
const GlobalStyles = styled.div`
  /* Скрытие скроллбара для WebKit браузеров */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  /* Скрытие скроллбара для Firefox */
  .hide-scrollbar {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
`;

// Интерфейсы
interface AdminStats {
  totalUsers: number;
  newUsersToday: number;
  totalOrders: number;
  ordersToday: number;
  totalYuanPurchases: number;
  yuanPurchasesToday: number;
  totalSavings: number;
  totalRevenue: number;
  activeUsers: number;
  conversionRate: number;
}

interface User {
  telegram_id: string;
  username: string;
  full_name: string;
  created_at: string;
  last_activity: string | null;
  status: 'online' | 'offline';
  orders_count: number;
  yuan_purchases_count: number;
  total_savings: number;
  referrals_count: number;
}

interface Order {
  order_id: number;
  telegram_id: string;
  username: string;
  full_name: string;
  phone_number: string;
  pickup_point: string;
  pickup_point_address: string;
  estimated_savings: number;
  status: 'pending' | 'paid' | 'completed' | 'cancelled' | 'profit_calculated';
  created_at: string;
  items_count: number;
}

interface YuanPurchase {
  id: number;
  telegram_id: string;
  amount_rub: number;
  amount_cny: number;
  savings: number;
  status: string;
  created_at: string;
  username: string;
  full_name: string;
}

interface Review {
  review_id: number;
  telegram_id: string;
  username: string;
  full_name: string;
  rating: number;
  review_text: string;
  photo_url: string | null;
  is_approved: boolean;
  created_at: string;
  moderated_at: string | null;
  moderated_by: string | null;
}

interface AdminPanelProps {
  onNavigate: (page: string) => void;
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onNavigate, toggleTheme, isDarkTheme }) => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [yuanPurchases, setYuanPurchases] = useState<YuanPurchase[]>([]);
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [pendingYuanPurchases, setPendingYuanPurchases] = useState<YuanPurchase[]>([]);
  const [pendingFilter, setPendingFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Состояния для модерации отзывов
  const [reviews, setReviews] = useState<Review[]>([]);
  const [pendingReviewsCount, setPendingReviewsCount] = useState(0);
  const [reviewsFilter, setReviewsFilter] = useState<string>('pending'); // pending, approved, all
  
  // Новые состояния для улучшенного UX
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Состояния для уведомлений
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [notificationType, setNotificationType] = useState<'all' | 'user'>('all');
  const [usersList, setUsersList] = useState<any[]>([]);
  const [sendingNotification, setSendingNotification] = useState(false);
  
  // Состояния для новых функций
  const [systemStatus, setSystemStatus] = useState<any>(null);
  
  // Состояния для загрузки изображений выкупов
  const [uploadingPurchases, setUploadingPurchases] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedUserForHistory, setSelectedUserForHistory] = useState('');
  const [userHistory, setUserHistory] = useState<any>(null);
  const [loadingUserHistory, setLoadingUserHistory] = useState(false);
  const [salesAnalytics, setSalesAnalytics] = useState<any>(null);
  const [analyticsPeriod, setAnalyticsPeriod] = useState('week');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [showComparison, setShowComparison] = useState(false);
  const [commissionValue, setCommissionValue] = useState('');
  const [selectedUserForCommission, setSelectedUserForCommission] = useState('');
  
  // Состояния для доставки
  const [deliveryOrders, setDeliveryOrders] = useState<any[]>([]);
  const [loadingDelivery, setLoadingDelivery] = useState(false);
  const [deliveryStatusFilter, setDeliveryStatusFilter] = useState<string>('all');
  const [pendingStatusUpdate, setPendingStatusUpdate] = useState<{orderId: number, status: string} | null>(null);
  
  // Состояния для рефералов
  const [referralsData, setReferralsData] = useState<any[]>([]);
  const [loadingReferrals, setLoadingReferrals] = useState(false);
  const [referralsFilter, setReferralsFilter] = useState<string>('all');
  const [extendDays, setExtendDays] = useState('');
  const [selectedUserForExtension, setSelectedUserForExtension] = useState('');
  const [showExtensionConfirm, setShowExtensionConfirm] = useState(false);
  
  // Состояния для модального окна заказа
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [loadingOrderDetails, setLoadingOrderDetails] = useState(false);
  
  // Состояния для калькулятора прибыли
  const [profitOrders, setProfitOrders] = useState<any[]>([]);
  const [selectedOrderForProfit, setSelectedOrderForProfit] = useState<any>(null);
  const [customerCommission, setCustomerCommission] = useState('');
  const [customerProductCostCny, setCustomerProductCostCny] = useState('');
  const [customerRate, setCustomerRate] = useState('');
  const [customerDelivery, setCustomerDelivery] = useState('');
  const [myProductCostCny, setMyProductCostCny] = useState('');
  const [myRate, setMyRate] = useState('');
  const [myDelivery, setMyDelivery] = useState('');
  const [calculatedProfit, setCalculatedProfit] = useState<number | null>(null);
  const [customerTotal, setCustomerTotal] = useState(0);
  const [myTotal, setMyTotal] = useState(0);

  // Проверяем права доступа
  useEffect(() => {
    const checkAdminAccess = () => {
      const tg = window.Telegram?.WebApp;
      const user = tg?.initDataUnsafe?.user;
      const userId = user?.id?.toString();
      
      // Временно отключаем проверку для тестирования
      // const adminIds = ['7696515351', '690296532'];
      // 
      // if (!adminIds.includes(userId || '')) {
      //   onNavigate('profile');
      //   return false;
      // }
      return true;
    };

    if (!checkAdminAccess()) {
      return;
    }

    loadAdminData();
    loadUsersList();
    loadReviewsForModeration(); // Загружаем отзывы при открытии админ-панели для показа счетчика
  }, [onNavigate]);

  // Сброс фильтров при смене таба
  useEffect(() => {
    setStatusFilter('all');
    setSearchTerm('');
    setCurrentPage(1);
    // Для отзывов устанавливаем фильтр на 'pending' по умолчанию
    if (activeTab === 'reviews') {
      setReviewsFilter('pending');
    }
  }, [activeTab]);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      setError(null);

      const headers = { 'X-Telegram-User-Id': window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || '' };

      const [statsRes, usersRes, ordersRes, yuanRes, pendingRes] = await Promise.all([
        fetch('/api/admin/stats', { headers }).then(res => res.json()),
        fetch('/api/admin/users', { headers }).then(res => res.json()),
        fetch('/api/admin/orders', { headers }).then(res => res.json()),
        fetch('/api/admin/yuan-purchases', { headers }).then(res => res.json()),
        fetch('/api/admin/pending-orders', { headers }).then(res => res.json()),
      ]);

      if (statsRes.error) throw new Error(statsRes.error);
      if (usersRes.error) throw new Error(usersRes.error);
      if (ordersRes.error) throw new Error(ordersRes.error);
      if (yuanRes.error) throw new Error(yuanRes.error);
      if (pendingRes.error) throw new Error(pendingRes.error);

      setStats(statsRes);
      setUsers(usersRes.users);
      setOrders(ordersRes.orders);
      setYuanPurchases(yuanRes.purchases);
      setPendingOrders(pendingRes.orders);
      setPendingYuanPurchases(pendingRes.yuanPurchases);

    } catch (err: any) {
      console.error('Error fetching admin data:', err);
      setError(err.message || 'Не удалось загрузить данные админки.');
      HapticFeedback.error();
    } finally {
      setLoading(false);
    }
  };

  // Функции для работы с отзывами
  const loadReviewsForModeration = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/reviews', {
        headers: {
          'X-Telegram-User-Id': window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || ''
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews || []);
        
        // Подсчитываем количество ожидающих модерации
        const pendingCount = data.reviews?.filter((review: any) => !review.is_approved).length || 0;
        setPendingReviewsCount(pendingCount);
      } else {
        console.error('Failed to load reviews');
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveReview = async (reviewId: number) => {
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}/approve`, {
        method: 'POST',
        headers: {
          'X-Telegram-User-Id': window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || ''
        }
      });
      
      if (response.ok) {
        // Обновляем список отзывов
        await loadReviewsForModeration();
        alert('Отзыв одобрен и опубликован!');
      } else {
        alert('Ошибка одобрения отзыва');
      }
    } catch (error) {
      console.error('Error approving review:', error);
      alert('Ошибка одобрения отзыва');
    }
  };

  const deleteReview = async (reviewId: number) => {
    if (!confirm('Вы уверены, что хотите удалить этот отзыв? Это действие нельзя отменить.')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'X-Telegram-User-Id': window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || ''
        }
      });
      
      if (response.ok) {
        // Обновляем список отзывов
        await loadReviewsForModeration();
        alert('Отзыв удален!');
      } else {
        alert('Ошибка удаления отзыва');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Ошибка удаления отзыва');
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const handleConfirmOrder = async (orderId: number, type: 'order' | 'yuan') => {
    try {
      const headers = { 'X-Telegram-User-Id': window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || '' };
      
      if (type === 'order') {
        // Для обычных заказов меняем статус на "paid" (Оплачено)
        const response = await fetch('/api/admin/update-order-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...headers
          },
          body: JSON.stringify({ orderId, status: 'paid' })
        });

        if (response.ok) {
          HapticFeedback.success();
          alert('✅ Заказ подтвержден! Статус изменен на "Оплачено"');
          loadAdminData(); // Перезагружаем данные
        } else {
          throw new Error('Ошибка подтверждения заказа');
        }
      } else {
        // Для покупок юаней используем старую логику
        const response = await fetch('/api/admin/confirm-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...headers
          },
          body: JSON.stringify({ orderId, type })
        });

        if (response.ok) {
          HapticFeedback.success();
          loadAdminData();
        } else {
          throw new Error('Ошибка подтверждения покупки юаней');
        }
      }
    } catch (error) {
      console.error('Error confirming order:', error);
      HapticFeedback.error();
      alert('Ошибка подтверждения');
    }
  };

  const handleCancelOrder = async (orderId: number, type: 'order' | 'yuan') => {
    try {
      const headers = { 'X-Telegram-User-Id': window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || '' };
      
      if (type === 'order') {
        // Для обычных заказов меняем статус на "cancelled" (Отменено)
        const response = await fetch('/api/admin/update-order-status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...headers
          },
          body: JSON.stringify({ orderId, status: 'cancelled' })
        });

        if (response.ok) {
          HapticFeedback.success();
          alert('❌ Заказ отменен');
          loadAdminData(); // Перезагружаем данные
        } else {
          throw new Error('Ошибка отмены заказа');
        }
      } else {
        // Для покупок юаней используем старую логику
        const response = await fetch('/api/admin/cancel-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...headers
          },
          body: JSON.stringify({ orderId, type })
        });

        if (response.ok) {
          HapticFeedback.success();
          loadAdminData();
        } else {
          throw new Error('Ошибка отмены покупки юаней');
        }
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      HapticFeedback.error();
      alert('Ошибка отмены');
    }
  };

  // Функции для работы с уведомлениями
  const loadUsersList = async () => {
    try {
      const response = await fetch('/api/admin/users-list', {
        headers: {
          'X-Telegram-User-Id': window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || ''
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUsersList(data.users);
      }
    } catch (error) {
      console.error('Ошибка загрузки списка пользователей:', error);
    }
  };

  const sendNotification = async () => {
    if (!notificationMessage.trim()) {
      alert('Введите сообщение');
      return;
    }

    setSendingNotification(true);
    
    try {
      const endpoint = notificationType === 'all' 
        ? '/api/admin/send-notification-all'
        : '/api/admin/send-notification-user';
      
      const body = notificationType === 'all'
        ? { message: notificationMessage, title: notificationTitle }
        : { telegramId: selectedUser, message: notificationMessage, title: notificationTitle };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Telegram-User-Id': window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || ''
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        setNotificationMessage('');
        setNotificationTitle('');
        setSelectedUser('');
        HapticFeedback.success();
      } else {
        const error = await response.json();
        alert(`Ошибка: ${error.error}`);
        HapticFeedback.error();
      }
    } catch (error) {
      console.error('Ошибка отправки уведомления:', error);
      alert('Ошибка отправки уведомления');
      HapticFeedback.error();
    } finally {
      setSendingNotification(false);
    }
  };

  // Функции для новых возможностей
  const loadSystemStatus = async () => {
    try {
      const response = await fetch('/api/admin/system-status', {
        headers: {
          'X-Telegram-User-Id': window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || ''
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSystemStatus(data.data);
      }
    } catch (error) {
      console.error('Ошибка загрузки статуса системы:', error);
    }
  };

  const loadUserHistory = async (telegramId: string) => {
    setLoadingUserHistory(true);
    try {
      const response = await fetch(`/api/admin/user-history/${telegramId}`, {
        headers: {
          'X-Telegram-User-Id': window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || ''
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserHistory(data.data);
        alert('История пользователя загружена успешно!');
      } else {
        const errorData = await response.json();
        console.error('Ошибка сервера:', errorData);
        alert(`Ошибка: ${errorData.error || 'Пользователь не найден'}`);
      }
    } catch (error) {
      console.error('Ошибка загрузки истории пользователя:', error);
      alert('Ошибка загрузки истории пользователя');
    } finally {
      setLoadingUserHistory(false);
    }
  };

  const loadSalesAnalytics = async (period?: string, startDate?: string, endDate?: string, compare?: boolean) => {
    try {
      let url = `/api/admin/sales-analytics?`;
      
      if (startDate && endDate) {
        url += `startDate=${startDate}&endDate=${endDate}`;
      } else {
        url += `period=${period || analyticsPeriod}`;
      }
      
      if (compare) {
        url += `&compare=true`;
      }
      
      const response = await fetch(url, {
        headers: {
          'X-Telegram-User-Id': window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || ''
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSalesAnalytics(data.data);
      }
    } catch (error) {
      console.error('Ошибка загрузки аналитики:', error);
    }
  };

  const handleCustomPeriodLoad = () => {
    if (!customStartDate || !customEndDate) {
      alert('Укажите дату начала и конца периода');
      return;
    }
    
    if (new Date(customStartDate) > new Date(customEndDate)) {
      alert('Дата начала не может быть позже даты конца');
      return;
    }
    
    loadSalesAnalytics(undefined, customStartDate, customEndDate, showComparison);
  };

  // Загрузка заказов для доставки
  const loadDeliveryOrders = async () => {
    setLoadingDelivery(true);
    try {
      const response = await fetch('/api/admin/delivery');
      if (response.ok) {
        const data = await response.json();
        setDeliveryOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Ошибка загрузки заказов для доставки:', error);
    } finally {
      setLoadingDelivery(false);
    }
  };

  // Фильтрация заказов по статусу
  const filteredDeliveryOrders = useMemo(() => {
    if (deliveryStatusFilter === 'all') {
      return deliveryOrders;
    }
    return deliveryOrders.filter(order => order.delivery_status === deliveryStatusFilter);
  }, [deliveryOrders, deliveryStatusFilter]);

  // Подтверждение изменения статуса
  const confirmStatusUpdate = async () => {
    if (!pendingStatusUpdate) return;
    
    try {
      const response = await fetch(`/api/admin/orders/${pendingStatusUpdate.orderId}/update-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: pendingStatusUpdate.status })
      });

      if (response.ok) {
        // Обновляем список заказов
        await loadDeliveryOrders();
        
        // Haptic feedback
        if ((window as any).Telegram?.WebApp?.HapticFeedback) {
          (window as any).Telegram.WebApp.HapticFeedback.notificationOccurred('success');
        }
      } else {
        if ((window as any).Telegram?.WebApp?.HapticFeedback) {
          (window as any).Telegram.WebApp.HapticFeedback.notificationOccurred('error');
        }
      }
    } catch (error) {
      console.error('Ошибка обновления статуса доставки:', error);
      if ((window as any).Telegram?.WebApp?.HapticFeedback) {
        (window as any).Telegram.WebApp.HapticFeedback.notificationOccurred('error');
      }
    } finally {
      setPendingStatusUpdate(null);
    }
  };

  // Отмена изменения статуса
  const cancelStatusUpdate = () => {
    setPendingStatusUpdate(null);
  };

  const updateUserCommission = async () => {
    if (!selectedUserForCommission || !commissionValue) {
      alert('Выберите пользователя и введите комиссию');
      return;
    }

    const commission = parseFloat(commissionValue);
    if (isNaN(commission) || commission < 0 || commission > 1000) {
      alert('Комиссия должна быть числом от 0 до 1000 (например, 1000 для 1000₽)');
      return;
    }

    try {
      const response = await fetch('/api/admin/update-user-commission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Telegram-User-Id': window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || ''
        },
        body: JSON.stringify({
          telegramId: selectedUserForCommission,
          commission: commission
        })
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        setCommissionValue('');
        setSelectedUserForCommission('');
        HapticFeedback.success();
      } else {
        const error = await response.json();
        alert(`Ошибка: ${error.error}`);
        HapticFeedback.error();
      }
    } catch (error) {
      console.error('Ошибка обновления комиссии:', error);
      alert('Ошибка обновления комиссии');
      HapticFeedback.error();
    }
  };

  // Загрузка заказов для калькулятора прибыли
  const loadProfitOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders-for-profit', {
        headers: {
          'X-Telegram-User-Id': window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || ''
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('📊 Загружены заказы для расчета прибыли:', data.orders);
        setProfitOrders(data.orders || []);
      } else {
        console.error('❌ Ошибка загрузки заказов для расчета:', response.status);
        // Fallback - показываем все заказы со статусом paid или completed
        const filteredOrders = orders.filter(order => 
          order.status === 'paid' || order.status === 'completed'
        );
        console.log('⚠️ Используем fallback, найдено заказов:', filteredOrders.length);
        setProfitOrders(filteredOrders);
      }
    } catch (error) {
      console.error('Ошибка загрузки заказов для расчета:', error);
      // Fallback - показываем все заказы со статусом paid или completed
      const filteredOrders = orders.filter(order => 
        order.status === 'paid' || order.status === 'completed'
      );
      setProfitOrders(filteredOrders);
    }
  };

  // Загрузка данных рефералов
  const loadReferralsData = async () => {
    setLoadingReferrals(true);
    try {
      const response = await fetch('/api/admin/referrals-data', {
        headers: {
          'X-Telegram-User-Id': window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || ''
        }
      });

      if (response.ok) {
        const data = await response.json();
        setReferralsData(data.referrals || []);
      } else {
        console.error('Ошибка загрузки данных рефералов');
      }
    } catch (error) {
      console.error('Ошибка загрузки данных рефералов:', error);
    } finally {
      setLoadingReferrals(false);
    }
  };

  // Показ подтверждения продления скидки
  const showExtensionConfirmation = () => {
    if (!selectedUserForExtension || !extendDays) {
      alert('Выберите пользователя и введите количество дней');
      return;
    }

    const days = parseInt(extendDays);
    if (isNaN(days) || days < 1 || days > 365) {
      alert('Количество дней должно быть числом от 1 до 365');
      return;
    }

    setShowExtensionConfirm(true);
  };

  // Подтвержденное продление скидочной комиссии
  const confirmExtendDiscount = async () => {
    if (!selectedUserForExtension || !extendDays) return;

    const days = parseInt(extendDays);
    if (isNaN(days) || days < 1 || days > 365) return;

    try {
      const response = await fetch('/api/admin/extend-discount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Telegram-User-Id': window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || ''
        },
        body: JSON.stringify({
          telegramId: selectedUserForExtension,
          days: days
        })
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        setExtendDays('');
        setSelectedUserForExtension('');
        setShowExtensionConfirm(false);
        HapticFeedback.success();
        // Перезагружаем данные рефералов
        loadReferralsData();
      } else {
        const error = await response.json();
        alert(error.error || 'Ошибка продления скидки');
        HapticFeedback.error();
      }
    } catch (error) {
      console.error('Ошибка продления скидки:', error);
      alert('Ошибка продления скидки');
      HapticFeedback.error();
    }
  };

  // Отмена продления скидки
  const cancelExtension = () => {
    setShowExtensionConfirm(false);
  };

  // Скролл к форме продления скидки
  const scrollToExtensionForm = () => {
    const extensionForm = document.getElementById('extension-form');
    if (extensionForm) {
      extensionForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Скролл к началу раздела
  const scrollToSection = (tabName: string) => {
    setTimeout(() => {
      const section = document.getElementById(`${tabName}-section`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Быстрое продление скидки
  const quickExtendDiscount = (telegramId: string, days: number) => {
    setSelectedUserForExtension(telegramId);
    setExtendDays(days.toString());
    setShowExtensionConfirm(true);
    setTimeout(() => {
      scrollToExtensionForm();
    }, 100);
  };

  // Выбор заказа для расчета прибыли
  const selectOrderForProfit = (order: any) => {
    setSelectedOrderForProfit(order);
    
    // Автоматически заполняем комиссию пользователя (в процентах)
    setCustomerCommission((order.commission || 1000).toString());
    
    // Сбрасываем остальные поля
    setCustomerProductCostCny('');
    setCustomerRate('');
    setCustomerDelivery('');
    setMyProductCostCny('');
    setMyRate('');
    setMyDelivery('');
    setCalculatedProfit(null);
    setCustomerTotal(0);
    setMyTotal(0);
    
    // Автоскролл к окнам ввода данных
    setTimeout(() => {
      const inputsSection = document.getElementById('profit-calculator-inputs');
      if (inputsSection) {
        inputsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    
    HapticFeedback.light();
  };

  // Расчет прибыли
  const calculateProfit = () => {
    // Проверка заполнения всех полей
    if (!customerCommission || !customerProductCostCny || !customerRate || !customerDelivery ||
        !myProductCostCny || !myRate || !myDelivery) {
      alert('Заполните все поля для расчета');
      HapticFeedback.error();
      return;
    }

    try {
      // Конвертируем в числа
      const custCommAmount = parseFloat(customerCommission); // Комиссия в рублях (например, 1000)
      const custProdCny = parseFloat(customerProductCostCny);
      const custRate = parseFloat(customerRate);
      const custDel = parseFloat(customerDelivery);
      
      const myProdCny = parseFloat(myProductCostCny);
      const myRt = parseFloat(myRate);
      const myDel = parseFloat(myDelivery);

      // Расчет стоимости товара для покупателя
      const productCostRub = custProdCny * custRate;
      
      // Расчет комиссии в рублях (фиксированная сумма)
      const custCommRub = custCommAmount;
      
      // Расчет суммы от покупателя: стоимость товара + комиссия + доставка
      const custTotal = productCostRub + custCommRub + custDel;
      
      // Расчет моих расходов
      const myTtl = (myProdCny * myRt) + myDel;
      
      // Прибыль
      const profit = custTotal - myTtl;
      
      setCustomerTotal(custTotal);
      setMyTotal(myTtl);
      setCalculatedProfit(profit);
      
      HapticFeedback.success();
    } catch (error) {
      console.error('Ошибка расчета:', error);
      alert('Ошибка расчета. Проверьте введенные данные');
      HapticFeedback.error();
    }
  };

  // Сохранение расчета прибыли в БД
  const saveProfitCalculation = async () => {
    if (calculatedProfit === null || !selectedOrderForProfit) {
      alert('Сначала рассчитайте прибыль');
      return;
    }

    try {
      const response = await fetch('/api/admin/save-profit-calculation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Telegram-User-Id': window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || ''
        },
        body: JSON.stringify({
          orderId: selectedOrderForProfit.order_id,
          customerCommission: parseFloat(customerCommission),
          customerProductCostCny: parseFloat(customerProductCostCny),
          customerRate: parseFloat(customerRate),
          customerDelivery: parseFloat(customerDelivery),
          customerTotal: customerTotal,
          myProductCostCny: parseFloat(myProductCostCny),
          myRate: parseFloat(myRate),
          myDelivery: parseFloat(myDelivery),
          myTotal: myTotal,
          profit: calculatedProfit,
          createdBy: window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || 'admin'
        })
      });

      if (response.ok) {
        // Меняем статус заказа на "profit_calculated"
        await updateOrderStatus(selectedOrderForProfit.order_id, 'profit_calculated');
        
        HapticFeedback.success();
        alert('✅ Расчет прибыли сохранен в БД! Статус заказа изменен на "Учтена прибыль"');
        
        // Сбрасываем форму
        resetProfitCalculator();
        
        // Перезагружаем данные
        loadAdminData();
        loadProfitOrders();
      } else {
        throw new Error('Ошибка сохранения расчета');
      }
    } catch (error) {
      console.error('Ошибка сохранения расчета:', error);
      HapticFeedback.error();
      alert('Не удалось сохранить расчет');
    }
  };

  // Сброс калькулятора
  const resetProfitCalculator = () => {
    setSelectedOrderForProfit(null);
    setCustomerCommission('');
    setCustomerProductCostCny('');
    setCustomerRate('');
    setCustomerDelivery('');
    setMyProductCostCny('');
    setMyRate('');
    setMyDelivery('');
    setCalculatedProfit(null);
    setCustomerTotal(0);
    setMyTotal(0);
  };

  // Обновление статуса заказа
  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    console.log('📝 Обновление статуса заказа:', { orderId, newStatus });
    
    try {
      const payload = {
        orderId: orderId,
        status: newStatus
      };
      
      console.log('📤 Отправляем payload:', payload);
      
      const response = await fetch('/api/admin/update-order-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Telegram-User-Id': window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || ''
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Статус обновлен:', result);
        HapticFeedback.success();
        alert('Статус заказа обновлен!');
        loadAdminData();
        loadProfitOrders();
      } else {
        const errorData = await response.json();
        console.error('❌ Ошибка от сервера:', errorData);
        throw new Error(errorData.error || 'Ошибка обновления статуса');
      }
    } catch (error) {
      console.error('Ошибка обновления статуса:', error);
      HapticFeedback.error();
      alert(`Не удалось обновить статус: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    }
  };

  // Функция для загрузки детальной информации о заказе
  const loadOrderDetails = async (orderId: number) => {
    setLoadingOrderDetails(true);
    try {
      const response = await fetch(`/api/admin/order-details/${orderId}`, {
        headers: {
          'X-Telegram-User-Id': window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || ''
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setOrderDetails(data.data);
      } else {
        console.error('Ошибка загрузки деталей заказа');
      }
    } catch (error) {
      console.error('Ошибка загрузки деталей заказа:', error);
    } finally {
      setLoadingOrderDetails(false);
    }
  };

  // Функция для открытия модального окна с деталями заказа
  const openOrderDetails = async (order: any) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
    HapticFeedback.medium();
    await loadOrderDetails(order.order_id);
  };

  // Функция для закрытия модального окна
  const closeOrderModal = () => {
    setShowOrderModal(false);
    setSelectedOrder(null);
    setOrderDetails(null);
    HapticFeedback.light();
  };

  // Функции для фильтрации и пагинации
  const filteredAndSortedData = useMemo(() => {
    let data: any[] = [];
    
    switch (activeTab) {
      case 'users':
        data = users;
        break;
      case 'orders':
        data = orders;
        break;
      case 'yuan':
        data = yuanPurchases;
        break;
      case 'pending':
        data = [...pendingOrders, ...pendingYuanPurchases];
        break;
      default:
        data = [];
    }

    // Фильтрация по статусу (только для заказов)
    if (activeTab === 'orders' && statusFilter !== 'all') {
      data = data.filter(item => item.status === statusFilter);
    }

    // Фильтрация по поисковому запросу
    if (searchTerm) {
      data = data.filter(item => {
        const searchFields: string[] = [];
        
        // Для пользователей
        if (activeTab === 'users') {
          searchFields.push(
            item.full_name || '',
            item.username || '',
            item.telegram_id || '',
            item.orders_count || '',
            item.yuan_purchases_count || '',
            item.total_savings || '',
            item.referrals_count || ''
          );
        }
        // Для заказов
        else if (activeTab === 'orders') {
          searchFields.push(
            item.full_name || '',
            item.phone_number || '',
            item.order_id || '',
            item.telegram_id || '',
            item.username || '',
            item.pickup_point || '',
            item.pickup_point_address || '',
            item.estimated_savings || '',
            item.items_count || ''
          );
        }
        // Для покупок юаней
        else if (activeTab === 'yuan') {
          searchFields.push(
            item.full_name || '',
            item.username || '',
            item.telegram_id || '',
            item.id || '',
            item.amount_rub || '',
            item.amount_cny || '',
            item.savings || '',
            item.status || ''
          );
        }
        // Для ожидающих заказов
        else if (activeTab === 'pending') {
          searchFields.push(
            item.full_name || '',
            item.phone_number || '',
            item.order_id || '',
            item.id || '',
            item.telegram_id || ''
          );
        }
        
        return searchFields.some(field => 
          field.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Сортировка
    data.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      // Обработка null/undefined значений
      if (aValue === null || aValue === undefined) aValue = '';
      if (bValue === null || bValue === undefined) bValue = '';
      
      if (sortBy === 'created_at') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (sortBy === 'estimated_savings' || sortBy === 'items_count' || sortBy === 'order_id' || sortBy === 'id' || sortBy === 'amount_rub' || sortBy === 'amount_cny' || sortBy === 'savings' || sortBy === 'orders_count' || sortBy === 'yuan_purchases_count' || sortBy === 'total_savings' || sortBy === 'referrals_count') {
        aValue = Number(aValue) || 0;
        bValue = Number(bValue) || 0;
      } else if (sortBy === 'phone_number') {
        // Для телефонов убираем все нецифровые символы для корректной сортировки
        aValue = (aValue || '').replace(/\D/g, '');
        bValue = (bValue || '').replace(/\D/g, '');
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return data;
  }, [activeTab, users, orders, yuanPurchases, pendingOrders, pendingYuanPurchases, searchTerm, sortBy, sortOrder, statusFilter]);

  // Пагинация
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredAndSortedData.slice(startIndex, endIndex);

  // Сброс страницы при изменении фильтров
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy, sortOrder, activeTab]);

  // Автоскролл к разделу при изменении activeTab
  useEffect(() => {
    if (activeTab) {
      setTimeout(() => {
        if (activeTab === 'reviews' && reviews.length > 0) {
          // Для отзывов прокручиваем к первому неподтвержденному отзыву
          const firstPendingReview = reviews.find((review: any) => !review.is_approved);
          if (firstPendingReview) {
            // Увеличиваем задержку, чтобы дать время на рендеринг
            setTimeout(() => {
              const reviewElement = document.getElementById(`review-${firstPendingReview.review_id}`);
              if (reviewElement) {
                reviewElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                return;
              }
            }, 200);
            return;
          }
          // Если нет неподтвержденных, прокручиваем к секции
          const section = document.getElementById(`${activeTab}-section`);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else if (activeTab !== 'reviews') {
          // Для остальных разделов прокручиваем к секции
          const section = document.getElementById(`${activeTab}-section`);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }, 100);
    }
  }, [activeTab, reviews]);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  if (loading) {
    return (
      <AdminContainer>
        <Content>
          <Spinner />
          <p style={{ textAlign: 'center', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
            Загрузка данных админки...
          </p>
        </Content>
      </AdminContainer>
    );
  }

  if (error) {
    return (
      <AdminContainer>
        <Header>
          <BackButton onClick={() => onNavigate('profile')}>
            ‹
          </BackButton>
          <Title>Админ-панель</Title>
          <ThemeToggle onClick={toggleTheme}>
            <ToggleIcon $isDark={isDarkTheme}>🌙</ToggleIcon>
            <ToggleIconDark $isDark={isDarkTheme}>☀️</ToggleIconDark>
            <ToggleSlider $isDark={isDarkTheme}></ToggleSlider>
          </ThemeToggle>
        </Header>
        <Content>
          <ErrorMessage>{error}</ErrorMessage>
          <RefreshButton $isDark={isDarkTheme} onClick={loadAdminData}>
            🔄 Повторить
          </RefreshButton>
        </Content>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <GlobalStyles />
      <Header>
        <BackButton onClick={() => onNavigate('profile')}>
          ‹
        </BackButton>
        <Title>Админ-панель</Title>
        <ThemeToggle onClick={toggleTheme}>
          <ToggleIcon $isDark={isDarkTheme}>🌙</ToggleIcon>
          <ToggleIconDark $isDark={isDarkTheme}>☀️</ToggleIconDark>
          <ToggleSlider $isDark={isDarkTheme}></ToggleSlider>
        </ThemeToggle>
      </Header>

      <Content>
        <TabContainer>
          <div style={{ 
            padding: '12px',
            background: 'var(--bg-card)',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
          }}>
            {/* Требуют действия */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ 
                fontSize: '0.85rem', 
                fontWeight: '700', 
                color: 'var(--matte-red)', 
                marginBottom: '8px',
                paddingLeft: '4px',
                opacity: 0.9,
                letterSpacing: '1px'
              }}>
                ТРЕБУЮТ ДЕЙСТВИЯ
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <TabButton $active={activeTab === 'delivery'} $isDark={isDarkTheme} onClick={() => { setActiveTab('delivery'); loadDeliveryOrders(); }}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>🚚</div>
                  <div>Доставка</div>
                </TabButton>
                <TabButton $active={activeTab === 'pending'} $isDark={isDarkTheme} onClick={() => setActiveTab('pending')}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>⏳</div>
                  <div>Ожидающие</div>
                  {(pendingOrders.length + pendingYuanPurchases.length) > 0 && (
                    <div style={{ 
                      position: 'absolute', 
                      top: '6px', 
                      right: '6px', 
                      background: 'var(--matte-red)', 
                      color: 'white', 
                      borderRadius: '10px', 
                      padding: '2px 6px', 
                      fontSize: '0.65rem',
                      fontWeight: '700'
                    }}>
                      {pendingOrders.length + pendingYuanPurchases.length}
                    </div>
                  )}
                </TabButton>
                <TabButton $active={activeTab === 'reviews'} $isDark={isDarkTheme} onClick={() => { 
                  setActiveTab('reviews'); 
                  loadReviewsForModeration();
                }}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>⭐</div>
                  <div>Отзывы</div>
                  {pendingReviewsCount > 0 && (
                    <div style={{ 
                      position: 'absolute', 
                      top: '6px', 
                      right: '6px', 
                      background: 'var(--matte-red)', 
                      color: 'white', 
                      borderRadius: '10px', 
                      padding: '2px 6px', 
                      fontSize: '0.65rem',
                      fontWeight: '700'
                    }}>
                      {pendingReviewsCount}
                    </div>
                  )}
                </TabButton>
              </div>
            </div>

            {/* Разделитель */}
            <div style={{ 
              height: '1px', 
              background: 'linear-gradient(90deg, transparent, var(--border-color), transparent)',
              margin: '12px 0'
            }} />

            {/* Общее */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ 
                fontSize: '0.85rem', 
                fontWeight: '700', 
                color: 'var(--matte-red)', 
                marginBottom: '8px',
                paddingLeft: '4px',
                opacity: 0.9,
                letterSpacing: '1px'
              }}>
                ОБЩЕЕ
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <TabButton $active={activeTab === 'dashboard'} $isDark={isDarkTheme} onClick={() => setActiveTab('dashboard')}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>🏠</div>
                  <div>Дашборд</div>
                </TabButton>
                <TabButton $active={activeTab === 'analytics'} $isDark={isDarkTheme} onClick={() => { setActiveTab('analytics'); loadSalesAnalytics(analyticsPeriod); }}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>📈</div>
                  <div>Аналитика</div>
                </TabButton>
                <TabButton $active={activeTab === 'monitoring'} $isDark={isDarkTheme} onClick={() => { setActiveTab('monitoring'); loadSystemStatus(); }}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>🔧</div>
                  <div>Монитор.</div>
                </TabButton>
              </div>
            </div>

            {/* Разделитель */}
            <div style={{ 
              height: '1px', 
              background: 'linear-gradient(90deg, transparent, var(--border-color), transparent)',
              margin: '12px 0'
            }} />

            {/* Данные */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ 
                fontSize: '0.85rem', 
                fontWeight: '700', 
                color: 'var(--matte-red)', 
                marginBottom: '8px',
                paddingLeft: '4px',
                opacity: 0.9,
                letterSpacing: '1px'
              }}>
                ДАННЫЕ
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                <TabButton $active={activeTab === 'users'} $isDark={isDarkTheme} onClick={() => setActiveTab('users')}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>👥</div>
                  <div>Пользов.</div>
                </TabButton>
                <TabButton $active={activeTab === 'orders'} $isDark={isDarkTheme} onClick={() => setActiveTab('orders')}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>📦</div>
                  <div>Заказы</div>
                </TabButton>
                <TabButton $active={activeTab === 'yuan'} $isDark={isDarkTheme} onClick={() => setActiveTab('yuan')}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>💰</div>
                  <div>Юани</div>
                </TabButton>
                <TabButton $active={activeTab === 'referrals'} $isDark={isDarkTheme} onClick={() => { setActiveTab('referrals'); loadReferralsData(); }}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>🔗</div>
                  <div>Рефералы</div>
                </TabButton>
              </div>
            </div>

            {/* Разделитель */}
            <div style={{ 
              height: '1px', 
              background: 'linear-gradient(90deg, transparent, var(--border-color), transparent)',
              margin: '12px 0'
            }} />

            {/* Уведомления и управление */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ 
                fontSize: '0.85rem', 
                fontWeight: '700', 
                color: 'var(--matte-red)', 
                marginBottom: '8px',
                paddingLeft: '4px',
                opacity: 0.9,
                letterSpacing: '1px'
              }}>
                УВЕДОМЛЕНИЯ & УПРАВЛЕНИЕ
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <TabButton $active={activeTab === 'notifications'} $isDark={isDarkTheme} onClick={() => setActiveTab('notifications')}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>📢</div>
                  <div>Уведомл.</div>
                </TabButton>
                <TabButton $active={activeTab === 'user-management'} $isDark={isDarkTheme} onClick={() => setActiveTab('user-management')}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>⚙️</div>
                  <div>Управление</div>
                </TabButton>
                <TabButton $active={activeTab === 'purchases'} $isDark={isDarkTheme} onClick={() => setActiveTab('purchases')}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>🖼️</div>
                  <div>Выкупы</div>
                </TabButton>
              </div>
            </div>

            {/* Разделитель */}
            <div style={{ 
              height: '1px', 
              background: 'linear-gradient(90deg, transparent, var(--border-color), transparent)',
              margin: '12px 0'
            }} />

            {/* Доходы */}
            <div>
              <div style={{ 
                fontSize: '0.85rem', 
                fontWeight: '700', 
                color: 'var(--matte-red)', 
                marginBottom: '8px',
                paddingLeft: '4px',
                opacity: 0.9,
                letterSpacing: '1px'
              }}>
                ДОХОДЫ
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                <TabButton $active={activeTab === 'profit-calculator'} $isDark={isDarkTheme} onClick={() => { setActiveTab('profit-calculator'); loadProfitOrders(); }}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>💰</div>
                  <div>Калькулятор прибыли</div>
                </TabButton>
              </div>
            </div>
          </div>
        </TabContainer>

        <RefreshButton $isDark={isDarkTheme} onClick={loadAdminData}>
          🔄 Обновить данные
        </RefreshButton>

        {activeTab === 'dashboard' && stats && (
          <Section id="dashboard-section" $isDark={isDarkTheme}>
            <SectionTitle>📊 Общая статистика</SectionTitle>
            <QuickStatsGrid>
              <QuickStatCard $isDark={isDarkTheme}>
                <QuickStatValue $isDark={isDarkTheme}>{stats.totalUsers}</QuickStatValue>
                <QuickStatLabel $isDark={isDarkTheme}>Всего пользователей</QuickStatLabel>
              </QuickStatCard>
              <QuickStatCard $isDark={isDarkTheme}>
                <QuickStatValue $isDark={isDarkTheme}>{stats.newUsersToday}</QuickStatValue>
                <QuickStatLabel $isDark={isDarkTheme}>Новых сегодня</QuickStatLabel>
              </QuickStatCard>
              <QuickStatCard $isDark={isDarkTheme}>
                <QuickStatValue $isDark={isDarkTheme}>{stats.totalOrders}</QuickStatValue>
                <QuickStatLabel $isDark={isDarkTheme}>Всего заказов</QuickStatLabel>
              </QuickStatCard>
              <QuickStatCard $isDark={isDarkTheme}>
                <QuickStatValue $isDark={isDarkTheme}>{stats.ordersToday}</QuickStatValue>
                <QuickStatLabel $isDark={isDarkTheme}>Заказов сегодня</QuickStatLabel>
              </QuickStatCard>
              <QuickStatCard $isDark={isDarkTheme}>
                <QuickStatValue $isDark={isDarkTheme}>{stats.totalYuanPurchases}</QuickStatValue>
                <QuickStatLabel $isDark={isDarkTheme}>Покупок юаней</QuickStatLabel>
              </QuickStatCard>
              <QuickStatCard $isDark={isDarkTheme}>
                <QuickStatValue $isDark={isDarkTheme}>{stats.yuanPurchasesToday}</QuickStatValue>
                <QuickStatLabel $isDark={isDarkTheme}>Покупок сегодня</QuickStatLabel>
              </QuickStatCard>
              <QuickStatCard $isDark={isDarkTheme}>
                <QuickStatValue $isDark={isDarkTheme}>{formatCurrency(stats.totalRevenue)}</QuickStatValue>
                <QuickStatLabel $isDark={isDarkTheme}>💰 Моя прибыль</QuickStatLabel>
              </QuickStatCard>
              <QuickStatCard $isDark={isDarkTheme}>
                <QuickStatValue $isDark={isDarkTheme}>{formatCurrency(stats.totalSavings)}</QuickStatValue>
                <QuickStatLabel $isDark={isDarkTheme}>💵 Экономия клиентов</QuickStatLabel>
              </QuickStatCard>
              <QuickStatCard $isDark={isDarkTheme}>
                <QuickStatValue $isDark={isDarkTheme}>{stats.activeUsers}</QuickStatValue>
                <QuickStatLabel $isDark={isDarkTheme}>Активных за 7 дней</QuickStatLabel>
              </QuickStatCard>
              <QuickStatCard $isDark={isDarkTheme}>
                <QuickStatValue $isDark={isDarkTheme}>{formatPercentage(stats.conversionRate)}</QuickStatValue>
                <QuickStatLabel $isDark={isDarkTheme}>Конверсия</QuickStatLabel>
              </QuickStatCard>
            </QuickStatsGrid>
          </Section>
        )}

        {activeTab === 'pending' && (
          <Section id="pending-section" $isDark={isDarkTheme}>
            <SectionTitle>⏳ Заказы, ожидающие подтверждения</SectionTitle>
            
            <SearchContainer>
              <SearchInput
                $isDark={isDarkTheme}
                type="text"
                placeholder="🔍 Поиск по имени, телефону, адресу..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FilterSelect $isDark={isDarkTheme} value={pendingFilter} onChange={(e) => setPendingFilter(e.target.value)}>
                <option value="all">Все</option>
                <option value="orders">Оформление заказов</option>
                <option value="yuan">Покупка юаней</option>
              </FilterSelect>
              <FilterSelect $isDark={isDarkTheme} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="created_at">По дате</option>
                <option value="full_name">По имени</option>
                <option value="telegram_id">По ID</option>
              </FilterSelect>
              <FilterSelect $isDark={isDarkTheme} value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                <option value={5}>5 на странице</option>
                <option value={10}>10 на странице</option>
                <option value={20}>20 на странице</option>
                <option value={50}>50 на странице</option>
              </FilterSelect>
            </SearchContainer>
            
            {/* Заказы товаров */}
            {pendingOrders.length > 0 && (pendingFilter === 'all' || pendingFilter === 'orders') && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '1.2rem' }}>
                  📦 Заказы товаров ({pendingOrders.length})
                </h3>
                <CompactTable $isDark={isDarkTheme}>
                    <thead>
                      <tr>
                        <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('order_id')}>
                          ID {sortBy === 'order_id' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </CompactTableHeader>
                        <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('full_name')}>
                          Клиент {sortBy === 'full_name' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </CompactTableHeader>
                        <CompactTableHeader $isDark={isDarkTheme}>Телефон</CompactTableHeader>
                        <CompactTableHeader $isDark={isDarkTheme}>Товаров</CompactTableHeader>
                        <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('estimated_savings')}>
                          Экономия {sortBy === 'estimated_savings' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </CompactTableHeader>
                        <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('created_at')}>
                          Дата {sortBy === 'created_at' && (sortOrder === 'asc' ? '↑' : '↓')}
                        </CompactTableHeader>
                        <CompactTableHeader $isDark={isDarkTheme}>Действия</CompactTableHeader>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData.filter(item => item.order_id).map((order, index) => (
                        <CompactTableRow key={`pending-order-${order.order_id}-${index}`} $isDark={isDarkTheme}>
                          <CompactTableCell $isDark={isDarkTheme}>#{order.order_id}</CompactTableCell>
                          <CompactTableCell $isDark={isDarkTheme}>
                            <div>
                              <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{order.full_name}</div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                @{order.username || 'без username'}
                              </div>
                            </div>
                          </CompactTableCell>
                          <CompactTableCell $isDark={isDarkTheme}>{order.phone_number}</CompactTableCell>
                          <CompactTableCell $isDark={isDarkTheme}>{order.items_count}</CompactTableCell>
                          <CompactTableCell $isDark={isDarkTheme} style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>
                            {formatCurrency(order.estimated_savings)}
                          </CompactTableCell>
                          <CompactTableCell $isDark={isDarkTheme}>{formatDateTime(order.created_at)}</CompactTableCell>
                          <CompactTableCell $isDark={isDarkTheme}>
                            <div style={{ display: 'flex', gap: '4px', flexDirection: 'column' }}>
                              <ActionButton
                                $variant="success"
                                $isDark={isDarkTheme}
                                onClick={() => handleConfirmOrder(order.order_id, 'order')}
                              >
                                💳 Подтвердить оплату
                              </ActionButton>
                              <ActionButton
                                $variant="danger"
                                $isDark={isDarkTheme}
                                onClick={() => handleCancelOrder(order.order_id, 'order')}
                              >
                                ❌ Отменить
                              </ActionButton>
                            </div>
                          </CompactTableCell>
                        </CompactTableRow>
                      ))}
                    </tbody>
                </CompactTable>
                
                {/* Мобильные карточки */}
                <MobileCardContainer $isDark={isDarkTheme}>
                  {paginatedData.filter(item => item.order_id).map((order, index) => (
                    <MobileCard key={`mobile-order-${order.order_id}-${index}`} $isDark={isDarkTheme}>
                      <MobileCardHeader $isDark={isDarkTheme}>
                        <MobileCardTitle $isDark={isDarkTheme}>
                          Заказ #{order.order_id}
                        </MobileCardTitle>
                        <MobileCardStatus $status="pending" $isDark={isDarkTheme}>
                          Ожидает
                        </MobileCardStatus>
                      </MobileCardHeader>
                      
                      <MobileCardContent>
                        <MobileCardRow $isDark={isDarkTheme}>
                          <MobileCardLabel $isDark={isDarkTheme}>Клиент:</MobileCardLabel>
                          <MobileCardValue $isDark={isDarkTheme}>{order.full_name}</MobileCardValue>
                        </MobileCardRow>
                        
                        <MobileCardRow $isDark={isDarkTheme}>
                          <MobileCardLabel $isDark={isDarkTheme}>Телефон:</MobileCardLabel>
                          <MobileCardValue $isDark={isDarkTheme}>{order.phone_number}</MobileCardValue>
                        </MobileCardRow>
                        
                        <MobileCardRow $isDark={isDarkTheme}>
                          <MobileCardLabel $isDark={isDarkTheme}>Товаров:</MobileCardLabel>
                          <MobileCardValue $isDark={isDarkTheme}>{order.items_count}</MobileCardValue>
                        </MobileCardRow>
                        
                        <MobileCardRow $isDark={isDarkTheme}>
                          <MobileCardLabel $isDark={isDarkTheme}>Экономия:</MobileCardLabel>
                          <MobileCardValue $isDark={isDarkTheme} style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>
                            {formatCurrency(order.estimated_savings)}
                          </MobileCardValue>
                        </MobileCardRow>
                        
                        <MobileCardRow $isDark={isDarkTheme}>
                          <MobileCardLabel $isDark={isDarkTheme}>Дата:</MobileCardLabel>
                          <MobileCardValue $isDark={isDarkTheme}>{formatDateTime(order.created_at)}</MobileCardValue>
                        </MobileCardRow>
                      </MobileCardContent>
                      
                      <MobileCardActions $isDark={isDarkTheme}>
                        <MobileActionButton
                          $variant="success"
                          $isDark={isDarkTheme}
                          onClick={() => handleConfirmOrder(order.order_id, 'order')}
                        >
                          💳 Подтвердить оплату
                        </MobileActionButton>
                        <MobileActionButton
                          $variant="danger"
                          $isDark={isDarkTheme}
                          onClick={() => handleCancelOrder(order.order_id, 'order')}
                        >
                          ❌ Отменить
                        </MobileActionButton>
                      </MobileCardActions>
                    </MobileCard>
                  ))}
                </MobileCardContainer>
                
                {/* Пагинация */}
                <PaginationContainer $isDark={isDarkTheme}>
                  <PaginationInfo $isDark={isDarkTheme}>
                    Показано {startIndex + 1}-{Math.min(endIndex, filteredAndSortedData.length)} из {filteredAndSortedData.length}
                  </PaginationInfo>
                  <PaginationControls>
                    <PageButton
                      $isDark={isDarkTheme}
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                    >
                      ←
                    </PageButton>
                    <PageButton $isDark={isDarkTheme} $active>
                      {currentPage}
                    </PageButton>
                    <PageButton
                      $isDark={isDarkTheme}
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                    >
                      →
                    </PageButton>
                  </PaginationControls>
                </PaginationContainer>
              </div>
            )}

            {/* Покупки юаней */}
            {pendingYuanPurchases.length > 0 && (pendingFilter === 'all' || pendingFilter === 'yuan') && (
              <div>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '1.2rem' }}>
                  💰 Покупки юаней ({pendingYuanPurchases.length})
                </h3>
                <CompactTable $isDark={isDarkTheme}>
                  <thead>
                    <tr>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('id')}>
                        ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('full_name')}>
                        Пользователь {sortBy === 'full_name' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('amount_rub')}>
                        Сумма (₽) {sortBy === 'amount_rub' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme}>Юани</CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('savings')}>
                        Экономия {sortBy === 'savings' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('created_at')}>
                        Дата {sortBy === 'created_at' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme}>Действия</CompactTableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.filter(item => item.id && !item.order_id).map((purchase, index) => (
                      <CompactTableRow key={`pending-yuan-${purchase.id}-${index}`} $isDark={isDarkTheme}>
                        <CompactTableCell $isDark={isDarkTheme}>#{purchase.id}</CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>
                          <div>
                            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{purchase.full_name}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                              @{purchase.username || 'без username'}
                            </div>
                          </div>
                        </CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>{formatCurrency(purchase.amount_rub)}</CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>{purchase.amount_cny} ¥</CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme} style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>
                          {formatCurrency(purchase.savings)}
                        </CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>{formatDateTime(purchase.created_at)}</CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>
                          <div style={{ display: 'flex', gap: '4px', flexDirection: 'column' }}>
                            <ActionButton
                              $variant="success"
                              $isDark={isDarkTheme}
                              onClick={() => handleConfirmOrder(purchase.id, 'yuan')}
                            >
                              ✅ Подтвердить
                            </ActionButton>
                            <ActionButton
                              $variant="danger"
                              $isDark={isDarkTheme}
                              onClick={() => handleCancelOrder(purchase.id, 'yuan')}
                            >
                              ❌ Отменить
                            </ActionButton>
                          </div>
                        </CompactTableCell>
                      </CompactTableRow>
                    ))}
                  </tbody>
                </CompactTable>
                
                {/* Мобильные карточки для покупок юаней */}
                <MobileCardContainer $isDark={isDarkTheme}>
                  {paginatedData.filter(item => item.id && !item.order_id).map((purchase, index) => (
                    <MobileCard key={`mobile-yuan-${purchase.id}-${index}`} $isDark={isDarkTheme}>
                      <MobileCardHeader $isDark={isDarkTheme}>
                        <MobileCardTitle $isDark={isDarkTheme}>
                          Покупка #{purchase.id}
                        </MobileCardTitle>
                        <MobileCardStatus $status="pending" $isDark={isDarkTheme}>
                          Ожидает
                        </MobileCardStatus>
                      </MobileCardHeader>
                      
                      <MobileCardContent>
                        <MobileCardRow $isDark={isDarkTheme}>
                          <MobileCardLabel $isDark={isDarkTheme}>Пользователь:</MobileCardLabel>
                          <MobileCardValue $isDark={isDarkTheme}>{purchase.full_name}</MobileCardValue>
                        </MobileCardRow>
                        
                        <MobileCardRow $isDark={isDarkTheme}>
                          <MobileCardLabel $isDark={isDarkTheme}>Сумма:</MobileCardLabel>
                          <MobileCardValue $isDark={isDarkTheme}>{formatCurrency(purchase.amount_rub)}</MobileCardValue>
                        </MobileCardRow>
                        
                        <MobileCardRow $isDark={isDarkTheme}>
                          <MobileCardLabel $isDark={isDarkTheme}>Юани:</MobileCardLabel>
                          <MobileCardValue $isDark={isDarkTheme}>{purchase.amount_cny} ¥</MobileCardValue>
                        </MobileCardRow>
                        
                        <MobileCardRow $isDark={isDarkTheme}>
                          <MobileCardLabel $isDark={isDarkTheme}>Экономия:</MobileCardLabel>
                          <MobileCardValue $isDark={isDarkTheme} style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>
                            {formatCurrency(purchase.savings)}
                          </MobileCardValue>
                        </MobileCardRow>
                        
                        <MobileCardRow $isDark={isDarkTheme}>
                          <MobileCardLabel $isDark={isDarkTheme}>Дата:</MobileCardLabel>
                          <MobileCardValue $isDark={isDarkTheme}>{formatDateTime(purchase.created_at)}</MobileCardValue>
                        </MobileCardRow>
                      </MobileCardContent>
                      
                      <MobileCardActions $isDark={isDarkTheme}>
                        <MobileActionButton
                          $variant="success"
                          $isDark={isDarkTheme}
                          onClick={() => handleConfirmOrder(purchase.id, 'yuan')}
                        >
                          ✅ Подтвердить
                        </MobileActionButton>
                        <MobileActionButton
                          $variant="danger"
                          $isDark={isDarkTheme}
                          onClick={() => handleCancelOrder(purchase.id, 'yuan')}
                        >
                          ❌ Отменить
                        </MobileActionButton>
                      </MobileCardActions>
                    </MobileCard>
                  ))}
                </MobileCardContainer>
              </div>
            )}

            {pendingOrders.length === 0 && pendingYuanPurchases.length === 0 && (
              <EmptyState>Нет заказов, ожидающих подтверждения</EmptyState>
            )}
          </Section>
        )}

        {activeTab === 'users' && (
          <Section id="users-section" $isDark={isDarkTheme}>
            <SectionTitle>👥 Пользователи ({users.length})</SectionTitle>
            
            {/* Фильтры в одной строке */}
            <div style={{ 
              display: 'flex',
              gap: '12px', 
              marginBottom: '16px',
              width: '100%',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: '1 1 auto', minWidth: '200px' }}>
                <SearchInput
                  $isDark={isDarkTheme}
                  type="text"
                  placeholder="🔍 Поиск по имени, username, ID, заказам, экономии..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
              <FilterSelect $isDark={isDarkTheme} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="created_at">По дате</option>
                <option value="full_name">По имени</option>
                <option value="telegram_id">По ID</option>
                <option value="username">По username</option>
                <option value="orders_count">По заказам</option>
                <option value="yuan_purchases_count">По покупкам юаней</option>
                <option value="total_savings">По экономии</option>
                <option value="referrals_count">По рефералам</option>
              </FilterSelect>
              <FilterSelect $isDark={isDarkTheme} value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                <option value={5}>5 на странице</option>
                <option value={10}>10 на странице</option>
                <option value={20}>20 на странице</option>
                <option value={50}>50 на странице</option>
              </FilterSelect>
            </div>
            
            {/* Ограниченное окно со скроллом */}
            <div className="hide-scrollbar" style={{ 
              maxHeight: '500px',
              overflowY: 'auto',
              paddingRight: '8px'
            }}>
              {users.length > 0 ? (
                <CompactTable $isDark={isDarkTheme}>
                  <thead>
                    <tr>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('telegram_id')}>
                        ID {sortBy === 'telegram_id' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('full_name')}>
                        Имя {sortBy === 'full_name' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme}>Статус</CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme}>Username</CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('orders_count')}>
                        Заказы {sortBy === 'orders_count' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme}>Покупки</CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('total_savings')}>
                        Экономия {sortBy === 'total_savings' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme}>Рефералы</CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('created_at')}>
                        Дата {sortBy === 'created_at' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((user, index) => (
                      <CompactTableRow key={`user-${user.telegram_id}-${index}`} $isDark={isDarkTheme}>
                        <CompactTableCell $isDark={isDarkTheme}>
                          <a 
                            href={`https://t.me/${user.username || user.telegram_id}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}
                          >
                            {user.telegram_id}
                          </a>
                        </CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>
                          <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{user.full_name || 'Не указано'}</div>
                        </CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>
                          <StatusBadge 
                            $status={user.status === 'online' ? 'completed' : 'pending'}
                            style={{
                              background: user.status === 'online' 
                                ? 'linear-gradient(135deg, #2ecc71, #27ae60)' 
                                : 'linear-gradient(135deg, #95a5a6, #7f8c8d)',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.75rem'
                            }}
                          >
                            {user.status === 'online' ? '🟢 Онлайн' : '⚫ Оффлайн'}
                          </StatusBadge>
                        </CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>@{user.username || 'неизвестно'}</CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>{user.orders_count}</CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>{user.yuan_purchases_count}</CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme} style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>
                          {formatCurrency(user.total_savings)}
                        </CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>{user.referrals_count}</CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>{formatDateTime(user.created_at)}</CompactTableCell>
                      </CompactTableRow>
                    ))}
                  </tbody>
                </CompactTable>
              ) : (
                <EmptyState>Пользователи не найдены</EmptyState>
              )}
            </div>
            
            {/* Мобильные карточки для пользователей */}
            {users.length > 0 && (
              <div className="hide-scrollbar" style={{ 
                maxHeight: '500px',
                overflowY: 'auto',
                paddingRight: '8px'
              }}>
                <MobileCardContainer $isDark={isDarkTheme}>
                  {filteredAndSortedData.map((user, index) => (
                  <MobileCard key={`mobile-user-${user.telegram_id}-${index}`} $isDark={isDarkTheme}>
                    <MobileCardHeader $isDark={isDarkTheme}>
                      <MobileCardTitle $isDark={isDarkTheme}>
                        {user.full_name || 'Не указано'}
                      </MobileCardTitle>
                      <MobileCardStatus 
                        $status={user.status === 'online' ? 'completed' : 'pending'} 
                        $isDark={isDarkTheme}
                        style={{ 
                          background: user.status === 'online' 
                            ? 'linear-gradient(135deg, #2ecc71, #27ae60)' 
                            : 'linear-gradient(135deg, #95a5a6, #7f8c8d)'
                        }}
                      >
                        {user.status === 'online' ? '🟢 Онлайн' : '⚫ Оффлайн'}
                      </MobileCardStatus>
                    </MobileCardHeader>
                    
                    <MobileCardContent>
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>ID:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme}>
                          <a 
                            href={`https://t.me/${user.username || user.telegram_id}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}
                          >
                            {user.telegram_id}
                          </a>
                        </MobileCardValue>
                      </MobileCardRow>
                      
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Username:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme}>@{user.username || 'неизвестно'}</MobileCardValue>
                      </MobileCardRow>
                      
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Заказов:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme}>{user.orders_count}</MobileCardValue>
                      </MobileCardRow>
                      
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Покупок:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme}>{user.yuan_purchases_count}</MobileCardValue>
                      </MobileCardRow>
                      
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Экономия:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme} style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>
                          {formatCurrency(user.total_savings)}
                        </MobileCardValue>
                      </MobileCardRow>
                      
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Рефералов:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme}>{user.referrals_count}</MobileCardValue>
                      </MobileCardRow>
                      
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Дата:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme}>{formatDateTime(user.created_at)}</MobileCardValue>
                      </MobileCardRow>
                    </MobileCardContent>
                  </MobileCard>
                  ))}
                </MobileCardContainer>
              </div>
            )}
          </Section>
        )}

        {activeTab === 'orders' && (
          <Section id="orders-section" $isDark={isDarkTheme}>
            <SectionTitle>📦 Заказы ({orders.length})</SectionTitle>
            
            {/* Поиск */}
            <div style={{ marginBottom: '16px' }}>
              <SearchInput
                $isDark={isDarkTheme}
                type="text"
                placeholder="🔍 Поиск по имени, телефону, ID, адресу, экономии..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
            
            {/* Фильтры в одну строку */}
            <div style={{ 
              display: 'flex',
              gap: '12px', 
              marginBottom: '16px',
              width: '100%',
              alignItems: 'center'
            }}>
              <div style={{ flex: '1 1 auto', minWidth: '0' }}>
                <FilterSelect 
                  $isDark={isDarkTheme} 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <option value="all">📋 Все статусы</option>
                  <option value="pending">⏳ Ожидает</option>
                  <option value="paid">💳 Оплачено</option>
                  <option value="completed">✅ Завершено</option>
                  <option value="profit_calculated">💰 Учтена прибыль</option>
                  <option value="cancelled">❌ Отменено</option>
                </FilterSelect>
              </div>
              
              <div style={{ flex: '0 0 100px' }}>
                <FilterSelect 
                  $isDark={isDarkTheme} 
                  value={itemsPerPage} 
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  style={{ width: '100%' }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </FilterSelect>
              </div>
            </div>
            
            {/* Ограниченное окно со скроллом */}
            <div className="hide-scrollbar" style={{ 
              maxHeight: '500px',
              overflowY: 'auto',
              paddingRight: '8px'
            }}>
              {orders.length > 0 ? (
                <CompactTable $isDark={isDarkTheme}>
                  <thead>
                    <tr>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('order_id')}>
                        ID {sortBy === 'order_id' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('full_name')}>
                        Клиент {sortBy === 'full_name' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme}>Статус</CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('phone_number')}>
                        Телефон {sortBy === 'phone_number' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('items_count')}>
                        Товаров {sortBy === 'items_count' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('estimated_savings')}>
                        Экономия {sortBy === 'estimated_savings' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('created_at')}>
                        Дата {sortBy === 'created_at' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((order, index) => (
                      <CompactTableRow key={`order-${order.order_id}-${index}`} $isDark={isDarkTheme}>
                        <CompactTableCell $isDark={isDarkTheme}>#{order.order_id}</CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>
                          <a 
                            href={`https://t.me/${order.username || order.telegram_id}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}
                          >
                            {order.full_name || 'Неизвестно'}
                          </a>
                        </CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.order_id, e.target.value)}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '6px',
                              border: '1px solid var(--border-color)',
                              background: order.status === 'profit_calculated' ? '#9b59b6' :
                                         order.status === 'completed' ? '#27ae60' : 
                                         order.status === 'paid' ? '#3498db' : 
                                         order.status === 'cancelled' ? '#e74c3c' : '#f39c12',
                              color: 'white',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              minWidth: '120px'
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="pending">⏳ Ожидает</option>
                            <option value="paid">💳 Оплачено</option>
                            <option value="completed">✅ Завершено</option>
                            <option value="profit_calculated">💰 Учтена прибыль</option>
                            <option value="cancelled">❌ Отменено</option>
                          </select>
                        </CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>{order.phone_number}</CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>{order.items_count}</CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme} style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>
                          {formatCurrency(order.estimated_savings)}
                        </CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>{formatDateTime(order.created_at)}</CompactTableCell>
                      </CompactTableRow>
                    ))}
                  </tbody>
                </CompactTable>
              ) : (
                <EmptyState>Заказы не найдены</EmptyState>
              )}
            </div>
            
            {/* Мобильные карточки для заказов */}
            {orders.length > 0 && (
              <div className="hide-scrollbar" style={{ 
                maxHeight: '500px',
                overflowY: 'auto',
                paddingRight: '8px'
              }}>
                <MobileCardContainer $isDark={isDarkTheme}>
                  {filteredAndSortedData.map((order, index) => (
                  <MobileCard key={`mobile-order-${order.order_id}-${index}`} $isDark={isDarkTheme}>
                    <MobileCardHeader $isDark={isDarkTheme}>
                      <MobileCardTitle $isDark={isDarkTheme}>
                        Заказ #{order.order_id}
                      </MobileCardTitle>
                      <MobileCardStatus 
                        $status={order.status} 
                        $isDark={isDarkTheme}
                        style={{
                          background: order.status === 'profit_calculated' ? '#9b59b6' :
                                     order.status === 'completed' ? '#27ae60' : 
                                     order.status === 'paid' ? '#3498db' : 
                                     order.status === 'cancelled' ? '#e74c3c' : '#f39c12'
                        }}
                      >
                        {order.status === 'profit_calculated' ? '💰 Учтена прибыль' :
                         order.status === 'completed' ? '✅ Завершено' : 
                         order.status === 'paid' ? '💳 Оплачено' : 
                         order.status === 'cancelled' ? '❌ Отменено' : '⏳ Ожидает'}
                      </MobileCardStatus>
                    </MobileCardHeader>
                    
                    <MobileCardContent>
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Статус:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme}>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.order_id, e.target.value)}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '6px',
                              border: '1px solid var(--border-color)',
                              background: order.status === 'profit_calculated' ? '#9b59b6' :
                                         order.status === 'completed' ? '#27ae60' : 
                                         order.status === 'paid' ? '#3498db' : 
                                         order.status === 'cancelled' ? '#e74c3c' : '#f39c12',
                              color: 'white',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              cursor: 'pointer',
                              width: '100%'
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="pending">⏳ Ожидает</option>
                            <option value="paid">💳 Оплачено</option>
                            <option value="completed">✅ Завершено</option>
                            <option value="profit_calculated">💰 Учтена прибыль</option>
                            <option value="cancelled">❌ Отменено</option>
                          </select>
                        </MobileCardValue>
                      </MobileCardRow>
                      
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Клиент:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme}>
                          <a 
                            href={`https://t.me/${order.username || order.telegram_id}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}
                          >
                            {order.full_name || 'Неизвестно'}
                          </a>
                        </MobileCardValue>
                      </MobileCardRow>
                      
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Телефон:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme}>{order.phone_number}</MobileCardValue>
                      </MobileCardRow>
                      
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Товаров:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme}>{order.items_count}</MobileCardValue>
                      </MobileCardRow>
                      
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Экономия:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme} style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>
                          {formatCurrency(order.estimated_savings)}
                        </MobileCardValue>
                      </MobileCardRow>
                      
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Дата:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme}>{formatDateTime(order.created_at)}</MobileCardValue>
                      </MobileCardRow>
                    </MobileCardContent>
                  </MobileCard>
                  ))}
                </MobileCardContainer>
              </div>
            )}
          </Section>
        )}

        {activeTab === 'yuan' && (
          <Section id="yuan-section" $isDark={isDarkTheme}>
            <SectionTitle>💰 Покупки юаней ({yuanPurchases.length})</SectionTitle>
            
            {/* Фильтры в одной строке */}
            <div style={{ 
              display: 'flex',
              gap: '12px', 
              marginBottom: '16px',
              width: '100%',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: '1 1 auto', minWidth: '200px' }}>
                <SearchInput
                  $isDark={isDarkTheme}
                  type="text"
                  placeholder="🔍 Поиск по имени, username, ID, сумме, статусу..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>
              <FilterSelect $isDark={isDarkTheme} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="created_at">По дате</option>
                <option value="full_name">По имени</option>
                <option value="id">По ID</option>
                <option value="amount_rub">По сумме (₽)</option>
                <option value="amount_cny">По юаням</option>
                <option value="savings">По экономии</option>
                <option value="status">По статусу</option>
                <option value="username">По username</option>
              </FilterSelect>
              <FilterSelect $isDark={isDarkTheme} value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                <option value={5}>5 на странице</option>
                <option value={10}>10 на странице</option>
                <option value={20}>20 на странице</option>
                <option value={50}>50 на странице</option>
              </FilterSelect>
            </div>
            
            {/* Ограниченное окно со скроллом */}
            <div className="hide-scrollbar" style={{ 
              maxHeight: '500px',
              overflowY: 'auto',
              paddingRight: '8px'
            }}>
              {yuanPurchases.length > 0 ? (
              <CompactTable $isDark={isDarkTheme}>
                  <thead>
                    <tr>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('id')}>
                        ID {sortBy === 'id' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('full_name')}>
                        Пользователь {sortBy === 'full_name' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('amount_rub')}>
                        Сумма (₽) {sortBy === 'amount_rub' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('amount_cny')}>
                        Юани {sortBy === 'amount_cny' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('savings')}>
                        Экономия {sortBy === 'savings' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('status')}>
                        Статус {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                      <CompactTableHeader $isDark={isDarkTheme} onClick={() => handleSort('created_at')}>
                        Дата {sortBy === 'created_at' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </CompactTableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((purchase, index) => (
                      <CompactTableRow key={`purchase-${purchase.id}-${index}`} $isDark={isDarkTheme}>
                        <CompactTableCell $isDark={isDarkTheme}>#{purchase.id}</CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>
                          <a 
                            href={`https://t.me/${purchase.username || purchase.telegram_id}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}
                          >
                            {purchase.full_name || `@${purchase.username || 'неизвестно'}`}
                          </a>
                        </CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>{formatCurrency(purchase.amount_rub)}</CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>{purchase.amount_cny} ¥</CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme} style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>
                          {formatCurrency(purchase.savings)}
                        </CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>
                          <StatusBadge $status={purchase.status} $isDark={isDarkTheme}>
                            {purchase.status === 'completed' ? 'Завершено' : purchase.status === 'pending' ? 'Ожидает' : 'Отменено'}
                          </StatusBadge>
                        </CompactTableCell>
                        <CompactTableCell $isDark={isDarkTheme}>{formatDateTime(purchase.created_at)}</CompactTableCell>
                      </CompactTableRow>
                    ))}
                  </tbody>
                </CompactTable>
              ) : (
                <EmptyState>Покупки юаней не найдены</EmptyState>
              )}
            </div>
            
            {/* Мобильные карточки для покупок юаней */}
            {yuanPurchases.length > 0 && (
              <div className="hide-scrollbar" style={{ 
                maxHeight: '500px',
                overflowY: 'auto',
                paddingRight: '8px'
              }}>
                <MobileCardContainer $isDark={isDarkTheme}>
                  {filteredAndSortedData.map((purchase, index) => (
                  <MobileCard key={`mobile-yuan-${purchase.id}-${index}`} $isDark={isDarkTheme}>
                    <MobileCardHeader $isDark={isDarkTheme}>
                      <MobileCardTitle $isDark={isDarkTheme}>
                        Покупка #{purchase.id}
                      </MobileCardTitle>
                      <MobileCardStatus $status={purchase.status} $isDark={isDarkTheme}>
                        {purchase.status === 'completed' ? 'Завершено' : purchase.status === 'pending' ? 'Ожидает' : 'Отменено'}
                      </MobileCardStatus>
                    </MobileCardHeader>
                    
                    <MobileCardContent>
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Пользователь:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme}>
                          <a 
                            href={`https://t.me/${purchase.username || purchase.telegram_id}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}
                          >
                            {purchase.full_name || `@${purchase.username || 'неизвестно'}`}
                          </a>
                        </MobileCardValue>
                      </MobileCardRow>
                      
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Сумма:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme}>{formatCurrency(purchase.amount_rub)}</MobileCardValue>
                      </MobileCardRow>
                      
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Юани:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme}>{purchase.amount_cny} ¥</MobileCardValue>
                      </MobileCardRow>
                      
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Экономия:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme} style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>
                          {formatCurrency(purchase.savings)}
                        </MobileCardValue>
                      </MobileCardRow>
                      
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Дата:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme}>{formatDateTime(purchase.created_at)}</MobileCardValue>
                      </MobileCardRow>
                    </MobileCardContent>
                  </MobileCard>
                  ))}
                </MobileCardContainer>
              </div>
            )}
          </Section>
        )}

        {activeTab === 'notifications' && (
          <Section id="notifications-section" $isDark={isDarkTheme}>
            <SectionTitle>📢 Отправка уведомлений</SectionTitle>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                Тип уведомления:
              </label>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="notificationType"
                    value="all"
                    checked={notificationType === 'all'}
                    onChange={(e) => setNotificationType(e.target.value as 'all' | 'user')}
                    style={{ accentColor: 'var(--primary-color)' }}
                  />
                  📢 Всем пользователям
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="notificationType"
                    value="user"
                    checked={notificationType === 'user'}
                    onChange={(e) => setNotificationType(e.target.value as 'all' | 'user')}
                    style={{ accentColor: 'var(--primary-color)' }}
                  />
                  👤 Конкретному пользователю
                </label>
              </div>
            </div>

            {notificationType === 'user' && (
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                  Выберите пользователя:
                </label>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Выберите пользователя...</option>
                  {usersList.map(user => (
                    <option key={user.telegram_id} value={user.telegram_id}>
                      {user.display_name} (@{user.username || 'нет username'}) - ID: {user.telegram_id}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                Заголовок (необязательно):
              </label>
              <input
                type="text"
                value={notificationTitle}
                onChange={(e) => setNotificationTitle(e.target.value)}
                placeholder="Например: Новая акция!"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  marginBottom: '16px'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                Сообщение:
              </label>
              <textarea
                value={notificationMessage}
                onChange={(e) => {
                  setNotificationMessage(e.target.value);
                  // Автоувеличение высоты
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.max(100, e.target.scrollHeight) + 'px';
                }}
                placeholder="Введите текст уведомления..."
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  resize: 'none',
                  minHeight: '100px',
                  overflow: 'hidden'
                }}
              />
            </div>

            <button
              onClick={sendNotification}
              disabled={sendingNotification || !notificationMessage.trim() || (notificationType === 'user' && !selectedUser)}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: sendingNotification ? 'var(--text-secondary)' : 'var(--matte-red)',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: sendingNotification ? 'not-allowed' : 'pointer',
                opacity: sendingNotification ? 0.7 : 1,
                transition: 'all 0.3s ease'
              }}
            >
              {sendingNotification ? '⏳ Отправка...' : '📤 Отправить уведомление'}
            </button>

            {notificationType === 'all' && (
              <div style={{ 
                marginTop: '16px', 
                padding: '12px', 
                backgroundColor: 'var(--warning-bg)', 
                borderRadius: '8px',
                border: '1px solid var(--warning-border)',
                color: 'var(--warning-text)',
                fontSize: '0.9rem'
              }}>
                ⚠️ <strong>Внимание:</strong> Уведомление будет отправлено всем пользователям в системе. 
                Это может занять некоторое время в зависимости от количества пользователей.
              </div>
            )}
          </Section>
        )}

        {activeTab === 'monitoring' && (
          <Section id="monitoring-section" $isDark={isDarkTheme}>
            <SectionTitle>🔧 Мониторинг системы</SectionTitle>
            
            {systemStatus ? (
              <div style={{ display: 'grid', gap: '20px' }}>
                {/* Статус сервера */}
                <div style={{ 
                  padding: '16px', 
                  backgroundColor: 'var(--bg-card)', 
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)'
                }}>
                  <h3 style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>🖥️ Сервер</h3>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Статус:</span>
                      <span style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>
                        {systemStatus.server.status === 'running' ? '✅ Работает' : '❌ Остановлен'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Время работы:</span>
                      <span>{Math.floor(systemStatus.server.uptime / 3600)}ч {Math.floor((systemStatus.server.uptime % 3600) / 60)}м</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Память:</span>
                      <span>{(systemStatus.server.memory.heapUsed / 1024 / 1024).toFixed(1)} MB</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Node.js:</span>
                      <span>{systemStatus.server.nodeVersion}</span>
                    </div>
                  </div>
                </div>

                {/* Статус БД */}
                <div style={{ 
                  padding: '16px', 
                  backgroundColor: 'var(--bg-card)', 
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)'
                }}>
                  <h3 style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>🗄️ База данных</h3>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Статус:</span>
                      <span style={{ 
                        color: systemStatus.database.status === 'connected' ? 'var(--success-color)' : 'var(--error-color)', 
                        fontWeight: 'bold' 
                      }}>
                        {systemStatus.database.status === 'connected' ? '✅ Подключена' : '❌ Отключена'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Время отклика:</span>
                      <span>{systemStatus.database.responseTime}мс</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Состояние:</span>
                      <span>{systemStatus.database.connectionState}</span>
                    </div>
                  </div>
                </div>

                {/* Общая информация */}
                <div style={{ 
                  padding: '16px', 
                  backgroundColor: 'var(--bg-card)', 
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)'
                }}>
                  <h3 style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>📊 Общая информация</h3>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Время ответа API:</span>
                      <span>{systemStatus.responseTime}мс</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Последнее обновление:</span>
                      <span>{new Date(systemStatus.timestamp).toLocaleString('ru-RU')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⏳</div>
                <p>Загрузка статуса системы...</p>
              </div>
            )}
          </Section>
        )}

        {activeTab === 'analytics' && (
          <Section id="analytics-section" $isDark={isDarkTheme}>
            <SectionTitle>📊 Аналитика продаж</SectionTitle>
            
            {/* Компактный блок фильтров */}
            <div style={{ 
              padding: '16px', 
              backgroundColor: 'var(--bg-card)', 
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              marginBottom: '16px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
            }}>
              <h3 style={{ 
                margin: '0 0 16px 0', 
                color: 'var(--text-primary)', 
                fontWeight: 'bold', 
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                🎯 Настройки периода
              </h3>
              
              {/* Компактная компоновка фильтров */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
                {/* Быстрый выбор - компактные кнопки */}
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '500' }}>
                    🎯 Быстрый выбор:
                  </label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['day', 'week', 'month'].map(period => (
                      <button
                        key={period}
                        onClick={() => { 
                          setAnalyticsPeriod(period); 
                          setCustomStartDate('');
                          setCustomEndDate('');
                          loadSalesAnalytics(period, undefined, undefined, showComparison); 
                        }}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: analyticsPeriod === period ? '2px solid var(--matte-red)' : '1px solid var(--border-color)',
                          backgroundColor: analyticsPeriod === period ? 'var(--matte-red)' : 'var(--bg-secondary)',
                          color: analyticsPeriod === period ? 'white' : 'var(--text-primary)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontWeight: analyticsPeriod === period ? 'bold' : '500',
                          fontSize: '0.8rem',
                          flex: '1 1 auto',
                          minWidth: '70px',
                          textAlign: 'center',
                          boxShadow: analyticsPeriod === period ? '0 2px 8px rgba(162, 59, 59, 0.3)' : '0 1px 3px rgba(0, 0, 0, 0.1)'
                        }}
                        onMouseEnter={(e: any) => {
                          if (analyticsPeriod !== period) {
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.15)';
                          }
                        }}
                        onMouseLeave={(e: any) => {
                          if (analyticsPeriod !== period) {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                          }
                        }}
                      >
                        {period === 'day' ? '📆 День' : period === 'week' ? '📅 Неделя' : '🗓️ Месяц'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Произвольный период - кнопка под полями */}
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '500' }}>
                    📅 Произвольный период:
                  </label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', marginBottom: '12px' }}>
                    <div style={{ flex: '1 1 0', minWidth: '120px' }}>
                      <label style={{ display: 'block', marginBottom: '4px', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                        С:
                      </label>
                      <input
                        type="date"
                        value={customStartDate}
                        onChange={(e) => setCustomStartDate(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-secondary)',
                          color: 'var(--text-primary)',
                          fontSize: '0.9rem',
                          boxSizing: 'border-box',
                          minHeight: '40px'
                        }}
                      />
                    </div>
                    <div style={{ flex: '1 1 0', minWidth: '120px' }}>
                      <label style={{ display: 'block', marginBottom: '4px', color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                        По:
                      </label>
                      <input
                        type="date"
                        value={customEndDate}
                        onChange={(e) => setCustomEndDate(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-secondary)',
                          color: 'var(--text-primary)',
                          fontSize: '0.9rem',
                          boxSizing: 'border-box',
                          minHeight: '40px'
                        }}
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleCustomPeriodLoad}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #3498db, #2980b9)',
                      color: 'white',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease',
                      minHeight: '44px',
                      boxShadow: '0 2px 6px rgba(52, 152, 219, 0.3)'
                    }}
                    onMouseEnter={(e: any) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 3px 8px rgba(52, 152, 219, 0.4)';
                    }}
                    onMouseLeave={(e: any) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 6px rgba(52, 152, 219, 0.3)';
                    }}
                  >
                    📊 Загрузить данные за выбранный период
                  </button>
                </div>
              </div>

              {/* Чекбокс сравнения */}
              <div style={{ 
                padding: '10px 12px', 
                backgroundColor: 'var(--bg-secondary)', 
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer'
              }}
              onClick={() => {
                const newValue = !showComparison;
                setShowComparison(newValue);
                if (customStartDate && customEndDate) {
                  loadSalesAnalytics(undefined, customStartDate, customEndDate, newValue);
                } else {
                  loadSalesAnalytics(analyticsPeriod, undefined, undefined, newValue);
                }
              }}
              >
                <input
                  type="checkbox"
                  checked={showComparison}
                  onChange={() => {}}
                  style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                />
                <label style={{ color: 'var(--text-primary)', fontWeight: '500', fontSize: '0.85rem', cursor: 'pointer' }}>
                  📊 Сравнить с предыдущим периодом
                </label>
              </div>

              {/* Информация о периодах сравнения */}
              {showComparison && salesAnalytics?.previousStats && (
                <div style={{ 
                  marginTop: '12px',
                  padding: '12px', 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderRadius: '10px',
                  border: '1px solid rgba(52, 152, 219, 0.3)',
                  fontSize: '0.85rem'
                }}>
                  <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '150px' }}>
                      <div style={{ color: '#27ae60', fontWeight: 'bold', marginBottom: '4px' }}>
                        📅 Текущий период:
                      </div>
                      <div style={{ color: 'var(--text-primary)' }}>
                        {(() => {
                          if (salesAnalytics.startDate && salesAnalytics.endDate) {
                            return `${new Date(salesAnalytics.startDate).toLocaleDateString('ru-RU')} - ${new Date(salesAnalytics.endDate).toLocaleDateString('ru-RU')}`;
                          }
                          const now = new Date();
                          if (analyticsPeriod === 'day') {
                            return now.toLocaleDateString('ru-RU');
                          } else if (analyticsPeriod === 'week') {
                            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                            return `${weekAgo.toLocaleDateString('ru-RU')} - ${now.toLocaleDateString('ru-RU')}`;
                          } else {
                            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                            return `${monthAgo.toLocaleDateString('ru-RU')} - ${now.toLocaleDateString('ru-RU')}`;
                          }
                        })()}
                      </div>
                    </div>
                    <div style={{ 
                      borderLeft: '2px solid var(--border-color)', 
                      height: 'auto',
                      display: window.innerWidth > 500 ? 'block' : 'none'
                    }}></div>
                    <div style={{ flex: 1, minWidth: '150px' }}>
                      <div style={{ color: '#e67e22', fontWeight: 'bold', marginBottom: '4px' }}>
                        📅 Предыдущий период:
                      </div>
                      <div style={{ color: 'var(--text-secondary)' }}>
                        {(() => {
                          if (salesAnalytics.startDate && salesAnalytics.endDate) {
                            const start = new Date(salesAnalytics.startDate);
                            const end = new Date(salesAnalytics.endDate);
                            const diff = end.getTime() - start.getTime();
                            const prevEnd = new Date(start.getTime() - 24 * 60 * 60 * 1000);
                            const prevStart = new Date(prevEnd.getTime() - diff);
                            return `${prevStart.toLocaleDateString('ru-RU')} - ${prevEnd.toLocaleDateString('ru-RU')}`;
                          }
                          const now = new Date();
                          if (analyticsPeriod === 'day') {
                            const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
                            return yesterday.toLocaleDateString('ru-RU');
                          } else if (analyticsPeriod === 'week') {
                            const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
                            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                            return `${twoWeeksAgo.toLocaleDateString('ru-RU')} - ${weekAgo.toLocaleDateString('ru-RU')}`;
                          } else {
                            const twoMonthsAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
                            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                            return `${twoMonthsAgo.toLocaleDateString('ru-RU')} - ${monthAgo.toLocaleDateString('ru-RU')}`;
                          }
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Компактный блок результатов */}
            {salesAnalytics && (
              <div style={{ 
                padding: '16px', 
                backgroundColor: 'var(--bg-card)', 
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                marginBottom: '16px'
              }}>
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  color: 'var(--text-primary)', 
                  fontWeight: 'bold', 
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  📈 Общая статистика
                  {salesAnalytics.previousStats && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginLeft: '6px' }}>
                      (сравнение)
                    </span>
                  )}
                </h3>

                {/* Компактная статистика в сетке - одинаковые размеры */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gridTemplateRows: 'repeat(2, 1fr)',
                  gap: '12px',
                  marginBottom: '16px'
                }}>
                  {/* Заказы */}
                  <div style={{ 
                    padding: '12px', 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    textAlign: 'center',
                    minHeight: '80px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>📦 Заказы</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                      {salesAnalytics.totalStats.total_orders || 0}
                    </div>
                    {salesAnalytics.previousStats && (
                      <div style={{ 
                        fontSize: '0.7rem', 
                        color: (salesAnalytics.totalStats.total_orders - salesAnalytics.previousStats.total_orders) >= 0 ? '#27ae60' : '#e74c3c',
                        fontWeight: 'bold'
                      }}>
                        {(salesAnalytics.totalStats.total_orders - salesAnalytics.previousStats.total_orders) >= 0 ? '▲' : '▼'}
                        {Math.abs(salesAnalytics.totalStats.total_orders - salesAnalytics.previousStats.total_orders)}
                      </div>
                    )}
                  </div>

                  {/* Покупки юаней */}
                  <div style={{ 
                    padding: '12px', 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    textAlign: 'center',
                    minHeight: '80px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>💴 Юани</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                      {salesAnalytics.totalStats.total_yuan_purchases || 0}
                    </div>
                    {salesAnalytics.previousStats && (
                      <div style={{ 
                        fontSize: '0.7rem', 
                        color: (salesAnalytics.totalStats.total_yuan_purchases - salesAnalytics.previousStats.total_yuan_purchases) >= 0 ? '#27ae60' : '#e74c3c',
                        fontWeight: 'bold'
                      }}>
                        {(salesAnalytics.totalStats.total_yuan_purchases - salesAnalytics.previousStats.total_yuan_purchases) >= 0 ? '▲' : '▼'}
                        {Math.abs(salesAnalytics.totalStats.total_yuan_purchases - salesAnalytics.previousStats.total_yuan_purchases)}
                      </div>
                    )}
                  </div>

                  {/* Новые пользователи */}
                  <div style={{ 
                    padding: '12px', 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    textAlign: 'center',
                    minHeight: '80px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>👥 Пользователи</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#3498db' }}>
                      {salesAnalytics.totalStats.total_new_users || 0}
                    </div>
                    {salesAnalytics.previousStats && (
                      <div style={{ 
                        fontSize: '0.7rem', 
                        color: (salesAnalytics.totalStats.total_new_users - salesAnalytics.previousStats.total_new_users) >= 0 ? '#27ae60' : '#e74c3c',
                        fontWeight: 'bold'
                      }}>
                        {(salesAnalytics.totalStats.total_new_users - salesAnalytics.previousStats.total_new_users) >= 0 ? '▲' : '▼'}
                        {Math.abs(salesAnalytics.totalStats.total_new_users - salesAnalytics.previousStats.total_new_users)}
                      </div>
                    )}
                  </div>

                  {/* Прибыль */}
                  <div style={{ 
                    padding: '12px', 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderRadius: '8px',
                    border: '2px solid var(--matte-red)',
                    textAlign: 'center',
                    minHeight: '80px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>💰 Прибыль</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--matte-red)' }}>
                      {formatCurrency(salesAnalytics.totalStats.total_profit || 0)}
                    </div>
                    {salesAnalytics.previousStats && (
                      <div style={{ 
                        fontSize: '0.7rem', 
                        color: (salesAnalytics.totalStats.total_profit - salesAnalytics.previousStats.total_profit) >= 0 ? '#27ae60' : '#e74c3c',
                        fontWeight: 'bold'
                      }}>
                        {(salesAnalytics.totalStats.total_profit - salesAnalytics.previousStats.total_profit) >= 0 ? '▲' : '▼'}
                        {formatCurrency(Math.abs(salesAnalytics.totalStats.total_profit - salesAnalytics.previousStats.total_profit))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Детальная статистика по дням - простые таблицы */}
            {salesAnalytics && (
              <div style={{ 
                padding: '16px', 
                backgroundColor: 'var(--bg-card)', 
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                marginTop: '16px'
              }}>
                <h3 style={{ 
                  margin: '0 0 16px 0', 
                  color: 'var(--text-primary)', 
                  fontWeight: 'bold', 
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  📊 Детальная статистика по дням
                </h3>

                {/* Заказы по дням */}
                {salesAnalytics.ordersStats && salesAnalytics.ordersStats.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ 
                      color: 'var(--text-primary)', 
                      marginBottom: '12px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      📦 Заказы по дням
                    </h4>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      {salesAnalytics.ordersStats.map((stat: any, index: number) => (
                        <div key={index} style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          padding: '12px',
                          backgroundColor: 'var(--bg-secondary)',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)'
                        }}>
                          <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                            {new Date(stat.date).toLocaleDateString('ru-RU')}
                          </span>
                          <span style={{ fontWeight: 'bold', color: '#3498db' }}>
                            {stat.orders_count || 0} заказов
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Покупки юаней по дням */}
                {salesAnalytics.yuanStats && salesAnalytics.yuanStats.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ 
                      color: 'var(--text-primary)', 
                      marginBottom: '12px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      💴 Покупки юаней по дням
                    </h4>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      {salesAnalytics.yuanStats.map((stat: any, index: number) => (
                        <div key={index} style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          padding: '12px',
                          backgroundColor: 'var(--bg-secondary)',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)'
                        }}>
                          <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                            {new Date(stat.date).toLocaleDateString('ru-RU')}
                          </span>
                          <span style={{ fontWeight: 'bold', color: '#e74c3c' }}>
                            {stat.purchases_count || 0} покупок
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Новые пользователи по дням */}
                {salesAnalytics.newUsersStats && salesAnalytics.newUsersStats.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ 
                      color: 'var(--text-primary)', 
                      marginBottom: '12px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      👥 Новые пользователи по дням
                    </h4>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      {salesAnalytics.newUsersStats.map((stat: any, index: number) => (
                        <div key={index} style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          padding: '12px',
                          backgroundColor: 'var(--bg-secondary)',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)'
                        }}>
                          <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                            {new Date(stat.date).toLocaleDateString('ru-RU')}
                          </span>
                          <span style={{ fontWeight: 'bold', color: '#27ae60' }}>
                            {stat.new_users_count || 0} пользователей
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Прибыль по дням */}
                {salesAnalytics.profitStats && salesAnalytics.profitStats.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ 
                      color: 'var(--matte-red)', 
                      marginBottom: '12px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      💰 Прибыль по дням
                    </h4>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      {salesAnalytics.profitStats.map((stat: any, index: number) => (
                        <div key={index} style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between',
                          padding: '12px',
                          backgroundColor: 'var(--bg-secondary)',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)'
                        }}>
                          <span style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                            {new Date(stat.date).toLocaleDateString('ru-RU')}
                          </span>
                          <span style={{ fontWeight: 'bold', color: 'var(--matte-red)' }}>
                            +{formatCurrency(stat.total_profit || 0)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {!salesAnalytics && (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📊</div>
                <p>Загрузка аналитики...</p>
              </div>
            )}
          </Section>
        )}

        {activeTab === 'user-management' && (
          <Section id="user-management-section" $isDark={isDarkTheme}>
            <SectionTitle>👤 Управление пользователями</SectionTitle>
            
            {/* Изменение комиссии */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '1.1rem' }}>💰 Изменение комиссии</h3>
              
              <div style={{ display: 'grid', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                    Выберите пользователя:
                  </label>
                  <select
                    value={selectedUserForCommission}
                    onChange={(e) => setSelectedUserForCommission(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-card)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="">Выберите пользователя...</option>
                    {usersList.map(user => (
                      <option key={user.telegram_id} value={user.telegram_id}>
                        {user.display_name} (@{user.username || 'нет'}) - {user.telegram_id}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                    Новая комиссия (в рублях):
                  </label>
                  <input
                    type="number"
                    value={commissionValue}
                    onChange={(e) => setCommissionValue(e.target.value)}
                    placeholder="1000"
                    min="0"
                    max="1000"
                    step="100"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-card)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <button
                  onClick={updateUserCommission}
                  disabled={!selectedUserForCommission || !commissionValue}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: selectedUserForCommission && commissionValue ? 'var(--primary-color)' : 'var(--text-secondary)',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: selectedUserForCommission && commissionValue ? 'pointer' : 'not-allowed',
                    opacity: selectedUserForCommission && commissionValue ? 1 : 0.7,
                    transition: 'all 0.3s ease'
                  }}
                >
                  💰 Обновить комиссию
                </button>
              </div>
            </div>

            {/* История пользователя */}
            <div>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '1.1rem' }}>📋 История пользователя</h3>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                  Выберите пользователя для просмотра истории:
                </label>
                <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                  <select
                    value={selectedUserForHistory}
                    onChange={(e) => setSelectedUserForHistory(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'var(--bg-card)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      marginBottom: '8px',
                      maxHeight: '200px',
                      overflowY: 'auto'
                    }}
                  >
                    <option value="">Выберите пользователя...</option>
                    {usersList.map(user => (
                      <option key={user.telegram_id} value={user.telegram_id}>
                        {user.display_name} (@{user.username || 'нет'}) - {user.telegram_id}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => loadUserHistory(selectedUserForHistory)}
                    disabled={!selectedUserForHistory || loadingUserHistory}
                    style={{
                      width: '100%',
                      padding: '12px 20px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: (selectedUserForHistory && !loadingUserHistory) ? 'var(--matte-red)' : 'var(--text-secondary)',
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      cursor: (selectedUserForHistory && !loadingUserHistory) ? 'pointer' : 'not-allowed',
                      opacity: (selectedUserForHistory && !loadingUserHistory) ? 1 : 0.7,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {loadingUserHistory ? '⏳ Загрузка...' : '📋 Загрузить историю'}
                  </button>
                </div>
              </div>

              
              {loadingUserHistory && (
                <div style={{ 
                  padding: '16px', 
                  backgroundColor: 'var(--bg-card)', 
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  marginTop: '16px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⏳</div>
                  <p style={{ color: 'var(--text-primary)' }}>Загрузка истории пользователя...</p>
                </div>
              )}
              
              {!loadingUserHistory && userHistory && userHistory.user && (
                <div style={{ 
                  padding: '16px', 
                  backgroundColor: 'var(--bg-card)', 
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  marginTop: '16px'
                }}>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>
                    👤 {userHistory.user.full_name || userHistory.user.username || `ID: ${userHistory.user.telegram_id}`}
                  </h4>
                  
                  <div style={{ display: 'grid', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Комиссия:</span>
                      <span style={{ fontWeight: 'bold' }}>{userHistory.user.commission || 1000} ₽</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Заказов:</span>
                      <span style={{ fontWeight: 'bold' }}>{userHistory.user.total_orders || 0}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Покупок юаней:</span>
                      <span style={{ fontWeight: 'bold' }}>{userHistory.user.total_yuan_purchases || 0}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Общая экономия:</span>
                      <span style={{ fontWeight: 'bold', color: 'var(--success-color)' }}>
                        {formatCurrency((userHistory.user.total_savings_orders || 0) + (userHistory.user.total_savings_yuan || 0))}
                      </span>
                    </div>
                  </div>

                  {/* Последние заказы */}
                  {userHistory.orders && userHistory.orders.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <h5 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>📦 Последние заказы:</h5>
                      <div style={{ display: 'grid', gap: '8px' }}>
                        {userHistory.orders.slice(0, 5).map((order: any, index: number) => (
                          <div 
                            key={index} 
                            onClick={() => openOrderDetails(order)}
                            style={{ 
                              display: 'flex', 
                              justifyContent: 'space-between',
                              padding: '12px',
                              backgroundColor: 'var(--bg-secondary)',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              border: '2px solid var(--matte-red)',
                              boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)',
                              transform: 'scale(1.02)'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--primary-color)';
                              e.currentTarget.style.color = 'white';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                              e.currentTarget.style.color = 'var(--text-primary)';
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = 'none';
                            }}
                          >
                            <span>#{order.order_id} - {order.status}</span>
                            <span style={{ fontWeight: 'bold' }}>{formatCurrency(order.estimated_savings)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Последние покупки юаней */}
                  {userHistory.yuanPurchases && userHistory.yuanPurchases.length > 0 && (
                    <div>
                      <h5 style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>💰 Последние покупки юаней:</h5>
                      <div style={{ display: 'grid', gap: '8px' }}>
                        {userHistory.yuanPurchases.slice(0, 5).map((purchase: any, index: number) => (
                          <div key={index} style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            padding: '8px',
                            backgroundColor: 'var(--bg-secondary)',
                            borderRadius: '6px'
                          }}>
                            <span>#{purchase.id} - {purchase.status}</span>
                            <span style={{ fontWeight: 'bold' }}>{formatCurrency(purchase.amount_rub)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {!loadingUserHistory && userHistory && !userHistory.user && (
                <div style={{ 
                  padding: '16px', 
                  backgroundColor: 'var(--bg-card)', 
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  marginTop: '16px',
                  textAlign: 'center'
                }}>
                  <p style={{ color: 'var(--text-secondary)' }}>Данные пользователя не найдены</p>
                </div>
              )}
            </div>
          </Section>
        )}

        {/* Калькулятор прибыли */}
        {activeTab === 'profit-calculator' && (
          <Section id="profit-calculator-section" $isDark={isDarkTheme}>
            <SectionTitle>💰 Калькулятор прибыли</SectionTitle>
            
            <p style={{ 
              color: 'var(--text-secondary)', 
              marginBottom: '24px',
              fontSize: '0.9rem'
            }}>
              Точный расчет вашей прибыли по каждому заказу с учетом всех расходов
            </p>

            {/* Выбор заказа */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ 
                color: 'var(--text-primary)', 
                fontSize: '1.1rem',
                marginBottom: '12px',
                fontWeight: '600'
              }}>
                1️⃣ Выберите заказ для расчета ({profitOrders.length} заказов)
              </h3>
              
              <div style={{
                maxHeight: '400px',
                overflowY: 'auto',
                overflowX: 'hidden',
                paddingRight: '8px',
                marginBottom: '16px',
                border: '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '12px',
                background: 'var(--bg-secondary)'
              }}>
                {profitOrders.length > 0 ? (
                  profitOrders.map((order: any) => (
                  <MobileCard 
                    key={order.order_id} 
                    $isDark={isDarkTheme}
                    onClick={() => selectOrderForProfit(order)}
                    style={{
                      border: selectedOrderForProfit?.order_id === order.order_id 
                        ? '2px solid var(--matte-red)' 
                        : '1px solid var(--border-color)',
                      cursor: 'pointer',
                      marginBottom: '12px'
                    }}
                  >
                    <MobileCardHeader $isDark={isDarkTheme}>
                      <MobileCardTitle $isDark={isDarkTheme}>
                        Заказ #{order.order_id}
                      </MobileCardTitle>
                      <StatusBadge 
                        $status={order.status}
                        $isDark={isDarkTheme}
                        style={{
                          background: order.status === 'completed' ? '#27ae60' : '#3498db'
                        }}
                      >
                        {order.status === 'paid' ? '💳 Оплачено' : '✅ Завершено'}
                      </StatusBadge>
                    </MobileCardHeader>
                    
                    <MobileCardContent>
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Клиент:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme}>
                          {order.full_name || 'Не указано'}
                        </MobileCardValue>
                      </MobileCardRow>
                      
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Username:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme}>
                          @{order.username || 'нет'}
                        </MobileCardValue>
                      </MobileCardRow>
                      
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Телефон:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme}>
                          {order.phone_number || 'Не указан'}
                        </MobileCardValue>
                      </MobileCardRow>
                      
                      <MobileCardRow $isDark={isDarkTheme}>
                        <MobileCardLabel $isDark={isDarkTheme}>Комиссия:</MobileCardLabel>
                        <MobileCardValue $isDark={isDarkTheme} style={{ color: 'var(--matte-red)', fontWeight: 'bold' }}>
                          {order.commission || 1000} ₽
                        </MobileCardValue>
                      </MobileCardRow>
                      
                      {order.existing_profit && (
                        <MobileCardRow $isDark={isDarkTheme}>
                          <MobileCardLabel $isDark={isDarkTheme}>Прибыль:</MobileCardLabel>
                          <MobileCardValue $isDark={isDarkTheme} style={{ color: '#27ae60', fontWeight: 'bold' }}>
                            ✅ {order.existing_profit.toFixed(2)} ₽
                          </MobileCardValue>
                        </MobileCardRow>
                      )}
                    </MobileCardContent>
                  </MobileCard>
                  ))
                ) : (
                  <EmptyState>Нет заказов со статусом "Оплачено" или "Завершено"</EmptyState>
                )}
              </div>
            </div>

            {selectedOrderForProfit && (
              <div id="profit-calculator-inputs">
                {/* Сколько заплатил покупатель */}
                <div style={{ 
                  marginBottom: '20px',
                  padding: '18px',
                  background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.08), rgba(39, 174, 96, 0.03))',
                  borderRadius: '16px',
                  border: '2px solid rgba(46, 204, 113, 0.25)'
                }}>
                  <h3 style={{ 
                    color: '#27ae60', 
                    fontSize: '1rem',
                    marginBottom: '16px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    letterSpacing: '0.3px'
                  }}>
                    💵 ОТ ПОКУПАТЕЛЯ
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ 
                          display: 'block', 
                          marginBottom: '8px',
                          color: 'var(--text-primary)',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          opacity: 0.8,
                          whiteSpace: 'nowrap'
                        }}>
                          Комиссия (₽)
                        </label>
                        <input
                          type="number"
                          step="100"
                          value={customerCommission}
                          onChange={(e) => setCustomerCommission(e.target.value)}
                          placeholder="1000"
                          style={{
                            width: '100%',
                            height: '48px',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            border: '1.5px solid rgba(var(--border-color-rgb, 200, 200, 200), 0.3)',
                            background: 'var(--bg-card)',
                            color: 'var(--text-primary)',
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            transition: 'all 0.2s ease',
                            boxSizing: 'border-box',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.target.style.border = '1.5px solid #27ae60'}
                          onBlur={(e) => e.target.style.border = '1.5px solid rgba(200, 200, 200, 0.3)'}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ 
                          display: 'block', 
                          marginBottom: '8px',
                          color: 'var(--text-primary)',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          opacity: 0.8,
                          whiteSpace: 'nowrap'
                        }}>
                          Стоимость товара (¥)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={customerProductCostCny}
                          onChange={(e) => setCustomerProductCostCny(e.target.value)}
                          placeholder="1000"
                          style={{
                            width: '100%',
                            height: '48px',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            border: '1.5px solid rgba(var(--border-color-rgb, 200, 200, 200), 0.3)',
                            background: 'var(--bg-card)',
                            color: 'var(--text-primary)',
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            transition: 'all 0.2s ease',
                            boxSizing: 'border-box',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.target.style.border = '1.5px solid #27ae60'}
                          onBlur={(e) => e.target.style.border = '1.5px solid rgba(200, 200, 200, 0.3)'}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ 
                          display: 'block', 
                          marginBottom: '8px',
                          color: 'var(--text-primary)',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          opacity: 0.8,
                          whiteSpace: 'nowrap'
                        }}>
                          Курс для покупателя (₽)
                        </label>
                        <input
                          type="number"
                          step="0.0001"
                          value={customerRate}
                          onChange={(e) => setCustomerRate(e.target.value)}
                          placeholder="12.7"
                          style={{
                            width: '100%',
                            height: '48px',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            border: '1.5px solid rgba(var(--border-color-rgb, 200, 200, 200), 0.3)',
                            background: 'var(--bg-card)',
                            color: 'var(--text-primary)',
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            transition: 'all 0.2s ease',
                            boxSizing: 'border-box',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.target.style.border = '1.5px solid #27ae60'}
                          onBlur={(e) => e.target.style.border = '1.5px solid rgba(200, 200, 200, 0.3)'}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ 
                          display: 'block', 
                          marginBottom: '8px',
                          color: 'var(--text-primary)',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          opacity: 0.8,
                          whiteSpace: 'nowrap'
                        }}>
                          Доставка (₽)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={customerDelivery}
                          onChange={(e) => setCustomerDelivery(e.target.value)}
                          placeholder="1600"
                          style={{
                            width: '100%',
                            height: '48px',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            border: '1.5px solid rgba(var(--border-color-rgb, 200, 200, 200), 0.3)',
                            background: 'var(--bg-card)',
                            color: 'var(--text-primary)',
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            transition: 'all 0.2s ease',
                            boxSizing: 'border-box',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.target.style.border = '1.5px solid #27ae60'}
                          onBlur={(e) => e.target.style.border = '1.5px solid rgba(200, 200, 200, 0.3)'}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Сколько потратил я */}
                <div style={{ 
                  marginBottom: '24px',
                  padding: '18px',
                  background: 'linear-gradient(135deg, rgba(231, 76, 60, 0.08), rgba(192, 57, 43, 0.03))',
                  borderRadius: '16px',
                  border: '2px solid rgba(231, 76, 60, 0.25)'
                }}>
                  <h3 style={{ 
                    color: '#c0392b', 
                    fontSize: '1rem',
                    marginBottom: '16px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    letterSpacing: '0.3px'
                  }}>
                    💸 МОИ РАСХОДЫ
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ 
                          display: 'block', 
                          marginBottom: '8px',
                          color: 'var(--text-primary)',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          opacity: 0.8,
                          whiteSpace: 'nowrap'
                        }}>
                          Стоимость товара (¥)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={myProductCostCny}
                          onChange={(e) => setMyProductCostCny(e.target.value)}
                          placeholder="900"
                          style={{
                            width: '100%',
                            height: '48px',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            border: '1.5px solid rgba(var(--border-color-rgb, 200, 200, 200), 0.3)',
                            background: 'var(--bg-card)',
                            color: 'var(--text-primary)',
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            transition: 'all 0.2s ease',
                            boxSizing: 'border-box',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.target.style.border = '1.5px solid #c0392b'}
                          onBlur={(e) => e.target.style.border = '1.5px solid rgba(200, 200, 200, 0.3)'}
                        />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ 
                          display: 'block', 
                          marginBottom: '8px',
                          color: 'var(--text-primary)',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          opacity: 0.8,
                          whiteSpace: 'nowrap'
                        }}>
                          Мой курс (₽)
                        </label>
                        <input
                          type="number"
                          step="0.0001"
                          value={myRate}
                          onChange={(e) => setMyRate(e.target.value)}
                          placeholder="12.5"
                          style={{
                            width: '100%',
                            height: '48px',
                            padding: '12px 14px',
                            borderRadius: '10px',
                            border: '1.5px solid rgba(var(--border-color-rgb, 200, 200, 200), 0.3)',
                            background: 'var(--bg-card)',
                            color: 'var(--text-primary)',
                            fontSize: '0.95rem',
                            fontWeight: '500',
                            transition: 'all 0.2s ease',
                            boxSizing: 'border-box',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.target.style.border = '1.5px solid #c0392b'}
                          onBlur={(e) => e.target.style.border = '1.5px solid rgba(200, 200, 200, 0.3)'}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '8px',
                        color: 'var(--text-primary)',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        opacity: 0.8,
                        whiteSpace: 'nowrap'
                      }}>
                        Доставка (₽)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={myDelivery}
                        onChange={(e) => setMyDelivery(e.target.value)}
                        placeholder="1250"
                        style={{
                          width: '100%',
                          height: '48px',
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: '1.5px solid rgba(var(--border-color-rgb, 200, 200, 200), 0.3)',
                          background: 'var(--bg-card)',
                          color: 'var(--text-primary)',
                          fontSize: '0.95rem',
                          fontWeight: '500',
                          transition: 'all 0.2s ease',
                          boxSizing: 'border-box',
                          outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.border = '1.5px solid #c0392b'}
                        onBlur={(e) => e.target.style.border = '1.5px solid rgba(200, 200, 200, 0.3)'}
                      />
                    </div>
                  </div>
                </div>

                {/* Кнопка расчета */}
                <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                  <button
                    onClick={calculateProfit}
                    style={{
                      padding: '14px 32px',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'linear-gradient(135deg, var(--matte-red), var(--terracotta))',
                      color: 'white',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(162, 59, 59, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e: any) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(162, 59, 59, 0.4)';
                    }}
                    onMouseLeave={(e: any) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(162, 59, 59, 0.3)';
                    }}
                  >
                    🧮 Рассчитать мою прибыль
                  </button>
                </div>

                {/* Результаты расчета */}
                {calculatedProfit !== null && (
                  <div style={{ 
                    padding: '20px',
                    background: 'var(--bg-card)',
                    borderRadius: '12px',
                    border: '2px solid var(--border-color)',
                    marginBottom: '24px'
                  }}>
                    <h3 style={{ 
                      color: 'var(--text-primary)', 
                      fontSize: '1.2rem',
                      marginBottom: '16px',
                      fontWeight: '700',
                      textAlign: 'center'
                    }}>
                      📊 Результаты расчета
                    </h3>

                    <div style={{ 
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      marginBottom: '20px'
                    }}>
                      <div style={{ 
                        padding: '16px',
                        background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.15), rgba(39, 174, 96, 0.08))',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{ fontSize: '0.9rem', color: '#27ae60', fontWeight: '600' }}>
                          💵 От покупателя
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#27ae60', whiteSpace: 'nowrap' }}>
                          {customerTotal.toFixed(2)} ₽
                        </div>
                      </div>

                      <div style={{ 
                        padding: '16px',
                        background: 'linear-gradient(135deg, rgba(231, 76, 60, 0.15), rgba(192, 57, 43, 0.08))',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <div style={{ fontSize: '0.9rem', color: '#c0392b', fontWeight: '600' }}>
                          💸 Мои расходы
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#c0392b', whiteSpace: 'nowrap' }}>
                          {myTotal.toFixed(2)} ₽
                        </div>
                      </div>

                      <div style={{ 
                        padding: '20px',
                        background: calculatedProfit >= 0 
                          ? 'linear-gradient(135deg, rgba(52, 152, 219, 0.2), rgba(41, 128, 185, 0.1))'
                          : 'linear-gradient(135deg, rgba(231, 76, 60, 0.2), rgba(192, 57, 43, 0.1))',
                        borderRadius: '12px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: `3px solid ${calculatedProfit >= 0 ? '#3498db' : '#e74c3c'}`
                      }}>
                        <div style={{ 
                          fontSize: '1.1rem', 
                          color: calculatedProfit >= 0 ? '#2980b9' : '#c0392b', 
                          fontWeight: '700' 
                        }}>
                          {calculatedProfit >= 0 ? '✅ Моя прибыль' : '❌ Убыток'}
                        </div>
                        <div style={{ 
                          fontSize: '1.8rem', 
                          fontWeight: '700', 
                          color: calculatedProfit >= 0 ? '#2980b9' : '#c0392b',
                          whiteSpace: 'nowrap'
                        }}>
                          {calculatedProfit >= 0 ? '+' : ''}{calculatedProfit.toFixed(2)} ₽
                        </div>
                      </div>
                    </div>

                    {/* Кнопки действий */}
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '1fr 1fr', 
                      gap: '12px',
                      marginTop: '20px'
                    }}>
                      <button
                        onClick={saveProfitCalculation}
                        style={{
                          padding: '14px 24px',
                          borderRadius: '10px',
                          border: 'none',
                          background: 'linear-gradient(135deg, #27ae60, #229954)',
                          color: 'white',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e: any) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 6px 16px rgba(39, 174, 96, 0.4)';
                        }}
                        onMouseLeave={(e: any) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(39, 174, 96, 0.3)';
                        }}
                      >
                        ✅ Добавить в БД
                      </button>

                      <button
                        onClick={resetProfitCalculator}
                        style={{
                          padding: '14px 24px',
                          borderRadius: '10px',
                          border: '1px solid var(--border-color)',
                          background: 'var(--bg-secondary)',
                          color: 'var(--text-primary)',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e: any) => {
                          e.currentTarget.style.background = 'var(--bg-hover)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e: any) => {
                          e.currentTarget.style.background = 'var(--bg-secondary)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        ❌ Не добавлять
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Section>
        )}

      </Content>

      {/* Модальное окно с деталями заказа */}
      {showOrderModal && selectedOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px',
          backdropFilter: 'blur(5px)',
          overflowY: 'auto'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-card)',
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '90vw',
            maxHeight: '90vh',
            width: '100%',
            overflowY: 'auto',
            border: '1px solid var(--border-color)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            marginTop: '5vh',
            marginBottom: '5vh'
          }}>
            {/* Заголовок модального окна */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              borderBottom: '1px solid var(--border-color)',
              paddingBottom: '16px'
            }}>
              <h3 style={{
                color: 'var(--text-primary)',
                margin: 0,
                fontSize: '1.3rem',
                fontWeight: 'bold'
              }}>
                📦 Заказ #{selectedOrder.order_id}
              </h3>
              <button
                onClick={closeOrderModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  padding: '4px',
                  borderRadius: '4px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                ✕
              </button>
            </div>

            {/* Индикатор загрузки */}
            {loadingOrderDetails && (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⏳</div>
                <p style={{ color: 'var(--text-secondary)' }}>Загрузка деталей заказа...</p>
              </div>
            )}

            {/* Детали заказа */}
            {!loadingOrderDetails && (
              <div style={{ display: 'grid', gap: '16px' }}>
                {/* Статус заказа */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '8px'
                }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Статус:</span>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    backgroundColor: selectedOrder.status === 'completed' ? 'var(--success-color)' : 
                                   selectedOrder.status === 'pending' ? 'var(--warning-color)' : 'var(--error-color)',
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: 'bold'
                  }}>
                    {selectedOrder.status === 'completed' ? '✅ Завершен' :
                     selectedOrder.status === 'pending' ? '⏳ Ожидает' : '❌ Отменен'}
                  </span>
                </div>

                {/* Экономия */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '8px'
                }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Экономия:</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--success-color)', fontSize: '1.1rem' }}>
                    {formatCurrency(selectedOrder.estimated_savings)}
                  </span>
                </div>

                {/* Дата создания */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '8px'
                }}>
                  <span style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Дата создания:</span>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {new Date(selectedOrder.created_at).toLocaleString('ru-RU')}
                  </span>
                </div>

                {/* Информация о клиенте */}
                {orderDetails && (
                  <div style={{
                    padding: '12px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '8px'
                  }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '1rem' }}>👤 Информация о клиенте:</h4>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Имя:</span>
                        <span style={{ fontWeight: 'bold' }}>{orderDetails.order.full_name || 'Не указано'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Username:</span>
                        <span style={{ fontWeight: 'bold' }}>@{orderDetails.order.username || 'не указан'}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Telegram ID:</span>
                        <span style={{ fontWeight: 'bold' }}>{orderDetails.order.telegram_id}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Контактная информация */}
                <div style={{
                  padding: '12px',
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '8px'
                }}>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '1rem' }}>📞 Контактная информация:</h4>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {selectedOrder.phone_number && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Телефон:</span>
                        <span style={{ fontWeight: 'bold' }}>{selectedOrder.phone_number}</span>
                      </div>
                    )}
                    {orderDetails?.order.pickup_point && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Пункт выдачи:</span>
                        <span style={{ fontWeight: 'bold', textAlign: 'right', maxWidth: '200px' }}>
                          {orderDetails.order.pickup_point}
                        </span>
                      </div>
                    )}
                    {orderDetails?.order.pickup_point_address && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Адрес:</span>
                        <span style={{ fontWeight: 'bold', textAlign: 'right', maxWidth: '200px' }}>
                          {orderDetails.order.pickup_point_address}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Комментарии */}
                {orderDetails?.order.comments && (
                  <div style={{
                    padding: '12px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '8px'
                  }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '1rem' }}>💬 Комментарии:</h4>
                    <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                      {orderDetails.order.comments}
                    </p>
                  </div>
                )}

                {/* Товары в заказе */}
                {orderDetails?.items && orderDetails.items.length > 0 && (
                  <div style={{
                    padding: '12px',
                    backgroundColor: 'var(--bg-secondary)',
                    borderRadius: '8px'
                  }}>
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '12px', fontSize: '1rem' }}>📦 Товары в заказе:</h4>
                    <div style={{ display: 'grid', gap: '8px' }}>
                      {orderDetails.items.map((item: any, index: number) => (
                        <div key={index} style={{
                          padding: '8px',
                          backgroundColor: 'var(--bg-card)',
                          borderRadius: '6px',
                          border: '1px solid var(--border-color)'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontWeight: 'bold' }}>Товар #{index + 1}</span>
                            <span style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>
                              {formatCurrency(item.estimated_savings)}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                            <a 
                              href={item.product_link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ color: 'var(--primary-color)', textDecoration: 'none' }}
                            >
                              🔗 Ссылка на товар
                            </a>
                          </div>
                          {item.product_size && (
                            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                              📏 Размер: {item.product_size}
                            </div>
                          )}
                          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                            📦 Количество: {item.quantity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Кнопка закрытия */}
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <button
                onClick={closeOrderModal}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-color)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

        {/* Раздел доставки */}
        {activeTab === 'delivery' && (
          <Section id="delivery-section" $isDark={isDarkTheme}>
            <SectionTitle>🚚 Управление доставкой</SectionTitle>
            
            <p style={{ 
              color: 'var(--text-secondary)', 
              marginBottom: '16px',
              fontSize: '0.9rem'
            }}>
              Отслеживание и обновление статусов доставки всех заказов
            </p>

            {/* Фильтры в одной строке */}
            <div style={{ 
              display: 'flex',
              gap: '12px', 
              marginBottom: '16px',
              width: '100%',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: '1 1 auto', minWidth: '200px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '4px',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  fontWeight: '500'
                }}>
                  🔍 Фильтр по статусу:
                </label>
                <select
                  value={deliveryStatusFilter}
                onChange={(e) => setDeliveryStatusFilter(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              >
                <option value="all">📦 Все заказы</option>
                <option value="Создан">📝 Создан</option>
                <option value="Доставка внутри Китая">🚚 Доставка внутри Китая</option>
                <option value="На складе в Китае">📦 На складе в Китае</option>
                <option value="Отправлен на таможню">🏛️ Отправлен на таможню</option>
                <option value="Доставка в РФ">🇷🇺 Доставка в РФ</option>
                <option value="Доставлен">✅ Доставлен</option>
                </select>
              </div>
            </div>

            {loadingDelivery ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⏳</div>
                <p>Загрузка заказов...</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                {filteredDeliveryOrders.length === 0 ? (
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '40px',
                    color: 'var(--text-secondary)'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '16px' }}>📦</div>
                    <p>{deliveryOrders.length === 0 ? 'Нет заказов для доставки' : 'Нет заказов с выбранным статусом'}</p>
                  </div>
                ) : (
                  <>
                    {/* Мобильные карточки */}
                    <div style={{ display: 'grid', gap: '16px' }}>
                      {filteredDeliveryOrders.map((order: any) => (
                        <div
                          key={order.order_id}
                          style={{
                            padding: '16px',
                            backgroundColor: 'var(--bg-card)',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                            maxWidth: '100%',
                            boxSizing: 'border-box'
                          }}
                        >
                          {/* Заголовок карточки */}
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '12px',
                            paddingBottom: '12px',
                            borderBottom: '1px solid var(--border-color)',
                            gap: '8px'
                          }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ 
                                fontSize: '1.1rem', 
                                fontWeight: 'bold', 
                                color: 'var(--text-primary)',
                                wordBreak: 'break-word'
                              }}>
                                Заказ #{order.order_id}
                              </div>
                              <div style={{ 
                                fontSize: '0.85rem', 
                                color: 'var(--text-secondary)',
                                fontFamily: 'JetBrains Mono, monospace',
                                wordBreak: 'break-all'
                              }}>
                                {order.internal_tracking_number || 'Нет трек-номера'}
                              </div>
                            </div>
                            <div style={{ 
                              padding: '6px 8px',
                              borderRadius: '8px',
                              background: getStatusColor(order.delivery_status),
                              color: 'white',
                              fontSize: '0.75rem',
                              fontWeight: 'bold',
                              textAlign: 'center',
                              whiteSpace: 'nowrap',
                              flexShrink: 0
                            }}>
                              {getStatusEmoji(order.delivery_status)} {order.delivery_status || 'Создан'}
                            </div>
                          </div>

                          {/* Информация о клиенте */}
                          <div style={{ marginBottom: '12px', display: 'grid', gap: '6px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', flexShrink: 0 }}>👤 Клиент:</span>
                              <span style={{ 
                                fontWeight: '500', 
                                fontSize: '0.85rem', 
                                textAlign: 'right',
                                wordBreak: 'break-word',
                                flex: 1,
                                marginLeft: '8px'
                              }}>
                                {order.full_name || 'Не указано'}
                              </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', flexShrink: 0 }}>📱 Телефон:</span>
                              <span style={{ 
                                fontWeight: '500', 
                                fontSize: '0.85rem',
                                textAlign: 'right',
                                wordBreak: 'break-all',
                                flex: 1,
                                marginLeft: '8px'
                              }}>
                                {order.phone_number || 'Не указан'}
                              </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', flexShrink: 0 }}>📍 ПВЗ:</span>
                              <span style={{ 
                                fontWeight: '500', 
                                fontSize: '0.85rem',
                                textAlign: 'right',
                                wordBreak: 'break-word',
                                flex: 1,
                                marginLeft: '8px'
                              }}>
                                {order.pickup_point || 'Не указан'}
                              </span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', flexShrink: 0 }}>📅 Создан:</span>
                              <span style={{ 
                                fontWeight: '500', 
                                fontSize: '0.85rem',
                                textAlign: 'right',
                                flex: 1,
                                marginLeft: '8px'
                              }}>
                                {new Date(order.created_at).toLocaleDateString('ru-RU')}
                              </span>
                            </div>
                            {order.last_updated && (
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', flexShrink: 0 }}>⏰ Обновлен:</span>
                                <span style={{ 
                                  fontWeight: '500', 
                                  fontSize: '0.85rem',
                                  textAlign: 'right',
                                  flex: 1,
                                  marginLeft: '8px'
                                }}>
                                  {new Date(order.last_updated).toLocaleString('ru-RU')}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Управление статусом */}
                          <div style={{ marginTop: '12px' }}>
                            <label style={{ 
                              display: 'block', 
                              marginBottom: '8px',
                              color: 'var(--text-secondary)',
                              fontSize: '0.85rem',
                              fontWeight: '500'
                            }}>
                              📦 Изменить статус доставки:
                            </label>
                            
                            {pendingStatusUpdate?.orderId === order.order_id ? (
                              /* Кнопки подтверждения */
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                  onClick={confirmStatusUpdate}
                                  style={{
                                    flex: 1,
                                    padding: '10px 12px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #27ae60, #2ecc71)',
                                    color: 'white',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                  }}
                                >
                                  ✅ Подтвердить
                                </button>
                                <button
                                  onClick={cancelStatusUpdate}
                                  style={{
                                    flex: 1,
                                    padding: '10px 12px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
                                    color: 'white',
                                    fontSize: '0.9rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                  }}
                                >
                                  ❌ Отмена
                                </button>
                              </div>
                            ) : (
                              /* Dropdown для выбора статуса */
                              <select
                                value={order.delivery_status || 'Создан'}
                                onChange={(e) => setPendingStatusUpdate({ orderId: order.order_id, status: e.target.value })}
                                style={{
                                  width: '100%',
                                  padding: '12px',
                                  borderRadius: '8px',
                                  border: '2px solid var(--border-color)',
                                  backgroundColor: 'var(--bg-secondary)',
                                  color: 'var(--text-primary)',
                                  fontSize: '0.9rem',
                                  fontWeight: '500',
                                  cursor: 'pointer',
                                  outline: 'none',
                                  transition: 'all 0.3s ease',
                                  boxSizing: 'border-box'
                                }}
                                onFocus={(e: any) => {
                                  e.currentTarget.style.borderColor = 'var(--matte-red)';
                                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(162, 59, 59, 0.1)';
                                }}
                                onBlur={(e: any) => {
                                  e.currentTarget.style.borderColor = 'var(--border-color)';
                                  e.currentTarget.style.boxShadow = 'none';
                                }}
                              >
                                <option value="Создан">📝 Создан</option>
                                <option value="Доставка внутри Китая">🚚 Доставка внутри Китая</option>
                                <option value="На складе в Китае">📦 На складе в Китае</option>
                                <option value="Отправлен на таможню">🏛️ Отправлен на таможню</option>
                                <option value="Доставка в РФ">🇷🇺 Доставка в РФ</option>
                                <option value="Доставлен">✅ Доставлен</option>
                              </select>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </Section>
        )}

        {/* Раздел отзывов */}
        {activeTab === 'reviews' && (
          <Section id="reviews-section" $isDark={isDarkTheme}>
            <SectionTitle>⭐ Модерация отзывов</SectionTitle>
            
            <p style={{ 
              color: 'var(--text-secondary)', 
              marginBottom: '16px',
              fontSize: '0.9rem'
            }}>
              Управление отзывами: одобрение новых и удаление нежелательных
            </p>

            {/* Фильтры */}
            <div style={{ 
              display: 'flex',
              gap: '12px', 
              marginBottom: '16px',
              width: '100%',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: '1 1 auto', minWidth: '200px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '4px',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  fontWeight: '500'
                }}>
                  🔍 Фильтр по статусу:
                </label>
                <select
                  value={reviewsFilter}
                  onChange={(e) => setReviewsFilter(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                >
                  <option value="pending">⏳ Ожидают модерации</option>
                  <option value="approved">✅ Одобренные</option>
                  <option value="all">📋 Все отзывы</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⏳</div>
                <p>Загрузка отзывов...</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                {(() => {
                  const filteredReviews = reviews.filter((review: any) => {
                    if (reviewsFilter === 'pending') return !review.is_approved;
                    if (reviewsFilter === 'approved') return review.is_approved;
                    return true; // all
                  });

                  return filteredReviews.length === 0 ? (
                    <div style={{ 
                      textAlign: 'center', 
                      padding: '40px',
                      color: 'var(--text-secondary)'
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⭐</div>
                      <p>{reviews.length === 0 ? 'Нет отзывов для модерации' : 'Нет отзывов с выбранным статусом'}</p>
                    </div>
                  ) : (
                    <div style={{ display: 'grid', gap: '16px' }}>
                      {filteredReviews.map((review: any) => (
                        <div
                          key={review.review_id}
                          id={`review-${review.review_id}`}
                          style={{
                            padding: '16px',
                            backgroundColor: 'var(--bg-card)',
                            borderRadius: '12px',
                            border: '1px solid var(--border-color)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                            maxWidth: '100%',
                            boxSizing: 'border-box'
                          }}
                        >
                          {/* Заголовок карточки */}
                          <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            marginBottom: '12px',
                            paddingBottom: '12px',
                            borderBottom: '1px solid var(--border-color)',
                            gap: '8px'
                          }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ 
                                fontSize: '1.1rem', 
                                fontWeight: 'bold', 
                                color: 'var(--text-primary)',
                                wordBreak: 'break-word'
                              }}>
                                Отзыв #{review.review_id}
                              </div>
                              <div style={{ 
                                fontSize: '0.85rem', 
                                color: 'var(--text-secondary)',
                                marginTop: '4px'
                              }}>
                                {formatDateTime(review.created_at)}
                              </div>
                            </div>
                            <div style={{ 
                              padding: '6px 8px',
                              borderRadius: '8px',
                              background: review.is_approved ? '#28a745' : '#ffc107',
                              color: 'white',
                              fontSize: '0.75rem',
                              fontWeight: 'bold',
                              textAlign: 'center',
                              whiteSpace: 'nowrap',
                              flexShrink: 0
                            }}>
                              {review.is_approved ? '✅ Одобрен' : '⏳ Ожидает'}
                            </div>
                          </div>

                          {/* Информация об отзыве */}
                          <div style={{ marginBottom: '12px', display: 'grid', gap: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>👤 От:</span>
                              <span style={{ 
                                fontWeight: '500', 
                                fontSize: '0.85rem'
                              }}>
                                {review.full_name || review.username || 'Аноним'}
                              </span>
                              {review.username && (
                                <span style={{ 
                                  color: 'var(--text-secondary)', 
                                  fontSize: '0.75rem'
                                }}>
                                  (@{review.username})
                                </span>
                              )}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>⭐ Оценка:</span>
                              <span style={{ 
                                fontWeight: '500', 
                                fontSize: '0.85rem'
                              }}>
                                {review.rating}/5
                              </span>
                            </div>
                          </div>

                          {/* Текст отзыва */}
                          {review.review_text && (
                            <div style={{ 
                              marginBottom: '12px',
                              padding: '12px',
                              backgroundColor: 'var(--bg-secondary)',
                              borderRadius: '8px',
                              border: '1px solid var(--border-color)'
                            }}>
                              <div style={{ 
                                fontSize: '0.85rem',
                                lineHeight: '1.4',
                                color: 'var(--text-primary)',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word'
                              }}>
                                {review.review_text}
                              </div>
                            </div>
                          )}

                          {/* Фото отзыва */}
                          {review.photo_url && (
                            <div style={{ marginBottom: '12px' }}>
                              <img
                                src={review.photo_url}
                                alt="Фото отзыва"
                                style={{
                                  width: '100%',
                                  maxWidth: '200px',
                                  borderRadius: '8px',
                                  border: '1px solid var(--border-color)'
                                }}
                              />
                            </div>
                          )}

                          {/* Кнопки действий */}
                          <div style={{ 
                            display: 'flex', 
                            gap: '8px',
                            justifyContent: 'flex-end',
                            flexWrap: 'wrap'
                          }}>
                            {!review.is_approved && (
                              <button
                                onClick={() => approveReview(review.review_id)}
                                style={{
                                  padding: '8px 16px',
                                  borderRadius: '6px',
                                  border: 'none',
                                  backgroundColor: '#28a745',
                                  color: 'white',
                                  fontSize: '0.85rem',
                                  fontWeight: '500',
                                  cursor: 'pointer',
                                  transition: 'background-color 0.2s'
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#218838'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
                              >
                                ✅ Одобрить
                              </button>
                            )}
                            <button
                              onClick={() => deleteReview(review.review_id)}
                              style={{
                                padding: '8px 16px',
                                borderRadius: '6px',
                                border: 'none',
                                backgroundColor: '#dc3545',
                                color: 'white',
                                fontSize: '0.85rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                              }}
                              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
                              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
                            >
                              🗑️ Удалить
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}
          </Section>
        )}

        {/* Раздел рефералов */}
        {activeTab === 'referrals' && (
          <Section id="referrals-section" $isDark={isDarkTheme}>
            <SectionTitle>🔗 Реферальная система</SectionTitle>
            
            {/* Продление скидки */}
            <div id="extension-form" style={{ 
              marginBottom: '8px',
              padding: '16px',
              background: 'var(--bg-secondary)',
              borderRadius: '12px',
              border: '1px solid var(--border-color)'
            }}>
              <h3 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '1.1rem' }}>⏰ Продление скидочной комиссии</h3>
              
              <div style={{ display: 'grid', gap: '8px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '4px', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                    Выберите пользователя:
                  </label>
                  <select
                    value={selectedUserForExtension}
                    onChange={(e) => setSelectedUserForExtension(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-card)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="">Выберите пользователя...</option>
                    {users.map((user) => (
                      <option key={user.telegram_id} value={user.telegram_id}>
                        {user.full_name || user.username || `ID: ${user.telegram_id}`}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '4px', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                    Количество дней для продления:
                  </label>
                  <input
                    type="number"
                    value={extendDays}
                    onChange={(e) => setExtendDays(e.target.value)}
                    placeholder="7"
                    min="1"
                    max="365"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-card)',
                      color: 'var(--text-primary)',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <button
                  onClick={showExtensionConfirmation}
                  disabled={!selectedUserForExtension || !extendDays}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: selectedUserForExtension && extendDays ? 'var(--matte-red)' : 'var(--text-secondary)',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: selectedUserForExtension && extendDays ? 'pointer' : 'not-allowed',
                    opacity: selectedUserForExtension && extendDays ? 1 : 0.7,
                    transition: 'all 0.3s ease'
                  }}
                >
                  ⏰ Продлить скидку
                </button>

                {/* Подтверждение продления скидки */}
                {showExtensionConfirm && (
                  <div style={{
                    marginTop: '8px',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-card)',
                    textAlign: 'center'
                  }}>
                    <h4 style={{
                      color: 'var(--text-primary)',
                      marginBottom: '8px',
                      fontSize: '1.1rem'
                    }}>
                      ⚠️ Подтверждение продления скидки
                    </h4>
                    
                    <div style={{
                      marginBottom: '8px',
                      color: 'var(--text-secondary)',
                      fontSize: '0.95rem'
                    }}>
                      <p><strong>Пользователь:</strong> {users.find(u => u.telegram_id === selectedUserForExtension)?.full_name || users.find(u => u.telegram_id === selectedUserForExtension)?.username || `ID: ${selectedUserForExtension}`}</p>
                      <p><strong>Продлить на:</strong> {extendDays} дн.</p>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                      <button
                        onClick={confirmExtendDiscount}
                        style={{
                          padding: '10px 20px',
                          borderRadius: '6px',
                          border: 'none',
                          backgroundColor: 'var(--matte-red)',
                          color: 'white',
                          fontSize: '0.95rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        ✅ Подтвердить
                      </button>
                      
                      <button
                        onClick={cancelExtension}
                        style={{
                          padding: '10px 20px',
                          borderRadius: '6px',
                          border: '1px solid var(--border-color)',
                          backgroundColor: 'var(--bg-card)',
                          color: 'var(--text-primary)',
                          fontSize: '0.95rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        ❌ Отменить
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Фильтры в одной строке */}
            <div style={{ 
              display: 'flex',
              gap: '12px', 
              marginBottom: '16px',
              width: '100%',
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <div style={{ flex: '1 1 auto', minWidth: '200px' }}>
                <select
                  value={referralsFilter}
                  onChange={(e) => setReferralsFilter(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem'
                  }}
                >
                <option value="all">Все рефералы</option>
                <option value="active">Активные скидки</option>
                <option value="expired">Истекшие скидки</option>
                <option value="new">Новые (сегодня)</option>
                </select>
              </div>
            </div>

            {loadingReferrals ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⏳</div>
                <p style={{ color: 'var(--text-secondary)' }}>Загрузка данных рефералов...</p>
              </div>
            ) : (
              <div>
                {(() => {
                  // Фильтрация данных рефералов
                  let filteredReferrals = referralsData;
                  
                  if (referralsFilter === 'active') {
                    filteredReferrals = referralsData.filter(r => r.is_expired === 0);
                  } else if (referralsFilter === 'expired') {
                    filteredReferrals = referralsData.filter(r => r.is_expired === 1);
                  } else if (referralsFilter === 'new') {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    filteredReferrals = referralsData.filter(r => {
                      const activatedDate = new Date(r.activated_at);
                      activatedDate.setHours(0, 0, 0, 0);
                      return activatedDate.getTime() === today.getTime();
                    });
                  }
                  
                  return filteredReferrals.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🔗</div>
                      <p style={{ color: 'var(--text-secondary)' }}>Нет данных о рефералах</p>
                    </div>
                  ) : (
                    <div style={{ 
                      maxHeight: '400px',
                      overflowY: 'auto',
                      paddingRight: '8px'
                    }}>
                      <div style={{ display: 'grid', gap: '12px' }}>
                        {filteredReferrals.map((referral, index) => (
                      <div
                        key={index}
                        style={{
                          background: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '12px',
                          padding: '16px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                          <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Реферер</div>
                            <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
                              {referral.referrer_name || referral.referrer_username || `ID: ${referral.referrer_id}`}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                              ID: {referral.referrer_id}
                            </div>
                          </div>
                          <div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Реферал</div>
                            <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>
                              {referral.referral_name || referral.referral_username || `ID: ${referral.referral_id}`}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                              ID: {referral.referral_id}
                            </div>
                          </div>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', fontSize: '0.9rem', marginBottom: '12px' }}>
                          <div>
                            <div style={{ color: 'var(--text-secondary)', marginBottom: '2px' }}>Дата активации</div>
                            <div style={{ color: 'var(--text-primary)' }}>
                              {new Date(referral.activated_at).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                          <div>
                            <div style={{ color: 'var(--text-secondary)', marginBottom: '2px' }}>Комиссия реферала</div>
                            <div style={{ color: 'var(--matte-red)', fontWeight: 'bold' }}>
                              {referral.referral_commission} ₽
                            </div>
                          </div>
                          <div>
                            <div style={{ color: 'var(--text-secondary)', marginBottom: '2px' }}>Истекает</div>
                            <div style={{ 
                              color: referral.is_expired ? 'var(--matte-red)' : 'var(--text-primary)',
                              fontWeight: referral.is_expired ? 'bold' : 'normal'
                            }}>
                              {referral.is_expired ? 'Истекла' : new Date(referral.expires_at).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                        </div>
                        
                        {/* Кнопка продления скидки */}
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            onClick={() => quickExtendDiscount(referral.referral_id, 7)}
                            style={{
                              flex: 1,
                              padding: '8px 12px',
                              borderRadius: '6px',
                              border: '1px solid var(--matte-red)',
                              background: 'transparent',
                              color: 'var(--matte-red)',
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            ⏰ Продлить на 7 дн.
                          </button>
                          <button
                            onClick={() => quickExtendDiscount(referral.referral_id, 30)}
                            style={{
                              flex: 1,
                              padding: '8px 12px',
                              borderRadius: '6px',
                              border: '1px solid var(--matte-red)',
                              background: 'transparent',
                              color: 'var(--matte-red)',
                              fontSize: '0.8rem',
                              fontWeight: 'bold',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            ⏰ Продлить на 30 дн.
                          </button>
                        </div>
                      </div>
                      ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </Section>
        )}

        {activeTab === 'purchases' && (
          <Section id="purchases-section" $isDark={isDarkTheme}>
            <SectionTitle>🖼️ Управление изображениями выкупов</SectionTitle>
            
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                fontSize: '1.1rem', 
                fontWeight: '600', 
                color: 'var(--text-primary)',
                marginBottom: '16px'
              }}>
                Загрузить новые изображения
              </h3>
              
              <input
                type="file"
                id="purchases-upload"
                multiple
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const files = e.target.files;
                  if (!files || files.length === 0) return;

                  // Добавляем файлы в список выбранных
                  const newFiles = Array.from(files);
                  setSelectedFiles(prev => [...prev, ...newFiles]);
                  
                  // Очищаем input для возможности повторного выбора
                  e.target.value = '';
                }}
              />

              <label
                htmlFor="purchases-upload"
                style={{
                  display: 'block',
                  padding: '16px 24px',
                  border: '2px dashed var(--border-color)',
                  borderRadius: '12px',
                  background: 'var(--bg-secondary)',
                  cursor: uploadingPurchases ? 'not-allowed' : 'pointer',
                  textAlign: 'center',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  opacity: uploadingPurchases ? 0.6 : 1,
                  pointerEvents: uploadingPurchases ? 'none' : 'auto'
                }}
                onMouseEnter={(e) => {
                  if (!uploadingPurchases) {
                    e.currentTarget.style.borderColor = 'var(--matte-red)';
                    e.currentTarget.style.background = 'var(--bg-card)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!uploadingPurchases) {
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                    e.currentTarget.style.background = 'var(--bg-secondary)';
                  }
                }}
              >
                {uploadingPurchases ? (
                  <div>
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>⏳</div>
                    <div>Загрузка изображений...</div>
                    {uploadProgress > 0 && (
                      <div style={{ marginTop: '8px', fontSize: '0.9rem', opacity: 0.7 }}>
                        {uploadProgress}%
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>📁</div>
                    <div>Нажмите для выбора изображений</div>
                    <div style={{ fontSize: '0.85rem', marginTop: '8px', opacity: 0.7 }}>
                      Можно загрузить до 20 изображений одновременно
                    </div>
                  </div>
                )}
              </label>

              {selectedFiles.length > 0 && (
                <div style={{ 
                  marginTop: '16px', 
                  padding: '12px', 
                  background: 'rgba(162, 59, 59, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(162, 59, 59, 0.3)'
                }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    📋 Выбрано {selectedFiles.length} изображений:
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxHeight: '150px', overflowY: 'auto', marginBottom: '12px' }}>
                    {selectedFiles.map((file, idx) => (
                      <div key={idx} style={{ marginBottom: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>• {file.name}</span>
                        <button
                          onClick={() => {
                            setSelectedFiles(prev => prev.filter((_, i) => i !== idx));
                          }}
                          style={{
                            padding: '2px 8px',
                            background: 'transparent',
                            border: '1px solid var(--matte-red)',
                            borderRadius: '4px',
                            color: 'var(--matte-red)',
                            cursor: 'pointer',
                            fontSize: '0.75rem'
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={async () => {
                      if (selectedFiles.length === 0) return;

                      setUploadingPurchases(true);
                      setUploadProgress(0);

                      try {
                        const formData = new FormData();
                        for (let i = 0; i < selectedFiles.length; i++) {
                          formData.append('images', selectedFiles[i]);
                        }

                        const initData = window.Telegram?.WebApp?.initData || '';
                        const response = await fetch('/api/admin/purchases/upload', {
                          method: 'POST',
                          headers: {
                            'x-telegram-init-data': initData
                          },
                          body: formData
                        });

                        const result = await response.json();

                        if (response.ok) {
                          HapticFeedback.success();
                          setUploadedFiles(result.files?.map((f: any) => f.path) || []);
                          setSelectedFiles([]); // Очищаем список выбранных файлов
                          alert(`✅ Успешно загружено ${result.files?.length || 0} изображений!`);
                        } else {
                          HapticFeedback.error();
                          const errorMsg = result.details ? `${result.error}: ${result.details}` : result.error;
                          console.error('Ошибка загрузки:', result);
                          alert(`❌ Ошибка: ${errorMsg || 'Неизвестная ошибка'}`);
                        }
                      } catch (error: any) {
                        console.error('Ошибка загрузки:', error);
                        HapticFeedback.error();
                        const errorMsg = error.message || 'Неизвестная ошибка';
                        alert(`❌ Ошибка при загрузке изображений: ${errorMsg}`);
                      } finally {
                        setUploadingPurchases(false);
                        setUploadProgress(0);
                      }
                    }}
                    disabled={selectedFiles.length === 0 || uploadingPurchases}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: selectedFiles.length === 0 || uploadingPurchases ? 'var(--bg-secondary)' : 'var(--matte-red)',
                      border: 'none',
                      borderRadius: '8px',
                      color: selectedFiles.length === 0 || uploadingPurchases ? 'var(--text-secondary)' : 'white',
                      cursor: selectedFiles.length === 0 || uploadingPurchases ? 'not-allowed' : 'pointer',
                      fontSize: '1rem',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      opacity: selectedFiles.length === 0 || uploadingPurchases ? 0.6 : 1
                    }}
                  >
                    {uploadingPurchases ? '⏳ Загрузка...' : `🖼️ Загрузить выкупы (${selectedFiles.length})`}
                  </button>
                  <button
                    onClick={() => setSelectedFiles([])}
                    style={{
                      marginTop: '8px',
                      width: '100%',
                      padding: '8px',
                      background: 'transparent',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    Очистить список
                  </button>
                </div>
              )}

              {uploadedFiles.length > 0 && (
                <div style={{ 
                  marginTop: '16px', 
                  padding: '12px', 
                  background: 'rgba(39, 174, 96, 0.1)',
                  borderRadius: '8px',
                  border: '1px solid rgba(39, 174, 96, 0.3)'
                }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
                    ✅ Последняя загрузка: {uploadedFiles.length} изображений
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {uploadedFiles.slice(0, 5).map((file, idx) => (
                      <div key={idx} style={{ marginBottom: '4px' }}>• {file.split('/').pop()}</div>
                    ))}
                    {uploadedFiles.length > 5 && (
                      <div style={{ marginTop: '4px', opacity: 0.7 }}>
                        ...и еще {uploadedFiles.length - 5} файлов
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setUploadedFiles([])}
                    style={{
                      marginTop: '8px',
                      padding: '6px 12px',
                      background: 'transparent',
                      border: '1px solid var(--border-color)',
                      borderRadius: '6px',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      fontSize: '0.85rem'
                    }}
                  >
                    Очистить список
                  </button>
                </div>
              )}
            </div>

            <div style={{ 
              height: '1px', 
              background: 'linear-gradient(90deg, transparent, var(--border-color), transparent)',
              margin: '24px 0'
            }} />

            <div>
              <h3 style={{ 
                fontSize: '1.1rem', 
                fontWeight: '600', 
                color: 'var(--text-primary)',
                marginBottom: '16px'
              }}>
                Информация
              </h3>
              <div style={{ 
                padding: '16px',
                background: 'var(--bg-secondary)',
                borderRadius: '12px',
                fontSize: '0.9rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6'
              }}>
                <div style={{ marginBottom: '8px' }}>
                  <strong>💡 Загруженные изображения</strong> автоматически добавляются в галерею выкупов в разделе "Отзывы".
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>📋 Формат:</strong> JPG, PNG, GIF, WebP (до 10 МБ каждый файл)
                </div>
                <div>
                  <strong>🔢 Лимит:</strong> до 20 изображений за раз
                </div>
              </div>
            </div>
          </Section>
        )}

    </AdminContainer>
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

export default AdminPanel;