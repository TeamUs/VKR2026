import React, { useState, useEffect, useLayoutEffect } from 'react';
import styled, { keyframes, css, createGlobalStyle } from 'styled-components';
import { HapticFeedback } from '../utils/hapticFeedback';


// Минималистичные анимации в стиле главного меню
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

const titleGlow = keyframes`
  0% { 
    text-shadow: 0 0 20px var(--glow-terracotta); 
  }
  50% { 
    text-shadow: 0 0 30px var(--glow-red), 0 0 40px var(--glow-terracotta); 
  }
  100% { 
    text-shadow: 0 0 20px var(--glow-terracotta); 
  }
`;

// Стилизованные компоненты
const FormContainer = styled.div`
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

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  margin-top: 0px;
  position: relative;
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
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  line-height: 1;
  padding: 0;
  margin: 0;
  margin-left: 0px;
  
  @media (max-width: 480px) {
    margin-left: 0px;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    background: var(--sand);
    border-color: var(--matte-red);
    color: var(--text-primary);
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

const Title = styled.h1`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

// Прогресс-бар
const ProgressContainer = styled.div`
  position: relative;
  z-index: 2;
  margin-bottom: 30px;
  background: var(--bg-card);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  margin: 0 16px 30px 16px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: var(--bg-secondary);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 15px;
`;

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, var(--matte-red), var(--terracotta));
  border-radius: 4px;
  width: ${props => props.$progress}%;
  transition: width 0.5s ease;
  box-shadow: 0 0 10px var(--glow-red);
`;

const ProgressText = styled.div`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-align: center;
`;

const StepIndicator = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: start;
  margin-top: 15px;
  gap: 12px;
  padding: 0 8px;
  
  @media (max-width: 480px) {
    gap: 8px;
    padding: 0 4px;
  }
`;

const Step = styled.div<{ $active: boolean; $completed: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 0;
  padding: 0 4px;
  justify-self: center;
  
  .step-number {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.9rem;
    margin-bottom: 6px;
    transition: all 0.3s ease;
    flex-shrink: 0;
    
    ${props => props.$completed ? css`
      background: var(--matte-red);
      color: var(--bg-primary);
      box-shadow: 0 0 10px var(--glow-red);
    ` : props.$active ? css`
      background: var(--terracotta);
      color: var(--bg-primary);
      box-shadow: 0 0 8px var(--glow-terracotta);
    ` : css`
      background: var(--bg-secondary);
      color: var(--text-secondary);
      border: 1px solid var(--border-color);
    `}
  }
  
  .step-label {
    font-size: 0.75rem;
    color: var(--text-secondary);
    text-align: center;
    font-weight: 500;
    line-height: 1.2;
    white-space: normal;
    word-break: keep-all;
    overflow: visible;
    max-width: 110px;
    min-height: 1.2em;
    
    ${props => (props.$active || props.$completed) && css`
      color: var(--text-primary);
      font-weight: 600;
    `}
    
    @media (max-width: 480px) {
      font-size: 0.7rem;
      line-height: 1.1;
    }
  }
`;

// Форма
const Form = styled.form`
  position: relative;
  z-index: 2;
  background: var(--bg-card);
  border-radius: 16px;
  padding: 25px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  margin: 0 16px;
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const StepContent = styled.div<{ $active: boolean }>`
  display: ${props => props.$active ? 'block' : 'none'};
  animation: ${fadeIn} 0.4s ease-out;
`;

const Label = styled.label`
  display: block;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-weight: 600;
`;

const InputGroup = styled.div`
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
  
  &:focus {
    outline: none;
    border-color: var(--matte-red);
    box-shadow: 0 0 15px var(--glow-red);
    background: var(--bg-card);
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 15px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
  font-family: 'Inter', Arial, sans-serif;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a23b3b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6,9 12,15 18,9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 20px;
  padding-right: 50px;
  
  &:focus {
    outline: none;
    border-color: var(--matte-red);
    box-shadow: 0 0 15px var(--glow-red);
    background-color: var(--bg-card);
  }
  
  &:hover {
    border-color: var(--matte-red);
    background-color: var(--bg-card);
  }
  
  option {
    background: var(--bg-primary);
    color: var(--text-primary);
    padding: 10px;
    font-family: 'Inter', Arial, sans-serif;
    border: none;
    font-size: 1rem;
  }
  
  option:first-child {
    color: var(--text-secondary);
  }
  
  option:checked {
    background: var(--matte-red);
    color: var(--bg-primary);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  min-height: 100px;
  resize: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
  font-family: 'Inter', Arial, sans-serif;
  overflow: hidden;
  
  &:focus {
    outline: none;
    border-color: var(--matte-red);
    box-shadow: 0 0 15px var(--glow-red);
    background: var(--bg-card);
  }

  &::placeholder {
    color: var(--text-secondary);
  }
`;

const ErrorMessage = styled.div`
  color: var(--matte-red);
  font-size: 0.9rem;
  margin-top: 5px;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 16px 20px;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
  pointer-events: auto;
  min-height: 48px;
  
  @media (max-width: 480px) {
    padding: 14px 18px;
    font-size: 0.95rem;
    min-height: 44px;
  }
  
  ${props => props.$variant === 'primary' 
    ? css`
      background: var(--matte-red);
      color: var(--bg-primary);
      box-shadow: 
        0 4px 12px var(--shadow-soft),
        0 2px 6px var(--shadow-card);
      
      &:hover {
        transform: translateY(-3px);
        background: var(--terracotta);
        box-shadow: 
          0 8px 20px var(--shadow-card),
          0 4px 12px var(--shadow-soft);
        border-color: var(--matte-red);
      }
      
      &:focus {
        outline: none;
        background: var(--matte-red);
        color: var(--bg-primary);
        box-shadow: 
          0 4px 12px var(--shadow-soft),
          0 2px 6px var(--shadow-card);
        border-color: var(--border-color);
        transform: none;
      }
    `
    : css`
      background: var(--bg-card);
      color: var(--text-primary);
      box-shadow: 
        0 4px 12px var(--shadow-soft),
        0 2px 6px var(--shadow-card);
      
      &:hover {
        transform: translateY(-3px);
        background: var(--sand);
        box-shadow: 
          0 8px 20px var(--shadow-card),
          0 4px 12px var(--shadow-soft);
        border-color: var(--matte-red);
      }
      
      &:focus {
        outline: none;
        background: var(--bg-card);
        color: var(--text-primary);
        box-shadow: 
          0 4px 12px var(--shadow-soft),
          0 2px 6px var(--shadow-card);
        border-color: var(--border-color);
        transform: none;
      }
    `
  }
  
  &:active {
    transform: scale(0.98) !important;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 25px;
  
  @media (max-width: 480px) {
    gap: 10px;
    margin-top: 5px;
  }
`;

// Модальное окно успеха
const ModalOverlay = styled.div<{ $modalPosition: { top: string; transform: string } }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
      transform: ${props => props.$modalPosition.transform} translateX(-50%) scale(0.97);
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

const SuccessMessage = styled.p`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 25px;
`;

const CloseButton = styled.button`
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

const VideoButton = styled.button`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 12px 20px;
  color: var(--text-primary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  
  &:hover {
    background: var(--sand);
    border-color: var(--matte-red);
    transform: translateY(-2px);
  }
  
  &:focus {
    outline: none;
    background: var(--sand);
    border-color: var(--matte-red);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const LinkHelpButton = styled.button`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 12px 20px;
  color: var(--text-primary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  
  &:hover {
    background: var(--sand);
    border-color: var(--matte-red);
    transform: translateY(-2px);
  }
  
  &:focus {
    outline: none;
    background: var(--sand);
    border-color: var(--matte-red);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 15px;
`;

const VideoModalOverlay = styled.div<{ $modalPosition: { top: string; transform: string } }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  padding: 12px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
`;

const VideoModal = styled.div<{ $modalPosition: { top: string; transform: string } }>`
  background: var(--bg-card);
  border-radius: 20px;
  padding: 0;
  max-width: 94vw;
  max-height: calc(100vh - 48px);
  width: 94vw;
  text-align: center;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 10px 20px var(--shadow-card);
  overflow: hidden;
  position: absolute;
  top: 16px;
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

const VideoHeader = styled.div`
  background: var(--bg-card);
  border-radius: 20px 20px 0 0;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const VideoTitle = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`;

const VideoBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px 24px 28px 24px;
`;

const VideoPlayer = styled.video`
  width: 100%;
  max-width: 350px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--shadow-soft);
  margin: 0 auto;
  margin-top: 20px;
  display: block;
`;

const VideoCloseButton = styled.button`
  background: var(--matte-red);
  color: var(--bg-primary);
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px var(--shadow-soft);
  margin-top: 16px;
  
  &:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px var(--shadow-card);
  }
`;

const VideoCloseIcon = styled.button<{ $isDark?: boolean }>`
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
  transition: all 0.3s ease;
  flex-shrink: 0;
  box-sizing: border-box;
  
  &:hover {
    background: var(--matte-red);
    color: white;
  }
`;

const LinkHelpModal = styled.div<{ $modalPosition: { top: string; transform: string } }>`
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
  top: 20px;
  left: 50%;
  transform: translateY(var(--scroll-position, 0px)) translateX(-50%);
  display: flex;
  flex-direction: column;
  
  /* Плавная анимация появления */
  animation: linkHelpModalSlideIn 0.4s ease-out;
  
  @keyframes linkHelpModalSlideIn {
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

const LinkHelpHeader = styled.div`
  background: var(--bg-card);
  border-radius: 20px 20px 0 0;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const LinkHelpTitle = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 22px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`;

const LinkHelpBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

const LinkHelpText = styled.div`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 20px 0;
`;

const LinkHelpList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  counter-reset: link-step;
`;

const LinkHelpItem = styled.li`
  counter-increment: link-step;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 14px 16px;
  border-radius: 14px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);

  &::before {
    content: counter(link-step);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--matte-red);
    color: var(--bg-primary);
    font-weight: 600;
    font-size: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
  }
