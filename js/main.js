document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Кнопка «Наверх»
  // ==========================================
  const scrollTopButton = document.getElementById('scrollTopButton');

  if (scrollTopButton) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        scrollTopButton.classList.add('show');
      } else {
        scrollTopButton.classList.remove('show');
      }
    });

    scrollTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================
  // 2. Обработка формы заявки + Toast
  // ==========================================
  const orderForm = document.getElementById('orderForm');
  const successAlert = document.getElementById('successAlert');
  const submitOrderBtn = document.getElementById('submitOrder');
  const successToastEl = document.getElementById('successToast');
  let successToast = null;

  if (successToastEl) {
    successToast = new bootstrap.Toast(successToastEl, { delay: 4000 });
  }

  if (submitOrderBtn && orderForm) {
    submitOrderBtn.addEventListener('click', () => {
      if (!orderForm.checkValidity()) {
        orderForm.classList.add('was-validated');
        return;
      }

      if (successAlert) successAlert.classList.remove('d-none');
      if (successToast) successToast.show();

      orderForm.reset();
      orderForm.classList.remove('was-validated');

      setTimeout(() => {
        const modalEl = document.getElementById('orderModal');
        if (modalEl) {
          const modal = bootstrap.Modal.getInstance(modalEl);
          if (modal) modal.hide();
        }
        if (successAlert) successAlert.classList.add('d-none');
      }, 2500);
    });
  }

  // ==========================================
// 3. Переключение темы (Светлая / Тёмная)
// ==========================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const savedTheme = localStorage.getItem('theme');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('data-bs-theme', theme); // ← Bootstrap сам починит заголовки
  updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
  if (themeIcon) {
    themeIcon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
  }
}

if (savedTheme) {
  applyTheme(savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  applyTheme('dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });
}
  // ==========================================
  // 4. Поиск по сайту
  // ==========================================
  const searchToggle = document.getElementById('searchToggle');
  const searchModal = document.getElementById('searchModal');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  const searchData = [
    { title: 'CrossFit', desc: 'Высокоинтенсивные функциональные тренировки', url: 'crossfit.html', tags: 'кроссфит силовое' },
    { title: 'Йога', desc: 'Хатха-йога и пранаяма для всех уровней', url: 'yoga.html', tags: 'йога медитация' },
    { title: 'Плавание', desc: 'Занятия в бассейне 25 метров', url: 'swimming.html', tags: 'бассейн плавание вода' },
    { title: 'Пилатес', desc: 'Укрепление мышц кора и осанки', url: 'pilates.html', tags: 'пилатес осанка' },
    { title: 'Бокс', desc: 'Тренировки по боксу для всех уровней', url: 'boxing.html', tags: 'бокс единоборства' },
    { title: 'Stretching', desc: 'Занятия по растяжке', url: 'stretching.html', tags: 'растяжка стретчинг гибкость' },
    { title: 'Абонемент «Безлимит»', desc: 'Неограниченное посещение всех зон', url: 'product.html', tags: 'абонемент безлимит тариф' },
    { title: 'Расписание', desc: 'Полное расписание занятий', url: 'catalog.html', tags: 'расписание график' },
    { title: 'Контакты', desc: 'Адрес, телефон, карта', url: 'contacts.html', tags: 'контакты адрес телефон' },
    { title: 'Личный кабинет', desc: 'Профиль, статистика, история посещений', url: 'profile.html', tags: 'кабинет профиль статистика' },
  ];

  if (searchToggle && searchModal) {
    const bsSearchModal = new bootstrap.Modal(searchModal);
    
    searchToggle.addEventListener('click', () => {
      bsSearchModal.show();
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 300);
    });

    if (searchInput && searchResults) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if (query.length < 2) {
          searchResults.innerHTML = '';
          return;
        }
        const found = searchData.filter(item =>
          item.title.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query) ||
          item.tags.toLowerCase().includes(query)
        );
        
        if (found.length === 0) {
          searchResults.innerHTML = '<div class="alert alert-warning mb-0">Ничего не найдено. Попробуйте другой запрос.</div>';
        } else {
          searchResults.innerHTML = found.map(item => `
            <a href="${item.url}" class="list-group-item list-group-item-action d-flex justify-content-between align-items-start">
              <div>
                <h3 class="h6 mb-1">${item.title}</h3>
                <p class="mb-0 small text-muted">${item.desc}</p>
              </div>
              <i class="bi bi-arrow-right text-primary"></i>
            </a>
          `).join('');
        }
      });
    }
  }

  // ==========================================
  // 5. Чат с поддержкой
  // ==========================================
  const chatToggle = document.getElementById('chatToggle');
  const chatWindow = document.getElementById('chatWindow');
  const chatClose = document.getElementById('chatClose');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');
  const chatBadge = document.getElementById('chatBadge');

  const botResponses = [
    'Спасибо за вопрос! Наш менеджер скоро ответит.',
    'Клуб работает круглосуточно, 24/7.',
    'Первое пробное занятие — бесплатно!',
    'Абонемент «Безлимит» стоит 4 990 руб./мес.',
    'Записаться можно через кнопку «Записаться» в меню.',
    'Адрес: г. Москва, ул. Спортивная, д. 12.'
  ];

  if (chatToggle && chatWindow) {
    chatToggle.addEventListener('click', () => {
      chatWindow.hidden = false;
      if (chatBadge) chatBadge.style.display = 'none';
      if (chatInput) chatInput.focus();
    });

    if (chatClose) {
      chatClose.addEventListener('click', () => {
        chatWindow.hidden = true;
      });
    }

    if (chatForm && chatInput && chatBody) {
      chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = chatInput.value.trim();
        if (!text) return;

        // Сообщение пользователя
        appendMessage(text, 'user');
        chatInput.value = '';

        // Ответ бота через 1 сек
        setTimeout(() => {
          const reply = botResponses[Math.floor(Math.random() * botResponses.length)];
          appendMessage(reply, 'bot');
        }, 1000);
      });
    }
  }

  function appendMessage(text, type) {
    if (!chatBody) return;
    const msg = document.createElement('div');
    msg.className = `chat-message ${type}`;
    const time = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    msg.innerHTML = `<p>${text}</p><small>${time}</small>`;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

});