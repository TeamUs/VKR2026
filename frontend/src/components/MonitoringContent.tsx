import React from 'react';

const cardStyle: React.CSSProperties = {
  padding: '16px',
  backgroundColor: 'var(--bg-card)',
  borderRadius: '12px',
  border: '1px solid var(--border-color)'
};

interface MonitoringContentProps {
  systemStatus: Record<string, unknown> | null;
  monitoringError: string | null;
  onRetry: () => void;
}

export function MonitoringContent({ systemStatus, monitoringError, onRetry }: MonitoringContentProps) {
  if (monitoringError) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-primary)' }}>
        <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⚠️</div>
        <p>{monitoringError}</p>
        <button onClick={onRetry} style={{ marginTop: '16px', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
          Повторить
        </button>
      </div>
    );
  }

  if (!systemStatus || typeof systemStatus !== 'object') {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⏳</div>
        <p>Загрузка статуса системы...</p>
      </div>
    );
  }

  const s = (key: string) => systemStatus[key] as Record<string, unknown> | undefined;
  const row = (label: string, value: React.ReactNode) => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>{label}</span>
      <span>{value ?? '—'}</span>
    </div>
  );

  const pm2Mem = pm2?.memory as { heapUsed?: number } | undefined;
  const memVal = pm2?.memoryMB != null ? `${pm2.memoryMB}` : pm2Mem?.heapUsed != null
    ? (pm2Mem.heapUsed / 1024 / 1024).toFixed(1)
    : '—';

  const pm2 = s('pm2Backend') || s('server');
  const db = s('database');
  const fe = s('frontend');
  const nginx = s('nginx');
  const tg = s('telegramApi');
  const svr = s('server');
  const sync = s('sync');
  const api = s('api');

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      <div style={cardStyle}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>⚙️ PM2 Backend</h3>
        <div style={{ display: 'grid', gap: '8px' }}>
          {row('Статус:', pm2?.status === 'running' ? '✅ Работает' : '❌ Остановлен')}
          {row('Время работы:', pm2?.uptime ? `${Math.floor(Number(pm2.uptime) / 3600)}ч ${Math.floor((Number(pm2.uptime) % 3600) / 60)}м` : '—')}
          {row('Память:', `${memVal} MB`)}
          {row('Node.js:', String(pm2?.nodeVersion ?? '—'))}
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>🌐 Frontend</h3>
        <div style={{ display: 'grid', gap: '8px' }}>
          {row('Последняя сборка:', fe?.buildTimeLocal ?? (fe?.buildTime ? new Date(String(fe.buildTime)).toLocaleString('ru-RU') : '—'))}
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>🔀 Nginx</h3>
        <div style={{ display: 'grid', gap: '8px' }}>
          {row('Статус:', nginx?.status === 'running' ? '✅ Работает' : nginx?.status === 'stopped' ? '❌ Остановлен' : '❌ Неизвестно')}
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>📱 Telegram API</h3>
        <div style={{ display: 'grid', gap: '8px' }}>
          {row('Статус:', tg?.status === 'ok' ? '✅ OK' : `❌ ${String(tg?.message ?? 'Ошибка')}`)}
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>🗄️ База данных</h3>
        <div style={{ display: 'grid', gap: '8px' }}>
          {row('Статус:', db?.status === 'connected' ? '✅ Подключена' : '❌ Отключена')}
          {row('Время отклика:', `${db?.responseTime ?? 0}мс`)}
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>🖥️ Сервер</h3>
        <div style={{ display: 'grid', gap: '8px' }}>
          {row('Хост:', String(svr?.hostname ?? '—'))}
          {row('Память:', `${svr?.memoryUsedPercent ?? '—'}% (${svr?.memoryUsedMB ?? '—'} MB)`)}
          {row('Нагрузка:', Array.isArray(svr?.loadAvg) ? (svr.loadAvg as number[]).join(', ') : '—')}
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>🔄 Синхронизация (Git)</h3>
        <div style={{ display: 'grid', gap: '8px' }}>
          {row('Последний коммит:', String(sync?.lastCommit ?? '—'))}
        </div>
      </div>

      <div style={cardStyle}>
        <h3 style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>📡 API</h3>
        <div style={{ display: 'grid', gap: '8px' }}>
          {row('Время ответа:', `${api?.responseTime ?? systemStatus.responseTime ?? 0}мс`)}
          {row('Обновлено:', systemStatus.timestamp ? new Date(String(systemStatus.timestamp)).toLocaleString('ru-RU') : '—')}
        </div>
      </div>
    </div>
  );
}
