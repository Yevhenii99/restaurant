"use strict"

// const filterButtons = document.querySelectorAll('.products__items li');
// const allItems = document.querySelectorAll('.products__item');
// const seeMoreBtn = document.querySelector('.products__btn');

// let currentFilter = 'meat';
// let expanded = false;

// filterButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     currentFilter = button.dataset.filter;
//     expanded = false;
//     seeMoreBtn.textContent = 'Показати більше';

//     // Удалить активный класс
//     filterButtons.forEach(btn => btn.classList.remove('active'));
//     button.classList.add('active');

//     updateVisibleItems();
//   });
// });

// seeMoreBtn.addEventListener('click', () => {
//   expanded = !expanded;
//   seeMoreBtn.textContent = expanded ? 'Сховати' : 'Показати більше';

//   if (!expanded) {
//     document.getElementById('products').scrollIntoView({
//       behavior: 'smooth'
//     });
//   }

//   updateVisibleItems();
// });

// function updateVisibleItems() {
//   const filteredItems = [...allItems].filter(item =>
//     currentFilter === 'all' || item.dataset.category === currentFilter
//   );

//   // Сброс видимости у всех карточек
//   allItems.forEach(item => (item.style.display = 'none'));

//   // Сколько карточек нужно показать сразу
//   const visibleLimit = 6;

//   filteredItems.forEach((item, index) => {
//     if (index < visibleLimit || expanded) {
//       item.style.display = 'block';
//     } else {
//       item.style.display = 'none';
//     }
//   });

//   // Показать или скрыть кнопку, если карточек больше 6
//   seeMoreBtn.style.display = filteredItems.length > visibleLimit ? 'inline-block' : 'none';
//   seeMoreBtn.textContent = expanded ? 'Сховати' : 'Показати більше';
// }

// // === Добавляем инициализацию при загрузке ===
// document.addEventListener('DOMContentLoaded', () => {
//   // Ставим active на кнопку с фильтром "meat"
//   const defaultButton = document.querySelector('.products__items li[data-filter="meat"]');
//   if (defaultButton) {
//     filterButtons.forEach(btn => btn.classList.remove('active'));
//     defaultButton.classList.add('active');
//   }
//   updateVisibleItems();
// });










// ---> new food (Food Zone) section


"use strict";

document.addEventListener('DOMContentLoaded', () => {
  const seeMoreBtn = document.querySelector('.products__btn');
  const categoriesContainer = document.querySelector('.products__items');
  const productsSection = document.getElementById('products');

  // Если .products__list нет — создаём его (защита)
  let productsListContainer = document.querySelector('.products__list');
  if (!productsListContainer) {
    console.warn('.products__list not found — creating one automatically.');
    productsListContainer = document.createElement('div');
    productsListContainer.className = 'products__list';
    // Добавим в .container если он есть, иначе прямо в секцию
    const container = productsSection.querySelector('.container') || productsSection;
    container.appendChild(productsListContainer);
  }

  let currentFilter = 'meat';
  let expanded = false;
  let allItems = [];
  let filterButtons = [];

  // Загрузка JSON
  fetch('data/menu.json')
    .then(resp => {
      if (!resp.ok) throw new Error(`Failed to fetch menu.json: ${resp.status}`);
      return resp.json();
    })
    .then(data => {
      console.log('menu.json loaded:', data);
      renderCategories(data.categories || []);
      renderItems(data.items || []);
      afterRenderInit();
    })
    .catch(err => {
      console.error(err);
      // Для отладки можно показать сообщение на странице
    });

  function renderCategories(categories) {
    if (!categoriesContainer) {
      console.warn('.products__items not found in HTML — create <ul class="products__items"></ul> inside the section.');
      return;
    }
    categoriesContainer.innerHTML = categories
      .map(cat => `<li data-filter="${cat.id}">${cat.title}</li>`)
      .join('');
  }

  function renderItems(items) {
    const target = document.querySelector('.products__list');
    if (!target) {
      console.error('.products__list not found — items were not rendered');
      return;
    }
    target.innerHTML = items
      .map(item => `
        <div class="products__item" data-category="${item.category}">
          <img src="${item.image}" alt="${item.title}">
          <h3>${item.title}</h3>
          <p>${item.price} грн</p>
        </div>
      `)
      .join('');
  }

  function afterRenderInit() {
    allItems = document.querySelectorAll('.products__item');
    filterButtons = document.querySelectorAll('.products__items li');

    if (filterButtons.length === 0) {
      console.warn('filterButtons empty — check that categories were rendered from JSON or .products__items exists.');
    }

    initFilters();
    setDefaultCategory(currentFilter);
  }

  function initFilters() {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        currentFilter = button.dataset.filter;
        expanded = false;
        seeMoreBtn.textContent = 'Показати більше';
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        updateVisibleItems();
      });
    });

    if (seeMoreBtn) {
      seeMoreBtn.addEventListener('click', () => {
        expanded = !expanded;
        seeMoreBtn.textContent = expanded ? 'Сховати' : 'Показати більше';
        if (!expanded) {
          document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        }
        updateVisibleItems();
      });
    }
  }

  function updateVisibleItems() {
    // пересобираем ноду в случае динамики
    allItems = document.querySelectorAll('.products__item');
    const filtered = [...allItems].filter(item =>
      currentFilter === 'all' || item.dataset.category === currentFilter
    );

    allItems.forEach(item => (item.style.display = 'none'));

    const visibleLimit = 6;
    filtered.forEach((item, i) => {
      item.style.display = i < visibleLimit || expanded ? 'block' : 'none';
    });

    if (seeMoreBtn) {
      seeMoreBtn.style.display = filtered.length > visibleLimit ? 'inline-block' : 'none';
      seeMoreBtn.textContent = expanded ? 'Сховати' : 'Показати більше';
    }
  }

  function setDefaultCategory(defaultId) {
    currentFilter = defaultId;
    const defaultButton = document.querySelector(`.products__items li[data-filter="${defaultId}"]`);
    if (defaultButton) {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      defaultButton.classList.add('active');
    } else {
      console.warn('Default button not found:', defaultId);
    }
    updateVisibleItems();
  }
});



// New foods 

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

// Expand text info section (not yet, maybe later i will add this option)

// .....


// - burger script

const burger = document.querySelector(".burger"),
	close = document.querySelector(".navigation__menu-close"),
	menu = document.querySelector(".navigation__menu");

burger.addEventListener("click", () => {
	menu.classList.add("active");
	document.body.style.overflow = "hidden";
});

close.addEventListener("click", () => {
	menu.classList.remove("active");
	document.body.style.overflow = "";
});


// - slider 


const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = Array.from(slides).indexOf(entry.target);

      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
    }
  });
}, {
  threshold: 0.6
});

slides.forEach(slide => observer.observe(slide));


