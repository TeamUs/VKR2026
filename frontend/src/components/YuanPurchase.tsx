import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
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

interface ExchangeRate {
  base_rate: number;
  favorable_rate: number;
  savings_percent: number;
  last_updated: string;
}

interface Purchase {
  id: number;
  amount_rub: number;
  amount_cny: number;
  exchange_rate: number;
  favorable_rate: number;
  savings: number;
  status: string;
  created_at: string;
}

interface Tariff {
  id: string;
  name: string;
  minAmount: number;
  discount: number;
  description: string;
  color: string;
}

interface YuanPurchaseProps {
  telegramId: string;
  isDarkTheme: boolean;
  toggleTheme: () => void;
  onModalStateChange?: (isOpen: boolean) => void;
}

const ModalBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
`;

const PurchaseContainer = styled.div<{ $isDark: boolean }>`
  padding: 0px 16px 100px 16px;
  min-height: 100vh;
  background: transparent;
  color: var(--text-primary);
  position: relative;
  z-index: 1;
  transition: all 0.5s ease;
  animation: ${fadeIn} 0.8s ease-out forwards;
`;

const BackgroundHieroglyphs = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const Hieroglyph = styled.div`
  position: absolute;
  font-family: 'Noto Sans SC', serif;
  color: var(--pattern-color);
  text-shadow: 
    0 0 6px var(--glow-terracotta),
    0 0 12px var(--glow-terracotta);
  animation: ${floatChaotic} 25s ease-in-out infinite;
  opacity: 0.5;
  font-weight: 500;
  font-size: 1.4rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
  filter: none;
  
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
`;

const PurchaseTitle = styled.h1<{ $isDark: boolean }>`
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

const RateCard = styled.div<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? 'rgba(42, 42, 42, 0.95)' : 'rgba(230, 211, 179, 0.95)'};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  margin: 0 0 24px 0;
  border: 1px solid var(--border-color);
  text-align: center;
  position: relative;
  backdrop-filter: blur(10px);
`;

const RateTitle = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
`;

const RateGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
`;

const RateItem = styled.div<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? 'rgba(42, 42, 42, 0.95)' : '#FFFFFF'};
  border-radius: 12px;
  padding: 16px;
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
`;

const RateLabel = styled.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 8px;
`;

const RateValue = styled.div`
  font-family: 'JetBrains Mono', monospace;
  font-size: 20px;
  font-weight: 700;
  color: var(--matte-red);
`;

const SavingsBadge = styled.div<{ $isDark: boolean }>`
  background: ${props => props.$isDark 
    ? 'linear-gradient(135deg, rgba(162, 59, 59, 0.2), rgba(162, 59, 59, 0.1))' 
    : 'linear-gradient(135deg, rgba(162, 59, 59, 0.15), rgba(162, 59, 59, 0.08))'
  };
  color: var(--matte-red);
  padding: 12px 20px;
  border: 2px solid var(--matte-red);
  border-radius: 16px;
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 15px;
  font-weight: 700;
  display: inline-block;
  text-align: center;
  backdrop-filter: blur(10px);
  box-shadow: ${props => props.$isDark 
    ? '0 0 15px rgba(162, 59, 59, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1)' 
    : '0 0 12px rgba(162, 59, 59, 0.2), 0 4px 8px rgba(0, 0, 0, 0.05)'
  };
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.$isDark 
      ? '0 0 20px rgba(162, 59, 59, 0.4), 0 6px 16px rgba(0, 0, 0, 0.15)' 
      : '0 0 16px rgba(162, 59, 59, 0.3), 0 6px 12px rgba(0, 0, 0, 0.08)'
    };
  }
  
  &::before {
    content: '💰';
    margin-right: 8px;
    font-size: 16px;
  }
`;

const PurchaseForm = styled.div<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? 'rgba(42, 42, 42, 0.95)' : 'rgba(230, 211, 179, 0.95)'};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
`;

const FormTitle = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  text-align: center;
`;

const InputGroup = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input<{ $isDark: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  background: ${props => props.$isDark ? 'var(--bg-card)' : '#FFFFFF'};
  color: var(--text-primary);
  font-family: 'JetBrains Mono', monospace;
  font-size: 16px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:focus {
    outline: none;
    border-color: var(--matte-red);
    box-shadow: 0 0 0 3px var(--glow-red);
  }
  
  &::placeholder {
    color: var(--matte-red);
  }
`;