`;

const LinkHelpItemContent = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary);

  strong {
    color: var(--text-primary);
  }
`;

const LinkHelpImage = styled.img`
  width: 100%;
  max-width: 350px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--shadow-soft);
  margin: 0 auto;
  display: block;
`;

// Стили для работы с товарами
const ItemContainer = styled.div<{ $isDark?: boolean }>`
  background: var(--bg-card);
  border: 2px solid ${props => props.$isDark ? 'var(--matte-red)' : 'var(--terracotta)'};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: ${props => props.$isDark 
    ? '0 0 15px rgba(162, 59, 59, 0.4), 0 2px 8px var(--shadow-soft)' 
    : '0 0 12px rgba(139, 69, 19, 0.3), 0 2px 8px var(--shadow-soft)'};
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: ${props => props.$isDark 
      ? '0 0 20px rgba(162, 59, 59, 0.6), 0 4px 12px var(--shadow-card)' 
      : '0 0 18px rgba(139, 69, 19, 0.5), 0 4px 12px var(--shadow-card)'};
    transform: translateY(-2px);
  }
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ItemTitle = styled.h4`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`;

const RemoveButton = styled.button<{ $isDark?: boolean }>`
  background: var(--matte-red);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  color: ${props => props.$isDark ? '#000000' : '#FFFFFF'};
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: var(--terracotta);
    transform: scale(1.1);
  }
`;

const InputRow = styled.div`
  display: flex;
  gap: 16px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const AddItemButton = styled.button`
  background: var(--bg-card);
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  padding: 20px;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-bottom: 8px;
  outline: none;
  
  &:hover {
    border-color: var(--matte-red);
    background: var(--sand);
    color: var(--matte-red);
  }
  
  &:active {
    transform: scale(0.98);
    border-color: var(--matte-red);
    background: var(--sand);
    color: var(--matte-red);
  }
  
  /* Полностью убираем фокус */
  &:focus {
    outline: none;
    border-color: var(--border-color);
    background: var(--bg-card);
    color: var(--text-primary);
    box-shadow: none;
    transform: none;
  }
`;

