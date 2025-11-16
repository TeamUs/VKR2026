import React, { useState, useLayoutEffect } from 'react';
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
    transform: translateY(-50%) translateX(-50%) scale(0.9); 
    opacity: 0; 
  }
  to { 
    transform: translateY(-50%) translateX(-50%) scale(1); 
    opacity: 1; 
  }
`;

const InstructionsContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  padding: 0px 0px 100px 0px;
  position: relative;
  z-index: 1;
  overflow: hidden;
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
    background: var(--bg-secondary);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h1`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  color: var(--text-primary);
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0;
  text-align: center;
  flex: 1;

  @media (max-width: 480px) {
    font-size: 1.2rem;
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


const Step = styled.div`
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid var(--border-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    border-color: var(--matte-terracotta);
  }

  @media (max-width: 480px) {
    padding: 15px;
    margin-bottom: 15px;
  }
`;

const StepHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
  z-index: 2;
`;

const StepNumber = styled.div`
  background: var(--matte-red);
  color: var(--bg-primary);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-right: 15px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    width: 35px;
    height: 35px;
    font-size: 1rem;
    margin-right: 12px;
  }
`;

const StepTitle = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  color: var(--text-primary);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.3;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const StepDescription = styled.p`
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 15px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.95rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 12px;
  }
`;

const StepList = styled.ul`
  color: var(--text-secondary);
  line-height: 1.5;
  padding-left: 0;
  margin-bottom: 15px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.95rem;
  counter-reset: step-counter;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 12px;
  }
`;

const StepListItem = styled.li`
  margin-bottom: 8px;
  position: relative;
  padding: 10px 14px 10px 24px;
  background: var(--bg-card);
  border-radius: 6px;
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
  font-size: 0.9rem;
  line-height: 1.4;

  &:hover {
    border-color: var(--matte-red);
    box-shadow: 0 2px 6px var(--shadow-soft);
    transform: translateX(2px);
  }

  &::before {
    content: counter(step-counter);
    counter-increment: step-counter;
    color: var(--matte-red);
    font-weight: bold;
    position: absolute;
    left: 6px;
    top: 50%;
    transform: translateY(-50%);
    background: var(--bg-primary);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    border: 1px solid var(--matte-red);
  }

  @media (max-width: 480px) {
    margin-bottom: 6px;
    padding: 8px 12px 8px 20px;
    font-size: 0.85rem;
    
    &::before {
      left: 4px;
      width: 14px;
      height: 14px;
      font-size: 0.65rem;
    }
  }
`;

const StepCard = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  margin-bottom: 25px;
  overflow: hidden;
  margin: 0 16px 25px 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    border-color: var(--matte-terracotta);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StepCardHeader = styled.button`
  width: 100%;
  padding: 20px;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  
  &:hover {
    background: transparent;
  }
`;

const StepCardContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-right: 15px;
`;

const StepCardIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--matte-red);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bg-primary);
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 16px;
  flex-shrink: 0;
  box-shadow: 0 2px 8px var(--shadow-soft);
`;

const StepCardText = styled.div`
  flex: 1;
`;

const StepCardTitle = styled.h4`
  margin: 0 0 4px 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  line-height: 1.5;
`;

const StepCardSubtitle = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.4;
`;

const StepCardToggle = styled.span<{ $isExpanded: boolean }>`
  font-size: 1.2rem;
  color: var(--matte-terracotta);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => props.$isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const StepCardBody = styled.div<{ $isExpanded: boolean }>`
  max-height: ${props => props.$isExpanded ? '500px' : '0'};
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const StepCardActions = styled.div`
  padding: 20px;
  color: var(--text-secondary);
  line-height: 1.6;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.95rem;
  background: transparent;
`;

const ActionItem = styled.div<{ $isDark?: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 12px;
  background: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.9)'};
  border-radius: 0 12px 12px 0;
  border: 1px solid ${props => props.$isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  
  &:hover {
    background: ${props => props.$isDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.95)'};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-color: var(--matte-red);
  }
  
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
    background: var(--matte-red);
    border-radius: 0 2px 2px 0;
  }
