const body = document.querySelector('body');
const header = document.querySelector('.page-header');
const pageMain = document.querySelector('.page-main');
const pageFooter = document.querySelector('.page-footer');
const mainNav = document.querySelector('.main-nav');
const mainNavWrapper = document.querySelector('.main-nav__wrapper');
const headerMenuButton = document.querySelector('.main-nav__toggle');
const headerNavMenuButton = document.querySelector('.main-nav-menu__toggle');
const headerMenu = document.querySelector('.page-header__nav');
const headerTopSection = document.querySelector('.page-header__version-toggle');
const headerCitySection = document.querySelector('.main-nav-menu__city');
const upButton = document.querySelector('.up-button');
const pageHeader = document.querySelector('.page-header');
const mainNavHelpItemIcons = document.querySelectorAll('.main-nav__help-item-icon--menu');
const mainNavHelpItemDescriptions = document.querySelectorAll('.main-nav__help-item-description');
const regionModal = document.querySelector('#region-modal').content.querySelector('.region');
const mainNavMenu = document.querySelector('.main-nav__menu');
const bonusesRegionField = document.getElementById('bonuses-region-field');
const infoRegionList = document.querySelector('.info__region-list');
const infoRegionItems = document.querySelectorAll('.info__region-item');
const pageHeaderSectionTitleAbout = document.querySelector('.page-header__section-title--about')
const tabRegionItems = document.querySelectorAll('.tab__region-item');
const tabRegions = document.querySelectorAll('.tab__region');

let regionSearchModal;

///// массивы для ie /////
const infoRegionItemsArray = Array.prototype.slice.call(infoRegionItems);
const tabRegionItemsArray = Array.prototype.slice.call(tabRegionItems);
const tabRegionsArray = Array.prototype.slice.call(tabRegions);

///// прокрутка наверх /////
const scrollToTop = function () {
  pageHeader.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

///// открывает/закрывает меню в шапке /////
const addHideClass = function (element) {
  element.forEach(function (it) {
    it.classList.add('page-header__nav--hide');
  });
}

const removeHideClass = function (element) {
  element.forEach(function (it) {
    it.classList.remove('page-header__nav--hide');
  });
}

const classesToHide = [headerTopSection, mainNav, pageMain, pageFooter];
const classesToShow = [headerMenu];

const closeHeaderMenu = function () {
  removeHideClass(classesToHide)
  headerMenu.classList.add('page-header__nav--hide');

  if(mainNavWrapper) {
    mainNavWrapper.classList.remove('page-header__nav--hide');
  }

  headerNavMenuButton.removeEventListener('click', closeHeaderMenu);
  window.removeEventListener('keydown', escHeaderMenuHandler);
};

const escHeaderMenuHandler = function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    closeHeaderMenu();
  }
};

const closeHeaderMenuByClick = function () {
  headerNavMenuButton.addEventListener('click', closeHeaderMenu);
  window.addEventListener('keydown', escHeaderMenuHandler);
};

const openHeaderMenu = function () {
  scrollToTop();
  removeHideClass(classesToShow);
  addHideClass(classesToHide);

  if(mainNavWrapper) {
    mainNavWrapper.classList.add('page-header__nav--hide');
  }

  if (window.innerWidth <= 1279) {
    pageHeaderSectionTitleAbout.querySelector('a').removeAttribute('href')
  }

  closeHeaderMenuByClick();
};

headerMenuButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  openHeaderMenu();
});

///// кнопка наверх /////
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
  scrollToTop();
});

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
    clickable: true,
  },

  navigation: {
    nextEl: '.oms-about__list-next',
    prevEl: '.oms-about__list-prev',
  },
});

///// окно выбора региона /////
const closeRegionModal = function () {
  body.classList.remove('no-scroll');
  if (regionSearchModal) {
    regionSearchModal.remove();
    regionSearchModal = null;
  }
}

const escRegionModal = function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    closeRegionModal();
  }
};

const closeRegionModalByClick = function () {
  const regionModalCloseButton = document.querySelector('.region-modal__close');

  regionModalCloseButton.addEventListener('click', closeRegionModal);
  window.addEventListener('keydown', escRegionModal);
};

