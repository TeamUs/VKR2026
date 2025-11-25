import React, { useState, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';

// Анимации
const floatChaotic = keyframes`
  0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
  25% { transform: translateY(-8px) translateX(4px) rotate(1deg); }
  50% { transform: translateY(-15px) translateX(-2px) rotate(-1deg); }
  75% { transform: translateY(-5px) translateX(6px) rotate(0.5deg); }
`;

const slideIn = keyframes`
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const expandAnswer = keyframes`
  from { max-height: 0; opacity: 0; }
  to { max-height: 300px; opacity: 1; }
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
const FAQContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  padding: 0px 0px 100px 0px;
  position: relative;
  z-index: 1;
`;


const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const FAQItem = styled.div`
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  margin-bottom: 16px;
  overflow: hidden;
  margin: 0 16px 16px 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    border-color: var(--matte-terracotta);
  }
`;

const QuestionButton = styled.button`
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
    background: var(--bg-hover);
  }
`;

const QuestionText = styled.span`
  flex: 1;
  margin-right: 15px;
  line-height: 1.5;
`;

const ExpandIcon = styled.span<{ $isOpen: boolean }>`
  font-size: 1.2rem;
  color: var(--matte-terracotta);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const Answer = styled.div<{ $isOpen: boolean }>`
  max-height: ${props => props.$isOpen ? '300px' : '0'};
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--bg-hover);
  
  ${props => props.$isOpen && css`
    animation: ${expandAnswer} 0.4s ease-out;
  `}
`;

const AnswerContent = styled.div`
  padding: 20px;
  color: var(--text-secondary);
  line-height: 1.6;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.95rem;
  white-space: pre-line;
`;

const ContactSection = styled.div<{ $isDark?: boolean }>`
  background: transparent;
  border: 2px solid var(--matte-red);
  border-radius: 16px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 15px rgba(162, 59, 59, 0.3), 0 2px 8px var(--shadow-soft);
  margin: 10px 16px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(162, 59, 59, 0.4), 0 4px 16px var(--shadow-card);
    border-color: var(--matte-red);
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
    transform: translateY(-3px);
    background: var(--terracotta);
    box-shadow: 
      0 8px 20px var(--shadow-card),
      0 4px 12px var(--shadow-soft);
    border-color: var(--matte-red);
  }
`;

// Новые компоненты для поиска и категорий
const SearchContainer = styled.div`
  margin-bottom: 25px;
  position: relative;
  margin: 0 16px 25px 16px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 15px 20px 15px 50px;
  border: 2px solid var(--border-color);
  border-radius: 16px;
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 1rem;
  font-family: 'Inter', Arial, sans-serif;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px var(--shadow-soft);
  
  &::placeholder {
    color: var(--text-secondary);
  }
  
  &:focus {
    outline: none;
    border-color: var(--matte-red);
    box-shadow: 
      0 4px 12px var(--shadow-soft),
      0 0 0 3px rgba(162, 59, 59, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-size: 1.2rem;
  pointer-events: none;
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const CategoryButton = styled.button<{ $active: boolean }>`
  padding: 6px 12px;
  border: 1px solid var(--border-color);
  border-radius: 15px;
  background: ${props => props.$active ? 'var(--matte-red)' : 'var(--bg-card)'};
  color: ${props => props.$active ? 'var(--bg-primary)' : 'var(--text-primary)'};
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'Inter', Arial, sans-serif;
  box-shadow: 0 1px 4px var(--shadow-soft);
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-1px);
    background: ${props => props.$active ? 'var(--terracotta)' : 'var(--sand)'};
    border-color: var(--matte-red);
    box-shadow: 0 2px 8px var(--shadow-card);
  }
  
  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 0.75rem;
  }
