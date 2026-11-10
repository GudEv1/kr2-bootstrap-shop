// Кнопка «Наверх»
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

// Обработка формы заявки
const orderForm = document.getElementById('orderForm');
const successAlert = document.getElementById('successAlert');

if (orderForm) {
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!orderForm.checkValidity()) {
      orderForm.classList.add('was-validated');
      return;
    }

    // Показываем сообщение об успехе
    successAlert.classList.remove('d-none');

    // Сбрасываем форму и убираем валидацию
    orderForm.reset();
    orderForm.classList.remove('was-validated');

    // Скрываем сообщение через 4 секунды
    setTimeout(() => {
      successAlert.classList.add('d-none');
    }, 4000);

    // Прокручиваем к сообщению
    successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}