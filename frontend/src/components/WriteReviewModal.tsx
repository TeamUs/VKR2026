import React, { useState, useRef, useEffect } from 'react';
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

const ModalOverlay = styled.div`
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
  min-height: 100vh;
  overflow: auto;
  
  /* Адаптивность для маленьких экранов */
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

const ModalContainer = styled.div<{ $scrollPosition: number }>`
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
  animation: modalFadeIn 0.4s ease-out;
  
  @keyframes modalFadeIn {
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

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
  padding-bottom: 15px;
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

const FormGroup = styled.div`
  margin-bottom: 20px;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
  min-height: 120px;
  resize: none;
  font-family: 'Inter', Arial, sans-serif;
  
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

const RatingContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const StarButton = styled.button<{ $filled: boolean }>`
  background: none;
  border: none;
  font-size: 2rem;
  color: ${props => props.$filled ? 'var(--matte-red)' : 'var(--text-secondary)'};
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 5px;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const PhotoUpload = styled.div`
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--bg-secondary);
  
  &:hover {
    border-color: var(--matte-red);
    background: var(--bg-card);
  }
`;

const PhotoInput = styled.input`
  display: none;
`;

const PhotoPreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  margin-top: 10px;
  object-fit: cover;
`;

const SubmitButton = styled.button<{ $disabled: boolean }>`
  background: ${props => props.$disabled ? 'var(--text-secondary)' : 'var(--matte-red)'};
  border: none;
  border-radius: 12px;
  padding: 15px 25px;
  color: var(--bg-primary);
  font-size: 1rem;
  font-weight: 600;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  &:hover:not(:disabled) {
    background: var(--terracotta);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
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

const SuccessMessage = styled.div`
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05));
  border: 2px solid rgba(76, 175, 80, 0.3);
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 15px;
  text-align: center;
  color: #4CAF50;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 
    0 4px 12px rgba(76, 175, 80, 0.15),
    0 2px 6px rgba(76, 175, 80, 0.1);
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.5s ease-out;
  position: relative;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
`;

const SuccessMessageOld = styled.div`
  color: var(--text-primary);
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
  background: var(--bg-secondary);
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
`;


interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  scrollPosition: number;
}

const WriteReviewModal: React.FC<WriteReviewModalProps> = ({ isOpen, onClose, onSuccess, scrollPosition }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    const newPhotos: File[] = [];
    const newPreviews: string[] = [];
    
    // Добавляем новые фото к существующим (максимум 10 фото)
    const totalPhotos = photos.length + files.length;
    if (totalPhotos > 10) {
      setError('Можно загрузить максимум 10 фото');
      return;
    }
    
    Array.from(files).forEach((file, fileIndex) => {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Размер каждого файла не должен превышать 5MB');
        return;
      }
      
      newPhotos.push(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newPreviews.push(e.target.result as string);
          // Обновляем только когда все файлы прочитаны
          if (newPreviews.length === files.length) {
            setPhotoPreviews([...photoPreviews, ...newPreviews]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
    
    setPhotos([...photos, ...newPhotos]);
    setError(null);
    
    // Сбрасываем input чтобы можно было выбрать те же файлы снова
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
    setPhotoPreviews(photoPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      setError('Пожалуйста, поставьте оценку');
      return;
    }
    
    if (!reviewText.trim()) {
      setError('Пожалуйста, напишите отзыв');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const telegramId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id?.toString() || '123456789';
      const username = window.Telegram?.WebApp?.initDataUnsafe?.user?.username || 'test_user';
      const fullName = window.Telegram?.WebApp?.initDataUnsafe?.user?.first_name || 'Test User';
      
      console.log('Отправляемые данные:', {
        telegram_id: telegramId,
        username: username,
        full_name: fullName,
        rating: rating,
        review_text: reviewText
      });

      const formData = new FormData();
      formData.append('telegram_id', telegramId);
      formData.append('username', username);
      formData.append('full_name', fullName);
      formData.append('rating', rating.toString());
      formData.append('review_text', reviewText);
      
      // Добавляем все фото
      photos.forEach(photo => {
        formData.append('photos', photo);
      });

      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        // Показываем сообщение об успехе
        setSuccessMessage('Спасибо за ваш отзыв!');
        
        // Сбрасываем все поля формы
        setRating(0);
        setReviewText('');
        setPhotos([]);
        setPhotoPreviews([]);
        setError(null);
        setSuccess(null);
        
        // Закрываем модальное окно через 2 секунды
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error('Ошибка сервера:', errorData);
        setError(errorData.error || 'Ошибка отправки отзыва');
      }
    } catch (err) {
      console.error('Ошибка отправки отзыва:', err);
      setError('Ошибка отправки отзыва');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      // Сбрасываем все поля формы
      setRating(0);
      setReviewText('');
      setPhotos([]);
      setPhotoPreviews([]);
      setError(null);
      setSuccess(null);
      setSuccessMessage(null);
      onClose();
    }
  };


  // Тактильная обратная связь при открытии и сброс формы при закрытии
  React.useEffect(() => {
    if (isOpen && HapticFeedback.light) {
      HapticFeedback.light();
    } else if (!isOpen) {
      // Сбрасываем форму при закрытии модального окна
      setRating(0);
      setReviewText('');
      setPhotos([]);
      setPhotoPreviews([]);
      setError(null);
      setSuccess(null);
      setSuccessMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <ModalOverlay onClick={handleClose}>
        <ModalContainer 
          $scrollPosition={scrollPosition} 
          onClick={(e) => e.stopPropagation()}
          style={{
            '--scroll-position': `${scrollPosition}px`
          } as React.CSSProperties}
        >
        <ModalHeader>
          <ModalTitle>Написать отзыв</ModalTitle>
          <CloseButton onClick={handleClose} disabled={isSubmitting}>
            ×
          </CloseButton>
        </ModalHeader>

        <FormGroup>
          <Label>Оценка *</Label>
          <RatingContainer>
            {[1, 2, 3, 4, 5].map((star) => (
              <StarButton
                key={star}
                $filled={star <= rating}
                onClick={() => setRating(star)}
                disabled={isSubmitting}
              >
                ★
              </StarButton>
            ))}
          </RatingContainer>
        </FormGroup>

        <FormGroup>
          <Label>Отзыв *</Label>
          <TextArea
            value={reviewText}
            onChange={(e) => {
              setReviewText(e.target.value);
              // Автоматическое увеличение высоты
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            placeholder="Поделитесь своим опытом..."
            disabled={isSubmitting}
          />
        </FormGroup>

        <FormGroup>
          <Label>Фото (необязательно, до {10 - photos.length} фото)</Label>
          {photos.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '10px', marginBottom: '10px' }}>
              {photoPreviews.map((preview, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <PhotoPreview src={preview} alt={`Предпросмотр ${index + 1}`} style={{ width: '100%', height: '80px' }} />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(index)}
                    disabled={isSubmitting}
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
                      background: 'rgba(255, 0, 0, 0.8)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      lineHeight: '1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          {photos.length < 10 && (
            <PhotoUpload onClick={() => fileInputRef.current?.click()} style={{ borderColor: photos.length > 0 ? 'var(--border-color)' : undefined }}>
              <PhotoInput
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
                disabled={isSubmitting}
              />
              <div>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📷</div>
                <div>Нажмите, чтобы добавить фото</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '5px' }}>
                  До {10 - photos.length} фото, каждое до 5MB {photos.length > 0 && `(${photos.length} уже загружено)`}
                </div>
              </div>
            </PhotoUpload>
          )}
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

        <SubmitButton 
          onClick={handleSubmit} 
          $disabled={isSubmitting || rating === 0 || !reviewText.trim()}
        >
          {isSubmitting ? (
            <>
              <LoadingSpinner />
              Отправка...
            </>
          ) : (
            'Отправить отзыв'
          )}
        </SubmitButton>
      </ModalContainer>
    </ModalOverlay>

      
    </>
  );
};

export default WriteReviewModal;
