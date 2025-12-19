document.querySelector('.cta-btn').addEventListener('click', () => {
  alert('Добро пожаловать в Meme Industries');
});

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-theme');
});

const track = document.querySelector('.slider-track');
const btnPrev = document.querySelector('.prev-btn');
const btnNext = document.querySelector('.next-btn');
const cards = document.querySelectorAll('.card');

let currentIndex = 0;
let cardsToShow = 3;

function updateCardsToShow() {
  if (window.innerWidth <= 768) {
    cardsToShow = 1;
  } else {
    cardsToShow = 3;
  }
  updateSlider();
}

function updateSlider() { /*Полузнок с помощью нейронки*/
  const cardWidth = cards[0].offsetWidth + 20; 
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  
  btnPrev.disabled = currentIndex === 0;
  btnNext.disabled = currentIndex >= cards.length - cardsToShow;
  
  btnPrev.style.opacity = currentIndex === 0 ? '0.5' : '1';
  btnNext.style.opacity = currentIndex >= cards.length - cardsToShow ? '0.5' : '1';
}

btnNext.addEventListener('click', () => {
  if (currentIndex < cards.length - cardsToShow) {
    currentIndex++;
    updateSlider();
  }
});

btnPrev.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

window.addEventListener('resize', updateCardsToShow);

updateCardsToShow();