`;

const ActionIcon = styled.div<{ $isDark?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--matte-red);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$isDark ? '#000000' : '#FFFFFF'};
  font-size: 0.8rem;
  font-weight: bold;
  margin-right: 14px;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(162, 59, 59, 0.3);
  border: 2px solid ${props => props.$isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)'};
`;

const ActionText = styled.span<{ $isDark?: boolean }>`
  font-size: 0.95rem;
  color: var(--text-primary);
  line-height: 1.5;
  font-weight: 500;
  flex: 1;
`;

const QuickActionButton = styled.button`
  width: calc(100% - 32px);
  background: var(--matte-red);
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  color: var(--bg-primary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 12px 16px 25px 16px;
  
  &:hover {
    transform: translateY(-2px);
    background: var(--terracotta);
    box-shadow: 0 4px 12px var(--shadow-soft);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const DownloadSection = styled.div`
  margin-top: 20px;
  position: relative;
  z-index: 2;
`;

const DownloadTitle = styled.h4`
  color: var(--text-primary);
  margin-bottom: 15px;
  font-size: 1rem;
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-weight: 600;

  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 12px;
  }
`;

const DownloadButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 15px;

  @media (max-width: 480px) {
    gap: 10px;
    margin-bottom: 12px;
  }
`;

const DownloadButton = styled.button`
  flex: 1;
  background: var(--matte-red);
  border: 1px solid var(--matte-red);
  border-radius: 12px;
  padding: 12px 16px;
  color: var(--bg-primary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
  pointer-events: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  
  &:hover {
    transform: translateY(-2px);
    background: var(--terracotta);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    padding: 10px 14px;
    font-size: 0.85rem;
  }
`;

const OrderButton = styled.button`
  width: 100%;
  background: var(--matte-red);
  border: 1px solid var(--matte-red);
  border-radius: 12px;
  padding: 15px 20px;
  color: var(--bg-primary);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-top: 20px;
  position: relative;
  z-index: 10;
  pointer-events: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  
  &:hover {
    transform: translateY(-2px);
    background: var(--terracotta);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    padding: 12px 18px;
    font-size: 0.95rem;
    margin-top: 15px;
  }
`;

const VideoSection = styled.div`
  margin-top: 20px;
  text-align: center;
  position: relative;
  z-index: 2;
`;

const VideoButton = styled.button`
  background: var(--matte-red);
  border: 1px solid var(--matte-red);
  border-radius: 12px;
  padding: 12px 20px;
  color: var(--bg-primary);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
  pointer-events: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  
  &:hover {
    transform: translateY(-2px);
    background: var(--terracotta);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    padding: 10px 18px;
    font-size: 0.9rem;
  }
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
  padding: 12px 20px 12px 20px;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
`;

const VideoModal = styled.div<{ $modalPosition: { top: string; transform: string } }>`
  background: var(--bg-card);
  border-radius: 20px;
  padding: 0;
  max-width: 95vw;
  max-height: calc(100vh - 40px);
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
  padding: 20px 24px;
`;

const VideoCloseIcon = styled.button`
  background: var(--bg-secondary);
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
  flex-shrink: 0;

  &:hover {
    background: var(--matte-red);
    color: white;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const VideoText = styled.p`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 20px 0;
`;

const VideoPlayer = styled.video`
  width: 100%;
  max-width: 350px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--shadow-soft);
  margin: 20px auto 0;
  display: block;
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

const VideoGuideFallback = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  text-align: left;
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

const CloseButton = styled.button`
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

const ContactSection = styled.div<{ $isDark?: boolean }>`
  background: transparent;
  border: 2px solid var(--matte-red);
  border-radius: 16px;
  padding: 10px;
  margin: 20px 20px 0 20px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 15px rgba(162, 59, 59, 0.3), 0 2px 8px var(--shadow-soft);
  position: relative;
  z-index: 2;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(162, 59, 59, 0.4), 0 4px 16px var(--shadow-card);
    border-color: var(--matte-red);
  }

  @media (max-width: 480px) {
    margin: 20px 15px 0 15px;
  }
