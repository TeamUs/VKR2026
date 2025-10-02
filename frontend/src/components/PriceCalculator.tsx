import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
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
const CalculatorContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  padding: 0px 16px 100px 16px;
  position: relative;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

`;


const CalculatorForm = styled.div`
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin: 0 auto;
  background: var(--bg-card);
  border-radius: 16px;
  padding: 35px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const Label = styled.label`
  display: block;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-weight: 600;
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
  }
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  width: 100%;
  padding: 15px 25px;
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
  margin-top: 20px;
  
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
    `
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const ResultCard = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 25px;
  margin-top: 25px;
  backdrop-filter: blur(10px);
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  animation: ${fadeIn} 0.6s ease-out;
`;

const ResultTitle = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 15px;
  text-align: center;
`;

const ResultRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--border-color);
  
  &:last-child {
    border-bottom: none;
    font-weight: 700;
    font-size: 1.1rem;
    color: var(--matte-red);
    margin-top: 10px;
    padding-top: 15px;
    border-top: 2px solid var(--matte-red);
  }
`;

const ResultLabel = styled.span`
  color: var(--text-secondary);
  font-weight: 500;
`;

const ResultValue = styled.span`
  color: var(--text-primary);
  font-weight: 600;
`;

const TotalRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  background: var(--bg-card);
  border: 2px solid var(--matte-red);
  border-radius: 16px;
  box-shadow: 
    0 8px 25px var(--shadow-card),
    0 4px 12px var(--shadow-soft),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  text-align: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--matte-red), var(--terracotta), var(--matte-red));
  }
`;

const TotalLabel = styled.span`
  color: var(--text-primary);
  font-weight: 700;
  font-size: 1.3rem;
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
`;

const TotalValue = styled.span`
  color: var(--matte-red);
  font-weight: 900;
  font-size: 1.5rem;
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px;
  margin-top: 8px;
  
  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const ResultDetails = styled.div`
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const ResultDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const ResultDetailLabel = styled.span`
  color: var(--text-secondary);
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 4px;
  opacity: 0.8;
`;

const ResultDetailValue = styled.span`
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 500;
  opacity: 0.7;
`;

const ErrorMessage = styled.div`
  color: var(--matte-red);
  font-size: 0.9rem;
  margin-top: 5px;
  text-shadow: 0 0 8px var(--glow-red);
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: var(--text-secondary);
`;

const InfoCard = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  margin-top: 30px;
  margin-bottom: 25px;
  backdrop-filter: blur(5px);
`;

const InfoText = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
`;

const ManagerButtons = styled.div`
  display: flex;
  gap: 15px;
  margin: 25px 0;
  flex-wrap: wrap;
`;

const ManagerButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  flex: 1;
  min-width: 200px;
  padding: 15px 20px;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 10;
  pointer-events: auto;
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
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const HelpButton = styled.button`
  width: 100%;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 8px 16px;
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  
  &:hover {
    background: var(--sand);
    border-color: var(--matte-red);
    color: var(--text-primary);
    transform: translateY(-1px);
  }
`;

const Textarea = styled.textarea`
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
  resize: vertical;
  min-height: 100px;
  
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


const ProductInfo = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 15px;
  margin-top: 15px;
  backdrop-filter: blur(5px);
`;

const ProductName = styled.div`
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 0.95rem;
`;

const ProductUrl = styled.div`
  font-size: 0.8rem;
  color: var(--text-secondary);
  word-break: break-all;
  opacity: 0.8;
`;

const DetectedCategory = styled.div`
  display: inline-block;
  background: var(--matte-red);
  color: var(--bg-primary);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 8px;
`;

const SizeSelection = styled.div`
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  margin-top: 15px;
  backdrop-filter: blur(5px);
`;

const SizeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 10px;
  margin-top: 15px;