const InputError = styled.div`
  color: var(--matte-red);
  font-size: 0.9rem;
  margin-top: 8px;
  font-family: 'Inter', Arial, sans-serif;
`;

const CalculationCard = styled.div<{ $isDark: boolean }>`
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  border: 1px solid var(--border-color);
  margin: 0 0 20px 0;
  position: relative;
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  backdrop-filter: blur(10px);
`;

const CalculationRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  
  &:last-child {
    margin-bottom: 0;
    padding-top: 8px;
    border-top: 1px solid var(--border-color);
    font-weight: 600;
    color: var(--matte-red);
  }
`;

const CalculationLabel = styled.span`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 14px;
  color: var(--text-secondary);
`;

const CalculationValue = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: var(--text-primary);
  font-weight: 500;
`;

const PurchaseButton = styled.button<{ $isDark: boolean; $disabled: boolean }>`
  width: 100%;
  padding: 16px;
  background: #A23B3B;
  border: 1px solid #A23B3B;
  border-radius: 12px;
  color: var(--bg-primary);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    background: #A23B3B;
    border: 1px solid #A23B3B;
    cursor: not-allowed;
    box-shadow: none;
  }
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

const SuccessMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: var(--matte-red);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  background: var(--bg-secondary);
  border-radius: 12px;
  margin-bottom: 16px;
  border: 1px solid var(--border-color);
`;

const TariffSection = styled.div<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? 'rgba(42, 42, 42, 0.95)' : 'rgba(230, 211, 179, 0.95)'};
  border-radius: 16px;
  padding: 20px;
  margin: 0 0 20px 0;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px var(--shadow-card);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
`;

const InstructionsSection = styled.div<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? 'rgba(42, 42, 42, 0.95)' : 'rgba(230, 211, 179, 0.95)'};
  border-radius: 16px;
  padding: 20px;
  margin: 0 0 20px 0;
  box-shadow: 0 4px 20px var(--shadow-card);
  border: 1px solid var(--border-color);
  backdrop-filter: blur(10px);
`;

const InstructionsTitle = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  text-align: center;
`;

const InstructionsList = styled.ol`
  list-style: none;
  counter-reset: step-counter;
  padding: 0;
  margin: 0 0 24px 0;
`;

const InstructionItem = styled.li`
  counter-increment: step-counter;
  margin-bottom: 20px;
  padding: 16px 20px 16px 60px;
  position: relative;
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-primary);
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  &::before {
    content: counter(step-counter);
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 28px;
    height: 28px;
    background: linear-gradient(135deg, var(--matte-red), #d32f2f);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 700;
    box-shadow: 0 2px 6px rgba(211, 47, 47, 0.3);
  }
`;

const PaymentMethods = styled.div<{ $isDark: boolean }>`
  margin-top: 24px;
  padding: 20px;
  background: linear-gradient(135deg, 
    ${props => props.$isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.4)'}, 
    ${props => props.$isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)'}
  );
  border-radius: 16px;
  border: 2px solid var(--border-color);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 20px;
    right: 20px;
    height: 2px;
    background: linear-gradient(90deg, var(--matte-red), #ff6b6b, var(--matte-red));
    border-radius: 1px;
  }
`;

const PaymentMethodsTitle = styled.h4`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
  text-align: center;
  letter-spacing: 0.5px;
`;

const PaymentMethod = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  background: var(--bg-secondary);
  border-radius: 10px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(4px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const PaymentIcon = styled.span`
  margin-right: 8px;
  font-size: 16px;
`;

const InstructionsButton = styled.button<{ $isDark: boolean }>`
  background: #A23B3B;
  border: 1px solid #A23B3B;
  border-radius: 16px;
  padding: 20px;
  color: var(--bg-primary);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin: 0 0 20px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0px);
  }
`;

const ModalOverlay = styled.div<{ $modalPosition: { top: string; transform: string } }>`
  position: fixed;
  top: -20px;
  left: 0;
  right: 0;
  bottom: -20px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  padding: 80px 0 0 0;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ModalContent = styled.div<{ $isDark: boolean; $modalPosition: { top: string; transform: string } }>`
  background: var(--bg-card);
  border-radius: 20px;
  padding: 0;
  max-width: 95vw;
  max-height: 90vh;
  width: 95vw;
  text-align: center;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 10px 20px var(--shadow-card);
  overflow: hidden;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateY(var(--scroll-position, 0px)) translateX(-50%);
  display: flex;
  flex-direction: column;
  
  /* Плавная анимация появления */
  animation: modalSlideIn 0.4s ease-out;
  
  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(var(--scroll-position, 0px)) translateX(-50%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(var(--scroll-position, 0px)) translateX(-50%) scale(1);
    }
  }
`;