`;

const ContactTitle = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 1.1rem;
  font-weight: 600;
`;

const ContactText = styled.p`
  color: var(--text-secondary);
  line-height: 1.4;
  margin-bottom: 12px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.95rem;
`;

const ContactButton = styled.button`
  background: var(--matte-red);
  border: 1px solid var(--matte-red);
  border-radius: 12px;
  padding: 10px 20px;
  color: var(--bg-primary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    background: var(--terracotta);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

interface InstructionsProps {
  onNavigate: (view: string) => void;
  toggleTheme: () => void;
  isDarkTheme: boolean;
  onModalStateChange?: (isOpen: boolean) => void;
}

const Instructions: React.FC<InstructionsProps> = ({ onNavigate, toggleTheme, isDarkTheme, onModalStateChange }) => {
  const handleDownload = (platform: 'android' | 'ios') => {
    HapticFeedback.selection();
    if (platform === 'android') {
      window.open('https://www.dewu.com/', '_blank');
    } else {
      window.open('https://apps.apple.com/ru/app/得物-得到美好事物/id1012871328', '_blank');
    }
  };

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: '50%', transform: 'translateY(-50%)' });
  const [expandedSteps, setExpandedSteps] = useState<{ [key: number]: boolean }>({});

  const handleVideoClick = () => {
    HapticFeedback.selection();
    setVideoError(false);
    
    setModalPosition({
      top: '50%',
      transform: 'translateY(-50%)'
    });
    
    setShowVideoModal(true);
    onModalStateChange?.(true);
    document.body.style.overflow = 'hidden';
  };

  const handleOrderClick = () => {
    HapticFeedback.selection();
    onNavigate('order');
  };

  const handleContactManager = () => {
    HapticFeedback.selection();
    if ((window as any).Telegram?.WebApp?.openTelegramLink) {
      (window as any).Telegram.WebApp.openTelegramLink('https://t.me/poizonic_manager');
    }
  };

  const toggleStep = (stepNumber: number) => {
    HapticFeedback.light();
    setExpandedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  return (
    <InstructionsContainer>
      <Header>
        <BackButton onClick={() => {
          HapticFeedback.selection();
          onNavigate('main');
        }}>
          ‹
        </BackButton>
        <Title>Инструкции</Title>
        <ThemeToggle onClick={toggleTheme}>
          <ToggleIcon $isDark={isDarkTheme}>🌙</ToggleIcon>
          <ToggleIconDark $isDark={isDarkTheme}>☀️</ToggleIconDark>
          <ToggleSlider $isDark={isDarkTheme}></ToggleSlider>
        </ThemeToggle>
      </Header>

      <StepCard>
          <StepCardHeader onClick={() => toggleStep(1)}>
            <StepCardContent>
              <StepCardIcon>1</StepCardIcon>
              <StepCardText>
                <StepCardTitle>Скачайте приложение Poizon</StepCardTitle>
                <StepCardSubtitle>Установите официальное приложение для поиска товаров</StepCardSubtitle>
              </StepCardText>
            </StepCardContent>
            <StepCardToggle $isExpanded={expandedSteps[1]}>▼</StepCardToggle>
          </StepCardHeader>
          <StepCardBody $isExpanded={expandedSteps[1]}>
            <StepCardActions>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>📱</ActionIcon>
                <ActionText $isDark={isDarkTheme}>Скачайте приложение для Android или iOS</ActionText>
              </ActionItem>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>🔍</ActionIcon>
                <ActionText $isDark={isDarkTheme}>Используйте для поиска товаров</ActionText>
              </ActionItem>
              <QuickActionButton onClick={() => handleDownload('android')}>
                Скачать для Android
              </QuickActionButton>
              <QuickActionButton onClick={() => handleDownload('ios')}>
                Скачать для iOS
              </QuickActionButton>
            </StepCardActions>
          </StepCardBody>
        </StepCard>

        <StepCard>
          <StepCardHeader onClick={() => toggleStep(2)}>
            <StepCardContent>
              <StepCardIcon>2</StepCardIcon>
              <StepCardText>
                <StepCardTitle>Найдите нужный товар</StepCardTitle>
                <StepCardSubtitle>Поиск и выбор товара в приложении Poizon</StepCardSubtitle>
              </StepCardText>
            </StepCardContent>
            <StepCardToggle $isExpanded={expandedSteps[2]}>▼</StepCardToggle>
          </StepCardHeader>
          <StepCardBody $isExpanded={expandedSteps[2]}>
            <StepCardActions>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>1</ActionIcon>
                <ActionText $isDark={isDarkTheme}>Откройте приложение Poizon</ActionText>
              </ActionItem>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>2</ActionIcon>
                <ActionText $isDark={isDarkTheme}>
                  Введите то, что ищите, или воспользуйтесь поиском по картинке
                </ActionText>
              </ActionItem>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>3</ActionIcon>
                <ActionText $isDark={isDarkTheme}>Выберите нужный товар</ActionText>
              </ActionItem>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>4</ActionIcon>
                <ActionText $isDark={isDarkTheme}>Выберите размер и цвет товара</ActionText>
              </ActionItem>
            </StepCardActions>
          </StepCardBody>
        </StepCard>

        <StepCard>
          <StepCardHeader onClick={() => toggleStep(3)}>
            <StepCardContent>
              <StepCardIcon>3</StepCardIcon>
              <StepCardText>
                <StepCardTitle>Рассчитайте стоимость</StepCardTitle>
                <StepCardSubtitle>Узнайте стоимость вашего заказа</StepCardSubtitle>
              </StepCardText>
            </StepCardContent>
            <StepCardToggle $isExpanded={expandedSteps[3]}>▼</StepCardToggle>
          </StepCardHeader>
          <StepCardBody $isExpanded={expandedSteps[3]}>
            <StepCardActions>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>1</ActionIcon>
                <ActionText $isDark={isDarkTheme}>Откройте раздел "Расчет стоимости"</ActionText>
              </ActionItem>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>2</ActionIcon>
                <ActionText $isDark={isDarkTheme}>Выберите категорию товара</ActionText>
              </ActionItem>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>3</ActionIcon>
                <ActionText $isDark={isDarkTheme}>Введите цену в юанях</ActionText>
              </ActionItem>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>4</ActionIcon>
                <ActionText $isDark={isDarkTheme}>
                  Получите итоговую стоимость без учета доставки внутри РФ
                </ActionText>
              </ActionItem>
              <QuickActionButton onClick={() => onNavigate('calculator')}>
                Открыть калькулятор
              </QuickActionButton>
            </StepCardActions>
          </StepCardBody>
        </StepCard>

        <StepCard>
          <StepCardHeader onClick={() => toggleStep(4)}>
            <StepCardContent>
              <StepCardIcon>4</StepCardIcon>
              <StepCardText>
                <StepCardTitle>Оформите заказ</StepCardTitle>
                <StepCardSubtitle>Заполните форму заказа с данными товара</StepCardSubtitle>
              </StepCardText>
            </StepCardContent>
            <StepCardToggle $isExpanded={expandedSteps[4]}>▼</StepCardToggle>
          </StepCardHeader>
          <StepCardBody $isExpanded={expandedSteps[4]}>
            <StepCardActions>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>1</ActionIcon>
                <ActionText $isDark={isDarkTheme}>Откройте раздел "Сделать заказ"</ActionText>
              </ActionItem>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>2</ActionIcon>
                <ActionText $isDark={isDarkTheme}>Вставьте ссылку на товар</ActionText>
              </ActionItem>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>3</ActionIcon>
                <ActionText $isDark={isDarkTheme}>Укажите размер и количество</ActionText>
              </ActionItem>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>4</ActionIcon>
                <ActionText $isDark={isDarkTheme}>Укажите данные получателя</ActionText>
              </ActionItem>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>5</ActionIcon>
                <ActionText $isDark={isDarkTheme}>Выберите пункт выдачи</ActionText>
              </ActionItem>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>6</ActionIcon>
                <ActionText $isDark={isDarkTheme}>Проверьте данные и оформите заказ</ActionText>
              </ActionItem>
              <QuickActionButton onClick={handleOrderClick}>
                Сделать заказ
              </QuickActionButton>
            </StepCardActions>
          </StepCardBody>
        </StepCard>

        <StepCard>
          <StepCardHeader onClick={() => toggleStep(5)}>
            <StepCardContent>
              <StepCardIcon>5</StepCardIcon>
              <StepCardText>
                <StepCardTitle>Оплата и доставка</StepCardTitle>
                <StepCardSubtitle>Что происходит после оформления заказа</StepCardSubtitle>
              </StepCardText>
            </StepCardContent>
            <StepCardToggle $isExpanded={expandedSteps[5]}>▼</StepCardToggle>
          </StepCardHeader>
          <StepCardBody $isExpanded={expandedSteps[5]}>
            <StepCardActions>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>📞</ActionIcon>
                <ActionText $isDark={isDarkTheme}>Дождитесь сообщения от менеджера</ActionText>
              </ActionItem>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>💳</ActionIcon>
                <ActionText $isDark={isDarkTheme}>Менеджер отправит вам реквизиты для оплаты</ActionText>
              </ActionItem>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>💰</ActionIcon>
                <ActionText $isDark={isDarkTheme}>Оплатите заказ</ActionText>
              </ActionItem>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>🛍️</ActionIcon>
                <ActionText $isDark={isDarkTheme}>Мы выкупаем ваш заказ</ActionText>
              </ActionItem>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>📦</ActionIcon>
                <ActionText $isDark={isDarkTheme}>Мы будем оповещать вас обо всех движениях вашего заказа</ActionText>
              </ActionItem>
              <ActionItem $isDark={isDarkTheme}>
                <ActionIcon $isDark={isDarkTheme}>🚚</ActionIcon>
                <ActionText $isDark={isDarkTheme}>Ваш товар доставляется в указанный пункт выдачи</ActionText>
              </ActionItem>
            </StepCardActions>
          </StepCardBody>
        </StepCard>

        {/* Отдельная кнопка для видео-инструкции без дополнительного контейнера */}
        <QuickActionButton onClick={handleVideoClick}>
          🎥 Видео-инструкция по оформлению заказа
        </QuickActionButton>

        {/* Кнопка связи с менеджером */}
        <ContactSection $isDark={isDarkTheme}>
          <ContactTitle>Не нашли ответ на свой вопрос?</ContactTitle>
          <ContactText>
            Свяжитесь с нашим менеджером - мы всегда готовы помочь!
          </ContactText>
          <ContactButton onClick={handleContactManager}>
            Связаться с менеджером
          </ContactButton>
        </ContactSection>

      {/* Модальное окно с видео-инструкцией */}
      {showVideoModal && (
        <VideoModalOverlay 
          $modalPosition={modalPosition}
          onClick={() => {
            HapticFeedback.light();
            setShowVideoModal(false);
            onModalStateChange?.(false);
            document.body.style.overflow = '';
          }}
        >
          <VideoModal 
            $modalPosition={modalPosition}
            style={{
              '--scroll-position': `${window.pageYOffset || document.documentElement.scrollTop}px`
            } as React.CSSProperties}
            onClick={(e) => e.stopPropagation()}
          >
            <VideoHeader>
              <VideoTitle>Видео-инструкция</VideoTitle>
              <VideoCloseIcon onClick={() => {
                HapticFeedback.light();
                setShowVideoModal(false);
                onModalStateChange?.(false);
                document.body.style.overflow = '';
              }}>
                ×
              </VideoCloseIcon>
            </VideoHeader>
            <VideoBody>
              <VideoText>
                Смотрите пошаговую инструкцию по оформлению заказа
              </VideoText>
            <VideoPlayer 
              controls 
              preload="metadata"
              onError={() => {
                console.log('Видео не загрузилось');
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
            </VideoBody>
          </VideoModal>
        </VideoModalOverlay>
      )}
    </InstructionsContainer>
  );
};

export default Instructions;