import React, { useState, useEffect, Suspense } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import MainMenu from './components/MainMenu';
import OrderForm from './components/OrderForm';
import PriceCalculator from './components/PriceCalculator';
import FAQ from './components/FAQ';
import Instructions from './components/Instructions';
import ReferralSystem from './components/ReferralSystem';
import ExchangeRate from './components/ExchangeRate';
import AboutUs from './components/AboutUs';
import Reviews from './components/Reviews';
import BottomNavigation from './components/BottomNavigation';
import { HapticFeedback, isBackButtonSupported } from './utils/hapticFeedback';

// Lazy load new components
const Profile = React.lazy(() => import('./components/Profile'));
const YuanPurchase = React.lazy(() => import('./components/YuanPurchase'));
const AdminPanel = React.lazy(() => import('./components/AdminPanel'));
const TrackingForm = React.lazy(() => import('./components/TrackingForm'));

// Минималистичные анимации
const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const subtleGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 10px rgba(220, 20, 20, 0.2);
  }
  50% { 
    box-shadow: 0 0 15px rgba(220, 20, 20, 0.3);
  }
`;

// Потрясающий технологичный дизайн в китайском стиле с поддержкой тем
const GlobalStyle = createGlobalStyle`
  :root {
    /* Светлая тема - Дневная китайская деревня (вдохновлено референсом) */
    --bg-primary: #F5F2E8;
    --bg-secondary: #F9F6ED;
    --bg-card: rgba(230, 211, 179, 0.85);
    --text-primary: #2A2A2A;
    --text-secondary: #5D4E37;
    --text-accent: #A49784;
    --matte-red: #A23B3B;
    --terracotta: #B86B4B;
    --sand: #E6D3B3;
    --dark-beige: #A49784;
    --ink-black: #2A2A2A;
    --shadow-soft: rgba(162, 59, 59, 0.15);
    --shadow-card: rgba(164, 151, 132, 0.2);
    --glow-red: rgba(162, 59, 59, 0.3);
    --glow-terracotta: rgba(184, 107, 75, 0.5);
    --pattern-color: rgba(139, 69, 19, 0.8);
    --border-color: rgba(162, 59, 59, 0.2);
  }

  [data-theme="dark"] {
    /* Темная тема - Ночная китайская деревня */
    --bg-primary: #1A1A1A;
    --bg-secondary: #2A2A2A;
    --bg-card: rgba(42, 42, 42, 0.9);
    --text-primary: #E6D3B3;
    --text-secondary: #A49784;
    --text-accent: #B86B4B;
    --matte-red: #C44D4D;
    --terracotta: #D18A6B;
    --sand: #8B7D6B;
    --dark-beige: #6B5B47;
    --ink-black: #E6D3B3;
    --shadow-soft: rgba(196, 77, 77, 0.25);
    --shadow-card: rgba(107, 91, 71, 0.3);
    --glow-red: rgba(196, 77, 77, 0.4);
    --glow-terracotta: rgba(209, 138, 107, 0.6);
    --pattern-color: rgba(209, 138, 107, 0.5);
    --border-color: rgba(196, 77, 77, 0.3);
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  body {
    font-family: 'Inter', 'Noto Sans SC', Arial, sans-serif;
    background: var(--bg-primary);
    background-image: 
      url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><pattern id="paper-texture" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse"><rect width="400" height="400" fill="%23F5F2E8"/><g opacity="0.03"><circle cx="50" cy="50" r="1" fill="%23A49784"/><circle cx="150" cy="100" r="0.5" fill="%23B86B4B"/><circle cx="300" cy="200" r="1.5" fill="%23A23B3B"/><circle cx="100" cy="300" r="0.8" fill="%23A49784"/><circle cx="350" cy="350" r="1.2" fill="%23B86B4B"/></g><g opacity="0.02"><path d="M20,20 Q50,10 80,20 T140,20" stroke="%23A49784" stroke-width="0.5" fill="none"/><path d="M200,50 Q230,40 260,50 T320,50" stroke="%23B86B4B" stroke-width="0.3" fill="none"/><path d="M50,200 Q80,190 110,200 T170,200" stroke="%23A23B3B" stroke-width="0.4" fill="none"/></g></pattern></defs><rect width="400" height="400" fill="url(%23paper-texture)"/></svg>'),
      url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><pattern id="chinese-clouds" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse"><g opacity="0.04"><path d="M20,40 Q30,20 50,30 Q70,10 90,25 Q110,5 130,20 Q150,0 170,15 Q190,5 200,25 L200,40 Z" fill="%23A49784"/><path d="M0,80 Q20,60 40,75 Q60,55 80,70 Q100,50 120,65 Q140,45 160,60 Q180,40 200,55 L200,80 Z" fill="%23B86B4B"/><path d="M10,120 Q30,100 50,115 Q70,95 90,110 Q110,90 130,105 Q150,85 170,100 Q190,80 200,95 L200,120 Z" fill="%23A23B3B"/></g></pattern></defs><rect width="200" height="200" fill="url(%23chinese-clouds)"/></svg>');
    color: var(--text-primary);
    overflow-x: hidden;
    position: relative;
    line-height: 1.6;
    font-weight: 400;
    min-height: 100vh;
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Плавающие иероглифы */
  .floating-hieroglyphs {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  .hieroglyph {
    position: absolute;
    font-family: 'Noto Sans SC', serif;
    color: var(--pattern-color);
    text-shadow: 
      0 0 6px var(--glow-terracotta),
      0 0 12px var(--glow-terracotta);
    animation: floatChaotic 25s ease-in-out infinite;
    opacity: 0.15;
    font-weight: 500;
    font-size: 1.4rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 0;
    filter: none;
  }

  .hieroglyph:nth-child(1) { top: 10%; left: 5%; font-size: 2rem; animation-delay: 0s; }
  .hieroglyph:nth-child(2) { top: 20%; left: 15%; font-size: 1.5rem; animation-delay: 2s; }
  .hieroglyph:nth-child(3) { top: 30%; left: 8%; font-size: 1.8rem; animation-delay: 4s; }


  .hieroglyph:nth-child(4) { top: 15%; left: 25%; font-size: 1.2rem; animation-delay: 6s; }

  .hieroglyph:nth-child(5) { top: 25%; left: 35%; font-size: 1.6rem; animation-delay: 8s; }
  .hieroglyph:nth-child(6) { top: 40%; left: 12%; font-size: 1.4rem; animation-delay: 10s; }
  .hieroglyph:nth-child(7) { top: 50%; left: 28%; font-size: 1.7rem; animation-delay: 12s; }
  .hieroglyph:nth-child(8) { top: 60%; left: 18%; font-size: 1.3rem; animation-delay: 14s; }
  .hieroglyph:nth-child(9) { top: 70%; left: 32%; font-size: 1.5rem; animation-delay: 16s; }
  .hieroglyph:nth-child(10) { top: 80%; left: 22%; font-size: 1.1rem; animation-delay: 18s; }
  .hieroglyph:nth-child(11) { top: 5%; right: 10%; font-size: 1.8rem; animation-delay: 3s; }
  .hieroglyph:nth-child(12) { top: 18%; right: 20%; font-size: 1.4rem; animation-delay: 5s; }
  .hieroglyph:nth-child(13) { top: 35%; right: 15%; font-size: 1.6rem; animation-delay: 7s; }
  .hieroglyph:nth-child(14) { top: 45%; right: 25%; font-size: 1.2rem; animation-delay: 9s; }
  .hieroglyph:nth-child(15) { top: 55%; right: 12%; font-size: 1.7rem; animation-delay: 11s; }
  .hieroglyph:nth-child(16) { top: 65%; right: 22%; font-size: 1.3rem; animation-delay: 13s; }
  .hieroglyph:nth-child(17) { top: 75%; right: 18%; font-size: 1.5rem; animation-delay: 15s; }
  .hieroglyph:nth-child(18) { top: 85%; right: 28%; font-size: 1.1rem; animation-delay: 17s; }

  @keyframes floatUpDown {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }

  @keyframes floatChaotic {
    0% { transform: translate(0px, 0px) rotate(0deg); }
    25% { transform: translate(10px, -5px) rotate(1deg); }
    50% { transform: translate(-5px, -10px) rotate(-1deg); }
    75% { transform: translate(-8px, 5px) rotate(0.5deg); }
    100% { transform: translate(0px, 0px) rotate(0deg); }
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.02em;
    text-shadow: 0 0 20px var(--glow-gold);
  }

  /* Минималистичные стили в китайском стиле */
  .mystic-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    box-shadow: 
      0 4px 20px var(--shadow-card),
      0 2px 8px var(--shadow-soft);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }

  .mystic-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, var(--imperial-red), var(--dragon-gold), var(--tech-blue), var(--mystic-purple));
    border-radius: 24px;
    padding: 2px;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  .mystic-card:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 30px var(--shadow-card),
      0 4px 12px var(--shadow-soft),
      0 0 0 1px var(--border-color);
  }

  .mystic-card:hover::before {
    opacity: 1;
  }

  /* Минималистичные кнопки в китайском стиле */
  .dragon-button {
    background: var(--matte-red);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    color: var(--bg-primary);
    font-weight: 600;
    font-family: 'Noto Sans SC', 'Inter', sans-serif;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 
      0 4px 12px var(--shadow-soft),
      0 2px 6px var(--shadow-card);
    letter-spacing: 0.02em;
    position: relative;
    overflow: hidden;
  }

  .dragon-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s ease;
  }

  .dragon-button:hover {
    transform: translateY(-5px);
    background: var(--terracotta);
    box-shadow: 
      0 12px 35px var(--shadow-soft),
      0 6px 16px var(--shadow-card);
    border-color: var(--dark-beige);
    color: var(--bg-primary);
  }

  .dragon-button:hover::before {
    left: 100%;
  }

  .dragon-button:active {
    transform: translateY(0) scale(1.02);
  }

  .tech-button {
    background: linear-gradient(135deg, var(--tech-blue) 0%, #0099CC 50%, var(--tech-blue) 100%);
    border: 1px solid rgba(0, 191, 255, 0.3);
    color: var(--silk-white);
    box-shadow: 
      0 4px 20px var(--shadow-mystic),
      0 0 20px var(--glow-tech),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  .tech-button:hover {
    background: linear-gradient(135deg, #00CCFF 0%, var(--tech-blue) 50%, #0099CC 100%);
    box-shadow: 
      0 8px 30px var(--shadow-mystic),
      0 0 40px var(--glow-tech),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  /* Акцентные элементы */
  .imperial-accent {
    color: var(--imperial-red);
    font-family: 'Noto Sans SC', serif;
    font-weight: 700;
    text-shadow: 0 0 10px var(--glow-red);
  }

  .gold-accent {
    color: var(--dragon-gold);
    font-family: 'Noto Sans SC', serif;
    font-weight: 600;
    text-shadow: 0 0 8px var(--glow-gold);
  }

  /* Декоративные элементы */
  .mystic-seal {
    position: absolute;
    width: 60px;
    height: 60px;
    background: linear-gradient(45deg, var(--imperial-red), var(--dragon-gold));
    border-radius: 12px;
    opacity: 0.1;
    transform: rotate(45deg);
    box-shadow: 0 0 20px var(--glow-gold);
  }

  .dragon-watermark {
    position: fixed;
    top: 15%;
    right: 5%;
    width: 300px;
    height: 200px;
    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"><defs><linearGradient id="dragonGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23DC143C"/><stop offset="50%" stop-color="%23FFD700"/><stop offset="100%" stop-color="%2300BFFF"/></linearGradient><filter id="dragonGlow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g><path d="M30 100 C50 80 80 70 120 80 C160 70 200 80 220 100 C200 120 160 130 120 120 C80 130 50 120 30 100 Z" fill="url(%23dragonGrad)" filter="url(%23dragonGlow)" opacity="0.15"/><circle cx="100" cy="90" r="4" fill="%23FFD700" filter="url(%23dragonGlow)"/><circle cx="140" cy="90" r="4" fill="%23FFD700" filter="url(%23dragonGlow)"/></g></svg>');
    background-size: contain;
    background-repeat: no-repeat;
    pointer-events: none;
    z-index: -1;
    animation: dragonFloat 6s ease-in-out infinite;
  }

  @keyframes dragonFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(2deg); }
  }
  
  /* Технологичный скроллбар */
  ::-webkit-scrollbar {
    width: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(26, 26, 46, 0.3);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, var(--imperial-red), var(--dragon-gold));
    border-radius: 4px;
    box-shadow: 0 0 10px var(--glow-red);
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, var(--dragon-gold), var(--tech-blue));
    box-shadow: 0 0 15px var(--glow-gold);
  }

  /* Унифицированные стили для модальных окон помощи */
  .help-modal {
    background: var(--bg-card);
    border-radius: 20px;
    padding: 20px;
    max-width: 80vw;
    max-height: 80vh;
    width: 80%;
    text-align: center;
    border: 1px solid var(--border-color);
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.3),
      0 10px 20px var(--shadow-card);
    overflow-y: auto;
  }

  .help-modal-title {
    font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 16px 0;
  }

  .help-modal-text {
    font-family: 'Inter', Arial, sans-serif;
    font-size: 1rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0 0 20px 0;
  }

  .help-modal-image {
    width: 100%;
    max-width: 350px;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 4px 12px var(--shadow-soft);
    margin: 0 auto;
    display: block;
  }

  .help-modal-video {
    width: 100%;
    max-width: 350px;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 4px 12px var(--shadow-soft);
    margin: 0 auto;
    display: block;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  background: var(--bg-primary);
  position: relative;
  animation: ${fadeIn} 0.8s ease-out forwards;
  transition: all 0.5s ease;
`;

// Китайский тумблер для переключения тем
const ThemeToggle = styled.div`
  position: fixed;
  top: 40px;
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
    transform: scale(1.05);
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

const LoadingSpinner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: ${fadeIn} 0.8s ease-out forwards;
  transition: all 0.5s ease;
`;

const loadingPulse = keyframes`
  0%, 100% { 
    transform: scale(1);
    opacity: 0.8;
  }
  50% { 
    transform: scale(1.2);
    opacity: 1;
  }
`;

const loadingRotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const loadingGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px var(--glow-red);
  }
  50% { 
    box-shadow: 0 0 30px var(--glow-red), 0 0 40px var(--glow-terracotta);
  }
`;

const loadingBounce = keyframes`
  0%, 100% { 
    transform: translateY(0px);
  }
  50% { 
    transform: translateY(-10px);
  }
`;

const dragonFloat = keyframes`
  0%, 100% { 
    transform: translateY(0px) rotate(0deg) scale(1);
    opacity: 0.8;
  }
  25% { 
    transform: translateY(-8px) rotate(2deg) scale(1.05);
    opacity: 1;
  }
  50% { 
    transform: translateY(-12px) rotate(0deg) scale(1.1);
    opacity: 0.9;
  }
  75% { 
    transform: translateY(-6px) rotate(-1deg) scale(1.05);
    opacity: 1;
  }
`;

const chineseGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px var(--glow-red), 0 0 30px var(--glow-terracotta);
  }
  50% { 
    box-shadow: 0 0 30px var(--glow-red), 0 0 40px var(--glow-terracotta), 0 0 50px var(--glow-red);
  }