const ModalHeader = styled.div`
  background: var(--bg-card);
  border-radius: 20px 20px 0 0;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const ModalTitle = styled.h2`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  white-space: nowrap;
`;

const CloseButton = styled.button<{ $isDark: boolean }>`
  background: ${props => props.$isDark ? 'var(--bg-secondary)' : 'var(--bg-secondary)'};
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
  transition: all 0.3s ease;
  flex-shrink: 0;
  box-sizing: border-box;
  
  &:hover {
    background: var(--matte-red);
    color: white;
  }
`;

const TariffTitle = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  text-align: center;
`;

const TariffGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
`;

const TariffCard = styled.div<{ $isDark: boolean; $active: boolean; $color: string }>`
  background: ${props => props.$active 
    ? `linear-gradient(135deg, ${props.$color}, ${props.$color}dd)` 
    : props.$isDark ? 'rgba(42, 42, 42, 0.95)' : '#FFFFFF'
  };
  border: 2px solid ${props => props.$active ? props.$color : 'var(--border-color)'};
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px var(--shadow-soft);
  }
`;

const TariffName = styled.div<{ $active: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.$active ? 'white' : 'var(--text-primary)'};
  margin-bottom: 4px;
`;

const TariffDescription = styled.div<{ $active: boolean }>`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 14px;
  color: ${props => props.$active ? 'rgba(255,255,255,0.95)' : 'var(--text-secondary)'};
`;

const TariffDiscount = styled.div<{ $active: boolean }>`
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: ${props => props.$active ? 'rgba(255,255,255,0.9)' : 'var(--matte-red)'};
  margin-top: 4px;
  font-weight: 500;
`;

// Модальное окно успеха
const SuccessModalOverlay = styled.div<{ $modalPosition: { top: string; transform: string } }>`
  position: fixed;
  top: -20px;
  left: 0;
  right: 0;
  bottom: -20px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  padding: 80px 0 0 0;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
`;

const SuccessModal = styled.div<{ $modalPosition: { top: string; transform: string } }>`
  background: var(--bg-card);
  border-radius: 20px;
  padding: 0;
  max-width: 95vw;
  max-height: 90vh;
  width: 90%;
  text-align: center;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 10px 20px var(--shadow-card);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${props => props.$modalPosition.top};
  left: 50%;
  transform: ${props => props.$modalPosition.transform} translateX(-50%);
  
  /* Плавная анимация появления */
  animation: successModalSlideIn 0.4s ease-out;
  
  @keyframes successModalSlideIn {
    from {
      opacity: 0;
      transform: ${props => props.$modalPosition.transform} translateX(-50%) scale(0.95);
    }
    to {
      opacity: 1;
      transform: ${props => props.$modalPosition.transform} translateX(-50%) scale(1);
    }
  }
`;

const SuccessHeader = styled.div`
  background: var(--bg-card);
  border-radius: 20px 20px 0 0;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuccessTitle = styled.h2`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 15px;
  background: linear-gradient(135deg, var(--matte-red), var(--terracotta));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SuccessBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  animation: ${fadeIn} 0.6s ease-out 0.2s both;
`;

const SuccessModalMessage = styled.p`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 25px;
`;

const SuccessButton = styled.button`
  background: var(--matte-red);
  color: var(--bg-primary);
  border: none;
  border-radius: 12px;
  padding: 12px 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px var(--shadow-soft);
  
  &:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--shadow-card);
  }
