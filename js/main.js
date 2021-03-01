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
const headerCitySections = document.querySelectorAll('.main-nav__city');
const upButton = document.querySelector('.up-button');
const pageHeader = document.querySelector('.page-header');
const mainNavHelpItemIcons = document.querySelectorAll('.main-nav__help-item-icon--menu');
const mainNavHelpItemDescriptions = document.querySelectorAll('.main-nav__help-item-description');
const regionModal = document.querySelector('#region-modal').content.querySelector('.region');
const mainNavMenu = document.querySelector('.main-nav__menu');
const bonusesRegionField = document.getElementById('bonuses-region-field');
const infoRegionList = document.querySelector('.info__region-list');
const infoRegionItems = document.querySelectorAll('.info__region-item');
const pageHeaderSectionTitleAbout = document.querySelector('.page-header__section-title--about');
const tabRegionItems = document.querySelectorAll('.tab__region-item');
const tabRegions = document.querySelectorAll('.tab__region');

let regionSearchModal;

///// массивы для ie /////
const headerCitySectionsArray = Array.prototype.slice.call(headerCitySections);
const infoRegionItemsArray = Array.prototype.slice.call(infoRegionItems);
const tabRegionItemsArray = Array.prototype.slice.call(tabRegionItems);
const tabRegionsArray = Array.prototype.slice.call(tabRegions);

///// прокрутка наверх /////
const scrollToTop = function () {
  pageHeader.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

///// открывает/закрывает меню в шапке /////
const addHideClass = function (element) {
  element.forEach(function (it) {
    it.classList.add('page-header__nav--hide');
  });
};

const removeHideClass = function (element) {
  element.forEach(function (it) {
    it.classList.remove('page-header__nav--hide');
  });
};

const classesToHide = [headerTopSection, mainNav, pageMain, pageFooter];
const classesToShow = [headerMenu];

const closeHeaderMenu = function () {
  removeHideClass(classesToHide);
  headerMenu.classList.add('page-header__nav--hide');

  if (mainNavWrapper) {
    mainNavWrapper.classList.remove('page-header__nav--hide');
  }

  if (window.innerWidth <= 1279) {
    headerCitySections.forEach(function (it) {
      it.style.display = 'none';
    });
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

  if (mainNavWrapper) {
    mainNavWrapper.classList.add('page-header__nav--hide');
  }

  if (window.innerWidth <= 1279) {
    pageHeaderSectionTitleAbout.querySelector('a').removeAttribute('href');
    headerCitySections.forEach(function (it) {
      it.style.display = 'block';
    });
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
  if (scrolled > 200) {
    upButton.classList.remove('up-button-hide');
  } else {
    upButton.classList.add('up-button-hide');
  }
});

upButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  scrollToTop();
});

///// слайдер в ОМС /////
const mySwiper = new Swiper('.oms-about__list', {
  breakpoints: {
    320: {
      slidesPerView: 1.24,
      slidesOffsetAfter: 0,
    },
    375: {
      slidesPerView: 1.47,
      slidesOffsetAfter: 0,
    },
    400: {
      slidesPerView: 1.63,
      slidesOffsetAfter: 0,
    },
    730: {
      slidesPerView: 2.25,
      slidesOffsetAfter: 0,
    },
    1000: {
      slidesPerView: 3.05,
      slidesOffsetAfter: 20,
    },
    1280: {
      slidesPerView: 4,
      slidesOffsetAfter: 200,
    },
  },

  wrapperClass: 'oms-about__list-wrapper',

  slideClass: 'oms-about__item',

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
};

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
};

headerCitySectionsArray.forEach(function (it) {
  it.addEventListener('click', openRegionModal);
});

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
  });
}

const setInputValue = function (evt) {
  bonusesRegionField.value = evt.target.textContent;
  infoRegionList.classList.add('info__region-list--hide');
};

infoRegionItemsArray.forEach(function (it) {
  it.addEventListener('click', setInputValue);
});

///// подсветка региона при наведении /////
const [regionItemCentral, regionItemNorthwestern, regionItemVolga, regionItemUral, regionItemNorthCaucasian, regionItemSiberian, regionItemSouthern, regionItemFarEastern] = tabRegionItemsArray;
const [regionCentral, regionNorthwestern, regionVolga, regionUral, regionNorthCaucasian, regionSiberian, regionSouthern, regionFarEastern] = tabRegionsArray;

const showRegion = function (item, region) {
  item.addEventListener('mouseenter', function () {
    region.classList.add('tab__region--hover');
  });
  item.addEventListener('mouseleave', function () {
    region.classList.remove('tab__region--hover');
  });
  region.addEventListener('mouseenter', function () {
    item.classList.add('tab__region-item--hover');
  });
  region.addEventListener('mouseleave', function () {
    item.classList.remove('tab__region-item--hover');
  });
};

