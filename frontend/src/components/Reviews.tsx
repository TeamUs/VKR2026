import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { HapticFeedback } from '../utils/hapticFeedback';
import WriteReviewModal from './WriteReviewModal';

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

const carouselSlide = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

// Стилизованные компоненты
const ReviewsContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  padding: 0px 0px 100px 0px;
  position: relative;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 0px 0px 100px 0px;
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
  text-align: center;
  flex: 1;
  
  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const WriteReviewCard = styled.div`
  position: relative;
  z-index: 2;
  background: var(--bg-card);
  margin: 0 16px 20px 16px;
  padding: 25px;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 480px) {
    padding: 20px;
    margin: 0 16px 15px 16px;
  }
`;

const ReviewsCard = styled.div`
  position: relative;
  z-index: 2;
  background: var(--bg-card);
  margin: 0 16px 20px 16px;
  padding: 25px;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  box-shadow: 
    0 4px 20px var(--shadow-card),
    0 2px 8px var(--shadow-soft);
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 480px) {
    padding: 20px;
    margin: 0 16px 15px 16px;
  }
`;

const Section = styled.div`
  margin-bottom: 30px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0;
  margin-top: 0;
  text-align: center;
`;


const ReviewItem = styled.div`
  min-width: 100%;
  padding: 20px;
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid var(--border-color);
  margin-right: 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const ReviewAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AuthorAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--matte-red);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bg-primary);
  font-weight: 600;
  font-size: 1.1rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.div`
  font-weight: 600;
  color: var(--text-primary);
  font-size: 1rem;
`;

const ReviewDate = styled.div`
  color: var(--text-secondary);
  font-size: 0.85rem;
`;

const ReviewRating = styled.div`
  display: flex;
  gap: 2px;
`;

const Star = styled.span<{ $filled: boolean }>`
  color: ${props => props.$filled ? 'var(--matte-red)' : 'var(--text-secondary)'};
  font-size: 1.2rem;
`;

// Большие звезды для общей оценки
const LargeStar = styled.span<{ $filled: boolean }>`
  color: ${props => props.$filled ? 'var(--matte-red)' : 'var(--text-secondary)'};
  font-size: 2.5rem;
`;

// Динамические звезды для общей оценки с частичным заполнением
const DynamicStar = styled.span<{ $fillPercentage: number }>`
  position: relative;
  font-size: 2.5rem;
  color: var(--text-secondary);
  
  &::before {
    content: '★';
    position: absolute;
    top: 0;
    left: 0;
    width: ${props => props.$fillPercentage}%;
    overflow: hidden;
    color: var(--matte-red);
  }
`;

const ReviewText = styled.div`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 15px;
  font-size: 0.95rem;
`;

const ReviewPhoto = styled.img`
  max-width: 120px;
  max-height: 80px;
  width: auto;
  height: auto;
  border-radius: 8px;
  object-fit: contain;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid var(--matte-red);
  flex-shrink: 0;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

const ReviewContent = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-start;
`;

const ReviewTextContainer = styled.div`
  flex: 1;
  min-width: 0;
`;


const WriteReviewTitle = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
`;

const WriteReviewText = styled.p`
  color: var(--text-secondary);
  line-height: 1.4;
  margin-bottom: 15px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.9rem;
  text-align: center;
`;

const WriteReviewSection = styled.div`
  margin-top: 20px;
`;

const WriteReviewButton = styled.button`
  background: var(--matte-red);
  border: none;
  border-radius: 12px;
  padding: 15px 25px;
  color: var(--bg-primary);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: var(--terracotta);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ReviewModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-out;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  min-height: 100vh;
  
  /* Динамическое позиционирование */
  @media (max-height: 700px) {
    align-items: flex-start;
    padding-top: 20px;
    padding-bottom: 20px;
  }
  
  @media (max-height: 500px) {
    align-items: flex-start;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    align-items: flex-start;
    padding-top: 20px;
  }
`;

const ReviewModal = styled.div<{ $scrollPosition: number }>`
  background: var(--bg-card);
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 10px 20px var(--shadow-card);
  position: relative;
  margin: auto;
  transform: translateY(var(--scroll-position, 0px));
  
  /* Плавная анимация появления */
  animation: modalSlideIn 0.4s ease-out;
  
  @keyframes modalSlideIn {
    from {
      opacity: 0;
      transform: translateY(var(--scroll-position, 0px)) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(var(--scroll-position, 0px)) scale(1);
    }
  }
  
  /* Динамическое позиционирование */
  @media (max-height: 700px) {
    max-height: calc(100vh - 40px);
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  @media (max-height: 500px) {
    max-height: calc(100vh - 20px);
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 20px;
  }
  
  @media (max-width: 480px) {
    padding: 20px;
    margin: 10px;
    max-width: calc(100vw - 20px);
    max-height: calc(100vh - 20px);
  }
  
  @media (max-width: 360px) {
    padding: 15px;
    margin: 5px;
    max-width: calc(100vw - 10px);
    max-height: calc(100vh - 10px);
  }
`;

const ReviewModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border-color);
`;

const ReviewModalTitle = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: 0.5px;
`;

const CloseModalButton = styled.button`
  background: var(--bg-card);
  color: var(--matte-red);
  border: 2px solid var(--matte-red);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: var(--matte-red);
    color: var(--bg-primary);
    transform: scale(1.1);
  }
`;

const ReviewModalContent = styled.div`
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 20px;
`;

// Стили для пагинации
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 25px 0;
  padding: 0 20px;
  flex-wrap: wrap;
`;

const PaginationButton = styled.button<{ $active?: boolean; $disabled?: boolean }>`
  background: transparent;
  color: ${props => props.$active ? 'var(--matte-red)' : 'var(--text-primary)'};
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 16px;
  font-weight: ${props => props.$active ? '600' : '500'};
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease;
  opacity: ${props => props.$disabled ? 0.3 : 1};
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background: var(--bg-hover);
    color: var(--matte-red);
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const PaginationInfo = styled.div`
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  text-align: center;
`;

// Стили для средней оценки
const AverageRatingContainer = styled.div`
  margin: 20px auto 12px auto;
  text-align: center;
  max-width: 600px;
  padding: 0 20px;
  animation: ${fadeIn} 0.6s ease-out;
`;

const AverageRatingTitle = styled.div`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
`;

const AverageRatingStars = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-bottom: 8px;
`;

const AverageRatingValue = styled.div`
  font-size: 1.8rem;
  color: var(--text-primary);
  font-weight: 600;
`;

const ReviewModalPhoto = styled.img`
  width: 100%;
  max-width: 300px;
  max-height: 200px;
  border-radius: 16px;
  margin-top: 15px;
  object-fit: cover;
  border: 2px solid var(--border-color);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 20px auto;
  max-width: 600px;
  padding: 0 20px;
  
  @media (max-width: 480px) {
    padding: 0 10px;
  }
