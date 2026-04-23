// Haptic Feedback утилиты для Telegram Mini App
const isTelegramWebAppVersionAtLeast = (min: number) => {
  try {
    const v = (window.Telegram?.WebApp as { version?: string } | undefined)?.version;
    return !!v && parseFloat(v) >= min;
  } catch {
    return false;
  }
};

const isHapticFeedbackSupported = () =>
  Boolean(window.Telegram?.WebApp?.HapticFeedback) && isTelegramWebAppVersionAtLeast(6.1);

export const isBackButtonSupported = () =>
  Boolean(window.Telegram?.WebApp?.BackButton) && isTelegramWebAppVersionAtLeast(6.1);

const wrap = (fn: () => void) => {
  if (!isHapticFeedbackSupported()) return;
  try {
    fn();
  } catch {
    /* ignore */
  }
};

export const HapticFeedback = {
  success: () => wrap(() => window.Telegram!.WebApp!.HapticFeedback.impactOccurred('medium')),

  error: () => wrap(() => window.Telegram!.WebApp!.HapticFeedback.impactOccurred('heavy')),

  light: () => wrap(() => window.Telegram!.WebApp!.HapticFeedback.impactOccurred('light')),

  medium: () => wrap(() => window.Telegram!.WebApp!.HapticFeedback.impactOccurred('medium')),

  heavy: () => wrap(() => window.Telegram!.WebApp!.HapticFeedback.impactOccurred('heavy')),

  notification: () => wrap(() => window.Telegram!.WebApp!.HapticFeedback.notificationOccurred('success')),

  warning: () => wrap(() => window.Telegram!.WebApp!.HapticFeedback.notificationOccurred('warning')),

  errorNotification: () => wrap(() => window.Telegram!.WebApp!.HapticFeedback.notificationOccurred('error')),

  selection: () => wrap(() => window.Telegram!.WebApp!.HapticFeedback.selectionChanged())
};
