document.querySelector('.cta-btn').addEventListener('click', () => {
  alert('Добро пожаловать в Meme Industries');
});

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const changelogBtn = document.querySelector('.changelog-btn');
const modalOverlay = document.getElementById('changelog-modal');
const closeBtn = document.querySelector('.close-btn');


changelogBtn.addEventListener('click', () => {
    modalOverlay.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
});


modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});


function setTimeBasedTheme() {
    const now = new Date();
    const currentHour = now.getHours();

    const isNightTime = currentHour >= 20 || currentHour < 7;

    if (isNightTime) {
        body.classList.add('dark-theme');
        themeToggle.checked = true;
    } else {
        body.classList.remove('dark-theme');
        themeToggle.checked = false;
    }
}


themeToggle.addEventListener('change', () => {
  body.classList.toggle('dark-theme');
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

function updateSlider() {
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

setTimeBasedTheme();
updateCardsToShow();

const jsCardsData = [
  { id: 1, title: "Тролфейс", description: "Классика.", img: "img/Trollface.png", category: "Классика" },
  { id: 2, title: "Лягушка Pepe", description: "Был выпущен в комиксе 'Пацанский клуб'. Стал американским интернет-мемом в 2008 году.", img: "img/Pepe.jpg", category: "Классика" },
  { id: 3, title: "67", description: "Завирусился в марте 2025 года. Сам чувак из мема не знает почему он прокричал '67'.", img: "img/67_meme.jpg", category: "Тренд" },
  { id: 4, title: "What is this diddy blud doing...", description: "Мем про людей которые считают простые числа на калькуляторе.", img: "img/What is this diddy blud doing.png", category: "Тренд" },
  { id: 5, title: "Райан Гослинг: тотально всё равно", description: "Тотально всё равно.", img: "img/Райан Гослинг тотально пофиг.jpg", category: "Фильмы" },
  { id: 6, title: "Леонардо Ди Каприо: стакан", description: "Кадр из фильма 'Великий Гэтсби', где персонаж ДиКаприо хитро улыбается с бокалом.", img: "img/Леонардо Ди Каприо стакан.jpg", category: "Фильмы" }
];

const gridContainer = document.getElementById('dynamic-grid');
const dynamicModal = document.getElementById('dynamic-modal');
const closeDynamicBtn = document.querySelector('.close-dynamic-btn');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const filterContainer = document.getElementById('filter-container');


function generateFilterButtons() {
  const categories = ['Все', ...new Set(jsCardsData.map(item => item.category))];

  filterContainer.innerHTML = '';

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.classList.add('animated-btn', 'filter-btn');
    btn.textContent = cat;
    btn.setAttribute('data-category', cat === 'Все' ? 'all' : cat);

    if (cat === 'Все') {
      btn.classList.add('active');
    }

    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderDynamicCards(e.target.getAttribute('data-category'));
    });

    filterContainer.appendChild(btn);
  });
}


function renderDynamicCards(filter = 'all') {
  gridContainer.innerHTML = '';
  const filteredData = filter === 'all' 
    ? jsCardsData 
    : jsCardsData.filter(item => item.category === filter);
  
  filteredData.forEach(item => {
    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    
    const imgEl = document.createElement('img');
    imgEl.src = item.img;
    imgEl.alt = item.title;

    const titleEl = document.createElement('h3');
    titleEl.textContent = item.title;
    
    const btnEl = document.createElement('button');
    btnEl.classList.add('animated-btn');
    btnEl.textContent = 'Подробнее';
    
    btnEl.addEventListener('click', () => {
      openDynamicModal(item);
    });

    cardEl.appendChild(imgEl);
    cardEl.appendChild(titleEl);
    cardEl.appendChild(btnEl);
    gridContainer.appendChild(cardEl);
  });
}

function openDynamicModal(item) {
  modalTitle.textContent = item.title;
  modalDesc.textContent = item.description;
  dynamicModal.classList.add('active');
}

closeDynamicBtn.addEventListener('click', () => {
  dynamicModal.classList.remove('active');
});

dynamicModal.addEventListener('click', (e) => {
  if (e.target === dynamicModal) {
    dynamicModal.classList.remove('active');
  }
});

generateFilterButtons();
renderDynamicCards();
