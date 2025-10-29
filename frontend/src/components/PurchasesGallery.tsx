import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { HapticFeedback } from '../utils/hapticFeedback';

// Анимации
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

// Стилизованные компоненты
const PurchasesCard = styled.div<{ $isDark: boolean }>`
  position: relative;
  z-index: 2;
  background: ${props => props.$isDark 
    ? 'rgba(30, 30, 30, 0.7)' 
    : 'rgba(255, 255, 255, 0.7)'};
  margin: 0 16px 20px 16px;
  padding: 25px 25px 15px 25px;
  border-radius: 16px;
  backdrop-filter: blur(15px);
  border: 2px solid var(--matte-red);
  box-shadow: 
    0 4px 20px rgba(162, 59, 59, 0.2),
    0 2px 8px rgba(162, 59, 59, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 6px 25px rgba(162, 59, 59, 0.3),
      0 3px 12px rgba(162, 59, 59, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.15);
  }
  
  @media (max-width: 480px) {
    padding: 20px 20px 12px 20px;
    margin: 0 16px 15px 16px;
  }
`;

const PurchasesHeader = styled.div`
  text-align: center;
  margin-bottom: 15px;
`;

const PurchasesTitle = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
`;

const PurchasesSubtitle = styled.p`
  color: var(--text-secondary);
  line-height: 1.4;
  margin-bottom: 15px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.9rem;
  text-align: center;
`;

const ViewPurchasesButton = styled.button`
  background: var(--matte-red);
  color: var(--bg-primary);
  border: none;
  border-radius: 12px;
  padding: 15px 25px;
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

const ModalOverlay = styled.div<{ $top: number; $left: number; $width: number; $height: number }>`
  position: fixed;
  top: ${props => props.$top}px;
  left: ${props => props.$left}px;
  width: ${props => props.$width}px;
  height: ${props => props.$height}px;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease-out;
  box-sizing: border-box;
  overflow: auto;
`;

const Modal = styled.div`
  background: var(--bg-card);
  border-radius: 20px;
  padding: 15px;
  max-width: 98vw;
  width: 100%;
  max-height: 95vh;
  overflow: hidden;
  border: 1px solid var(--border-color);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 10px 20px var(--shadow-card);
  position: relative;
  margin: auto;
  display: flex;
  flex-direction: column;
  animation: modalFadeIn 0.4s ease-out;
  
  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  padding: 0 10px 15px 10px;
  border-bottom: 1px solid var(--border-color);
`;

const ModalTitle = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
`;

const CloseButton = styled.button`
  background: var(--matte-red);
  color: var(--bg-primary);
  border: none;
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
    background: var(--terracotta);
    transform: scale(1.1);
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  flex: 1;
  overflow-y: auto;
  padding: 10px 5px 5px 0;
  max-height: calc(85vh - 80px);
  min-height: 0;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(162, 59, 59, 0.4);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: rgba(162, 59, 59, 0.6);
  }
`;

const PurchaseCard = styled.div<{ $color: string }>`
  width: 100%;
  height: 250px;
  background: ${props => props.$color};
  border-radius: 12px;
  cursor: pointer;
  transition: none;
  border: 2px solid transparent;
  pointer-events: auto;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: 'Inter', Arial, sans-serif;
  text-align: center;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    height: 220px;
  }
  
  @media (max-width: 480px) {
    height: 180px;
    padding: 15px;
  }
  
  &:hover {
    transform: scale(1);
    border-color: transparent;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const PurchaseTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const PurchaseDetails = styled.div`
  font-size: 0.9rem;
  font-weight: 400;
  opacity: 0.9;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const FullImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease-out;
  margin: 0;
  width: 100vw;
  height: 100vh;
`;

const FullImage = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const CloseFullImageButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
  }
