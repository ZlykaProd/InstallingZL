// ===== ДАННЫЕ ПРИЛОЖЕНИЙ =====
const appsData = [
    {
        id: 1,
        name: 'ZL Boost',
        icon: '🚀',
        version: '2.4.1',
        description: 'Оптимизатор системы',
        file: 'assets/downloads/app1.exe',
        size: '~15 МБ',
        news: [
            { date: '28 ИЮЛЯ 2026', text: 'Добавлен новый режим ускорения загрузки.' },
            { date: '20 ИЮЛЯ 2026', text: 'Исправлена ошибка с определением драйверов.' },
            { date: '10 ИЮЛЯ 2026', text: 'Обновлён интерфейс в неоновом стиле.' }
        ]
    },
    {
        id: 2,
        name: 'ZL Guard',
        icon: '🛡️',
        version: '1.2.0',
        description: 'Защита и безопасность',
        file: 'assets/downloads/app2.exe',
        size: '~22 МБ',
        news: [
            { date: '25 ИЮЛЯ 2026', text: 'Обновлены базы вирусов до актуальной версии.' },
            { date: '15 ИЮЛЯ 2026', text: 'Добавлена защита от фишинговых сайтов.' },
            { date: '05 ИЮЛЯ 2026', text: 'Улучшена производительность сканирования.' }
        ]
    },
    {
        id: 3,
        name: 'ZL Media',
        icon: '🎵',
        version: '3.0.1',
        description: 'Мультимедиа плеер',
        file: 'assets/downloads/app3.exe',
        size: '~28 МБ',
        news: [
            { date: '30 ИЮЛЯ 2026', text: 'Добавлена поддержка новых аудиоформатов.' },
            { date: '18 ИЮЛЯ 2026', text: 'Визуализация теперь работает в реальном времени.' },
            { date: '08 ИЮЛЯ 2026', text: 'Исправлены мелкие ошибки воспроизведения.' }
        ]
    },
    {
        id: 4,
        name: 'ZL Studio',
        icon: '🎨',
        version: '0.9.5',
        description: 'Редактор изображений',
        file: 'assets/downloads/app4.exe',
        size: '~35 МБ',
        news: [
            { date: '27 ИЮЛЯ 2026', text: 'Добавлены неоновые фильтры и эффекты.' },
            { date: '16 ИЮЛЯ 2026', text: 'Улучшена работа с большими изображениями.' },
            { date: '06 ИЮЛЯ 2026', text: 'Новые кисти и инструменты для рисования.' }
        ]
    },
    {
        id: 5,
        name: 'ZL Connect',
        icon: '🌐',
        version: '1.1.3',
        description: 'Удалённый доступ',
        file: 'assets/downloads/app5.exe',
        size: '~18 МБ',
        news: [
            { date: '29 ИЮЛЯ 2026', text: 'Улучшена скорость соединения с серверами.' },
            { date: '19 ИЮЛЯ 2026', text: 'Добавлен режим низкой задержки.' },
            { date: '09 ИЮЛЯ 2026', text: 'Исправлена ошибка переподключения.' }
        ]
    },
    {
        id: 6,
        name: 'ZL Cleaner',
        icon: '🧹',
        version: '2.0.2',
        description: 'Очистка системы',
        file: 'assets/downloads/app6.exe',
        size: '~12 МБ',
        news: [
            { date: '26 ИЮЛЯ 2026', text: 'Обновлён алгоритм поиска мусорных файлов.' },
            { date: '17 ИЮЛЯ 2026', text: 'Добавлена очистка кэша браузеров.' },
            { date: '07 ИЮЛЯ 2026', text: 'Ускорена работа программы на 25%.' }
        ]
    }
];

// ===== УПРАВЛЕНИЕ СТРАНИЦАМИ =====
function goToPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageId);
    if (target) {
        target.classList.add('active');
        target.style.animation = 'none';
        requestAnimationFrame(() => {
            target.style.animation = '';
        });
        // Прокручиваем вверх при переходе
        const scrollContainer = target.querySelector('.page-scroll');
        if (scrollContainer) scrollContainer.scrollTop = 0;
    }
}

// ===== ОТКРЫТИЕ ДЕТАЛЕЙ ПРИЛОЖЕНИЯ =====
function openApp(appId) {
    const app = appsData.find(a => a.id === appId);
    if (!app) return;

    // Заполняем заголовок
    document.getElementById('detail-icon').textContent = app.icon;
    document.getElementById('detail-name').textContent = app.name;
    document.getElementById('detail-version').textContent = 'Версия ' + app.version;

    // Заполняем новости
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = app.news.map(news => `
        <div class="news-item">
            <div class="date">${news.date}</div>
            <div class="text">${news.text}</div>
        </div>
    `).join('');

    // Обновляем ссылку скачивания
    const downloadLink = document.getElementById('download-link');
    downloadLink.href = app.file;
    
    // Обновляем размер файла
    document.getElementById('download-size').textContent = app.size;

    // Добавляем атрибут download для браузеров
    downloadLink.download = app.file.split('/').pop();

    // Переходим на страницу деталей
    goToPage('page-detail');
}

// ===== ГЕНЕРАЦИЯ КАРТОЧЕК ПРИЛОЖЕНИЙ =====
function renderAppGrid() {
    const grid = document.getElementById('appGrid');
    grid.innerHTML = appsData.map(app => `
        <div class="app-card" onclick="openApp(${app.id})">
            <div class="icon">${app.icon}</div>
            <div class="name">${app.name}</div>
            <div class="desc">${app.description}</div>
            <div class="glow-line"></div>
        </div>
    `).join('');
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', function() {
    renderAppGrid();

    // Проверка ссылок на скачивание
    const downloadLink = document.getElementById('download-link');
    if (downloadLink) {
        downloadLink.addEventListener('click', function(e) {
            // Если ссылка ведёт на несуществующий файл, покажем предупреждение
            // Это только для демонстрации, в реальности файлы будут существовать
            console.log('Скачивание файла: ' + this.href);
        });
    }

    // Обработка клавиши Escape для возврата
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.key === 'Backspace') {
            const detailPage = document.getElementById('page-detail');
            if (detailPage.classList.contains('active')) {
                goToPage('page-apps');
            }
        }
    });
});

// ===== ДОПОЛНИТЕЛЬНО: ПОДДЕРЖКА СВАЙПОВ ДЛЯ МОБИЛЬНЫХ =====
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 80;
    const diff = touchStartX - touchEndX;
    
    // Свайп вправо для возврата
    if (diff < -swipeThreshold) {
        const detailPage = document.getElementById('page-detail');
        if (detailPage.classList.contains('active')) {
            goToPage('page-apps');
        }
    }
}

console.log('✨ InstallingZL успешно загружен!');
console.log('📦 Доступно приложений:', appsData.length);