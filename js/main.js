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

// Обработка формы заявки в модальном окне
const orderForm = document.getElementById('orderForm');
const successAlert = document.getElementById('successAlert');
const submitOrderBtn = document.getElementById('submitOrder');

if (submitOrderBtn && orderForm) {
  submitOrderBtn.addEventListener('click', () => {
    if (!orderForm.checkValidity()) {
      orderForm.classList.add('was-validated');
      return;
    }

    successAlert.classList.remove('d-none');
    orderForm.reset();
    orderForm.classList.remove('was-validated');

    setTimeout(() => {
      const modal = bootstrap.Modal.getInstance(document.getElementById('orderModal'));
      if (modal) modal.hide();
      successAlert.classList.add('d-none');
    }, 2500);
  });
}