`;

interface PurchasesGalleryProps {
  isDarkTheme: boolean;
  onModalStateChange?: (isOpen: boolean) => void;
}

const PurchasesGallery: React.FC<PurchasesGalleryProps> = ({ isDarkTheme, onModalStateChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | { id: number; name: string; details: string; color: string } | null>(null);
  const [purchaseImages, setPurchaseImages] = useState<string[]>([]);
  const [viewportPosition, setViewportPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0
  });

  // Функция для загрузки изображений по именам файлов
  const loadPurchaseImages = async () => {
    try {
      console.log('Загружаем изображения выкупов...');
      
      // Список имен файлов для поиска
      const possibleNames = [
        'purchase1.jpg', 'purchase2.jpg', 'purchase3.jpg', 'purchase4.jpg', 'purchase5.jpg', 'purchase6.jpg', 'purchase7.jpg',
        'purchase1.png', 'purchase2.png', 'purchase3.png', 'purchase4.png', 'purchase5.png', 'purchase6.png', 'purchase7.png',
      ];
      
      const loadedImages: string[] = [];
      
      for (const filename of possibleNames) {
        try {
          const imagePath = `/images/purchases/${filename}`;
          // Проверяем, существует ли изображение
          const response = await fetch(imagePath, { method: 'HEAD' });
          if (response.ok) {
            loadedImages.push(imagePath);
            console.log('Найдено изображение:', imagePath);
          }
        } catch (error) {
          // Игнорируем ошибки загрузки отдельных файлов
        }
      }
      
      console.log(`Загружено ${loadedImages.length} изображений выкупов`);
      setPurchaseImages(loadedImages);
      
    } catch (error) {
      console.error('Ошибка загрузки изображений выкупов:', error);
      setPurchaseImages([]);
    }
  };

  // Загружаем изображения при монтировании компонента
  React.useEffect(() => {
    loadPurchaseImages();
  }, []);

  const calculateViewportPosition = () => {
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const scrollX = window.scrollX || window.pageXOffset || 0;
    
    return {
      top: scrollY,
      left: scrollX,
      width: window.innerWidth,
      height: window.innerHeight
    };
  };

  const handleOpenModal = () => {
    if (HapticFeedback.light) {
      HapticFeedback.light();
    }
    
    // Вычисляем и сохраняем позицию viewport
    const viewportPos = calculateViewportPosition();
    setViewportPosition(viewportPos);
    
    // Блокируем прокрутку экрана
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${viewportPos.top}px`;
    
    // Уведомляем родительский компонент о открытии модального окна
    onModalStateChange?.(true);
    
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (HapticFeedback.light) {
      HapticFeedback.light();
    }
    
    // Восстанавливаем прокрутку экрана
    document.body.style.overflow = 'auto';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    
    // Восстанавливаем позицию прокрутки
    window.scrollTo(viewportPosition.left, viewportPosition.top);
    
    // Уведомляем родительский компонент о закрытии модального окна
    onModalStateChange?.(false);
    
    setIsModalOpen(false);
  };

  const handleImageClick = (item: string | { id: number; name: string; details: string; color: string }) => {
    if (HapticFeedback.light) {
      HapticFeedback.light();
    }
    console.log('Opening full item:', item);
    
    // Прокрутка уже заблокирована модальным окном, просто открываем полноэкранный просмотр
    setSelectedImage(item);
  };

  const handleCloseFullImage = () => {
    if (HapticFeedback.light) {
      HapticFeedback.light();
    }
    
    // НЕ восстанавливаем прокрутку экрана, так как модальное окно все еще открыто
    // Просто закрываем полноэкранный просмотр
    
    setSelectedImage(null);
  };

  return (
    <>
      <PurchasesCard $isDark={isDarkTheme}>
        <PurchasesHeader>
          <PurchasesTitle>Наши выкупы</PurchasesTitle>
          <PurchasesSubtitle>
            Посмотрите, что мы уже доставили нашим клиентам
          </PurchasesSubtitle>
          <ViewPurchasesButton onClick={handleOpenModal}>
            Посмотреть выкупы
          </ViewPurchasesButton>
        </PurchasesHeader>
      </PurchasesCard>

      {/* Модальное окно с галереей */}
      {isModalOpen && (
        <ModalOverlay
          $top={viewportPosition.top}
          $left={viewportPosition.left}
          $width={viewportPosition.width}
          $height={viewportPosition.height}
          onClick={handleCloseModal}
        >
          <Modal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Наши выкупы</ModalTitle>
              <CloseButton onClick={handleCloseModal}>
                ×
              </CloseButton>
            </ModalHeader>
            
            <GalleryGrid>
              {purchaseImages.length > 0 ? (
                purchaseImages.map((imageSrc, index) => (
                  <img
                    key={index}
                    src={imageSrc}
                    alt={`Выкуп ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      backgroundColor: 'var(--bg-secondary)',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: '2px solid transparent',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Image clicked:', imageSrc);
                      handleImageClick(imageSrc);
                    }}
                    onError={(e) => {
                      // Если изображение не найдено, скрываем его
                      e.currentTarget.style.display = 'none';
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
                    }}
                  />
                ))
              ) : (
                // Fallback к цветным блокам, если изображения не загрузились
                [
                  { id: 1, name: 'Кроссовки Nike', details: 'Размер: 42', color: '#4CAF50' },
                  { id: 2, name: 'Рюкзак Adidas', details: 'Черный', color: '#2196F3' },
                  { id: 3, name: 'Худи Supreme', details: 'Размер: L', color: '#FF9800' },
                  { id: 4, name: 'Джинсы Levis', details: 'Размер: 32', color: '#9C27B0' },
                  { id: 5, name: 'Кепка New Era', details: 'Красная', color: '#F44336' },
                  { id: 6, name: 'Сумка Gucci', details: 'Коричневая', color: '#795548' },
                  { id: 7, name: 'Часы Rolex', details: 'Золотые', color: '#FFD700' },
                ].map((item, index) => (
                  <PurchaseCard
                    key={item.id}
                    $color={item.color}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Item clicked:', item);
                      handleImageClick(item);
                    }}
                  >
                    <PurchaseTitle>{item.name}</PurchaseTitle>
                    <PurchaseDetails>{item.details}</PurchaseDetails>
                  </PurchaseCard>
                ))
              )}
            </GalleryGrid>
          </Modal>
        </ModalOverlay>
      )}

      {/* Полноэкранный просмотр товара */}
      {selectedImage && (
        <FullImageModal onClick={handleCloseFullImage}>
          {typeof selectedImage === 'string' ? (
            // Если это путь к изображению
            <FullImage
              src={selectedImage}
              alt="Выкуп"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                console.error('Error loading full image:', selectedImage);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => {
                console.log('Full image loaded successfully:', selectedImage);
              }}
            />
          ) : (
            // Если это объект товара (цветной блок)
            <div
              style={{
                width: 'min(90vw, 500px)',
                height: 'min(90vh, 400px)',
                background: selectedImage.color,
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontFamily: 'Inter, Arial, sans-serif',
                textAlign: 'center',
                padding: '40px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                position: 'relative',
                zIndex: 10001,
                margin: 'auto',
                maxWidth: '90vw',
                maxHeight: '90vh'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                marginBottom: '20px',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                {selectedImage.name}
              </div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '400',
                opacity: '0.9',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>
                {selectedImage.details}
              </div>
            </div>
          )}
        </FullImageModal>
      )}
    </>
  );
};

export default PurchasesGallery;
