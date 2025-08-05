"use strict"



const filterButtons = document.querySelectorAll('.products__items li');
const allItems = document.querySelectorAll('.products__item');
const seeMoreBtn = document.querySelector('.products__btn');

let currentFilter = 'all';
let expanded = false;

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    expanded = false;
    seeMoreBtn.textContent = 'Показати більше';

    // Удалить активный класс
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    updateVisibleItems();
  });
});

seeMoreBtn.addEventListener('click', () => {
  expanded = !expanded;
  seeMoreBtn.textContent = expanded ? 'Сховати' : 'Показати більше';

  if (!expanded) {
  document.getElementById('products').scrollIntoView({
    behavior: 'smooth'
    });
  }

  updateVisibleItems();
});

function updateVisibleItems() {
  const filteredItems = [...allItems].filter(item =>
    currentFilter === 'all' || item.dataset.category === currentFilter
  );

  // Сброс видимости у всех карточек
  allItems.forEach(item => (item.style.display = 'none'));

  // Сколько карточек нужно показать сразу
  const visibleLimit = 6;

  filteredItems.forEach((item, index) => {
    if (index < visibleLimit || expanded) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });

  // Показать или скрыть кнопку, если карточек больше 6
  seeMoreBtn.style.display = filteredItems.length > visibleLimit ? 'inline-block' : 'none';
  seeMoreBtn.textContent = expanded ? 'Сховати' : 'Показати більше';
}


// ---> new food (Food Zone) section

const options = document.querySelectorAll('.newFoods__option');
const image = document.getElementById('foodPreview');

const imagesMap = {
  caviar: 'img/food.png',
  steak: 'img/food2.png',
  berry: 'img/food3.png',
  dessert: 'img/food.png'
};



options.forEach(option => {
  option.addEventListener('click', () => {
    const id = option.dataset.id;
    

    // Меняем изображение
    image.src = imagesMap[id];

    // Подсвечиваем выбранный элемент
    options.forEach(o => o.classList.remove('active'));
    option.classList.add('active');
  });
});

// Expand text info section


//  document.addEventListener("DOMContentLoaded", function () {
//     const wrapper = document.querySelector('.info__wrapper');
//     const expandBtn = wrapper.querySelector('.info__expand');
//     const collapsedHeight = 200;

//     // Функция для разворачивания / сворачивания
//     let expanded = false;

//     expandBtn.addEventListener('click', function () {
//       if (!expanded) {
//         wrapper.classList.add('expanded');
//         expandBtn.textContent = 'Read Less';
//       } else {
//         wrapper.classList.remove('expanded');
//         expandBtn.textContent = 'Read More';
//       }
//       expanded = !expanded;
//     });
//   });

