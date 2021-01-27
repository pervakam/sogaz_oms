const body = document.querySelector('body');
const headerMenuHide = document.querySelector('.page-header__nav-hide');
const mainNav = document.querySelector('.main-nav');
const mainNavHelpList = document.querySelector('.main-nav__help-list');
const headerMenuButton = document.querySelector('.main-nav__toggle');
const headerMenu = document.querySelector('.page-header__nav');
const headerTopSection = document.querySelector('.page-header__version-toggle');
const headerCitySection = document.querySelector('.main-nav__city');
const headerMainMenuItems = document.querySelectorAll('.main-nav__help-item--menu-hide');
const mainNavButton = document.querySelector('.main-nav__help-item--nav');
const mainNavFirstItem = document.querySelector('.main-nav__help-item--first');
const upButton = document.querySelector('.up-button');
const pageHeader = document.querySelector('.page-header');
const mainNavHelpItemIcons = document.querySelectorAll('.main-nav__help-item-icon--menu');
const mainNavHelpItemDescriptions = document.querySelectorAll('.main-nav__help-item-description');

///// массивы для ie /////
const headerMainMenuItemsArray = Array.prototype.slice.call(headerMainMenuItems);
const mainNavHelpItemIconsArray = Array.prototype.slice.call(mainNavHelpItemIcons);
const mainNavHelpItemDescriptionsArray = Array.prototype.slice.call(mainNavHelpItemDescriptions);

///// открывает/закрывает меню в шапке /////
const closeHeaderMenu = function () {
  headerMenu.classList.add('page-header__nav-hide');
  headerMenuButton.classList.remove('main-nav__toggle--close');
  headerTopSection.classList.remove('page-header__nav-hide');
  headerCitySection.classList.remove('page-header__nav-hide');
  mainNavButton.classList.add('page-header__nav-hide');
  mainNav.classList.remove('main-nav-menu');
  mainNavHelpList.classList.remove('main-nav__help-list--menu');
  if (window.innerWidth <= 1279) {
    mainNavFirstItem.classList.add('page-header__nav-hide');
  }
  headerMainMenuItemsArray.forEach(function (it) {
    it.classList.remove('page-header__nav-hide');
  })
  mainNavHelpItemIconsArray.forEach(function (it) {
    it.classList.remove('main-nav__help-item-icon--big');
  })
  mainNavHelpItemDescriptionsArray.forEach(function (it) {
    it.classList.remove('main-nav__help-item-description--menu');
  })

  headerMenuButton.removeEventListener('click', closeHeaderMenu);
  window.removeEventListener('keydown', escHeaderMenuHandler);
};

const escHeaderMenuHandler = function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    closeHeaderMenu();
  }
};

const closeHeaderMenuByClick = function () {
  headerMenuButton.addEventListener('click', closeHeaderMenu);
  window.addEventListener('keydown', escHeaderMenuHandler);
};

const openHeaderMenu = function () {
  headerMenu.classList.remove('page-header__nav-hide');
  mainNavButton.classList.remove('page-header__nav-hide');
  mainNavFirstItem.classList.remove('page-header__nav-hide');
  headerTopSection.classList.add('page-header__nav-hide');
  headerCitySection.classList.add('page-header__nav-hide');
  headerMenuButton.classList.add('main-nav__toggle--close');
  mainNav.classList.add('main-nav-menu');
  mainNavHelpList.classList.add('main-nav__help-list--menu');
  headerMainMenuItemsArray.forEach(function (it) {
    it.classList.add('page-header__nav-hide');
  });
  mainNavHelpItemIconsArray.forEach(function (it) {
    it.classList.add('main-nav__help-item-icon--big');
  });
  mainNavHelpItemDescriptionsArray.forEach(function (it) {
    it.classList.add('main-nav__help-item-description--menu');
  });
  closeHeaderMenuByClick();
  window.removeEventListener('resize', changeTabletMenu);
};

headerMenuButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  openHeaderMenu();
});

///// прокрутка наверх /////
window.addEventListener('scroll', function () {
  const scrolled = window.pageYOffset || document.documentElement.scrollTop;
  if (scrolled > 100) {
    upButton.classList.remove('up-button-hide');
  } else {
    upButton.classList.add('up-button-hide');
  }
})

upButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  pageHeader.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

///// меню в шапке меняет для модалки /////
const changeTabletMenu = function () {
  if (window.innerWidth <= 1279) {
    mainNavFirstItem.classList.add('page-header__nav-hide');
  } else {
    mainNavFirstItem.classList.remove('page-header__nav-hide');
  }
};

changeTabletMenu();

window.addEventListener('resize', changeTabletMenu);

///// слайдер в ОМС /////
const mySwiper = new Swiper('.swiper-container', {
  breakpoints: {
    320: {
      slidesPerView: 1.3,
      slidesOffsetAfter: 0,
    },
    350: {
      slidesPerView: 1.5,
      slidesOffsetAfter: 0,
    },
    640: {
      slidesPerView: 1.8,
      slidesOffsetAfter: 0,
    },
    730: {
      slidesPerView: 2,
      slidesOffsetAfter: 0,
    },
    1000: {
      slidesPerView: 3,
      slidesOffsetAfter: 0,
    },
    1280: {
      slidesPerView: 4,
      slidesOffsetAfter: 150,
    },
  },

  pagination: {
    el: '.oms-about__list-pagination',
  },

  navigation: {
    nextEl: '.oms-about__list-next',
    prevEl: '.oms-about__list-prev',
  },
});