`;

const ReviewItemClickable = styled.div`
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-radius: 50%;
  border-top-color: var(--matte-red);
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  color: var(--matte-red);
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
`;

interface Review {
  review_id: number;
  telegram_id: number;
  username: string;
  full_name: string;
  rating: number;
  review_text: string;
  photo_url?: string;
  created_at: string;
}

interface ReviewsProps {
  onNavigate: (view: string) => void;
  toggleTheme: () => void;
  isDarkTheme: boolean;
  hideNavigation?: boolean;
  onModalStateChange?: (isOpen: boolean) => void;
}

const Reviews: React.FC<ReviewsProps> = ({ onNavigate, toggleTheme, isDarkTheme, hideNavigation = false, onModalStateChange }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [averageRating, setAverageRating] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hasLoadedFirstPage, setHasLoadedFirstPage] = useState(false);
  const reviewsPerPage = 5;

  // Функция для получения правильного URL изображения
  const getImageUrl = (photoUrl: string) => {
    if (photoUrl.startsWith('http')) {
      return photoUrl;
    }
    
    // В разработке frontend на 3001, backend на 3000
    // В продакшене оба на одном домене
    const isDevelopment = window.location.port === '3001';
    const backendPort = isDevelopment ? '3000' : window.location.port;
    
    return `${window.location.protocol}//${window.location.hostname}:${backendPort}${photoUrl}`;
  };

  const handleBackClick = () => {
    if (HapticFeedback.light) {
      HapticFeedback.light();
    }
    onNavigate('main');
  };

  const handleWriteReview = () => {
    if (HapticFeedback.medium) {
    HapticFeedback.medium();
    }
    // ВСЕГДА обновляем позицию прокрутки при открытии модального окна (техника "ТИГР")
    const currentScroll = window.scrollY || window.pageYOffset || 0;
    setScrollPosition(currentScroll);
    setIsWriteModalOpen(true);
    onModalStateChange?.(true);
  };

  const handleReviewSuccess = () => {
    // Перезагружаем отзывы после успешного добавления
    fetchReviews(currentPage);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      fetchReviews(page);
    }
  };

  const handleReviewClick = (review: Review) => {
    if (HapticFeedback.light) {
      HapticFeedback.light();
    }
    // ВСЕГДА обновляем текущую позицию прокрутки при открытии модального окна (техника "ТИГР")
    const currentScroll = window.scrollY || window.pageYOffset || 0;
    setScrollPosition(currentScroll);
    setSelectedReview(review);
    // Скрываем навигационное меню
    onModalStateChange?.(true);
  };

  const handleCloseReviewModal = () => {
    setSelectedReview(null);
    // Показываем навигационное меню
    onModalStateChange?.(false);
  };


  // Загрузка отзывов из базы данных с пагинацией
  const fetchReviews = async (page: number = 1) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/api/reviews?page=${page}&limit=${reviewsPerPage}`);

        if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews || []);
        
        // Исправляем логику расчета totalPages
        let calculatedTotalPages = data.totalPages;
        if (!calculatedTotalPages || calculatedTotalPages === 0) {
          calculatedTotalPages = Math.ceil((data.total || data.reviews?.length || 0) / reviewsPerPage);
        }
        
        setTotalPages(calculatedTotalPages);
        setCurrentPage(page);
        
        // Прокручиваем к началу отзывов при смене страницы пагинации
        // НЕ прокручиваем только при самой первой загрузке раздела (page === 1 && !hasLoadedFirstPage)
        if (page > 1 || (page === 1 && hasLoadedFirstPage)) {
          setTimeout(() => {
            const reviewsSection = document.getElementById('reviews-section');
            if (reviewsSection) {
              reviewsSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
              });
            }
          }, 300);
        }
        
        // Отмечаем, что первая страница была загружена
        if (page === 1) {
          setHasLoadedFirstPage(true);
        }
      } else {
        setError('Ошибка загрузки отзывов');
      }
    } catch (err) {
      console.error('Ошибка загрузки отзывов:', err);
      setError('Ошибка загрузки отзывов');
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для получения средней оценки
  const fetchAverageRating = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/reviews/average-rating');
      if (response.ok) {
        const data = await response.json();
        setAverageRating(data.averageRating || 0);
      }
    } catch (err) {
      console.error('Ошибка получения средней оценки:', err);
    }
  };

  useEffect(() => {
    // Добавляем плавную прокрутку для всего документа
    document.documentElement.style.scrollBehavior = 'smooth';
    
    fetchReviews();
    fetchAverageRating();
    
    // Очищаем стиль при размонтировании компонента
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);



  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star key={index} $filled={index < rating}>
        ★
      </Star>
    ));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <ReviewsContainer>
      <Header>
        <BackButton onClick={handleBackClick}>
          ‹
        </BackButton>
        <Title>Отзывы</Title>
        <ThemeToggle onClick={toggleTheme}>
          <ToggleIcon $isDark={isDarkTheme}>🌙</ToggleIcon>
          <ToggleIconDark $isDark={isDarkTheme}>☀️</ToggleIconDark>
          <ToggleSlider $isDark={isDarkTheme} />
        </ThemeToggle>
      </Header>

      {/* Кнопка написания отзыва - отдельная карточка */}
      <WriteReviewCard>
        <Section>
          <WriteReviewTitle>Поделитесь своим опытом</WriteReviewTitle>
          <WriteReviewText>
            Расскажите о вашем опыте покупок и помогите другим клиентам
          </WriteReviewText>
          <WriteReviewButton onClick={handleWriteReview}>
            Написать отзыв
          </WriteReviewButton>
        </Section>
      </WriteReviewCard>

      {/* Средняя оценка */}
      {averageRating > 0 && (
        <AverageRatingContainer>
          <AverageRatingTitle>Общая оценка</AverageRatingTitle>
          <div style={{
            width: '100px',
            height: '2px',
            background: 'var(--matte-red)',
            margin: '0 auto 15px auto',
            borderRadius: '1px'
          }}></div>
          <AverageRatingStars>
            {Array.from({ length: 5 }, (_, index) => {
              const fillPercentage = Math.max(0, Math.min(100, (averageRating - index) * 100));
              return (
                <DynamicStar key={index} $fillPercentage={fillPercentage}>
                  ★
                </DynamicStar>
              );
            })}
          </AverageRatingStars>
          <AverageRatingValue>
            {averageRating.toFixed(1)}
          </AverageRatingValue>
        </AverageRatingContainer>
      )}

      {/* Заголовок отзывов */}
      {reviews.length > 0 && (
        <div style={{ 
          textAlign: 'center', 
          margin: '20px auto', 
          maxWidth: '600px',
          padding: '0 20px'
        }}>
          <div style={{
            fontFamily: 'Noto Sans SC, Inter, Arial, sans-serif',
            fontSize: '1.2rem',
            fontWeight: '600',
            color: 'var(--text-primary)',
            marginBottom: '10px'
          }}>
            Отзывы наших клиентов
          </div>
          <div style={{
            width: '100px',
            height: '2px',
            background: 'var(--matte-red)',
            margin: '0 auto',
            borderRadius: '1px'
          }}></div>
        </div>
      )}

      {/* Список отзывов */}
      {reviews.length > 0 && (
        <>
          {isLoading ? (
            <ReviewsCard>
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <LoadingSpinner />
                <div style={{ marginTop: '15px', color: 'var(--text-secondary)' }}>
                  Загрузка отзывов...
                </div>
              </div>
            </ReviewsCard>
          ) : error ? (
            <ReviewsCard>
              <ErrorMessage>{error}</ErrorMessage>
            </ReviewsCard>
          ) : (
            <ReviewsList id="reviews-section">
              {reviews.map((review) => (
                <ReviewItemClickable key={review.review_id} onClick={() => handleReviewClick(review)}>
                  <ReviewItem>
                    <ReviewHeader>
                      <ReviewAuthor>
                        <AuthorAvatar>
                          {getInitials(review.full_name)}
                        </AuthorAvatar>
                        <AuthorInfo>
                          <AuthorName>{review.full_name}</AuthorName>
                          <ReviewDate>
                            {new Date(review.created_at).toLocaleDateString('ru-RU')}
                          </ReviewDate>
                        </AuthorInfo>
                      </ReviewAuthor>
                      <ReviewRating>
                        {renderStars(review.rating)}
                      </ReviewRating>
                    </ReviewHeader>
                    
                    <ReviewContent>
                      <ReviewTextContainer>
                        <ReviewText>{review.review_text}</ReviewText>
                      </ReviewTextContainer>
                      
                      {review.photo_url && (
                        <ReviewPhoto 
                          src={getImageUrl(review.photo_url)}
                          alt="Фото отзыва"
                          onError={(e) => {
                            console.error('Ошибка загрузки изображения в списке:', review.photo_url);
                            e.currentTarget.style.display = 'none';
                          }}
                          onLoad={() => {
                            console.log('Изображение в списке загружено:', review.photo_url);
                          }}
                        />
                      )}
                    </ReviewContent>
                  </ReviewItem>
                </ReviewItemClickable>
              ))}
            </ReviewsList>
          )}
          
          
          {/* Пагинация */}
          {!isLoading && !error && totalPages > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <PaginationContainer>
                <PaginationButton
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  $disabled={currentPage === 1}
                >
                  ‹
                </PaginationButton>
                
                {/* Показываем номера страниц */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <PaginationButton
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      $active={currentPage === pageNum}
                    >
                      {pageNum}
                    </PaginationButton>
                  );
                })}
                
                <PaginationButton
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  $disabled={currentPage === totalPages}
                >
                  ›
                </PaginationButton>
              </PaginationContainer>
              
              <PaginationInfo>
                {currentPage} из {totalPages}
              </PaginationInfo>
            </div>
          )}
          
        </>
      )}

      <WriteReviewModal
        isOpen={isWriteModalOpen}
        onClose={() => {
          setIsWriteModalOpen(false);
          onModalStateChange?.(false);
        }}
        onSuccess={handleReviewSuccess}
        scrollPosition={scrollPosition}
      />

      {/* Модальное окно для просмотра отзыва */}
      {selectedReview && (
        <ReviewModalOverlay onClick={handleCloseReviewModal}>
          <ReviewModal 
            $scrollPosition={scrollPosition} 
            onClick={(e) => e.stopPropagation()}
            style={{
              '--scroll-position': `${scrollPosition}px`
            } as React.CSSProperties}
          >
            <CloseModalButton 
              onClick={handleCloseReviewModal}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                zIndex: 10
              }}
            >
              ×
            </CloseModalButton>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <AuthorAvatar style={{ width: '50px', height: '50px' }}>
                  {getInitials(selectedReview.full_name)}
                </AuthorAvatar>
                <div>
                  <AuthorName style={{ fontSize: '1.1rem', marginBottom: '5px' }}>
                    {selectedReview.full_name}
                  </AuthorName>
                  <ReviewDate style={{ fontSize: '0.9rem' }}>
                    {new Date(selectedReview.created_at).toLocaleDateString('ru-RU')}
                  </ReviewDate>
                </div>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                {renderStars(selectedReview.rating)}
              </div>
            </div>
            
            <ReviewModalContent>
              {selectedReview.review_text}
            </ReviewModalContent>
            
            {selectedReview.photo_url && (
              <div style={{ marginTop: '15px', textAlign: 'center' }}>
                <img 
                  src={getImageUrl(selectedReview.photo_url)}
                  alt="Фото отзыва"
                  style={{
                    width: '100%',
                    maxWidth: '300px',
                    borderRadius: '12px',
                    objectFit: 'cover',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    display: 'block',
                    margin: '0 auto'
                  }}
                  onError={(e) => {
                    console.error('Ошибка загрузки изображения:', selectedReview.photo_url);
                    e.currentTarget.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log('Изображение загружено успешно:', selectedReview.photo_url);
                  }}
                />
              </div>
            )}
          </ReviewModal>
        </ReviewModalOverlay>
      )}
    </ReviewsContainer>
  );
};

export default Reviews;