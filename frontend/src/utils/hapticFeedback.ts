// Haptic Feedback утилиты для Telegram Mini App
const isHapticFeedbackSupported = () => {
  try {
    return window.Telegram?.WebApp?.HapticFeedback && 
           (window.Telegram.WebApp as any)?.version && 
           parseFloat((window.Telegram.WebApp as any).version) >= 6.1;
  } catch {
    return false;
  }
};

export const isBackButtonSupported = () => {
  try {
    return window.Telegram?.WebApp?.BackButton && 
           (window.Telegram.WebApp as any)?.version && 
           parseFloat((window.Telegram.WebApp as any).version) >= 6.1;
  } catch {
    return false;
  }
};

export const HapticFeedback = {
  // Успешное действие
  success: () => {
    if (isHapticFeedbackSupported()) {
      try {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
      } catch (error) {
        console.log('HapticFeedback not available');
      }
    }
  },

  // Ошибка
  error: () => {
    if (isHapticFeedbackSupported()) {
      try {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
      } catch (error) {
        console.log('HapticFeedback not available');
      }
    }
  },

  // Легкое нажатие
  light: () => {
    if (isHapticFeedbackSupported()) {
      try {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
      } catch (error) {
        console.log('HapticFeedback not available');
      }
    }
  },

  // Среднее нажатие
  medium: () => {
    if (isHapticFeedbackSupported()) {
      try {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
      } catch (error) {
        console.log('HapticFeedback not available');
      }
    }
  },

  // Сильное нажатие
  heavy: () => {
    if (isHapticFeedbackSupported()) {
      try {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('heavy');
      } catch (error) {
        console.log('HapticFeedback not available');
      }
    }
  },

  // Уведомление
  notification: () => {
    if (isHapticFeedbackSupported()) {
      try {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
      } catch (error) {
        console.log('HapticFeedback not available');
      }
    }
  },

  // Предупреждение
  warning: () => {
    if (isHapticFeedbackSupported()) {
      try {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('warning');
      } catch (error) {
        console.log('HapticFeedback not available');
      }
    }
  },

  // Ошибка уведомления
  errorNotification: () => {
    if (isHapticFeedbackSupported()) {
      try {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
      } catch (error) {
        console.log('HapticFeedback not available');
      }
    }
  },

  // Выбор
  selection: () => {
    if (isHapticFeedbackSupported()) {
      try {
        window.Telegram.WebApp.HapticFeedback.selectionChanged();
      } catch (error) {
        console.log('HapticFeedback not available');
      }
    }
  }
};

// Хук для использования haptic feedback в компонентах
export const useHapticFeedback = () => {
  return HapticFeedback;
};