`;

const SizeButton = styled.button<{ $selected: boolean }>`
  padding: 10px 15px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: ${props => props.$selected ? 'var(--matte-red)' : 'var(--bg-card)'};
  color: ${props => props.$selected ? 'var(--bg-primary)' : 'var(--text-primary)'};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50px;
  justify-content: center;
  
  &:hover {
    background: ${props => props.$selected ? 'var(--terracotta)' : 'var(--sand)'};
    border-color: var(--matte-red);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SizeSelectionTitle = styled.div`
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
  font-size: 1rem;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
`;

const HelpModal = styled.div`
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
  animation: ${slideIn} 0.4s ease-out;
  overflow-y: auto;
`;

const HelpTitle = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 16px 0;
`;

const HelpImage = styled.img`
  width: 100%;
  max-width: 350px;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px var(--shadow-soft);
  margin: 0 auto;
  display: block;
`;

const HelpText = styled.p`
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 20px 0;
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

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  margin-top: 0px;
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

const Title = styled.h1`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  
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

interface PriceCalculatorProps {
  onNavigate: (page: string) => void;
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({ onNavigate, toggleTheme, isDarkTheme }) => {
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [priceError, setPriceError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [showHelpModal, setShowHelpModal] = useState(false);
  

  const categories = [
    { value: 'shoes_clothing', label: '👟 Обувь и верхняя одежда', weight: 2.0 },
    { value: 'backpacks_bags', label: '🎒 Рюкзаки и сумки', weight: 1.0 },
    { value: 'hoodies_pants', label: '👕 Толстовки и штаны', weight: 1.5 },
    { value: 'tshirts_shorts', label: '🩳 Футболки и шорты', weight: 1.0 },
    { value: 'underwear_socks', label: '🧦 Нижнее белье, носки и головные уборы', weight: 0.5 },
    { value: 'accessories_perfume', label: '👜 Аксессуары и духи', weight: 0.5 }
  ];

  const handleCalculate = async () => {
    await handleManualCalculate();
  };

  const handleManualCalculate = async () => {
    // Сброс ошибок
    setPriceError('');
    setCategoryError('');

    let hasErrors = false;

    // Проверка цены
    if (!price) {
      setPriceError('Пожалуйста, введите цену товара');
      hasErrors = true;
    } else {
      const priceNum = parseFloat(price);
      if (isNaN(priceNum) || priceNum <= 0) {
        setPriceError('Пожалуйста, введите корректную цену');
        hasErrors = true;
      }
    }

    // Проверка категории
    if (!category) {
      setCategoryError('Пожалуйста, выберите категорию товара');
      hasErrors = true;
    }

    if (hasErrors) {
      HapticFeedback.error();
      return;
    }

    const selectedCategory = categories.find(cat => cat.value === category);
    if (!selectedCategory) {
      setCategoryError('Пожалуйста, выберите категорию товара');
      HapticFeedback.error();
      return;
    }

    const priceNum = parseFloat(price);
    setIsLoading(true);
    HapticFeedback.medium();

    try {
      const response = await fetch('/api/calculate-price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: priceNum,
          weight: selectedCategory.weight,
          category: selectedCategory.value
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
        HapticFeedback.success();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при расчете стоимости');
      }
    } catch (error) {
      HapticFeedback.error();
      setPriceError('Произошла ошибка при расчете стоимости. Попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLinkCalculate = async () => {
    // Сброс ошибок
    setLinkError('');

    if (!linkText.trim()) {
      setLinkError('Пожалуйста, вставьте ссылку на товар');
      HapticFeedback.error();
      return;
    }

    setIsLoading(true);
    HapticFeedback.medium();

    try {
      const response = await fetch('/api/calculate-from-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          linkText: linkText.trim(),
          telegramId: (window as any).Telegram?.WebApp?.initDataUnsafe?.user?.id
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Проверяем, требуется ли выбор размера
        if (data.requiresSizeSelection) {
          setProductInfo({
            name: data.productData.productName,
            url: data.productData.url,
            availableSizes: data.productData.availableSizes
          });
          setAvailableSizes(data.productData.availableSizes);
          setSizePriceMap(data.productData.sizePriceMap || {});
          setShowSizeSelection(true);
          HapticFeedback.medium();
        } else {
          setResult(data);
          setProductInfo({
            name: data.productName,
            url: data.productUrl,
            category: data.detectedCategory
          });
          HapticFeedback.success();
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка при расчете стоимости по ссылке');
      }
    } catch (error) {
      HapticFeedback.error();
      setLinkError(error.message || 'Произошла ошибка при расчете стоимости. Попробуйте еще раз.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSizeSelection = async (size: string) => {
    setSelectedSize(size);
    setIsLoading(true);
    HapticFeedback.medium();

    try {
      const response = await fetch('/api/get-price-with-size', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: productInfo.url,
          selectedSize: size,
          telegramId: (window as any).Telegram?.WebApp?.initDataUnsafe?.user?.id
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
        setShowSizeSelection(false);
        HapticFeedback.success();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка при получении цены для выбранного размера');
      }
    } catch (error: any) {
      HapticFeedback.error();
      
      // Проверяем, является ли ошибка недоступностью размера
      if (error.response?.data?.isUnavailable) {
        setLinkError('Данного размера нет в наличии');
      } else {
        setLinkError(error.message || 'Произошла ошибка при получении цены. Попробуйте еще раз.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'price') {
      setPrice(value);
      if (priceError) setPriceError('');
    }
    if (field === 'category') {
      setCategory(value);
      if (categoryError) setCategoryError('');
    }
  };

  const handleContactManager = (type: 'brand' | 'category') => {
    HapticFeedback.medium();
    
    const message = type === 'brand' 
      ? '🏷️ У меня товар со знаком ≈ - нужна помощь с расчетом стоимости'
      : '❓ Нет моей категории - нужна помощь с выбором категории';
    
    // Отправляем сообщение менеджеру через Telegram
    if ((window as any).Telegram?.WebApp?.openTelegramLink) {
      const telegramUrl = `https://t.me/poizonic_manager?text=${encodeURIComponent(message)}`;
      (window as any).Telegram.WebApp.openTelegramLink(telegramUrl);
    } else {
      // Fallback для обычного браузера
      window.open(`https://t.me/poizonic_manager?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  return (
    <CalculatorContainer>

      <Header>
        <BackButton onClick={() => onNavigate('main')}>
          ‹
        </BackButton>
        <Title>Расчет стоимости</Title>
        <ThemeToggle onClick={toggleTheme}>
          <ToggleIcon $isDark={isDarkTheme}>🌙</ToggleIcon>
          <ToggleIconDark $isDark={isDarkTheme}>☀️</ToggleIconDark>
          <ToggleSlider $isDark={isDarkTheme}></ToggleSlider>
        </ThemeToggle>
      </Header>

      <CalculatorForm>
        <Label htmlFor="price">Цена товара в юанях*</Label>
        <Input
          type="number"
          id="price"
          value={price}
          onChange={(e) => handleInputChange('price', e.target.value)}
          placeholder="1000¥"
          min="0"
          step="0.01"
        />
        {priceError && <ErrorMessage>{priceError}</ErrorMessage>}
        
        <HelpButton onClick={() => {
          HapticFeedback.selection();
          setShowHelpModal(true);
        }}>
          Где найти цену в юанях ❓
        </HelpButton>

        <Label htmlFor="category">Категория товара*</Label>
        <Select
          id="category"
          value={category}
          onChange={(e) => handleInputChange('category', e.target.value)}
        >
          <option value="" disabled>Выберите категорию товара</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </Select>
        {categoryError && <ErrorMessage>{categoryError}</ErrorMessage>}

        <Button 
          onClick={handleCalculate} 
          $variant="primary"
          disabled={isLoading}
        >
          {isLoading ? 'Расчет...' : 'Рассчитать стоимость'}
        </Button>

        {result && (
          <ResultCard>
            <ResultTitle>Результат расчета</ResultTitle>
            
            
            <ResultRow>
              <ResultLabel>Цена в рублях:</ResultLabel>
              <ResultValue>{result.priceInRubles} ₽</ResultValue>
            </ResultRow>
            
            <ResultRow>
              <ResultLabel>Доставка:</ResultLabel>
              <ResultValue>{result.deliveryCost} ₽</ResultValue>
            </ResultRow>
            
            <ResultRow>
              <ResultLabel>Комиссия ({result.commissionRate}%):</ResultLabel>
              <ResultValue>{result.commission} ₽</ResultValue>
            </ResultRow>
            
            <TotalRow>
              <TotalLabel>Итого к оплате:</TotalLabel>
              <TotalValue>{result.totalCost} ₽</TotalValue>
            </TotalRow>
            
            <ResultDetails>
              <ResultDetail>
                <ResultDetailLabel>Цена товара:</ResultDetailLabel>
                <ResultDetailValue>{result.originalPrice} ¥</ResultDetailValue>
              </ResultDetail>
              <ResultDetail>
                <ResultDetailLabel>Курс юаня:</ResultDetailLabel>
                <ResultDetailValue>{result.exchangeRate} ₽</ResultDetailValue>
              </ResultDetail>
            </ResultDetails>
          </ResultCard>
        )}

        <ManagerButtons>
          <ManagerButton 
            onClick={() => handleContactManager('brand')}
            $variant="secondary"
          >
            🏷️ У меня товар со знаком ≈
          </ManagerButton>
          
          <ManagerButton 
            onClick={() => handleContactManager('category')}
            $variant="secondary"
          >
            ❓ Нет моей категории
          </ManagerButton>
        </ManagerButtons>

      </CalculatorForm>

      <InfoCard>
        <InfoText>
          💡 <strong>Как рассчитывается стоимость:</strong><br/>
          • Цена товара переводится в рубли по текущему курсу<br/>
          • Добавляется стоимость доставки (800₽ за кг)<br/>
          • Включается комиссия сервиса (4-5%)
        </InfoText>
      </InfoCard>

      {showHelpModal && (
        <ModalOverlay>
          <HelpModal>
            <HelpTitle>Где найти цену в юанях?</HelpTitle>
            <HelpText>
              Цена указана на <strong>голубой кнопке</strong> - у каждого размера своя цена!
            </HelpText>
            <HelpImage 
              src="/images/shoes_clothing.jpg" 
              alt="Пример страницы товара с ценой в юанях"
              onError={(e) => {
                // Fallback если изображение не найдено
                e.currentTarget.style.display = 'none';
              }}
            />
            <CloseButton onClick={() => {
              HapticFeedback.selection();
              setShowHelpModal(false);
            }}>
              Понятно
            </CloseButton>
          </HelpModal>
        </ModalOverlay>
      )}
    </CalculatorContainer>
  );
};

export default PriceCalculator;