tabRegionItemsArray.forEach(function (it) {
  if (it.contains(regionItemCentral)) {
    showRegion(it, regionCentral);
  } else if (it.contains(regionItemNorthwestern)) {
    showRegion(it, regionNorthwestern);
  } else if (it.contains(regionItemVolga)) {
    showRegion(it, regionVolga);
  } else if (it.contains(regionItemUral)) {
    showRegion(it, regionUral);
  } else if (it.contains(regionItemNorthCaucasian)) {
    showRegion(it, regionNorthCaucasian);
  } else if (it.contains(regionItemSiberian)) {
    showRegion(it, regionSiberian);
  } else if (it.contains(regionItemSouthern)) {
    showRegion(it, regionSouthern);
  } else if (it.contains(regionItemFarEastern)) {
    showRegion(it, regionFarEastern);
  }
});

///// скрывет окно с документами /////
const documentListItems = document.querySelectorAll('.tab__info-description-item');

const documentListItemsArray = Array.prototype.slice.call(documentListItems);

if (window.innerWidth <= 1279) {
  documentListItemsArray.forEach(function (it) {
    const documentListOpenButton = it.querySelector('input[type="checkbox"]');
    const documentListWindow = it.querySelector('.tab__info-document-list-wrapper');
    const documentListCloseButton = it.querySelector('.tab__info-document-list-wrapper-toggle');

    documentListOpenButton.addEventListener('change', function () {
      documentListWindow.classList.remove('tab__info-document-list-wrapper--hide');

      const documentListClassesToHide = classesToHide.slice();
      documentListClassesToHide.splice(2, 1);
      addHideClass(documentListClassesToHide);

      documentListCloseButton.addEventListener('click', function () {
        documentListWindow.classList.add('tab__info-document-list-wrapper--hide');
        removeHideClass(documentListClassesToHide);
      });
    });
  });
}

///// скрывет окно с фильтром /////
const tabSearchForm = document.querySelector('.tab-item__search');

const tabFilterHandler = function () {
  tabSearchForm.classList.toggle('tab-item__search--hide');
};

if (window.innerWidth <= 1279 && tabSearchForm) {
  const tabFilterButton = document.querySelector('.tab-item__form-button');
  tabFilterButton.addEventListener('click', tabFilterHandler);
  const tabSearchCloseButton = document.querySelector('.tab-item__search-toggle');
  tabSearchCloseButton.addEventListener('click', tabFilterHandler);
}

/// карусель фотографий в статье /////
const PhotoSlider = new Swiper('.tab__article-photo-list', {

  wrapperClass: 'tab__article-photo-wrapper',

  slideClass: 'tab__article-photo-slide',

  navigation: {
    nextEl: '.tab__article-photo-next',
    prevEl: '.tab__article-photo-prev',
  },
});

/// карусель фотографий в разделе фотогалереи /////
const tabPhotoSections = document.querySelectorAll('.tab__photo-section');

tabPhotoSections.forEach(function (it) {
  const swiperList = it.querySelector('.tab__photo-section-list');
  const swiperNextEl = it.querySelector('.tab__photo-section-next');
  const swiperPrevEl = it.querySelector('.tab__photo-section-prev');

  const PhotoSectionSlider = new Swiper(swiperList, {
    slidesPerView: 'auto',

    wrapperClass: 'tab__photo-section-wrapper',

    slideClass: 'tab__photo-section-slide',

    pagination: {
      el: '.tab__article-photo-counter',
      type: 'fraction',
    },

    navigation: {
      nextEl: swiperNextEl,
      prevEl: swiperPrevEl,
    },
  });
});

///// модалка с фото /////
const photoSectionOpenButtons = document.querySelectorAll('.tab__photo-section-button');

const photoSectionOpenButtonsArray = Array.prototype.slice.call(photoSectionOpenButtons);

photoSectionOpenButtonsArray.forEach(function (it) {
  const photoModalClone = it.parentElement.parentElement.parentElement.cloneNode(true)
  const tabPhotoItem = it.parentElement.parentElement.parentElement.parentElement;

  it.addEventListener('click', function () {
    const photoModalOverlay = tabPhotoItem.appendChild(photoModalClone);
    const photoModal = photoModalOverlay.querySelector('.tab__photo-section');
    photoModalOverlay.classList.add('tab__photo-section-overlay');
    photoModal.classList.add('tab__photo-section--modal');

    const topList = photoModal.querySelector('.tab__photo-section-list');
    const topWrapper = photoModal.querySelector('.tab__photo-section-wrapper');
    const topSlides = photoModal.querySelectorAll('.tab__photo-section-slide');
    topList.classList.add('tab__photo-section-list--top');
    topWrapper.classList.add('tab__photo-section-wrapper--top')
    topSlides.forEach(function (it) {
      it.classList.add('tab__photo-section-slide--top')
    });

    const photoModalThumbs = photoModalOverlay.querySelector('.tab__photo-section-list').cloneNode(true);
    const photoModalThumbsSection = photoModal.appendChild(photoModalThumbs);
    const thumbsWrapper = photoModalThumbsSection.querySelector('.tab__photo-section-wrapper');
    const thumbsSlides = photoModalThumbsSection.querySelectorAll('.tab__photo-section-slide');
    photoModalThumbsSection.classList.add('tab__photo-section-list--thumbs');
    thumbsWrapper.classList.add('tab__photo-section-wrapper--thumbs')
    thumbsSlides.forEach(function (it) {
      it.classList.add('tab__photo-section-slide--thumbs')
    });

    const galleryThumbs  = new Swiper('.tab__photo-section-list--thumbs', {
      wrapperClass: 'tab__photo-section-wrapper--thumbs',
      slideClass: 'tab__photo-section-slide--thumbs',
      spaceBetween: 4,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      // navigation: {
      //   nextEl: '.next',
      //   prevEl: '.prev',
      // },
    });

    const galleryTop  = new Swiper('.tab__photo-section-list--top', {
      wrapperClass: 'tab__photo-section-wrapper--top',
      slideClass: 'tab__photo-section-slide--top',
      thumbs: {
        swiper: galleryThumbs
      },
    });

  });
});