const QuantityCounter = styled.div`
  display: flex;
  align-items: center;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 8px;
  width: 100%;
  box-shadow: 0 2px 8px var(--shadow-soft);
  backdrop-filter: blur(10px);
`;

const QuantityButton = styled.button<{ $isDark?: boolean }>`
  background: var(--matte-red);
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  color: ${props => props.$isDark ? '#000000' : '#FFFFFF'};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  &:hover {
    background: var(--terracotta);
    transform: scale(1.1);
  }
  
  &:focus {
    outline: none;
    background: var(--matte-red);
    color: white;
    transform: none;
  }
  
  &:active {
    transform: scale(0.95);
    background: var(--terracotta);
  }
`;

const QuantityDisplay = styled.div`
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  padding: 0 16px;
`;

const VideoText = styled.p`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 20px 0;
`;

const VideoIntro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 0 22px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`;

const VideoBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.73rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba(218, 162, 148, 0.16);
  color: var(--matte-red);
  padding: 4px 10px;
  border-radius: 999px;
  width: fit-content;
  font-weight: 600;
  opacity: 0.85;
`;

const VideoIntroTitle = styled.h4`
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.45;
`;

const VideoIntroSubtitle = styled.p`
  font-size: 0.94rem;
  color: rgba(255, 255, 255, 0.72);
  margin: 0;
  line-height: 1.6;
`;

const VideoHintNote = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.75);

  &::before {
    content: '💡';
    font-size: 1.15rem;
  }

  strong {
    color: rgba(255, 255, 255, 0.92);
    font-weight: 600;
  }
`;

const VideoFallbackCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  padding: 18px 20px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.78);
`;

const VideoFallbackTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.96rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);

  &::before {
    content: '📹';
    font-size: 1.15rem;
  }
`;

const VideoFallbackSteps = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  counter-reset: video-step;
`;

const VideoFallbackStep = styled.li`
  display: grid;
  grid-template-columns: 26px 1fr;
  gap: 10px;
  align-items: flex-start;
  counter-increment: video-step;
  line-height: 1.5;

  &::before {
    content: counter(video-step);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: rgba(218, 162, 148, 0.2);
    color: var(--matte-red);
    font-weight: 600;
    font-size: 0.85rem;
  }
`;

const VideoFallbackText = styled.div`
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.78);

  strong {
    color: rgba(255, 255, 255, 0.92);
    font-weight: 600;
  }
`;

const VideoGuideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;
`;

const VideoGuideHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
`;

const VideoGuideTag = styled.span`
  font-family: 'Inter', Arial, sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: rgba(118, 61, 62, 0.16);
  color: var(--matte-red);
  padding: 5px 12px;
  border-radius: 999px;
  font-weight: 600;
  width: fit-content;
`;

const VideoGuideTitle = styled.h4`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.02rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.45;
`;

const VideoGuideSubtitle = styled.p`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.93rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  line-height: 1.55;
`;

const VideoGuideHint = styled.div`
  margin-top: 18px;
  padding: 12px 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px dashed var(--border-color);
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-secondary);

  strong {
    color: var(--text-primary);
    font-weight: 600;
  }
`;

const VideoGuideFallback = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  text-align: left;
`;

const VideoGuideFallbackTitle = styled.h5`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`;

const VideoGuideList = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  counter-reset: video-guide-step;
`;

const VideoGuideItem = styled.li`
  counter-increment: video-guide-step;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  padding: 14px 16px;
  border-radius: 14px;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);

  &::before {
    content: counter(video-guide-step);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--matte-red);
    color: var(--bg-primary);
    font-weight: 600;
    font-size: 1rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
  }
`;

const VideoGuideItemContent = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text-secondary);

  strong {
    color: var(--text-primary);
  }
`;

const VideoHintActions = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: center;
`;

const VideoHintButton = styled.button`
  background: var(--matte-red);
  border: none;
  border-radius: 999px;
  padding: 10px 20px;
  color: var(--bg-primary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px var(--shadow-soft);

  &:hover {
    background: var(--terracotta);
    transform: translateY(-1px);
  }
`;

