// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена!');
    
    // Обновление времени
    updateTime();
    setInterval(updateTime, 1000);
    
    // Восстановление состояния из localStorage
    loadFromLocalStorage();
});

// Переменные для счетчиков
let clickCount = 0;
let counterValue = 0;

const clickBtn = document.getElementById('click-btn');
const clickCounter = document.getElementById('click-counter');
const themeToggle = document.getElementById('theme-toggle');
const greetBtn = document.getElementById('greet-btn');
const greeting = document.getElementById('greeting');
const sendBtn = document.getElementById('send-btn');
const decreaseBtn = document.getElementById('decrease');
const increaseBtn = document.getElementById('increase');
const countDisplay = document.getElementById('count');
const bgColorPicker = document.getElementById('bg-color');
const currentTime = document.getElementById('current-time');

// Обработчик кнопки нажатий
clickBtn.addEventListener('click', function() {
    clickCount++;
    clickCounter.textContent = `Количество нажатий: ${clickCount}`;
    saveToLocalStorage();
    
    // Анимация кнопки
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 150);
});

// Смена темы
themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    this.textContent = isDark ? 'Светлая тема' : 'Темная тема';
    saveToLocalStorage();
});

// Приветствие
greetBtn.addEventListener('click', function() {
    const name = document.getElementById('name').value.trim();
    if (name) {
        greeting.textContent = `Привет, ${name}! Рады видеть вас!`;
        greeting.style.color = '#4CAF50';
    } else {
        greeting.textContent = 'Пожалуйста, введите ваше имя!';
        greeting.style.color = '#ff4444';
    }
});

// Отправка сообщения
sendBtn.addEventListener('click', function() {
    const message = document.getElementById('message').value.trim();
    if (message) {
        alert(`Сообщение отправлено: "${message}"`);
        document.getElementById('message').value = '';
    } else {
        alert('Пожалуйста, введите сообщение!');
    }
});

decreaseBtn.addEventListener('click', function() {
    counterValue--;
    updateCounter();
});

increaseBtn.addEventListener('click', function() {
    counterValue++;
    updateCounter();
});

function updateCounter() {
    countDisplay.textContent = counterValue;
    
    if (counterValue > 0) {
        countDisplay.style.color = '#4CAF50';
    } else if (counterValue < 0) {
        countDisplay.style.color = '#ff4444';
    } else {
        countDisplay.style.color = '#333';
    }
    
    saveToLocalStorage();
}

// Смена цвета фона
bgColorPicker.addEventListener('input', function() {
    document.body.style.backgroundColor = this.value;
    saveToLocalStorage();
});

// Обновление времени
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ru-RU');
    const dateString = now.toLocaleDateString('ru-RU', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    currentTime.textContent = `${dateString} | ${timeString}`;
}

function saveToLocalStorage() {
    const state = {
        clickCount,
        counterValue,
        isDark: document.body.classList.contains('dark-theme'),
        bgColor: bgColorPicker.value,
        name: document.getElementById('name').value
    };
    localStorage.setItem('appState', JSON.stringify(state));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('appState');
    if (saved) {
        const state = JSON.parse(saved);
        
        clickCount = state.clickCount || 0;
        clickCounter.textContent = `Количество нажатий: ${clickCount}`;
        
        counterValue = state.counterValue || 0;
        updateCounter();
        
        if (state.isDark) {
            document.body.classList.add('dark-theme');
            themeToggle.textContent = 'Светлая тема';
        }
        
        if (state.bgColor) {
            document.body.style.backgroundColor = state.bgColor;
            bgColorPicker.value = state.bgColor;
        }
        
        if (state.name) {
            document.getElementById('name').value = state.name;
        }
    }
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (confirm('Сбросить все счетчики?')) {
            clickCount = 0;
            counterValue = 0;
            clickCounter.textContent = `Количество нажатий: ${clickCount}`;
            updateCounter();
            saveToLocalStorage();
        }
    }
});