`;

const lotusBloom = keyframes`
  0% { 
    transform: scale(0.8) rotate(0deg);
    opacity: 0.7;
  }
  50% { 
    transform: scale(1.1) rotate(180deg);
    opacity: 1;
  }
  100% { 
    transform: scale(0.9) rotate(360deg);
    opacity: 0.8;
  }
`;

const LoadingIcon = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 50px auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${dragonFloat} 3s ease-in-out infinite;
`;

const LoadingCircle = styled.div`
  width: 80px;
  height: 80px;
  border: 3px solid var(--border-color);
  border-top: 3px solid var(--matte-red);
  border-radius: 50%;
  animation: ${loadingRotate} 1.5s linear infinite;
  position: relative;
  box-shadow: 0 0 20px var(--glow-red);
`;

const LoadingRing = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border: 2px solid var(--glow-terracotta);
  border-radius: 50%;
  animation: ${loadingRotate} 2s linear infinite reverse;
  opacity: 0.7;
  box-shadow: 0 0 15px var(--glow-terracotta);
`;

const LoadingLotus = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, var(--matte-red) 0%, var(--terracotta) 50%, transparent 70%);
  border-radius: 50%;
  animation: ${lotusBloom} 2.5s ease-in-out infinite;
  opacity: 0.8;
  box-shadow: 0 0 25px var(--glow-red);
`;