const openRegionModal = function () {
  const fragment = document.createDocumentFragment();
  const regionSearch = regionModal.cloneNode(true);
  fragment.appendChild(regionSearch);
  header.insertBefore(fragment, headerTopSection);
  regionSearchModal = regionSearch;

  const regionSearchField = document.getElementById('region-search-field');

  body.classList.add('no-scroll');
  closeRegionModalByClick();

  if (window.innerWidth <= 1279) {
    regionSearchField.placeholder = 'Начните вводить регион';

  }
}

headerCitySection.addEventListener('click', openRegionModal);

///// инпут выбора региона /////
const escRegionList = function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    infoRegionList.classList.add('info__region-list--hide');
  }
};

const overlayRegionList = function (evt) {
  if (evt.target !== infoRegionList && evt.target !== bonusesRegionField) {
    infoRegionList.classList.add('info__region-list--hide');
  }
};

if (bonusesRegionField) {
  bonusesRegionField.addEventListener('click', function () {
    infoRegionList.classList.toggle('info__region-list--hide');
    window.addEventListener('keydown', escRegionList);
    document.addEventListener('click', overlayRegionList);
  })
}

const setInputValue = function (evt) {
  bonusesRegionField.value = evt.target.textContent;
  infoRegionList.classList.add('info__region-list--hide');
}

infoRegionItemsArray.forEach(function (it) {
  it.addEventListener('click', setInputValue)
})

///// подсветка региона при наведении /////
const [regionItemCentral, regionItemNorthwestern, regionItemVolga, regionItemUral, regionItemNorthCaucasian, regionItemSiberian, regionItemSouthern, regionItemFarEastern] = tabRegionItemsArray
const [regionCentral, regionNorthwestern, regionVolga, regionUral, regionNorthCaucasian, regionSiberian, regionSouthern, regionFarEastern] = tabRegionsArray

const showRegion = function (item, region) {
  item.addEventListener('mouseenter', function () {
    region.classList.add('tab__region--hover')
  });
  item.addEventListener('mouseleave', function () {
    region.classList.remove('tab__region--hover')
  });
  region.addEventListener('mouseenter', function () {
    item.classList.add('tab__region-item--hover')
  });
  region.addEventListener('mouseleave', function () {
    item.classList.remove('tab__region-item--hover')
  });
}

tabRegionItemsArray.forEach(function (it) {
  if(it.contains(regionItemCentral)) {
    showRegion(it, regionCentral);
  } else if(it.contains(regionItemNorthwestern)) {
    showRegion(it, regionNorthwestern)
  } else if(it.contains(regionItemVolga)) {
    showRegion(it, regionVolga)
  } else if(it.contains(regionItemUral)) {
    showRegion(it, regionUral)
  } else if(it.contains(regionItemNorthCaucasian)) {
    showRegion(it, regionNorthCaucasian)
  } else if(it.contains(regionItemSiberian)) {
    showRegion(it, regionSiberian)
  } else if(it.contains(regionItemSouthern)) {
    showRegion(it, regionSouthern)
  } else if(it.contains(regionItemFarEastern)) {
    showRegion(it, regionFarEastern)
  }
})

///// скрывет окно с регионами /////

const documentListItems =document.querySelectorAll('.tab__info-description-item');


const documentListItemsArray = Array.prototype.slice.call(documentListItems);

if (window.innerWidth <= 1279) {
  documentListItemsArray.forEach(function (it) {
    const documentListOpenButton = it.querySelector('input[type="checkbox"]');
    const documentListWindow = it.querySelector('.tab__info-document-list-wrapper');
    const documentListCloseButton = it.querySelector('.tab__info-document-list-wrapper-toggle');

    documentListOpenButton.addEventListener('change', function () {
      documentListWindow.classList.remove('tab__info-document-list-wrapper--hide');

      const documentListClassesToHide = classesToHide.slice();
      documentListClassesToHide.splice(2, 1)
      addHideClass(documentListClassesToHide);

      documentListCloseButton.addEventListener('click', function () {
        documentListWindow.classList.add('tab__info-document-list-wrapper--hide');
        removeHideClass(documentListClassesToHide);
      })
    })
  })
}
