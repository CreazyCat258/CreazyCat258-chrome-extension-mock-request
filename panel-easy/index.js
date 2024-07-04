document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('closeButton');

  button.addEventListener('click', () => {
    window.close();
  });
});