interface OrderFormProps {
  onNavigate: (page: string) => void;
  toggleTheme: () => void;
  isDarkTheme: boolean;
  onModalStateChange?: (isOpen: boolean) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onNavigate, toggleTheme, isDarkTheme, onModalStateChange }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    items: [
      { productLink: '', productSize: '', quantity: 1 }
    ],
    name: '',
    phone: '',
    address: '',
    pickupPoint: '',
    comments: '',
    trackingNumber: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showLinkHelpModal, setShowLinkHelpModal] = useState(false);
  const [videoModalPosition, setVideoModalPosition] = useState({ top: '50%', transform: 'translateY(-50%)' });
  const [linkHelpModalPosition, setLinkHelpModalPosition] = useState({ top: '50%', transform: 'translateY(-50%)' });
  const [successModalPosition, setSuccessModalPosition] = useState({ top: '50%', transform: 'translateY(-50%)' });
  const [videoError, setVideoError] = useState(false);

  // Сбрасываем скролл при открытии формы заказа
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Функции для работы с товарами
  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { productLink: '', productSize: '', quantity: 1 }]
    }));
    
    // Простой способ убрать фокус - кликнуть в пустое место
    setTimeout(() => {
      const body = document.body;
      body.click();
    }, 50);
  };

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
    
    // Простой способ убрать фокус - кликнуть в пустое место
    setTimeout(() => {
      const body = document.body;
      body.click();
    }, 50);
  };

  const steps = [
    { number: 1, label: 'Товары', title: 'Товары в заказе' },
    { number: 2, label: 'Контактные данные', title: 'Контактные данные' },
    { number: 3, label: 'Доставка', title: 'Адрес доставки' },
    { number: 4, label: 'Подтверждение', title: 'Подтверждение заказа' }
  ];

  const progress = (currentStep / steps.length) * 100;

  // Сбрасываем модальное окно при переходе на 4 шаг (чтобы не показывалось сразу)
  useEffect(() => {
    if (currentStep === 4) {
      setShowSuccessModal(false);
      document.body.style.overflow = '';
    }
  }, [currentStep]);


  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        // Валидация товаров
        formData.items.forEach((item, index) => {
          if (!item.productLink.trim()) {
            newErrors[`item_${index}_link`] = 'Введите ссылку на товар';
          }
          if (!item.productSize.trim()) {
            newErrors[`item_${index}_size`] = 'Введите размер товара';
          }
          if (item.quantity <= 0) {
            newErrors[`item_${index}_quantity`] = 'Количество должно быть больше 0';
          } else if (item.quantity > 999999999) {
            newErrors[`item_${index}_quantity`] = 'Слишком большое количество';
          }
        });
        break;
      case 2:
        if (!formData.name.trim()) {
          newErrors.name = 'Введите ваше имя';
        }
        if (!formData.phone.trim()) {
          newErrors.phone = 'Введите номер телефона';
        } else {
          // Проверяем, что введено 11 цифр (российский номер) с корректной маской
          const digits = formData.phone.replace(/\D/g, '');
          if (digits.length !== 11 || !digits.startsWith('7')) {
            newErrors.phone = 'Введите корректный номер телефона';
          }
        }
        break;
      case 3:
        if (!formData.address.trim()) {
          newErrors.address = 'Введите адрес доставки';
        }
        if (!formData.pickupPoint.trim()) {
          newErrors.pickupPoint = 'Выберите пункт выдачи';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      HapticFeedback.light();
      const nextStep = Math.min(currentStep + 1, steps.length);
      setCurrentStep(nextStep);
      // Сбрасываем модальное окно при переходе на любой шаг
      setShowSuccessModal(false);
    } else {
      HapticFeedback.error();
    }
    
    // Простой способ убрать фокус - кликнуть в пустое место
    setTimeout(() => {
      const body = document.body;
      body.click();
    }, 50);
  };

  const handleBack = () => {
    HapticFeedback.light();
    setCurrentStep(prev => Math.max(prev - 1, 1));
    // Сбрасываем модальное окно при возврате назад
    setShowSuccessModal(false);
    
    // Простой способ убрать фокус - кликнуть в пустое место
    setTimeout(() => {
      const body = document.body;
      body.click();
    }, 50);
  };

  const handleSubmit = async () => {
    
    if (!validateStep(currentStep)) {
      HapticFeedback.error();
      return;
    }

    setIsSubmitting(true);
    HapticFeedback.medium();
    
    // Сбрасываем фокус с кнопки после нажатия
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    try {
      // Получаем данные пользователя из Telegram
      const tg = window.Telegram?.WebApp;
      const user = tg?.initDataUnsafe?.user;
      
      const orderData = {
        telegramId: user?.id?.toString() || 'unknown',
        username: user?.username || 'unknown',
        items: formData.items,
        fullName: formData.name,
        phoneNumber: formData.phone,
        pickupPoint: formData.pickupPoint,
        pickupPointAddress: formData.address,
        comments: formData.comments
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        HapticFeedback.success();
        
        // Получаем данные ответа с tracking number
        const responseData = await response.json();
        
        // Сохраняем tracking number в состоянии
        if (responseData.trackingNumber) {
          setFormData(prev => ({ ...prev, trackingNumber: responseData.trackingNumber }));
        }
        
        // Рассчитываем позицию модального окна точно по центру текущего экрана пользователя
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const viewportHeight = window.innerHeight;
        const centerPosition = scrollTop + (viewportHeight / 2);
        
        setSuccessModalPosition({
          top: `${centerPosition}px`,
          transform: 'translateY(-50%)'
        });
        
        // Показываем модальное окно только после успешной отправки
        setShowSuccessModal(true);
        onModalStateChange?.(true);
        // Блокируем скролл страницы при открытии модального окна
        document.body.style.overflow = 'hidden';
      } else {
        throw new Error('Ошибка при отправке заказа');
      }
    } catch (error) {
      HapticFeedback.error();
      alert('Произошла ошибка при оформлении заказа. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Убираем все символы кроме цифр и +
    let cleaned = value.replace(/[^\d+]/g, '');
    
    // Если пустая строка, возвращаем пустую
    if (cleaned.length === 0) return '';
    
    // Если начинается с +, проверяем код страны
    if (cleaned.startsWith('+')) {
      const digits = cleaned.slice(1);
      
      // Если +7 или +8, форматируем как российский номер
      if (digits.startsWith('7') || digits.startsWith('8')) {
        let phoneDigits = digits.startsWith('8') ? '7' + digits.slice(1) : digits;
        phoneDigits = phoneDigits.slice(0, 11); // Ограничиваем до 11 цифр
        
        if (phoneDigits.length === 0) return '+7';
        if (phoneDigits.length === 1) return '+7';
        if (phoneDigits.length <= 4) return `+7 (${phoneDigits.slice(1)}`;
        if (phoneDigits.length <= 7) return `+7 (${phoneDigits.slice(1, 4)}) ${phoneDigits.slice(4)}`;
        if (phoneDigits.length <= 9) return `+7 (${phoneDigits.slice(1, 4)}) ${phoneDigits.slice(4, 7)}-${phoneDigits.slice(7)}`;
        return `+7 (${phoneDigits.slice(1, 4)}) ${phoneDigits.slice(4, 7)}-${phoneDigits.slice(7, 9)}-${phoneDigits.slice(9, 11)}`;
      }
      
      // Для других стран просто возвращаем как есть (с +)
      return cleaned;
    }
    
    // По умолчанию все номера считаются российскими (+7)
    // Если начинается с 7 или 8, форматируем как российский номер
    if (cleaned.startsWith('7') || cleaned.startsWith('8')) {
      let phoneDigits = cleaned.startsWith('8') ? '7' + cleaned.slice(1) : cleaned;
      phoneDigits = phoneDigits.slice(0, 11);
      
      if (phoneDigits.length === 0) return '';
      if (phoneDigits.length === 1) return '+7';
      if (phoneDigits.length <= 4) return `+7 (${phoneDigits.slice(1)}`;
      if (phoneDigits.length <= 7) return `+7 (${phoneDigits.slice(1, 4)}) ${phoneDigits.slice(4)}`;
      if (phoneDigits.length <= 9) return `+7 (${phoneDigits.slice(1, 4)}) ${phoneDigits.slice(4, 7)}-${phoneDigits.slice(7)}`;
      return `+7 (${phoneDigits.slice(1, 4)}) ${phoneDigits.slice(4, 7)}-${phoneDigits.slice(7, 9)}-${phoneDigits.slice(9, 11)}`;
    }
    
    // Если начинается с других цифр (например, 963), автоматически добавляем +7
    let phoneDigits = cleaned.slice(0, 10); // Ограничиваем до 10 цифр (без кода страны)
    
    if (phoneDigits.length === 0) return '';
    if (phoneDigits.length <= 3) return `+7 (${phoneDigits}`;
    if (phoneDigits.length <= 6) return `+7 (${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3)}`;
    if (phoneDigits.length <= 8) return `+7 (${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6)}`;
    return `+7 (${phoneDigits.slice(0, 3)}) ${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6, 8)}-${phoneDigits.slice(8, 10)}`;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleInputChange('phone', formatted);
  };

  const handleQuantityChange = (value: string) => {
    // Убираем все символы кроме цифр
    const digitsOnly = value.replace(/\D/g, '');
    
    // Если пустая строка, разрешаем (для очистки поля)
    if (digitsOnly === '') {
      handleInputChange('quantity', '');
      return;
    }
    
    const number = parseInt(digitsOnly);
    
    // Проверяем на 0
    if (number === 0) {
      setErrors(prev => ({ ...prev, quantity: 'Количество должно быть больше 0' }));
      return;
    }
    
    // Проверяем на слишком большие числа (от миллиарда)
    if (number > 999999999) {
      setErrors(prev => ({ ...prev, quantity: 'Слишком большое количество' }));
      return;
    }
    
    // Очищаем ошибку если все хорошо
    if (errors.quantity) {
      setErrors(prev => ({ ...prev, quantity: '' }));
    }
    
    handleInputChange('quantity', digitsOnly);
  };

  const handleTextAreaChange = (field: string, value: string) => {
    handleInputChange(field, value);
    
    // Автоматическое изменение размера textarea
    setTimeout(() => {
      const textarea = document.getElementById(field) as HTMLTextAreaElement;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.max(100, textarea.scrollHeight) + 'px';
      }
    }, 0);
  };

  const handleVideoClick = () => {
    HapticFeedback.selection();
    setVideoError(false);
    
    setVideoModalPosition({
      top: '50%',
      transform: 'translateY(-50%)'
    });
    setShowVideoModal(true);
    onModalStateChange?.(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseSuccessModal = () => {
    HapticFeedback.light();
    setShowSuccessModal(false);
    onModalStateChange?.(false);
    onNavigate('main');
    // Возвращаем скролл страницы
    document.body.style.overflow = '';
  };

  const handleCopyTrackingNumber = async () => {
    try {
      await navigator.clipboard.writeText(formData.trackingNumber);
      HapticFeedback.success();
      // Можно добавить уведомление о копировании
    } catch (err) {
      console.error('Failed to copy tracking number:', err);
      HapticFeedback.error();
    }
  };

  const handleCloseVideoModal = () => {
    HapticFeedback.selection();
    setShowVideoModal(false);
    onModalStateChange?.(false);
    document.body.style.overflow = '';
  };

  const handleLinkHelpClick = () => {
    HapticFeedback.selection();
    
    setLinkHelpModalPosition({
      top: '50%',
      transform: 'translateY(-50%)'
    });
    setShowLinkHelpModal(true);
    onModalStateChange?.(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseLinkHelpModal = () => {
    HapticFeedback.selection();
    setShowLinkHelpModal(false);
    onModalStateChange?.(false);
    document.body.style.overflow = '';
  };

  const pickupPoints = [
    'CDEK',
    'Boxberry',
    'Почта России'
  ];

  return (
    <FormContainer>

      <Header>
        <BackButton onClick={() => onNavigate('main')}>
          ‹
        </BackButton>
        <Title>Сделать заказ</Title>
        <ThemeToggle onClick={toggleTheme}>
          <ToggleIcon $isDark={isDarkTheme}>🌙</ToggleIcon>
          <ToggleIconDark $isDark={isDarkTheme}>☀️</ToggleIconDark>
          <ToggleSlider $isDark={isDarkTheme}></ToggleSlider>
        </ThemeToggle>
      </Header>

      <ProgressContainer>
        <ProgressBar>
          <ProgressFill $progress={progress} />
        </ProgressBar>
        <ProgressText>
          Шаг {currentStep} из {steps.length}: {steps[currentStep - 1].title}
        </ProgressText>
        <StepIndicator>
          {steps.map((step) => (
            <Step 
              key={step.number} 
              $active={currentStep === step.number}
              $completed={currentStep > step.number}
            >
              <div className="step-number">
                {currentStep > step.number ? '✓' : step.number}
              </div>
              <div className="step-label">{step.label}</div>
            </Step>
          ))}
        </StepIndicator>
      </ProgressContainer>

      <Form>
        {/* Шаг 1: Товары в заказе */}
        <StepContent $active={currentStep === 1}>
          <Label>Товары в заказе*</Label>
          {formData.items.map((item, index) => (
            <ItemContainer key={index} $isDark={isDarkTheme}>
              <ItemHeader>
                <ItemTitle>Товар {index + 1}</ItemTitle>
                {formData.items.length > 1 && (
                  <RemoveButton $isDark={isDarkTheme} type="button" onClick={() => removeItem(index)}>
                    ✕
                  </RemoveButton>
                )}
              </ItemHeader>
              
              <InputGroup>
                <Label htmlFor={`item_${index}_link`}>Ссылка на товар*</Label>
                <Input
                  type="url"
                  id={`item_${index}_link`}
                  value={item.productLink}
                  onChange={(e) => updateItem(index, 'productLink', e.target.value)}
                  placeholder="https://poizon.com/..."
                  required
                />
                {errors[`item_${index}_link`] && <ErrorMessage>{errors[`item_${index}_link`]}</ErrorMessage>}
              </InputGroup>

              <InputRow>
                <InputGroup>
                  <Label htmlFor={`item_${index}_size`}>Размер*</Label>
                  <Input
                    type="text"
                    id={`item_${index}_size`}
                    value={item.productSize}
                    onChange={(e) => updateItem(index, 'productSize', e.target.value)}
                    placeholder="L, M, S, 42, 43, 44..."
                  />
                  {errors[`item_${index}_size`] && <ErrorMessage>{errors[`item_${index}_size`]}</ErrorMessage>}
                </InputGroup>

                <InputGroup>
                  <Label htmlFor={`item_${index}_quantity`}>Количество*</Label>
                  <QuantityCounter>
                    <QuantityButton 
                      type="button" 
                      onMouseDown={() => updateItem(index, 'quantity', Math.max(1, item.quantity - 1))}
                      $isDark={isDarkTheme}
                    >
                      −
                    </QuantityButton>
                    <QuantityDisplay>{item.quantity}</QuantityDisplay>
                    <QuantityButton 
                      type="button" 
                      onMouseDown={() => updateItem(index, 'quantity', Math.min(999, item.quantity + 1))}
                      $isDark={isDarkTheme}
                    >
                      +
                    </QuantityButton>
                  </QuantityCounter>
                  {errors[`item_${index}_quantity`] && <ErrorMessage>{errors[`item_${index}_quantity`]}</ErrorMessage>}
                </InputGroup>
              </InputRow>
            </ItemContainer>
          ))}
          
          <AddItemButton 
            type="button" 
            onMouseDown={addItem}
            onTouchStart={addItem}
          >
            + Добавить товар
          </AddItemButton>
          
          <ButtonContainer>
            <VideoButton type="button" onClick={handleVideoClick}>
              Видео-инструкция 📹
            </VideoButton>
            <LinkHelpButton type="button" onClick={handleLinkHelpClick}>
              Где найти ссылку 🔗
            </LinkHelpButton>
          </ButtonContainer>
          
          <div style={{ marginTop: '24px' }}></div>
        </StepContent>

        {/* Шаг 2: Контактные данные */}
        <StepContent $active={currentStep === 2}>
          <Label htmlFor="name">ФИО*</Label>
          <Input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Иванов Иван Иванович"
            required
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}

          <div style={{ marginTop: '16px' }}>
            <Label htmlFor="phone">Номер телефона*</Label>
            <Input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => {
                const formatted = formatPhoneNumber(e.target.value);
                handleInputChange('phone', formatted);
              }}
              placeholder="+7 ( ___ ) ___ - __ - __"
              required
            />
            {errors.phone && <ErrorMessage>{errors.phone}</ErrorMessage>}
          </div>
          
          <div style={{ marginTop: '24px' }}></div>
        </StepContent>

        {/* Шаг 3: Доставка */}
        <StepContent $active={currentStep === 3}>
          <Label htmlFor="address">Адрес доставки*</Label>
          <Input
            type="text"
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Введите полный адрес доставки"
            required
          />
          {errors.address && <ErrorMessage>{errors.address}</ErrorMessage>}

          <div style={{ marginTop: '16px' }}>
            <Label htmlFor="pickupPoint">Пункт выдачи*</Label>
            <Select
              id="pickupPoint"
              value={formData.pickupPoint}
              onChange={(e) => handleInputChange('pickupPoint', e.target.value)}
              required
            >
              <option value="">Выберите пункт выдачи</option>
              <option value="СДЭК">СДЭК</option>
              <option value="Яндекс доставка">Яндекс доставка</option>
              <option value="Почта России">Почта России</option>
            </Select>
            {errors.pickupPoint && <ErrorMessage>{errors.pickupPoint}</ErrorMessage>}
          </div>

          <div style={{ marginTop: '16px' }}>
            <Label htmlFor="comments">Комментарии к заказу</Label>
            <TextArea
              id="comments"
              value={formData.comments}
              onChange={(e) => {
                handleInputChange('comments', e.target.value);
                // Автоматическое увеличение высоты
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              placeholder="Дополнительная информация, пожелания по доставке..."
              rows={3}
            />
          </div>
          
          <div style={{ marginTop: '24px' }}></div>
        </StepContent>

        {/* Шаг 4: Подтверждение */}
        <StepContent $active={currentStep === 4}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '15px' }}>Проверьте данные заказа:</h3>
            
            <div style={{ 
              background: 'var(--bg-secondary)', 
              padding: '20px', 
              borderRadius: '16px', 
              marginBottom: '16px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 12px var(--shadow-soft)'
            }}>
              <div style={{ 
                color: 'var(--text-primary)', 
                fontSize: '1.1rem', 
                fontWeight: '600', 
                marginBottom: '15px',
                paddingBottom: '8px',
                borderBottom: '1px solid var(--border-color)'
              }}>
                Товары ({formData.items.length}):
              </div>
              {formData.items.map((item, index) => (
                <div key={index} style={{ 
                  marginTop: '12px', 
                  padding: '15px', 
                  background: isDarkTheme ? 'var(--bg-card)' : '#FFFFFF', 
                  borderRadius: '12px',
                  border: `2px solid ${isDarkTheme ? 'var(--matte-red)' : 'var(--terracotta)'}`,
                  boxShadow: isDarkTheme 
                    ? '0 0 15px rgba(162, 59, 59, 0.3), 0 2px 8px var(--shadow-soft)' 
                    : '0 0 12px rgba(139, 69, 19, 0.2), 0 2px 8px var(--shadow-soft)'
                }}>
                  <div style={{ marginBottom: '8px' }}><strong>Товар {index + 1}:</strong> {item.productLink}</div>
                  {item.productSize && <div style={{ marginBottom: '8px' }}><strong>Размер:</strong> {item.productSize}</div>}
                  <div><strong>Количество:</strong> {item.quantity}</div>
                </div>
              ))}
            </div>
            
            <div style={{ 
              background: 'var(--bg-secondary)', 
              padding: '20px', 
              borderRadius: '16px', 
              marginBottom: '16px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 12px var(--shadow-soft)'
            }}>
              <div style={{ 
                color: 'var(--text-primary)', 
                fontSize: '1.1rem', 
                fontWeight: '600', 
                marginBottom: '15px',
                paddingBottom: '8px',
                borderBottom: '1px solid var(--border-color)'
              }}>
                Контактные данные:
              </div>
              <div style={{ lineHeight: '1.6' }}>
                <div style={{ marginBottom: '8px' }}><strong>Имя:</strong> {formData.name}</div>
                <div><strong>Телефон:</strong> {formData.phone}</div>
              </div>
            </div>
            
            <div style={{ 
              background: 'var(--bg-secondary)', 
              padding: '20px', 
              borderRadius: '16px', 
              marginBottom: '16px',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 12px var(--shadow-soft)'
            }}>
              <div style={{ 
                color: 'var(--text-primary)', 
                fontSize: '1.1rem', 
                fontWeight: '600', 
                marginBottom: '15px',
                paddingBottom: '8px',
                borderBottom: '1px solid var(--border-color)'
              }}>
                Доставка:
              </div>
              <div style={{ lineHeight: '1.6' }}>
                <div style={{ marginBottom: '8px' }}><strong>Адрес:</strong> {formData.address}</div>
                <div><strong>Пункт выдачи:</strong> {formData.pickupPoint}</div>
              </div>
            </div>
            
            {formData.comments && (
              <div style={{ 
                background: 'var(--bg-secondary)', 
                padding: '20px', 
                borderRadius: '16px', 
                marginBottom: '16px',
                border: '1px solid var(--border-color)',
                boxShadow: '0 4px 12px var(--shadow-soft)'
              }}>
                <div style={{ 
                  color: 'var(--text-primary)', 
                  fontSize: '1.1rem', 
                  fontWeight: '600', 
                  marginBottom: '15px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--border-color)'
                }}>
                  Комментарии:
                </div>
                <div style={{ lineHeight: '1.6' }}>
                  {formData.comments}
                </div>
              </div>
            )}
            
          </div>
        </StepContent>


        <ButtonGroup>
          {currentStep > 1 && (
            <Button 
              type="button" 
              onMouseDown={handleBack} 
              $variant="secondary"
            >
              Назад
            </Button>
          )}
          
          {currentStep < steps.length ? (
            <Button 
              type="button" 
              onMouseDown={handleNext} 
              $variant="primary"
            >
              Далее
            </Button>
          ) : (
            <Button 
              type="button" 
              onMouseDown={handleSubmit}
              $variant="primary" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Оформить заказ'}
            </Button>
          )}
        </ButtonGroup>
      </Form>

      {/* Модальное окно успеха - показывается только после успешной отправки заказа */}
      {showSuccessModal && currentStep === 4 && !isSubmitting && (
        <ModalOverlay $modalPosition={successModalPosition} onClick={() => {
          setShowSuccessModal(false);
          onModalStateChange?.(false);
          document.body.style.overflow = '';
        }}>
          <SuccessModal 
            $modalPosition={successModalPosition} 
            onClick={(e) => e.stopPropagation()}
            style={{
              '--scroll-position': `${window.pageYOffset || document.documentElement.scrollTop}px`
            } as React.CSSProperties}
          >
            <SuccessHeader>
              <SuccessTitle>Заказ оформлен!</SuccessTitle>
            </SuccessHeader>
            <SuccessBody>
              <SuccessIcon>🎉</SuccessIcon>
              <SuccessMessage>
                Ваш заказ успешно создан! Менеджер свяжется с вами в ближайшее время для подтверждения и оплаты.
              </SuccessMessage>
              
              {/* Tracking Number */}
              {formData.trackingNumber && (
                <div style={{
                  margin: '20px 0',
                  padding: '16px',
                  background: 'linear-gradient(135deg, rgba(162, 59, 59, 0.1), rgba(157, 78, 61, 0.05))',
                  borderRadius: '12px',
                  border: '2px solid var(--matte-red)',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '1rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '8px',
                    fontWeight: '500'
                  }}>
                    🔍 Номер отслеживания:
                  </div>
                  <div 
                    onClick={handleCopyTrackingNumber}
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 'bold',
                      color: 'var(--matte-red)',
                      fontFamily: 'JetBrains Mono, monospace',
                      letterSpacing: '2px',
                      cursor: 'pointer',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease',
                      backgroundColor: 'transparent',
                      border: '1px solid transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                      e.currentTarget.style.borderColor = 'var(--matte-red)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                  >
                    {formData.trackingNumber}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    marginTop: '8px'
                  }}>
                    Сохраните этот номер для отслеживания заказа
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    marginTop: '4px',
                    fontStyle: 'italic'
                  }}>
                    💡 Нажмите на номер для копирования
                  </div>
                </div>
              )}
              
              <CloseButton onClick={handleCloseSuccessModal}>
                Супер!
              </CloseButton>
            </SuccessBody>
          </SuccessModal>
        </ModalOverlay>
      )}

      {/* Модальное окно с видео-инструкцией */}
      {showVideoModal && (
        <VideoModalOverlay $modalPosition={videoModalPosition} onClick={handleCloseVideoModal}>
          <VideoModal 
            $modalPosition={videoModalPosition}
            style={{
              '--scroll-position': `${window.pageYOffset || document.documentElement.scrollTop}px`
            } as React.CSSProperties}
            onClick={(e) => e.stopPropagation()}
          >
            <VideoHeader>
              <VideoTitle>Видео-инструкция</VideoTitle>
              <VideoCloseIcon onClick={handleCloseVideoModal} $isDark={isDarkTheme}>
                ×
              </VideoCloseIcon>
            </VideoHeader>
            <VideoBody>
              <VideoText>
                Смотрите пошаговую инструкцию по оформлению заказа
              </VideoText>
            {!videoError && (
              <VideoGuideHint>
                Если видео не загружается, нажмите <strong>«Показать текстовую инструкцию»</strong>
              </VideoGuideHint>
            )}
            {!videoError ? (
              <VideoPlayer 
                controls 
                preload="metadata"
                onError={(e) => {
                  console.log('Видео не загрузилось, показываем текстовую инструкцию');
                  setVideoError(true);
                }}
                onLoadStart={() => {
                  console.log('Начинаем загрузку видео...');
                }}
                onCanPlay={() => {
                  console.log('Видео готово к воспроизведению');
                }}
              >
                <source src="/images/tutorial.mp4" type="video/mp4" />
                <source src="/images/tutorial.MOV" type="video/quicktime" />
                Ваш браузер не поддерживает воспроизведение видео.
              </VideoPlayer>
            ) : (
              <VideoGuideFallback>
                <VideoGuideList>
                  <VideoGuideItem>
                    <VideoGuideItemContent>
                      Выберите интересующий товар в <strong>Poizon / Dewu</strong> и откройте карточку.
                    </VideoGuideItemContent>
                  </VideoGuideItem>
                  <VideoGuideItem>
                    <VideoGuideItemContent>
                      Скопируйте ссылку на товар из приложения.
                    </VideoGuideItemContent>
                  </VideoGuideItem>
                  <VideoGuideItem>
                    <VideoGuideItemContent>
                      Выберите подходящий размер и количество позиций.
                    </VideoGuideItemContent>
                  </VideoGuideItem>
                  <VideoGuideItem>
                    <VideoGuideItemContent>
                      Заполните контактные данные, чтобы менеджер смог связаться с вами.
                    </VideoGuideItemContent>
                  </VideoGuideItem>
                  <VideoGuideItem>
                    <VideoGuideItemContent>
                      Укажите адрес доставки или пункт выдачи и подтвердите заказ.
                    </VideoGuideItemContent>
                  </VideoGuideItem>
                </VideoGuideList>
                <VideoGuideHint>
                  📞 Нужна помощь? Свяжитесь с нашим менеджером в Telegram.
                  <VideoHintActions>
                    <VideoHintButton
                      onClick={() => {
                        HapticFeedback.selection();
                        if ((window as any).Telegram?.WebApp?.openTelegramLink) {
                          (window as any).Telegram.WebApp.openTelegramLink('https://t.me/poizonic_manager');
                        } else {
                          window.open('https://t.me/poizonic_manager', '_blank');
                        }
                      }}
                    >
                      Связаться
                    </VideoHintButton>
                  </VideoHintActions>
                </VideoGuideHint>
              </VideoGuideFallback>
            )}
            {!videoError && (
              <VideoCloseButton 
                onClick={() => {
                  HapticFeedback.light();
                  setVideoError(true);
                }}
                style={{ 
                  background: 'var(--sand)', 
                  color: 'var(--text-primary)',
                  marginRight: '10px'
                }}
              >
                Показать текстовую инструкцию
              </VideoCloseButton>
            )}
            {!videoError && (
              <VideoGuideHint style={{ marginTop: '24px' }}>
                📞 Нужна помощь? Свяжитесь с нашим менеджером в Telegram.
                <VideoHintActions>
                  <VideoHintButton
                    onClick={() => {
                      HapticFeedback.selection();
                      if ((window as any).Telegram?.WebApp?.openTelegramLink) {
                        (window as any).Telegram.WebApp.openTelegramLink('https://t.me/poizonic_manager');
                      } else {
                        window.open('https://t.me/poizonic_manager', '_blank');
                      }
                    }}
                  >
                    Связаться
                  </VideoHintButton>
                </VideoHintActions>
              </VideoGuideHint>
            )}
            </VideoBody>
          </VideoModal>
        </VideoModalOverlay>
      )}

      {/* Модальное окно с помощью по поиску ссылки */}
      {showLinkHelpModal && (
        <VideoModalOverlay $modalPosition={linkHelpModalPosition} onClick={handleCloseLinkHelpModal}>
          <LinkHelpModal 
            $modalPosition={linkHelpModalPosition}
            style={{
              '--scroll-position': `${window.pageYOffset || document.documentElement.scrollTop}px`
            } as React.CSSProperties}
            onClick={(e) => e.stopPropagation()}
          >
            <LinkHelpHeader>
              <LinkHelpTitle>Где найти ссылку</LinkHelpTitle>
              <VideoCloseIcon onClick={handleCloseLinkHelpModal} $isDark={isDarkTheme}>
                ×
              </VideoCloseIcon>
            </LinkHelpHeader>
            <LinkHelpBody>
              <LinkHelpText>
                <LinkHelpList>
                  <LinkHelpItem>
                    <LinkHelpItemContent>
                      Нажмите на кнопку <strong>справа сверху</strong> (она отмечена на фото)
                    </LinkHelpItemContent>
                  </LinkHelpItem>
                  <LinkHelpItem>
                    <LinkHelpItemContent>
                      Выберите <strong>вторую слева кнопку</strong> со значком скрепки — ссылка автоматически скопируется в буфер обмена
                    </LinkHelpItemContent>
                  </LinkHelpItem>
                </LinkHelpList>
              </LinkHelpText>
              <LinkHelpImage 
                src="/images/HelpImage.JPEG" 
                alt="Инструкция по поиску ссылки"
                onError={(e) => {
                  console.log('Изображение не загрузилось');
                  e.currentTarget.style.display = 'none';
                }}
              />
            </LinkHelpBody>
          </LinkHelpModal>
        </VideoModalOverlay>
      )}
    </FormContainer>
  );
};

export default OrderForm;