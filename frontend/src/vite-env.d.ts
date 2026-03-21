/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Полный URL iframe-виджета ИИ (Timeweb и др.) */
  readonly VITE_AI_ASSISTANT_EMBED_URL?: string;
  /** Высота области iframe, например min(72vh, 640px) или 600px */
  readonly VITE_AI_ASSISTANT_EMBED_HEIGHT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
