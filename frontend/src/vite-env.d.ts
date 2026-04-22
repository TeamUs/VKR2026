/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Полный URL iframe-виджета ИИ (Timeweb и др.) */
  readonly VITE_AI_ASSISTANT_EMBED_URL?: string;
  /** Высота области iframe, например min(72vh, 640px) или 600px */
  readonly VITE_AI_ASSISTANT_EMBED_HEIGHT?: string;
  /**
   * Полный URL embed.js TimeWeb (включая query, например ?collapsed=true).
   * По умолчанию зашит ID агента в AiAssistant.tsx.
   */
  readonly VITE_TIMEWEB_AI_EMBED_SCRIPT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
