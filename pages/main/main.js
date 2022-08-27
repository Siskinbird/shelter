"use strict";
// Инициализация слайдера
new Swiper(".swiper-items", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
  loopedSlides: 1,
  spaceBetween: 300,
  speed: 500,
  simulateTouch: false,
  allowTouchMove: false,
});

// Переменные для карточек слайдера
const sliderItem = document.querySelectorAll('.slider-item'),
leftArr = document.querySelector('.pets-body__left'),
rightArr = document.querySelector('.pets-body__right');

let petImg = document.querySelectorAll('.slider-item__img'),
petName = document.querySelectorAll('.slider-item__name');

// Рандомайзер для карточек 
function getRandomInt(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = Math.floor(Math.random() * 8);
  }
  let newArr = [...new Set(arr)];
  while (newArr.length < 3) {
    newArr.push(Math.floor(Math.random() * 8));
    if (newArr.length === 3) {
      return getRandomInt(newArr);
    }
  }
  //console.log(newArr)
  return newArr;
}

/* Создадим функцию, которая будет проверять, есть ли в прошлом "наборе" карточек элементы из текущего набора,
если есть то пропускаем массив через функцию рандомайзер, если нет - отдаём */
function checkPast(arr, pastArr) {
  for (let i = 0; i < arr.length; i++) {
    if (pastArr.includes(arr[i])) {
      arr = getRandomInt(arr);
      return checkPast(arr, pastArr);
    }
  }
  return arr;
}

/*Переменная для хранения значений прошлого набора карточек */
let pastRandomNums = [0, 4, 7];


async function changeItems(e) {
  const currentRandomNums = [];
  const pets = 'pets.json';
  const result = await fetch(pets);
  const petsObjectsMini = await result.json();
  console.log(petsObjectsMini)
  /* рандомные значения без дублей */
  let newArr = getRandomInt(currentRandomNums);
  newArr = checkPast(newArr, pastRandomNums);
  console.log(newArr)
  /* Заполним значения id в карточках в зависимости от того, на какую стрелку нажали (чтобы определить какие айтемы
  в слайдере заполнить) */
  if(e.target.id === 'prev') {
    sliderItem[0].id = petsObjectsMini[newArr[0]].name;
    sliderItem[1].id = petsObjectsMini[newArr[1]].name;
    sliderItem[2].id = petsObjectsMini[newArr[2]].name;
    //
    sliderItem[3].id = petsObjectsMini[pastRandomNums[0]].name;
    sliderItem[4].id = petsObjectsMini[pastRandomNums[1]].name;
    sliderItem[5].id = petsObjectsMini[pastRandomNums[2]].name;
  } else if (e.target.id === 'next') {
    sliderItem[3].id = petsObjectsMini[pastRandomNums[0]].name;
    sliderItem[4].id = petsObjectsMini[pastRandomNums[1]].name;
    sliderItem[5].id = petsObjectsMini[pastRandomNums[2]].name;
    //
    sliderItem[6].id = petsObjectsMini[newArr[0]].name;
    sliderItem[7].id = petsObjectsMini[newArr[1]].name;
    sliderItem[8].id = petsObjectsMini[newArr[2]].name;
  }
  console.log(sliderItem)
  // Заполним информацию в карточках по новым значениям id в карточках:
  for (let i = 0; i < petsObjectsMini.length; i++) {
    for (let p = 0; p < sliderItem.length; p++) {
      if (sliderItem[p].id === petsObjectsMini[i].name) {
        petName[p].innerHTML = petsObjectsMini[i].name;
        console.log(petName[p])
        petImg[p].src = petsObjectsMini[i].img;
      }
    }
  }
  /* затем перепишем прошлые значения */
  pastRandomNums = newArr;
  console.log(pastRandomNums)
}
leftArr.addEventListener("click", changeItems);
rightArr.addEventListener("click", changeItems);



parent.addEventListener('click', (event) => {
  // Отлавливаем элемент в родители на который мы нажали
  let target = event.target;
  
  // Проверяем тот ли это элемент который нам нужен
  if(target.classList.contains('menu-item')) {
    for(let i = 0; i < menuList.length; i++) {
      // Убираем у других
      menuList[i].classList.remove('active');
    }
    // Добавляем тому на который нажали
    target.classList.add('active');
  }
});



/* Переменные для бургера */

const burgerImg = document.querySelector('.burger');
const navList = document.querySelector('.menu');
const navItem = document.querySelectorAll('.menu-item');
const burgerCover = document.querySelector('.burger-cover');
const body = document.querySelector('.body');
const contain = document.querySelector('.container');

//function backShadow() {
//  if(burgerImg.classList.contains('is-active')) {
//    burgerCover.style.zIndex = '1';
//  } else {
//    burgerCover.style.zIndex = '-1';
//  }
//}

const burger = function() {
  if(navList.classList.contains('active')) {
    navList.classList.remove('active');
    burgerImg.classList.remove('is-active')
    burgerCover.style.zIndex = '-1';
    burgerCover.style.opacity = '0';
    body.style.overflow = 'visible';
    //contain.style.filter = 'brightness(100%)';
  } else {
    navList.classList.add('active');
    burgerImg.classList.add('is-active')
    burgerCover.style.zIndex = '1';
    burgerCover.style.opacity = '1';
    body.style.overflow = 'hidden';
    //contain.style.filter = 'brightness(60%)';
  }
};
burgerImg.addEventListener('click', burger);
navItem.forEach((item) => item.addEventListener('click', () => {
  navList.classList.remove('active');
  body.style.overflow = 'visible';
  burgerCover.style.zIndex = '-1';
  burgerCover.style.opacity = '0';
  burgerImg.classList.remove('is-active')
}
));

burgerCover.addEventListener('click', burger);


//const burger = document.querySelector('.burger')
//const logo = document.querySelector('.logo')
////const menu = document.querySelector('.menu')
////const navList = document.querySelectorAll('.nav-item')
//
///* Слушаем клик по бургеру */
//
//burger.addEventListener('click', toggleMenu);
//
///* Развёртывание бургера  */
//
//function toggleMenu() {
//  logo.classList.toggle('deactive')
//  burger.classList.toggle('is-active');
//  menu.classList.toggle('active');
//  body.style.overflow = "hidden";
//}
///* Пробежка по ссылкам в открытом бургере, закрытие по клику */
//
//menuList.forEach((el) => el.addEventListener('click', closeMenu));
//
///* Функция закрытия меню */
//
//function closeMenu(event) {
//  if(event.target.classList.contains('menu-item')) {
//    burger.classList.remove('is-active');
//    menu.classList.remove('active');
//    logo.classList.remove('deactive');
//    
//  }
//}