const LoadingPetals = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background: conic-gradient(
    var(--matte-red) 0deg,
    var(--terracotta) 60deg,
    var(--matte-red) 120deg,
    var(--terracotta) 180deg,
    var(--matte-red) 240deg,
    var(--terracotta) 300deg,
    var(--matte-red) 360deg
  );
  border-radius: 50%;
  animation: ${loadingRotate} 3s linear infinite;
  opacity: 0.6;
  filter: blur(1px);
`;

const textGlow = keyframes`
  0% { text-shadow: 0 0 15px var(--glow-terracotta); }
  100% { text-shadow: 0 0 25px var(--glow-red), 0 0 35px var(--glow-terracotta); }
`;

const LoadingText = styled.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: -0.02em;
  text-shadow: 0 0 15px var(--glow-terracotta);
  animation: textGlow 3s ease-in-out infinite alternate;
  text-align: center;
`;

const LoadingSubtext = styled.div`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-top: 20px;
  opacity: 0.95;
  font-weight: 550;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  text-align: center;
  line-height: 1.4;
`;

// Типы для Telegram Web App
interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  photo_url?: string;
}

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  showAlert: (message: string, callback?: () => void) => void;
  openTelegramLink: (url: string) => void;
  MainButton: {
    text: string;
    isVisible: boolean;
    isActive: boolean;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    onClick: (callback: () => void) => void;
  };
  BackButton: {
    isVisible: boolean;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
  initDataUnsafe?: {
    user?: TelegramUser;
  };
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
  };
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