`;

const YuanPurchase: React.FC<YuanPurchaseProps> = ({ telegramId, isDarkTheme, toggleTheme, onModalStateChange }) => {
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  const [purchaseHistory, setPurchaseHistory] = useState<Purchase[]>([]);
  const [amountCny, setAmountCny] = useState<string>('');
  const [selectedTariff, setSelectedTariff] = useState<string>('basic');
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [exchangeRateLoaded, setExchangeRateLoaded] = useState(false);
  const [purchaseHistoryLoaded, setPurchaseHistoryLoaded] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [instructionsModalPosition, setInstructionsModalPosition] = useState({ top: '50%', transform: 'translateY(-50%)' });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successModalPosition, setSuccessModalPosition] = useState({ top: '50%', transform: 'translateY(-50%)' });
  const [inputError, setInputError] = useState<string | null>(null);

  // Тарифы
  const tariffs: Tariff[] = [
    {
      id: 'basic',
      name: 'Базовый',
      minAmount: 200,
      discount: 0,
      description: '200+ юаней',
      color: '#A23B3B'
    },
    {
      id: 'premium',
      name: 'Премиум',
      minAmount: 1000,
      discount: 0.15,
      description: '1000+ юаней',
      color: '#A23B3B'
    },
    {
      id: 'vip',
      name: 'VIP',
      minAmount: 3000,
      discount: 0.3,
      description: '3000+ юаней',
      color: '#8B1A1A'
    },
    {
      id: 'ultimate',
      name: 'Ultimate',
      minAmount: 5000,
      discount: 0.5,
      description: '5000+ юаней',
      color: '#5C1A1A'
    }
  ];

  useEffect(() => {
    fetchExchangeRate();
    fetchPurchaseHistory();
  }, [telegramId]);

  // Отслеживаем загрузку обеих функций
  useEffect(() => {
    if (exchangeRateLoaded && purchaseHistoryLoaded) {
      setLoading(false);
    }
  }, [exchangeRateLoaded, purchaseHistoryLoaded]);

  // Автоматически выбираем тариф при вводе количества
  useEffect(() => {
    if (amountCny) {
      const cnyAmount = parseFloat(amountCny);
      if (!isNaN(cnyAmount) && cnyAmount > 0) {
        let newTariff = 'basic';
        for (const tariff of tariffs) {
          if (cnyAmount >= tariff.minAmount) {
            newTariff = tariff.id;
          }
        }
        setSelectedTariff(newTariff);
      }
    }
  }, [amountCny]);

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch('/api/exchange-rate');
      if (response.ok) {
        const data = await response.json();
        // Используем тот же курс, что и в разделе "Курс юаня"
        setExchangeRate({
          base_rate: data.rate,
          favorable_rate: data.rate, // Тот же курс, без скидки
          savings_percent: 0, // Убираем скидку, так как курс уже выгодный
          last_updated: new Date().toISOString()
        });
      } else {
        console.error('Ошибка получения курса валют:', response.status);
        // Не устанавливаем значения по умолчанию - ждем реальный курс
      }
    } catch (err) {
      console.error('Ошибка загрузки курса:', err);
      // Не устанавливаем значения по умолчанию - ждем реальный курс
    } finally {
      setExchangeRateLoaded(true);
    }
  };

  const fetchPurchaseHistory = async () => {
    try {
      // Проверяем, что telegramId валидный
      if (!telegramId || telegramId === '0' || telegramId === 'undefined') {
        setPurchaseHistory([]);
        setPurchaseHistoryLoaded(true);
        return;
      }
      
      // Демо-данные для локального тестирования
      if (telegramId === 'demo') {
        setPurchaseHistory([]);
        setPurchaseHistoryLoaded(true);
        return;
      }
      
      const response = await fetch(`/api/yuan-purchases?telegram_id=${telegramId}`);
      if (response.ok) {
        const data = await response.json();
        setPurchaseHistory(data.purchases || []);
      } else {
        console.error('Ошибка получения истории покупок:', response.status);
        setPurchaseHistory([]);
      }
    } catch (err) {
      console.error('Ошибка загрузки истории:', err);
      setPurchaseHistory([]);
    } finally {
      setPurchaseHistoryLoaded(true);
    }
  };

  const validateInput = (value: string) => {
    if (!value || value.trim() === '') {
      setInputError('Введите количество юаней');
      return false;
    }
    
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 200) {
      setInputError('Количество юаней должно быть от 200');
      return false;
    }
    
    if (numValue > 10000) {
      setInputError('Максимальное количество: 10,000 юаней');
      return false;
    }
    
    setInputError(null);
    return true;
  };

  const validateInputOnChange = (value: string) => {
    if (value.trim() === '') {
      setInputError(null);
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 200 && numValue <= 10000) {
      setInputError(null);
    }
  };

  const handlePurchase = async () => {
    if (!validateInput(amountCny)) {
      return;
    }

    if (!amounts) {
      setError('Ошибка расчета стоимости');
      return;
    }

    setPurchasing(true);
    setError(null);
    setSuccess(null);
    setInputError(null);

    try {
      // Haptic feedback
      HapticFeedback.medium();

      // Получаем данные пользователя из Telegram
      const tg = window.Telegram?.WebApp;
      const user = tg?.initDataUnsafe?.user;
      
      const purchaseData = {
        telegramId: user?.id?.toString() || telegramId || 'unknown',
        username: user?.username || 'unknown',
        firstName: user?.first_name || 'unknown',
        lastName: (user as any)?.last_name || '',
        amountCny: amounts.cny,
        amountRub: amounts.rub,
        tariff: amounts.tariff.name,
        rate: amounts.rate,
        savings: amounts.savings,
        userLink: user?.username ? `@${user.username}` : `tg://user?id=${user?.id || telegramId}`
      };

      const response = await fetch('/api/yuan-purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
      });

      if (response.ok) {
        HapticFeedback.success();
        
        // Рассчитываем позицию модального окна по центру экрана
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const centerPosition = scrollTop + (windowHeight / 2);
        
        setSuccessModalPosition({
          top: `${centerPosition}px`,
          transform: 'translateY(-50%)'
        });
        
        setShowSuccessModal(true);
        onModalStateChange?.(true);
        setAmountCny('');
        
        // Блокируем скролл страницы при открытии модального окна
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
      } else {
        throw new Error('Ошибка при отправке заказа');
      }
    } catch (err) {
      console.error('Ошибка покупки:', err);
      setError('Произошла ошибка при отправке заказа. Попробуйте еще раз.');
    } finally {
      setPurchasing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(amount);
  };

  const handleAmountChange = (value: string) => {
    setAmountCny(value);
    validateInputOnChange(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Функция для расчета динамического тарифа
  const getTariffRate = (tariffId: string, favorableRate: number): number => {
    switch (tariffId) {
      case 'basic':
        return favorableRate; // 200+ юаней - используем наш курс как есть
      case 'premium':
        return favorableRate - 0.48; // 1000+ юаней (12.30 = 12.78 - 0.48)
      case 'vip':
        return favorableRate - 0.58; // 3000+ юаней (12.20 = 12.78 - 0.58)
      case 'ultimate':
        return favorableRate - 0.78; // 5000+ юаней (12.00 = 12.78 - 0.78)
      default:
        return favorableRate;
    }
  };

  const calculateAmounts = () => {
    if (!amountCny) return null;
    
    const cnyAmount = parseFloat(amountCny);
    if (isNaN(cnyAmount) || cnyAmount < 200) return null;
    
    // Определяем подходящий тариф
    let currentTariff = tariffs[0]; // Базовый по умолчанию
    for (const tariff of tariffs) {
      if (cnyAmount >= tariff.minAmount) {
        currentTariff = tariff;
      }
    }
    
    // Используем наш курс (ЦБРФ + 1.1)
    const favorableRate = exchangeRate?.favorable_rate;
    
    if (!favorableRate) return null; // Не рассчитываем если курс не загружен
    
    // Определяем курс согласно тарифу (динамически на основе нашего курса)
    const tariffRate = getTariffRate(currentTariff.id, favorableRate);
    
    // Рассчитываем стоимость по тарифному курсу
    const rubAmount = cnyAmount * tariffRate;
    // Экономия рассчитывается только если тарифный курс лучше нашего курса
    const savings = tariffRate < favorableRate ? cnyAmount * (favorableRate - tariffRate) : 0;
    
    return {
      cny: cnyAmount,
      rub: rubAmount,
      savings: savings,
      tariff: currentTariff,
      rate: tariffRate
    };
  };

  const amounts = calculateAmounts();

  if (loading) {
    return (
      <PurchaseContainer $isDark={isDarkTheme}>
        <LoadingSpinner>Загрузка...</LoadingSpinner>
      </PurchaseContainer>
    );
  }

  return (
    <PurchaseContainer $isDark={isDarkTheme}>
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
        <PurchaseTitle $isDark={isDarkTheme}>Купить юань</PurchaseTitle>
      </Header>

      <ThemeToggle onClick={toggleTheme}>
        <ToggleIcon $isDark={isDarkTheme}>🌙</ToggleIcon>
        <ToggleIconDark $isDark={isDarkTheme}>☀️</ToggleIconDark>
        <ToggleSlider $isDark={isDarkTheme}></ToggleSlider>
      </ThemeToggle>

      <PurchaseForm $isDark={isDarkTheme}>
        <FormTitle>Покупка юаня</FormTitle>
        
        {error && (
          <ErrorMessage style={{ marginBottom: '16px', padding: '12px', background: 'rgba(162, 59, 59, 0.1)', borderRadius: '8px' }}>
            {error}
          </ErrorMessage>
        )}
        
        {success && (
          <SuccessMessage>
            ✅ {success}
          </SuccessMessage>
        )}
        
        <InputGroup>
          <Label>Количество юаней</Label>
          <Input
            type="number"
            value={amountCny}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="Введите количество (от 200 ¥)"
            min="200"
            max="10000"
            $isDark={isDarkTheme}
          />
          {inputError && <InputError>{inputError}</InputError>}
        </InputGroup>

        {amounts && (
          <CalculationCard $isDark={isDarkTheme}>
            <CalculationRow>
              <CalculationLabel>Количество юаней:</CalculationLabel>
              <CalculationValue>{amounts.cny.toFixed(2)} ¥</CalculationValue>
            </CalculationRow>
            <CalculationRow>
              <CalculationLabel>Курс:</CalculationLabel>
              <CalculationValue>{amounts.rate.toFixed(2)} ₽ за юань</CalculationValue>
            </CalculationRow>
            <CalculationRow>
              <CalculationLabel>Тариф:</CalculationLabel>
              <CalculationValue>{amounts.tariff.name}</CalculationValue>
            </CalculationRow>
            {amounts.savings > 0 && (
              <CalculationRow>
                <CalculationLabel>Экономия:</CalculationLabel>
                <CalculationValue>{formatCurrency(amounts.savings)}</CalculationValue>
              </CalculationRow>
            )}
            <CalculationRow>
              <CalculationLabel>Сумма к оплате:</CalculationLabel>
              <CalculationValue>{formatCurrency(amounts.rub)}</CalculationValue>
            </CalculationRow>
          </CalculationCard>
        )}

        <PurchaseButton
          onClick={handlePurchase}
          disabled={purchasing}
          $isDark={isDarkTheme}
          $disabled={purchasing}
        >
          {purchasing ? 'Отправка...' : 'Заказать юань'}
        </PurchaseButton>
      </PurchaseForm>

      <TariffSection $isDark={isDarkTheme}>
        <TariffTitle>Наши тарифы</TariffTitle>
        <TariffGrid>
          {tariffs.map((tariff) => (
            <TariffCard
              key={tariff.id}
              $isDark={isDarkTheme}
              $active={selectedTariff === tariff.id}
              $color={tariff.color}
            >
              <TariffName $active={selectedTariff === tariff.id}>
                {tariff.name}
              </TariffName>
              <TariffDescription $active={selectedTariff === tariff.id}>
                {tariff.description}
              </TariffDescription>
              <TariffDiscount $active={selectedTariff === tariff.id}>
                {exchangeRate?.favorable_rate ? 
                  `${getTariffRate(tariff.id, exchangeRate.favorable_rate).toFixed(2)} ₽ за юань` :
                  'Загрузка...'
                }
              </TariffDiscount>
            </TariffCard>
          ))}
        </TariffGrid>
      </TariffSection>

        <InstructionsButton $isDark={isDarkTheme} onClick={() => {
          HapticFeedback.selection();
          setInstructionsModalPosition({ top: '50%', transform: 'translateY(-50%)' });
          setShowInstructions(true);
          onModalStateChange?.(true);
          
          // Блокируем скролл страницы при открытии модального окна
          document.body.style.overflow = 'hidden';
          document.body.style.position = 'fixed';
          document.body.style.width = '100%';
        }}>
          Инструкция по покупке юаней
        </InstructionsButton>

      {exchangeRate && (
        <RateCard $isDark={isDarkTheme}>
          <RateTitle>Текущий курс</RateTitle>
          <RateGrid>
            <RateItem $isDark={isDarkTheme}>
              <RateLabel>Обычный курс</RateLabel>
              <RateValue>{exchangeRate.base_rate?.toFixed(2)} ₽</RateValue>
            </RateItem>
            <RateItem $isDark={isDarkTheme}>
              <RateLabel>Наш курс</RateLabel>
              <RateValue>{getTariffRate('ultimate', exchangeRate.favorable_rate).toFixed(2)} ₽</RateValue>
            </RateItem>
          </RateGrid>
          <SavingsBadge $isDark={isDarkTheme}>
            Экономия до {(((exchangeRate.base_rate - getTariffRate('ultimate', exchangeRate.favorable_rate)) / exchangeRate.base_rate) * 100).toFixed(1)}%
          </SavingsBadge>
        </RateCard>
      )}


      {showInstructions && (
        <ModalOverlay $modalPosition={instructionsModalPosition} onClick={() => {
        HapticFeedback.light();
        setShowInstructions(false);
        onModalStateChange?.(false);
        
        // Восстанавливаем скролл страницы при закрытии модального окна
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
      }}>
        <ModalContent 
          $isDark={isDarkTheme} 
          $modalPosition={instructionsModalPosition} 
          onClick={(e) => e.stopPropagation()}
          style={{
            '--scroll-position': `${window.pageYOffset || document.documentElement.scrollTop}px`
          } as React.CSSProperties}
        >
          <ModalHeader>
            <ModalTitle>Инструкция по покупке юаней</ModalTitle>
            <CloseButton $isDark={isDarkTheme} onClick={() => {
              HapticFeedback.light();
              setShowInstructions(false);
              onModalStateChange?.(false);
              
              // Восстанавливаем скролл страницы при закрытии модального окна
              document.body.style.overflow = '';
              document.body.style.position = '';
              document.body.style.width = '';
            }}>
              ×
            </CloseButton>
          </ModalHeader>
          
          <ModalBody>
          
          <InstructionsList>
            <InstructionItem>
              Введите количество юаней, которое хотите купить, в поле выше
            </InstructionItem>
            <InstructionItem>
              Нажмите кнопку "Заказать юани" - сообщение с информацией автоматически отправится менеджеру
            </InstructionItem>
            <InstructionItem>
              Отправьте менеджеру QR-код Alipay или WeChat с указанием ФИО и номера телефона, на который зарегистрирован аккаунт
            </InstructionItem>
            <InstructionItem>
              Менеджер отправит вам реквизиты для оплаты
            </InstructionItem>
            <InstructionItem>
              Произведите оплату по полученным реквизитам
            </InstructionItem>
            <InstructionItem>
              Мы отправим юани на ваши реквизиты в течение 24 часов
            </InstructionItem>
          </InstructionsList>

          <PaymentMethods $isDark={isDarkTheme}>
            <PaymentMethodsTitle>💳 Способы оплаты</PaymentMethodsTitle>
            <PaymentMethod>
              <PaymentIcon>💙</PaymentIcon>
              Alipay (Алипей)
            </PaymentMethod>
            <PaymentMethod>
              <PaymentIcon>💚</PaymentIcon>
              WeChat Pay (Вичат)
            </PaymentMethod>
          </PaymentMethods>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
      )}

      {/* Модальное окно успеха */}
      {showSuccessModal && (
        <SuccessModalOverlay $modalPosition={successModalPosition} onClick={() => {
          setShowSuccessModal(false);
          onModalStateChange?.(false);
          
          // Восстанавливаем скролл страницы при закрытии модального окна
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
        }}>
          <SuccessModal 
            $modalPosition={successModalPosition} 
            onClick={(e) => e.stopPropagation()}
          >
            <SuccessHeader>
              <SuccessTitle>Заказ отправлен!</SuccessTitle>
            </SuccessHeader>
            <SuccessBody>
              <SuccessIcon>🎉</SuccessIcon>
              <SuccessModalMessage>
                Ваш заказ на покупку юаней успешно отправлен менеджеру.<br/>
                Ожидайте ответа в течение 24 часов.
              </SuccessModalMessage>
              <SuccessButton onClick={() => {
                setShowSuccessModal(false);
                onModalStateChange?.(false);
                
                // Восстанавливаем скролл страницы при закрытии модального окна
                document.body.style.overflow = '';
                document.body.style.position = '';
                document.body.style.width = '';
              }}>
                Супер!
              </SuccessButton>
            </SuccessBody>
          </SuccessModal>
        </SuccessModalOverlay>
      )}
    </PurchaseContainer>
  );
};

export default YuanPurchase;
