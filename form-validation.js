document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();
  const errorElement = document.getElementById('formError');

  if (!name || !email || !message) {
    errorElement.textContent = 'Please fill out all fields.';
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    errorElement.textContent = 'Please enter a valid email address.';
    return;
  }

  errorElement.textContent = '';
  alert('Message sent successfully!');
  this.reset();
});
