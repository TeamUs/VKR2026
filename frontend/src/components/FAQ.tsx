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

const ContactSection = styled.div`
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin: 10px 16px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    border-color: var(--matte-terracotta);
  }
`;


const ContactTitle = styled.h3`
  font-family: 'Noto Sans SC', 'Inter', Arial, sans-serif;
  color: var(--text-primary);
  margin-bottom: 5px;
  font-size: 0.9rem;
  font-weight: 600;
`;

const ContactText = styled.p`
  color: var(--text-secondary);
  line-height: 1.3;
  margin-bottom: 8px;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 0.75rem;
`;

const ContactButton = styled.button`
  background: var(--matte-red);
  border: 1px solid var(--matte-red);
  border-radius: 12px;
  padding: 8px 18px;
  color: var(--bg-primary);
  font-size: 0.8rem;
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
      answer: "Китайский маркетплейс с брендовыми товарами. Каждый товар проходит проверку на оригинальность. Товары в 4-6 раз дешевле, чем в России. Работает только через приложение.",
      category: "Общее"
    },
    {
      question: "Чем Poizon отличается от других маркетплейсов?",
      answer: "Poizon специализируется на брендовых товарах с гарантией оригинальности. Каждый товар проходит многоуровневую проверку качества. Цены в 4-6 раз ниже российских.",
      category: "Общее"
    },
    {
      question: "Безопасно ли покупать на Poizon?",
      answer: "Да, абсолютно безопасно. Все товары проходят проверку на оригинальность. Мы работаем с проверенными поставщиками и гарантируем качество товаров.",
      category: "Общее"
    },
    {
      question: "Можно ли доверять Poizon?",
      answer: "Poizon - официальный китайский маркетплейс с миллионами пользователей. Компания работает с 2015 года и имеет отличную репутацию в Китае.",
      category: "Общее"
    },
    {
      question: "Что такое Dewu?",
      answer: "Dewu - еще один китайский маркетплейс, похожий на Poizon. Мы также работаем с товарами с Dewu. Оба сервиса специализируются на брендовых товарах.",
      category: "Общее"
    },

    // ПОИСК ТОВАРОВ
    {
      question: "Как искать товары на Poizon?",
      answer: "1. Откройте маркетплейс (2-й раздел)\n2. Введите название модели на английском или используйте поиск по фото\n3. Выберите размер (европейские размеры)\n4. Сохраните ссылку на товар",
      category: "Поиск"
    },
    {
      question: "Как найти нужный размер на Poizon?",
      answer: "В приложении Poizon размеры указаны в европейской системе. Найдите таблицу размеров для конкретного бренда или используйте конвертер размеров.",
      category: "Поиск"
    },
    {
      question: "Можно ли искать товары по фото?",
      answer: "Да, в приложении Poizon есть функция поиска по фото. Просто загрузите изображение товара, и система найдет похожие варианты.",
      category: "Поиск"
    },
    {
      question: "Как правильно искать на английском?",
      answer: "Используйте официальные названия моделей на английском языке. Например: 'Air Jordan 1', 'Nike Dunk Low', 'Adidas Yeezy'. Избегайте русских названий.",
      category: "Поиск"
    },
    {
      question: "Что делать, если не могу найти товар?",
      answer: "Свяжитесь с менеджером и отправьте фото или описание товара. Мы поможем найти нужную модель или подберем аналоги.",
      category: "Поиск"
    },
    {
      question: "Как проверить наличие товара?",
      answer: "В приложении Poizon отображается актуальное наличие. Если товар есть в наличии, он будет доступен для заказа.",
      category: "Поиск"
    },

    // КАЧЕСТВО И ОРИГИНАЛЬНОСТЬ
    {
      question: "Оригинальный ли товар на Poizon?",
      answer: "Да, все товары проходят проверку. С каждым товаром идут сертификат и пломбы с QR-кодом. Каждый товар проверяет минимум два сотрудника.",
      category: "Качество"
    },
    {
      question: "Как Poizon проверяет оригинальность?",
      answer: "Poizon использует многоуровневую систему проверки: экспертиза материалов, сравнение с оригинальными образцами, проверка штрих-кодов и сертификатов.",
      category: "Качество"
    },
    {
      question: "Что такое сертификат подлинности?",
      answer: "Сертификат подлинности - это документ, подтверждающий оригинальность товара. Он содержит QR-код для проверки и детали товара.",
      category: "Качество"
    },
    {
      question: "Можно ли проверить подлинность товара?",
      answer: "Да, каждый товар имеет QR-код и уникальный номер для проверки на официальном сайте Poizon. Все сертификаты подлинны.",
      category: "Качество"
    },
    {
      question: "Что если товар окажется подделкой?",
      answer: "Такие случаи исключены благодаря строгой проверке. Если возникнут сомнения, мы вернем деньги и компенсируем все расходы.",
      category: "Качество"
    },
    {
      question: "Есть ли гарантия на товары?",
      answer: "Да, все товары имеют гарантию оригинальности. При обнаружении брака или подделки мы полностью компенсируем стоимость.",
      category: "Качество"
    },

    // ДОСТАВКА
    {
      question: "Каковы условия доставки?",
      answer: "Доставка из Китая: 800 руб/кг (включена в стоимость). Доставка по России оплачивается отдельно в пункте выдачи. Срок: около 15 дней.",
      category: "Доставка"
    },
    {
      question: "Сколько стоит доставка?",
      answer: "Доставка из Китая: 800 руб/кг (уже включена в стоимость товара). Доставка по России: от 200 до 500 рублей в зависимости от региона.",
      category: "Доставка"
    },
    {
      question: "Как долго идет доставка?",
      answer: "Общий срок доставки: 12-18 дней. Время может варьироваться в зависимости от загруженности складов и логистических служб.",
      category: "Доставка"
    },
    {
      question: "Можно ли ускорить доставку?",
      answer: "К сожалению, ускорить доставку из Китая нельзя. Это связано с таможенными процедурами и логистическими процессами.",
      category: "Доставка"
    },
    {
      question: "Как отследить посылку?",
      answer: "После отправки мы предоставим трек-номер для отслеживания. Вы сможете следить за движением посылки через сайт транспортной компании.",
      category: "Доставка"
    },
    {
      question: "В какие города доставляете?",
      answer: "Доставляем во все города России. В крупные города доставка быстрее, в отдаленные регионы может занять больше времени.",
      category: "Доставка"
    },
    {
      question: "Можно ли изменить адрес доставки?",
      answer: "Да, можно изменить адрес до отправки товара. После отправки изменение адреса невозможно.",
      category: "Доставка"
    },
    {
      question: "Что если посылка потерялась?",
      answer: "В случае потери посылки мы полностью компенсируем стоимость товара и доставки. Страхуем все отправления.",
      category: "Доставка"
    },

    // ВОЗВРАТ И ОБМЕН
    {
      question: "В каких случаях возможен возврат?",
      answer: "Возврат только в день оформления заказа. Бракованные товары не доходят до покупателей благодаря проверке качества.",
      category: "Возврат"
    },
    {
      question: "Можно ли вернуть товар после получения?",
      answer: "Возврат возможен только при обнаружении брака или несоответствия заказу. Все товары проходят проверку перед отправкой.",
      category: "Возврат"
    },
    {
      question: "Как вернуть деньги?",
      answer: "При возврате деньги возвращаются на тот же способ оплаты, которым был оплачен заказ. Срок возврата: 3-5 рабочих дней.",
      category: "Возврат"
    },
    {
      question: "Можно ли обменять размер?",
      answer: "Обмен размера возможен только до отправки товара. После отправки обмен невозможен из-за логистических особенностей.",
      category: "Возврат"
    },
    {
      question: "Что если товар не подошел?",
      answer: "К сожалению, возврат по причине 'не подошел' невозможен. Рекомендуем внимательно выбирать размер перед заказом.",
      category: "Возврат"
    },

    // ОФОРМЛЕНИЕ ЗАКАЗА
    {
      question: "Как оформить заказ?",
      answer: "1. Нажмите 'Сделать заказ'\n2. Отправьте ссылку на товар\n3. Укажите размер и данные\n4. Оплатите по реквизитам менеджера\n5. Получите товар",
      category: "Заказ"
    },
    {
      question: "Какие данные нужны для заказа?",
      answer: "Нужны: ссылка на товар, размер, ФИО получателя, адрес доставки, номер телефона. Все данные должны быть точными.",
      category: "Заказ"
    },
    {
      question: "Можно ли заказать несколько товаров?",
      answer: "Да, можно заказать несколько товаров в одном заказе. Это поможет сэкономить на доставке.",
      category: "Заказ"
    },
    {
      question: "Как изменить заказ?",
      answer: "Изменения возможны только до оплаты. После оплаты изменения невозможны. Свяжитесь с менеджером для корректировки.",
      category: "Заказ"
    },
    {
      question: "Можно ли отменить заказ?",
      answer: "Отмена возможна только до оплаты. После оплаты отмена невозможна, так как товар сразу заказывается на складе.",
      category: "Заказ"
    },
    {
      question: "Можно ли заказать товар не из категорий?",
      answer: "Да, свяжитесь с менеджером. Мы поможем рассчитать стоимость и оформить заказ для любого товара с Poizon или Dewu.",
      category: "Заказ"
    },
    {
      question: "Нужно ли регистрироваться для заказа?",
      answer: "Нет, регистрация не требуется. Просто свяжитесь с менеджером через Telegram и оформите заказ.",
      category: "Заказ"
    },

    // ОПЛАТА
    {
      question: "Как происходит оплата?",
      answer: "100% предоплата после оформления. Реквизиты отправляет менеджер. В стоимость входят: товар, комиссия, доставка из Китая.",
      category: "Оплата"
    },
    {
      question: "Какие способы оплаты доступны?",
      answer: "Принимаем оплату: банковской картой, переводом на карту, через СБП, наличными в офисе. Все способы безопасны.",
      category: "Оплата"
    },
    {
      question: "Безопасна ли оплата?",
      answer: "Да, все платежи проходят через защищенные каналы. Мы не храним данные карт и используем только проверенные платежные системы.",
      category: "Оплата"
    },
    {
      question: "Когда нужно оплачивать?",
      answer: "Оплата производится сразу после подтверждения заказа менеджером. Без оплаты заказ не будет обработан.",
      category: "Оплата"
    },
    {
      question: "Можно ли оплатить частями?",
      answer: "К сожалению, рассрочка не предусмотрена. Требуется 100% предоплата для заказа товара на складе.",
      category: "Оплата"
    },
    {
      question: "Что входит в стоимость?",
      answer: "В стоимость входит: цена товара, комиссия сервиса, доставка из Китая. Доставка по России оплачивается отдельно.",
      category: "Оплата"
    },
    {
      question: "Есть ли скрытые платежи?",
      answer: "Нет, все платежи прозрачны. Менеджер заранее сообщит полную стоимость заказа без скрытых комиссий.",
      category: "Оплата"
    },

    // ЦЕНЫ И РАСЧЕТЫ
    {
      question: "Что означает символ ≈ на товаре?",
      answer: "Примерная цена. Точная стоимость рассчитывается после получения товара на складе. Свяжитесь с менеджером для уточнения.",
      category: "Цены"
    },
    {
      question: "Как рассчитывается стоимость?",
      answer: "Стоимость = цена товара + комиссия сервиса + доставка из Китая. Используем актуальный курс валют на момент заказа.",
      category: "Цены"
    },
    {
      question: "Можно ли узнать точную цену заранее?",
      answer: "Примерную цену можно рассчитать в калькуляторе. Точная цена рассчитывается после получения товара на складе.",
      category: "Цены"
    },
    {
      question: "Влияет ли курс валют на цену?",
      answer: "Да, курс валют влияет на итоговую стоимость. Используем актуальный курс на момент оформления заказа.",
      category: "Цены"
    },
    {
      question: "Есть ли скидки?",
      answer: "Скидки предоставляются при заказе нескольких товаров или участии в реферальной программе. Подробности уточняйте у менеджера.",
      category: "Цены"
    },
    {
      question: "Почему цены такие низкие?",
      answer: "Низкие цены объясняются прямыми поставками из Китая без посредников и большими объемами продаж на маркетплейсе.",
      category: "Цены"
    },

    // РЕФЕРАЛЬНАЯ ПРОГРАММА
    {
      question: "Как работает реферальная программа?",
      answer: "Приглашайте друзей по реферальной ссылке. При первом заказе друга вы оба получите скидку 4% вместо 5% на 7 дней.",
      category: "Рефералы"
    },
    {
      question: "Как получить реферальную ссылку?",
      answer: "Реферальная ссылка генерируется автоматически в разделе 'Реферальная программа'. Поделитесь ею с друзьями.",
      category: "Рефералы"
    },
    {
      question: "Сколько можно заработать на рефералах?",
      answer: "За каждого приглашенного друга вы получаете скидку 4% на 7 дней. Чем больше друзей, тем больше экономия.",
      category: "Рефералы"
    },
    {
      question: "Когда начисляется скидка?",
      answer: "Скидка начисляется сразу после первого заказа приглашенного друга. Действует 7 дней с момента начисления.",
      category: "Рефералы"
    },
    {
      question: "Можно ли использовать скидку несколько раз?",
      answer: "Да, скидку можно использовать на все заказы в течение 7 дней после начисления.",
      category: "Рефералы"
    },

    // ТЕХНИЧЕСКИЕ ВОПРОСЫ
    {
      question: "Почему не работает приложение?",
      answer: "Попробуйте перезагрузить приложение или обновить его до последней версии. Если проблема остается, обратитесь в поддержку.",
      category: "Техническое"
    },
    {
      question: "Как связаться с поддержкой?",
      answer: "Свяжитесь с менеджером через Telegram: @poizonic_manager. Мы отвечаем в течение 15 минут в рабочее время.",
      category: "Техническое"
    },
    {
      question: "Работает ли сервис в выходные?",
      answer: "Да, мы работаем 7 дней в неделю. Менеджеры отвечают с 9:00 до 21:00 по московскому времени.",
      category: "Техническое"
    },
    {
      question: "Можно ли заказать товар ночью?",
      answer: "Да, заказ можно оформить в любое время. Менеджер обработает его в рабочее время (9:00-21:00).",
      category: "Техническое"
    },
    {
      question: "Что если менеджер не отвечает?",
      answer: "Попробуйте написать еще раз или подождите немного. В случае длительного отсутствия ответа обратитесь к другому менеджеру.",
      category: "Техническое"
    },

    // СПЕЦИАЛЬНЫЕ СЛУЧАИ
    {
      question: "Можно ли заказать товар в подарок?",
      answer: "Да, можно оформить заказ в подарок. Укажите данные получателя и мы доставим товар по указанному адресу.",
      category: "Специальное"
    },
    {
      question: "Есть ли подарочная упаковка?",
      answer: "Да, можем упаковать товар в подарочную упаковку за дополнительную плату. Уточните у менеджера.",
      category: "Специальное"
    },
    {
      question: "Можно ли заказать товар для бизнеса?",
      answer: "Да, работаем с оптовыми заказами. Свяжитесь с менеджером для обсуждения условий и скидок.",
      category: "Специальное"
    },
    {
      question: "Есть ли ограничения по весу?",
      answer: "Ограничений по весу нет. Стоимость доставки рассчитывается по весу: 800 руб/кг из Китая.",
      category: "Специальное"
    },
    {
      question: "Можно ли заказать товар из других стран?",
      answer: "Мы работаем только с товарами из Китая (Poizon, Dewu). Товары из других стран не доставляем.",
      category: "Специальное"
    }
  ];

  const categories = ["Все", "Общее", "Поиск", "Качество", "Доставка", "Возврат", "Заказ", "Оплата", "Цены", "Рефералы", "Техническое", "Специальное"];

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
        <ContactSection>
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