`;


const NoResults = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--text-secondary);
  font-size: 1.1rem;
  font-family: 'Inter', Arial, sans-serif;
  margin: 0 16px;
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

interface FAQProps {
  onNavigate: (view: string) => void;
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const FAQ: React.FC<FAQProps> = ({ onNavigate, toggleTheme, isDarkTheme }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const handleContactManager = () => {
    if (window.Telegram?.WebApp?.openTelegramLink) {
      window.Telegram.WebApp.openTelegramLink('https://t.me/poizonic_manager');
    }
  };


  const faqData = [
    // ОБЩИЕ ВОПРОСЫ
    {
      question: "Что такое Poizon?",
      answer: "Poizon (он же Dewu) — это китайский маркетплейс, специализирующийся на брендовой одежде, обуви, аксессуарах и товарах. Каждый товар проходит ручную проверку на оригинальность экспертами в Китае. Цены в 4-6 раз ниже, чем в России. Работает только через мобильное приложение и доставляет товары только внутри Китая.",
      category: "Общее"
    },
    {
      question: "Чем Poizon отличается от других маркетплейсов?",
      answer: "Poizon фокусируется строго на оригинальных товарах и имеет огромный ассортимент с гарантированной аутентификацией. Товары проверяются перед отправкой, что исключает риск подделок. Компания работает с 2015 года и имеет миллионы пользователей в Китае.",
      category: "Общее"
    },
    {
      question: "Безопасно ли покупать на Poizon?",
      answer: "Да, Poizon — легитимный маркетплейс с отличной репутацией. Все товары проходят многоуровневую проверку на оригинальность, и платформа использует защищенные платежи. Однако для доставки в Россию нужен посредник, как наш сервис.",
      category: "Общее"
    },
    {
      question: "Что такое 95?",
      answer: "95 — это китайский маркетплейс, аналогичный Poizon, специализирующийся на обуви, одежде, аксессуарах и товаров, которые были в использовании. Товары проходят проверку на оригинальность, цены ниже рыночных, даже ниже, чем на Poizon. Доставка только внутри Китая, работает через приложение.",
      category: "Общее"
    },
    {
      question: "Чем 95 отличается от Poizon?",
      answer: "95 ориентирован на товары, которые были в использовании, но с обязательной проверкой оригинальности. Как и Poizon, имеет строгую аутентификацию, но ассортимент постоянно меняется, так как товары изначально выставляют обычные люди. Цены конкурентные, несколько этапов проверки товаров перед отправкой самой площадкой.",
      category: "Общее"
    },

    // ПОИСК ТОВАРОВ
    {
      question: "Как искать товары на Poizon?",
      answer: "1. Откройте приложение Poizon.\n2. Введите название модели на английском (например, 'Nike Air Jordan 1') или используйте поиск по фото.\n3. Выберите размер (европейская система).\n4. Сохраните ссылку на товар для заказа.",
      category: "Поиск"
    },
    {
      question: "Как найти нужный размер на Poizon?",
      answer: "Размеры в Poizon указаны в европейской системе. Используйте таблицу размеров бренда в приложении или конвертер. Рекомендуем проверить перед заказом, так как обмен невозможен.",
      category: "Поиск"
    },
    {
      question: "Можно ли искать товары по фото на Poizon?",
      answer: "Да, в приложении есть функция поиска по фото. Загрузите изображение, и система найдет похожие товары.",
      category: "Поиск"
    },
    {
      question: "Что делать, если не могу найти товар на Poizon?",
      answer: "Свяжитесь с менеджером, отправьте фото или описание. Мы поможем найти модель или аналоги на Poizon.",
      category: "Поиск"
    },
    {
      question: "Как проверить наличие товара на Poizon?",
      answer: "В приложении отображается актуальное наличие. Если товар доступен, он показан с ценой и размерами.",
      category: "Поиск"
    },
    {
      question: "Как искать товары на 95?",
      answer: "1. Откройте приложение 95.\n2. Введите название модели на английском или используйте поиск по фото.\n3. Выберите размер (европейская система).\n4. Сохраните ссылку для заказа.",
      category: "Поиск"
    },
    {
      question: "Как найти нужный размер на 95?",
      answer: "Размеры в 95 — европейские. Используйте таблицу размеров в приложении. Проверьте перед заказом, обмен невозможен.",
      category: "Поиск"
    },
    {
      question: "Можно ли искать товары по фото на 95?",
      answer: "Да, приложение поддерживает поиск по фото для нахождения похожих товаров.",
      category: "Поиск"
    },
    {
      question: "Что делать, если не могу найти товар на 95?",
      answer: "Обратитесь к менеджеру с фото или описанием. Мы найдем товар или аналоги на 95.",
      category: "Поиск"
    },
    {
      question: "Как проверить наличие товара на 95?",
      answer: "Наличие показано в приложении с ценой и размерами для доступных товаров.",
      category: "Поиск"
    },

    // КАЧЕСТВО И ОРИГИНАЛЬНОСТЬ
    {
      question: "Оригинальный ли товар на Poizon?",
      answer: "Да, Poizon гарантирует оригинальность: товары проходят AI-проверку и ручную экспертизу перед отправкой. С каждым товаром идет сертификат с QR-кодом.",
      category: "Качество"
    },
    {
      question: "Как Poizon проверяет оригинальность?",
      answer: "Многоуровневая проверка: AI-анализ, сравнение с оригиналами, экспертиза материалов, штрих-кодов. Минимум 2 эксперта проверяют каждый товар.",
      category: "Качество"
    },
    {
      question: "Что такое сертификат подлинности на Poizon?",
      answer: "Документ с QR-кодом для проверки оригинальности на сайте Poizon, содержащий детали товара и результаты экспертизы.",
      category: "Качество"
    },
    {
      question: "Оригинальный ли товар на 95?",
      answer: "Да, 95 проверяет товары на оригинальность с помощью экспертов и AI, аналогично Poizon.",
      category: "Качество"
    },
    {
      question: "Как 95 проверяет оригинальность?",
      answer: "Проверка включает анализ материалов, штрих-кодов и сравнение с оригиналами перед отправкой.",
      category: "Качество"
    },
    {
      question: "Что такое сертификат подлинности на 95?",
      answer: "Документ с QR-кодом для верификации оригинальности на платформе 95.",
      category: "Качество"
    },

    // ДОСТАВКА
    {
      question: "Каковы условия доставки?",
      answer: "Доставка из Китая: 800 руб/кг (включена в стоимость). Доставка по России отдельно в пункте выдачи. Срок: 20-25 дней.",
      category: "Доставка"
    },
    {
      question: "Сколько стоит доставка?",
      answer: "Из Китая: 800 руб/кг (включено в цену товара). По России: в зависимости от региона и выбранной транспортной компании.",
      category: "Доставка"
    },
    {
      question: "Как долго идет доставка?",
      answer: "Общий срок: 20-25 дней. Зависит от складов и логистики.",
      category: "Доставка"
    },
    {
      question: "Как отследить посылку?",
      answer: "После отправки предоставим трек-номер для отслеживания.",
      category: "Доставка"
    },
    {
      question: "В какие города доставляете?",
      answer: "Во все города России. В отдаленные регионы доставка может занимать больше времени.",
      category: "Доставка"
    },

    // ВОЗВРАТ И ОБМЕН
    {
      question: "В каких случаях возможен возврат?",
      answer: "Возврат возможен только в день оформления заказа.",
      category: "Возврат"
    },
    {
      question: "Что если товар не подошел?",
      answer: "Возврат по 'не подошел' невозможен. Выбирайте размер внимательно.",
      category: "Возврат"
    },

    // ОФОРМЛЕНИЕ ЗАКАЗА
    {
      question: "Как оформить заказ?",
      answer: "1. Нажмите 'Сделать заказ'.\n2. Отправьте ссылку на товар.\n3. Укажите размер и данные.\n4. Оплатите по реквизитам менеджера.\n5. Получите товар.",
      category: "Заказ"
    },
    {
      question: "Какие данные нужны для заказа?",
      answer: "Ссылка на товар, размер, ФИО, адрес, телефон. Данные должны быть точными.",
      category: "Заказ"
    },
    {
      question: "Можно ли заказать несколько товаров?",
      answer: "Да, в одном заказе — экономия на доставке.",
      category: "Заказ"
    },
    {
      question: "Можно ли отменить заказ?",
      answer: "Да, до оплаты. После оплаты отмена невозможна.",
      category: "Заказ"
    },
    {
      question: "Можно ли заказать товар не из категорий?",
      answer: "Да, менеджер рассчитает стоимость для любого товара с Poizon или 95.",
      category: "Заказ"
    },
    {
      question: "Нужно ли регистрироваться для заказа?",
      answer: "Нет, просто сделайте заказ в приложении и менеджер свяжется с вами.",
      category: "Заказ"
    },

    // ОПЛАТА
    {
      question: "Как происходит оплата?",
      answer: "100% предоплата после оформления. В стоимость входит товар, комиссия, доставка из Китая.",
      category: "Оплата"
    },
    {
      question: "Какие способы оплаты доступны?",
      answer: "Банковский перевод, Crypto.",
      category: "Оплата"
    },
    {
      question: "Когда нужно оплачивать?",
      answer: "Сразу после подтверждения заказа менеджером.",
      category: "Оплата"
    },
    {
      question: "Что входит в стоимость?",
      answer: "Цена товара, комиссия, доставка из Китая. По России — отдельно.",
      category: "Оплата"
    },
    {
      question: "Есть ли скрытые платежи?",
      answer: "Нет, менеджер сообщит полную стоимость заранее.",
      category: "Оплата"
    },

    // ЦЕНЫ И РАСЧЕТЫ
    {
      question: "Что означает символ ≈ на товаре?",
      answer: "Таким знаком обозначаться товар, который находится не в Китае и доставляется по другим тарифам. Точная стоимость рассчитывается менеджером. Товары с таким знаком выходят дороже обычных, но мы также можем их доставить.",
      category: "Цены"
    },
    {
      question: "Как рассчитывается стоимость?",
      answer: "Цена товара + комиссия + доставка из Китая (800 руб/кг). После этого отдельным платежом происходит оплата доставки внутри РФ.",
      category: "Цены"
    },
    {
      question: "Влияет ли курс валют на цену?",
      answer: "Да, используем курс на момент заказа.",
      category: "Цены"
    },
    {
      question: "Есть ли скидки?",
      answer: "Да, получайте достижения, повышайте свой уровень и заказывайте выгоднее. Также вы можете приводить друзей по своей реферальной ссылке и получать скидку на комиссию.",
      category: "Цены"
    },

    // РЕФЕРАЛЬНАЯ ПРОГРАММА
    {
      question: "Как работает реферальная программа?",
      answer: "Пригласите друга по ссылке и вы оба получите скидку с 1000₽ до 400₽ на 7 и 14 дней.",
      category: "Рефералы"
    },
    {
      question: "Как получить реферальную ссылку?",
      answer: "Ссылка генерируется в разделе 'Реферальная программа'. Поделитесь ей с друзьями.",
      category: "Рефералы"
    },
    {
      question: "Сколько можно сэкономить на рефералах?",
      answer: "За каждого друга — скидка с 1000₽ до 400₽ на 7 дней. Больше друзей — больше дней с пониженной комиссией.",
      category: "Рефералы"
    },
    {
      question: "Когда начисляется скидка?",
      answer: "Сразу после перехода друга по вашей ссылке. Действует 7 дней за одного друга.",
      category: "Рефералы"
    },
    {
      question: "Можно ли использовать скидку несколько раз?",
      answer: "Да, на все заказы в течение 7 дней.",
      category: "Рефералы"
    },

    // ТЕХНИЧЕСКИЕ ВОПРОСЫ
    {
      question: "Почему не работает приложение?",
      answer: "Перезагрузите или обновите приложение. Если проблема остается, обратитесь за помощью к менеджеру.",
      category: "Техническое"
    },
    {
      question: "Как связаться с поддержкой?",
      answer: "Через Telegram: @poizonic_manager.",
      category: "Техническое"
    },
    {
      question: "Работает ли сервис в выходные?",
      answer: "Да, менеджер всегда на связи, пишите!.",
      category: "Техническое"
    },
    {
      question: "Можно ли заказать товар ночью?",
      answer: "Да, оформите заказ в любое время. Менеджер обработает в рабочее время.",
      category: "Техническое"
    },

    // СПЕЦИАЛЬНЫЕ СЛУЧАИ
    {
      question: "Можно ли заказать товар в подарок?",
      answer: "Да, укажите данные получателя — доставим по адресу.",
      category: "Специальное"
    },
    {
      question: "Можно ли заказать товар для бизнеса?",
      answer: "Да, работаем с оптом. Обсудите условия и скидки с менеджером.",
      category: "Специальное"
    },
    {
      question: "Есть ли ограничения по весу?",
      answer: "Нет ограничений. Доставка — 800 руб/кг из Китая.",
      category: "Специальное"
    },
  ];

  const categories = ["Все", "Общее", "Поиск", "Качество", "Доставка", "Возврат", "Заказ", "Оплата", "Цены", "Рефералы", "Техническое", "Специальное"];
  // Обновлено: FAQ данные синхронизированы
  // Фильтрация и поиск
  const filteredFAQ = useMemo(() => {
    return faqData.filter(item => {
      const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Все' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <FAQContainer>
      <Header>
        <BackButton onClick={() => onNavigate('main')}>
          ‹
        </BackButton>
        <Title>Часто задаваемые вопросы</Title>
        <ThemeToggle onClick={toggleTheme}>
          <ToggleIcon $isDark={isDarkTheme}>🌙</ToggleIcon>
          <ToggleIconDark $isDark={isDarkTheme}>☀️</ToggleIconDark>
          <ToggleSlider $isDark={isDarkTheme}></ToggleSlider>
        </ThemeToggle>
      </Header>

      <Content>
        {/* Поиск */}
        <SearchContainer>
          <SearchIcon>🔍</SearchIcon>
          <SearchInput
            type="text"
            placeholder="Поиск по вопросам и ответам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchContainer>

        {/* Помощь */}
        <ContactSection $isDark={isDarkTheme}>
          <ContactTitle>Не нашли ответ на свой вопрос?</ContactTitle>
          <ContactText>
            Свяжитесь с нашим менеджером - мы всегда готовы помочь!
          </ContactText>
          <ContactButton onClick={handleContactManager}>
            Связаться с менеджером
          </ContactButton>
        </ContactSection>

        {/* FAQ список */}
        {filteredFAQ.length > 0 ? (
          filteredFAQ.map((item, index) => (
            <FAQItem key={index}>
              <QuestionButton onClick={() => toggleItem(index)}>
                <QuestionText>{item.question}</QuestionText>
                <ExpandIcon $isOpen={openItems.includes(index)}>▼</ExpandIcon>
              </QuestionButton>
              <Answer $isOpen={openItems.includes(index)}>
                <AnswerContent>
                  {item.answer}
                </AnswerContent>
              </Answer>
            </FAQItem>
          ))
        ) : (
          <NoResults>
            По вашему запросу ничего не найдено. 
            Попробуйте изменить поисковый запрос или выберите другую категорию.
          </NoResults>
        )}
      </Content>
    </FAQContainer>
  );
};

export default FAQ;