///// слайдер новостей /////
const tabSlides = document.querySelectorAll('.tab-item__list-slide');
const tabListNavigation = document.querySelector('.tab-item__list-navigation');

const newsSwiper = new Swiper('.tab-item__list-container', {
  breakpoints: {
    320: {
      slidesPerView: 1.007,
    },
    640: {
      slidesPerView: 2,
    },
  },

  slidesPerColumn: 3,
  spaceBetween: 24,

  wrapperClass: 'tab-item__list-wrapper',

  slideClass: 'tab-item__list-slide',

  pagination: {
    el: '.tab-item__list-pagination',
    dynamicBullets: true,
    bulletClass: 'tab-item__list-pagination-bullet',
    bulletActiveClass: 'tab-item__list-pagination-bullet--active',
    clickable: true,
    renderBullet: function (index, className) {
      return '' +
        '<div class="' + className + '">' + (index + 1) + '</div>';
    },
  },

  navigation: {
    nextEl: '.tab-item__list-next',
    prevEl: '.tab-item__list-prev',
  },
});

if(tabSlides.length < 7 && tabListNavigation) {
  tabListNavigation.classList.add('tab-item__list-navigation--hide')
}

///// фотографии в карточке новостей /////
const tabItemPhotosLists = document.querySelectorAll('.tab-item__list-slide-photos-list');
const MAX_PHOTO_IN_CARD_DESKTOP = 4;
const MAX_PHOTO_IN_CARD_TABLET = 3;

tabItemPhotosLists.forEach(function (it) {
  const tabItemPhotosItems = it.querySelectorAll('.tab-item__list-slide-photos-item');

  const tabItemPhotosCounter = function (maxPhoto) {
    tabItemPhotosItems[maxPhoto - 1].classList.add('tab-item__list-slide-photos-item--more');
    tabItemPhotosItems[maxPhoto - 1].querySelector('.tab-item__list-slide-photos-item-pic').classList.add('tab-item__list-slide-photos-item-pic--hide');
    tabItemPhotosItems[maxPhoto - 1].textContent = '+' + (tabItemPhotosItems.length - (maxPhoto - 1));
  }

  if(tabItemPhotosItems.length > MAX_PHOTO_IN_CARD_DESKTOP && window.innerWidth > 1280) {
    tabItemPhotosCounter(MAX_PHOTO_IN_CARD_DESKTOP);
  } else if(tabItemPhotosItems.length > MAX_PHOTO_IN_CARD_TABLET && window.innerWidth <= 1279) {
    tabItemPhotosCounter(MAX_PHOTO_IN_CARD_TABLET);
  }
})

///// слайдер в фотогалерее /////
const tabMediaSlides = document.querySelectorAll('.tab-item__media-slide');
const tabMediaNavigation = document.querySelector('.tab-item__media-list-navigation');

const MediaSwiper = new Swiper('.tab-item__media-list-container', {
  slidesPerView: 1,
  slidesPerColumn: 3,
  spaceBetween: 24,
  allowTouchMove: false,

  wrapperClass: 'tab-item__media-list-wrapper',

  slideClass: 'tab-item__media-slide',

  pagination: {
    el: '.tab-item__media-list-pagination',
    dynamicBullets: true,
    bulletClass: 'tab-item__media-list-pagination-bullet',
    bulletActiveClass: 'tab-item__media-list-pagination-bullet--active',
    clickable: true,
    renderBullet: function (index, className) {
      return '' +
        '<div class="' + className + '">' + (index + 1) + '</div>';
    },
  },

  navigation: {
    nextEl: '.tab-item__media-list-next',
    prevEl: '.tab-item__media-list-prev',
  },
});

if(tabMediaSlides.length < 4) {
  tabMediaNavigation.classList.add('tab-item__media-list-navigation--hide')
}