// Состояние приложения
type AppView = 
  | 'main'
  | 'order'
  | 'calculator'
  | 'faq'
  | 'instructions'
  | 'referral'
  | 'exchange-rate'
  | 'about'
  | 'reviews'
  | 'profile'
  | 'yuan-purchase';

type TabView = 'main' | 'profile' | 'yuan';

// Пул мудростей о доставке из Китая для экрана загрузки
const chineseWisdom = [
  "Из Поднебесной — прямо к тебе.",
  "Восточный ветер несёт удачу.",
  "Путь вещей короток с нами.",
  "Быстро. Выгодно. Для тебя.",
  "Легенды Китая — в твоих руках.",
  "Восток ближе, чем кажется.",
  "Доставляем, пока кипит чай.",
  "Твои вещи уже в пути.",
  "Где выгода — там и ты.",
  "Сокровища Востока — твои сегодня.",
  "Пойзон ведёт — вещь идёт.",
  "Удача на крыльях доставки.",
  "Китай ближе, чем ты думаешь.",
  "Вещь ждёт только тебя.",
  "Гармония покупок начинается здесь.",
  "Быстрая дорога — верный выбор.",
  "Твой заказ уже шагает.",
  "Из Китая с любовью.",
  "Вещь обретает хозяина мгновенно.",
  "Ветер Поднебесной приносит тебе.",
  "Каждый клик — к выгоде.",
  "Пусть вещь найдёт тебя.",
  "Восточная выгода в каждом заказе.",
  "Время летит — и вещи тоже.",
  "Всё нужное приходит вовремя.",
  "Твой заказ идёт, как дракон.",
  "Быстро. Чисто. По-пойзоновски.",
  "Китайские цены — русская скорость.",
  "Настоящая выгода всегда рядом.",
  "Заказал — значит уже твоё.",
  "Твой путь к стилю начат.",
  "Восток рождает новые находки.",
  "Вещи к тебе, как по шелку.",
  "Выгода течёт, как река.",
  "Доставка быстрее ветра.",
  "Каждая вещь — как талисман.",
  "С Поднебесной — в карман.",
  "Твоё лучшее уже близко.",
  "Вещи путешествуют, выгода остаётся.",
  "От Великой стены — прямо тебе.",
  "Китайские сокровища не ждут.",
  "Твой заказ шагает уверенно.",
  "Стиль приходит быстрее ветра.",
  "Вещи летят к достойному.",
  "Восток раскрывается в деталях.",
  "Твоя находка уже в пути.",
  "Легко заказать — легко получить.",
  "Китай вдохновляет. Мы доставляем.",
  "Всё лучшее из Поднебесной — тебе.",
  "Быстрее ветра, выгоднее всех."
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('main');
  const [activeTab, setActiveTab] = useState<TabView>('main');
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [randomWisdom, setRandomWisdom] = useState('');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [hideNavigation, setHideNavigation] = useState(false);

  const initializeUser = async (user: TelegramUser) => {
    try {
      const response = await fetch('/api/user/init', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegramId: user.id,
          username: user.username || null,
          fullName: user.first_name || null
        }),
      });

      if (response.ok) {
        console.log('User initialized successfully');
      } else {
        console.error('Failed to initialize user');
      }
    } catch (error) {
      console.error('Error initializing user:', error);
    }
  };

  useEffect(() => {
    console.log('[App] useEffect запущен');
    
    try {
      // Выбор случайной китайской мудрости
      const randomIndex = Math.floor(Math.random() * chineseWisdom.length);
      setRandomWisdom(chineseWisdom[randomIndex]);
      
      // Загрузка сохраненной темы
      try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
          setIsDarkTheme(savedTheme === 'dark');
          document.documentElement.setAttribute('data-theme', savedTheme);
        }
      } catch (e) {
        console.warn('[App] Ошибка загрузки темы из localStorage:', e);
      }

      // Инициализация Telegram Web App
      if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      
      // Готовность приложения
      tg.ready();
      tg.expand();
      
      // Получение данных пользователя
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setTelegramUser(user);
        console.log('[App] Telegram user:', user);
        
        // Инициализируем пользователя в базе данных
        initializeUser(user).catch(err => {
          console.error('[App] Ошибка инициализации пользователя:', err);
        });
        
        // Запускаем heartbeat для отслеживания онлайн-статуса (каждые 10 секунд)
        const heartbeatInterval = setInterval(async () => {
          try {
            await fetch('/api/user/heartbeat', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                telegramId: user.id
              }),
            });
          } catch (error) {
            console.error('[App] Heartbeat error:', error);
          }
        }, 10000); // Отправляем heartbeat каждые 10 секунд
        
        // Сохраняем интервал для очистки в cleanup функции
        // НЕ возвращаем cleanup здесь, а сохраним интервал в переменной для cleanup в конце
        window.heartbeatInterval = heartbeatInterval;
      }
      
      // Настройка Back Button (с проверкой доступности)
      if (tg.BackButton) {
        tg.BackButton.onClick(() => {
          if (currentView !== 'main') {
            setCurrentView('main');
            tg.BackButton.hide();
          }
        });
      }
      
      // Обработка start параметра для рефералов
      const urlParams = new URLSearchParams(window.location.search);
      const startParam = urlParams.get('start');
      
      if (startParam && startParam.startsWith('ref_')) {
        const referralId = startParam.replace('ref_', '');
        handleReferral(referralId);
      }
      }
    } catch (error) {
      console.error('[App] Ошибка при инициализации:', error);
      // Даже при ошибке продолжаем работу
    }
    
    // Завершение загрузки - ВСЕГДА завершаем через 2 секунды, независимо от состояния
    // Это гарантирует, что приложение запустится даже при проблемах
    const loadingTimeout = setTimeout(() => {
      console.log('[App] Загрузка завершена по таймауту (2 сек)');
      setIsLoading(false);
    }, 2000);
    
    // Также завершаем загрузку быстрее, если Telegram WebApp готов
    if (window.Telegram?.WebApp) {
      console.log('[App] Telegram WebApp обнаружен');
      setTimeout(() => {
        console.log('[App] Завершаем загрузку (Telegram готов)');
        setIsLoading(false);
        clearTimeout(loadingTimeout);
      }, 500);
    } else {
      console.warn('[App] Telegram WebApp не обнаружен при инициализации');
    }
    
    return () => {
      clearTimeout(loadingTimeout);
      // Очищаем heartbeat интервал, если он был создан
      if (window.heartbeatInterval) {
        clearInterval(window.heartbeatInterval);
        delete window.heartbeatInterval;
      }
    };
  }, []);

  useEffect(() => {
    // Обновление Back Button Telegram при смене view
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      
      if (currentView === 'main') {
        // Проверяем поддержку BackButton
        if (isBackButtonSupported()) {
          tg.BackButton.hide();
        }
      } else {
        // Проверяем поддержку BackButton
        if (isBackButtonSupported()) {
          tg.BackButton.show();
        }
      }
    }
  }, [currentView]);

  const toggleTheme = () => {
    HapticFeedback.selection();
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    const themeName = newTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('theme', themeName);
  };

  const handleReferral = async (referralId: string) => {
    try {
      const response = await fetch('/api/referral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegramId: telegramUser?.id || 0,
          referredBy: parseInt(referralId)
        }),
      });

      if (response.ok) {
        console.log('Referral processed successfully');
        // Haptic feedback
        if (window.Telegram?.WebApp?.HapticFeedback) {
          window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
        }
      }
    } catch (error) {
      console.error('Error processing referral:', error);
    }
  };

  const navigateTo = (view: string) => {
    setCurrentView(view as AppView);
    
    // Сбрасываем скролл при переходе на главное меню
    if (view === 'main') {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    
    // Обработка навигации к админке
    if (view === 'admin') {
      setActiveTab('admin' as any);
    } else if (view === 'profile') {
      setActiveTab('profile');
    }
    
    // Haptic feedback
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
  };

  const handleTabChange = (tab: string) => {
    const tabView = tab as TabView;
    setActiveTab(tabView);
    
    // Haptic feedback
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }
    
    // Reset to main view when switching tabs
    if (tabView === 'main') {
      setCurrentView('main');
      // Сбрасываем скролл при переходе на главную вкладку
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };


  if (isLoading) {
    return (
      <>
        <GlobalStyle />
        <LoadingSpinner>
          {/* Плавающие иероглифы на фоне загрузки */}
          <div className="floating-hieroglyphs">
            <div className="hieroglyph">龍</div>
            <div className="hieroglyph">福</div>
            <div className="hieroglyph">壽</div>
            <div className="hieroglyph">喜</div>
            <div className="hieroglyph">財</div>
            <div className="hieroglyph">吉</div>
            <div className="hieroglyph">祥</div>
            <div className="hieroglyph">安</div>
            <div className="hieroglyph">康</div>
            <div className="hieroglyph">樂</div>
            <div className="hieroglyph">智</div>
            <div className="hieroglyph">德</div>
            <div className="hieroglyph">義</div>
            <div className="hieroglyph">和</div>
            <div className="hieroglyph">信</div>
            <div className="hieroglyph">禮</div>
            <div className="hieroglyph">仁</div>
            <div className="hieroglyph">勇</div>
          </div>
          
          <LoadingIcon>
            <LoadingPetals></LoadingPetals>
            <LoadingRing></LoadingRing>
            <LoadingCircle></LoadingCircle>
            <LoadingLotus></LoadingLotus>
          </LoadingIcon>
          <LoadingText>poizonic</LoadingText>
          <LoadingSubtext>{randomWisdom}</LoadingSubtext>
        </LoadingSpinner>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <AppContainer className="app-container" style={{ paddingBottom: '80px', paddingTop: '20px' }}>

        {/* Main tab content */}
        {activeTab === 'main' && (
          <>
            {currentView === 'main' && (
              <MainMenu onNavigate={navigateTo} toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
            )}

            {/* Глобальные плавающие иероглифы - видны во всех разделах */}
            <div className="floating-hieroglyphs">
              <div className="hieroglyph">龍</div>
              <div className="hieroglyph">福</div>
              <div className="hieroglyph">壽</div>
              <div className="hieroglyph">喜</div>
              <div className="hieroglyph">財</div>
              <div className="hieroglyph">吉</div>
              <div className="hieroglyph">祥</div>
              <div className="hieroglyph">安</div>
              <div className="hieroglyph">康</div>
              <div className="hieroglyph">樂</div>
              <div className="hieroglyph">智</div>
              <div className="hieroglyph">德</div>
              <div className="hieroglyph">義</div>
              <div className="hieroglyph">和</div>
              <div className="hieroglyph">信</div>
              <div className="hieroglyph">禮</div>
              <div className="hieroglyph">仁</div>
              <div className="hieroglyph">勇</div>
            </div>
            
            {currentView === 'order' && (
              <OrderForm onNavigate={navigateTo} toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} onModalStateChange={setHideNavigation} />
            )}
            
            {currentView === 'calculator' && (
              <PriceCalculator onNavigate={navigateTo} toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} onModalStateChange={setHideNavigation} />
            )}
            
            {currentView === 'tracking' && (
              <Suspense fallback={<div style={{ textAlign: 'center', padding: '40px' }}>⏳ Загрузка...</div>}>
                <TrackingForm isDark={isDarkTheme} onNavigate={navigateTo} toggleTheme={toggleTheme} />
              </Suspense>
            )}
            
            {currentView === 'faq' && (
              <FAQ onNavigate={navigateTo} toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
            )}
            
            {currentView === 'instructions' && (
              <Instructions onNavigate={navigateTo} toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} onModalStateChange={setHideNavigation} />
            )}
            
            {currentView === 'referral' && (
              <ReferralSystem onNavigate={navigateTo} toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} onModalStateChange={setHideNavigation} />
            )}
            
            {currentView === 'exchange-rate' && (
              <ExchangeRate onNavigate={navigateTo} isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
            )}
            
            {currentView === 'about' && (
              <AboutUs onNavigate={navigateTo} onToggleTheme={toggleTheme} isDark={isDarkTheme} />
            )}
            
            {currentView === 'reviews' && (
              <Reviews 
                onNavigate={navigateTo} 
                toggleTheme={toggleTheme} 
                isDarkTheme={isDarkTheme} 
                hideNavigation={isWriteModalOpen}
                onModalStateChange={setIsWriteModalOpen}
              />
            )}
          </>
        )}

        {/* Profile tab content */}
        {activeTab === 'profile' && (
          <Suspense fallback={<div style={{ padding: '20px', textAlign: 'center' }}>Загрузка профиля...</div>}>
            <Profile 
              telegramId={telegramUser?.id?.toString()} 
              isDarkTheme={isDarkTheme}
              toggleTheme={toggleTheme}
              onNavigate={navigateTo}
              onModalStateChange={setHideNavigation}
            />
          </Suspense>
        )}

        {/* Admin panel content */}
        {activeTab === 'admin' && (
          <Suspense fallback={<div style={{ padding: '20px', textAlign: 'center' }}>Загрузка админки...</div>}>
            <AdminPanel 
              onNavigate={navigateTo}
              toggleTheme={toggleTheme}
              isDarkTheme={isDarkTheme}
            />
          </Suspense>
        )}

        {/* Yuan Purchase tab content */}
        {activeTab === 'yuan' && (
          <Suspense fallback={<div style={{ padding: '20px', textAlign: 'center' }}>Загрузка...</div>}>
            <YuanPurchase 
              telegramId={telegramUser?.id?.toString()} 
              isDarkTheme={isDarkTheme}
              toggleTheme={toggleTheme}
              onModalStateChange={setHideNavigation}
            />
          </Suspense>
        )}

      </AppContainer>
      
      {/* Bottom Navigation - Fixed to screen bottom */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
        isDarkTheme={isDarkTheme}
        hideNavigation={hideNavigation || isWriteModalOpen}
      />
    </>
  );
};

export default App;