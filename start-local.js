const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Запуск Poizonic Mini App локально...\n');

// Запуск бэкенда
console.log('📡 Запуск бэкенда...');
const backend = spawn('npm', ['start'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

// Запуск фронтенда
console.log('🎨 Запуск фронтенда...');
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'frontend'),
  stdio: 'inherit',
  shell: true
});

// Обработка завершения процессов
process.on('SIGINT', () => {
  console.log('\n🛑 Остановка серверов...');
  backend.kill();
  frontend.kill();
  process.exit(0);
});

backend.on('error', (err) => {
  console.error('❌ Ошибка запуска бэкенда:', err);
});

frontend.on('error', (err) => {
  console.error('❌ Ошибка запуска фронтенда:', err);
});


