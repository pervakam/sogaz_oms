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
const formRegionField = document.getElementById('region-field');
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
    1280: {
      slidesOffsetAfter: 200,
    },
  },

  slidesPerView: 'auto',

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

///// стилизация select /////
const tabItemSearchInputs = document.querySelectorAll('.tab-item__search-input');
const secondNameFeedbackField = document.getElementById('second-name-feedback-field');
const locationFeedbackField = document.getElementById('location-feedback-field');

tabItemSearchInputs.forEach(function (it) {
  const formResultList = it.querySelector('.form__result-list');
  const yearResultList = it.querySelector('.form__result-list--year');
  const monthResultList = it.querySelector('.form__result-list--month');
  const bonusesResultList = it.querySelector('.form__result-list--bonuses');
  const feedbackResultList = it.querySelector('.form__result-list--feedback');
  const regionResultList = it.querySelector('.form__result-list--region');
  const FIRST_YEAR = 1920;
  const CURRENT_YEAR = new Date().getFullYear();
  const MONTHS_ARRAY = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']

  if (yearResultList) {
    for (let i = CURRENT_YEAR; i >= FIRST_YEAR; i--) {
      let newOption = new Option([i], [i]);
      yearResultList.append(newOption);
    }
  }

  if (regionResultList) {
    const regionResultListOptions = Array.prototype.slice.call(regionResultList.options);

    regionResultListOptions.forEach(function (option) {
      if (option.hasAttribute('selected') && !option.hasAttribute('disabled')) {
        it.classList.add('tab-item__search-input-selected')
      }
    })
  }

  if (monthResultList) {
    MONTHS_ARRAY.forEach(function (it) {
      let newMonthOption = new Option(it, it);
      monthResultList.append(newMonthOption);
    })
  }

  if (formResultList) {
    formResultList.addEventListener('change', function (evt) {
      if (evt.target.value != "") {
        it.classList.add('tab-item__search-input-selected')
      }
    });
  }

  if (bonusesResultList || feedbackResultList) {
    for (let i = 0; i < formResultList.options.length; i++) {
      if (formResultList.options[i].value === headerCitySections[0].textContent) {
        formResultList.options[i].setAttribute('selected', 'selected');
        formResultList.options[i].parentNode.parentNode.classList.add('tab-item__search-input-selected');
      }
    }
  }
})

const feedbackFormButton = document.querySelector('.feedback__form-button');

if (feedbackFormButton) {
  feedbackFormButton.addEventListener('click', function () {
    secondNameFeedbackField.removeAttribute('required');
    locationFeedbackField.removeAttribute('required');
  })
}

///// вывод данных о загруженных файлах /////
const feedbackUploadButton = document.getElementById('upload-feedback-field');
const feedbackUploadResult = document.querySelector('.feedback__upload-result')
const feedbackUploadResultList = document.querySelector('.feedback__upload-result-list');
const feedbackUploadResultItem = document.querySelector('.feedback__upload-result-item');
const feedbackUploadMore = document.querySelector('.feedback__upload-more')

if (feedbackUploadButton) {
  feedbackUploadButton.addEventListener('change', function () {
    feedbackUploadResult.classList.remove('feedback__upload-result--hide');
    feedbackUploadMore.textContent = "прикрепить ещё";

    const createUploadFileList = function () {
      let fragment = new DocumentFragment();
      for (let i = 1; i < feedbackUploadButton.files.length; i++) {
        const feedbackUploadResultItemNext = feedbackUploadResultItem.cloneNode(true)
        fragment.append(feedbackUploadResultItemNext);
      }
      return fragment;
    }
    feedbackUploadResultList.append(createUploadFileList());

    const uploadFileName = document.querySelectorAll('.feedback__upload-result-name');
    const uploadFileSize = document.querySelectorAll('.feedback__upload-result-size');
    const uploadResultList = document.querySelector('.feedback__upload-result-list')
    const feedbackUploadResultDel = uploadResultList.querySelectorAll('.feedback__upload-result-del')

    for (let i = 0; i < feedbackUploadButton.files.length; i++) {
      uploadFileName[i].textContent = feedbackUploadButton.files[i].name;
      uploadFileSize[i].textContent = feedbackUploadButton.files[i].size;
    }

    feedbackUploadResultDel.forEach(function (it) {
      it.addEventListener('click', function () {
        uploadResultList.removeChild(it.parentElement);
      })
    })
  })
}

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
  if (tabFilterButton) {
    tabFilterButton.addEventListener('click', tabFilterHandler);
  }
  const tabSearchCloseButton = document.querySelector('.tab-item__search-toggle');
  if (tabSearchCloseButton) {
    tabSearchCloseButton.addEventListener('click', tabFilterHandler);
  }

}

/// карусель фотографий в разделе фотогалереи и в статье/////
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
const tabItemMediaModal = document.querySelector('.tab-item__media-modal');
const tabItemMediaListWrapper = document.querySelector('.tab-item__media-list-wrapper');
const tabItemMediaSlide = document.querySelectorAll('.tab-item__media-slide');

tabItemMediaSlide.forEach(function (it) {
  const showMorePhotoButton = it.querySelector('.tab__photo-section-button');
  const tabPhotoSection = it.querySelector('.tab__photo-section');
  const mediaModalCloseButton = document.querySelector('.tab-item__media-modal-close');

  console.log(tabPhotoSection);

  if (showMorePhotoButton) {
    showMorePhotoButton.addEventListener('click', function () {
      tabItemMediaModal.classList.remove('tab-item__media-modal--hide');
      const tabMediaModalPhotoSection = tabPhotoSection.cloneNode(true);
      const photoModal = tabItemMediaModal.appendChild(tabMediaModalPhotoSection);

      photoModal.classList.add('tab__photo-section--modal');
      photoModal.querySelector('.tab__photo-section-navigation').classList.add('tab__photo-section-navigation--hide');

      const topList = photoModal.querySelector('.tab__photo-section-list');
      const topWrapper = photoModal.querySelector('.tab__photo-section-wrapper');
      const topSlides = photoModal.querySelectorAll('.tab__photo-section-slide');
      const prevSlide = photoModal.querySelector('.tab__photo-section-prev');
      const nextSlide = photoModal.querySelector('.tab__photo-section-next');

      const photoModalThumbs = photoModal.querySelector('.tab__photo-section-list').cloneNode(true);
      const photoModalThumbsSection = photoModal.appendChild(photoModalThumbs);
      const thumbsWrapper = photoModalThumbsSection.querySelector('.tab__photo-section-wrapper');
      const thumbsSlides = photoModalThumbsSection.querySelectorAll('.tab__photo-section-slide');

      topList.classList.add('tab__photo-section-list--top');
      topWrapper.classList.add('tab__photo-section-wrapper--top');
      topSlides.forEach(function (it) {
        it.classList.add('tab__photo-section-slide--top');
      });
      prevSlide.classList.add('tab__photo-section-prev--modal');
      nextSlide.classList.add('tab__photo-section-next--modal');
      if (window.innerWidth <= 1279) {
        prevSlide.style.display = 'block';
        nextSlide.style.display = 'block';
      }

      photoModalThumbsSection.classList.add('tab__photo-section-list--thumbs');
      thumbsWrapper.classList.add('tab__photo-section-wrapper--thumbs');
      thumbsSlides.forEach(function (it) {
        it.classList.add('tab__photo-section-slide--thumbs');
        const thumbsImg = it.querySelector('.tab__photo-section-img');
        thumbsImg.classList.add('tab__photo-section-img--thumbs');
      });

      if (window.innerWidth < 640) {
        photoModal.querySelector('.tab__photo-section-navigation').classList.remove('tab__photo-section-navigation--hide');
        photoModal.querySelector('.tab__photo-section-button').classList.add('tab__photo-section-button--hide');
        photoModal.querySelector('.tab__article-photo-counter').classList.add('tab__article-photo-counter--modal');
      }


      const closeModalHandler = function () {
        tabItemMediaModal.classList.add('tab-item__media-modal--hide');
        photoModal.classList.remove('tab__photo-section--modal');
        photoModal.remove();
        photoModalThumbsSection.remove();

        topList.classList.remove('tab__photo-section-list--top');
        topWrapper.classList.remove('tab__photo-section-wrapper--top');
        topSlides.forEach(function (it) {
          it.classList.remove('tab__photo-section-slide--top');
        });

        photoModalThumbsSection.classList.remove('tab__photo-section-list--thumbs');
        thumbsWrapper.classList.remove('tab__photo-section-wrapper--thumbs');
        thumbsSlides.forEach(function (it) {
          it.classList.remove('tab__photo-section-slide--thumbs');
        });
      };

      const escModalHandler = function (evt) {
        if (evt.keyCode === 27) {
          evt.preventDefault();
          closeModalHandler();
        }
      };

      mediaModalCloseButton.addEventListener('click', closeModalHandler);
      window.addEventListener('keydown', escModalHandler);

      const galleryThumbs = new Swiper('.tab__photo-section-list--thumbs', {
        wrapperClass: 'tab__photo-section-wrapper--thumbs',
        slideClass: 'tab__photo-section-slide--thumbs',
        spaceBetween: 4,
        slidesPerView: 'auto',
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        navigation: {
          nextEl: '.tab__photo-section-next--modal',
          prevEl: '.tab__photo-section-prev--modal',
        },
      });

      const galleryTop = new Swiper('.tab__photo-section-list--top', {
        wrapperClass: 'tab__photo-section-wrapper--top',
        slideClass: 'tab__photo-section-slide--top',
        slidesPerView: 'auto',
        autoHeight: true,
        centeredSlides: true,
        spaceBetween: 4,
        thumbs: {
          swiper: galleryThumbs,
        },
        navigation: {
          nextEl: '.tab__photo-section-next--modal',
          prevEl: '.tab__photo-section-prev--modal',
        },
        pagination: {
          el: '.tab__article-photo-counter',
          type: 'fraction',
        },
      });
    });
  }
});

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
  };

  if (tabItemPhotosItems.length > MAX_PHOTO_IN_CARD_DESKTOP && window.innerWidth > 1280) {
    tabItemPhotosCounter(MAX_PHOTO_IN_CARD_DESKTOP);
  } else if (tabItemPhotosItems.length > MAX_PHOTO_IN_CARD_TABLET && window.innerWidth <= 1279) {
    tabItemPhotosCounter(MAX_PHOTO_IN_CARD_TABLET);
  }
});

///// попап с пунктами выдачи полисов /////
const feedbackLocationButton = document.querySelector('.feedback__location-button');
const pointModalOverlay = document.querySelector('.tab-item__point-overlay');
const pointSearchInput = document.querySelector('.tab-item__search-input--map-region')
const pointModalCloseButton = document.querySelector('.tab-item__point-modal-close')
const pointInfoCloseButton = document.querySelector('.tab-item__point-info-close');
const pointInfoItems = document.querySelectorAll('.tab-item__point-item');
const formPointField = document.querySelector('.form__result-list--point');
const requestForm = document.querySelector('.feedback__form');
const addressItem = document.querySelector('.tab-item--address');
const SHOW_MORE_TEXT = 'подробнее';
const SHOW_LESS_TEXT = 'скрыть';

const pointModalOverlayHandler = function () {
  pointModalOverlay.classList.remove('tab-item__point-overlay--hide');
  body.classList.add('no-scroll');
  pointModalCloseButton.addEventListener('click', function () {
    pointModalOverlay.classList.add('tab-item__point-overlay--hide');
    body.classList.remove('no-scroll');
  })
}

const addressModalOverlayHandler = function (item) {
  const addressModalOverlay = pointModalOverlay.cloneNode(true);
  const addressModal = addressItem.appendChild(addressModalOverlay);
  const addressModalItemsList = addressModal.querySelector('.tab-item__point-list');
  const addressModalTitle = addressModal.querySelector('.tab-item__point-modal-title');
  const addressModalCloseButton = addressModal.querySelector('.tab-item__point-modal-close');

  const currentItem = item.cloneNode(true);
  const currentAddressModalItem = addressModalItemsList.appendChild(currentItem);
  currentAddressModalItem.style.display = 'block'
  const currentItemInfo = currentAddressModalItem.querySelectorAll('.tab__info-item')

  for (let i = 0; i < currentItemInfo.length; i++) {
    const currentItemInfoInput = currentItemInfo[i].querySelector('input[type="checkbox"]');
    const currentItemInfoLabel = currentItemInfo[i].querySelector('.tab__info-item-title');
    currentItemInfoInput.setAttribute('id', 'address-info-10' + [i])
    currentItemInfoLabel.setAttribute('for', 'address-info-10' + [i])
  }

  addressModal.classList.remove('tab-item__point-overlay--address');
  addressModal.classList.add('tab-item__point-overlay--address-modal');
  upButton.classList.add('up-button-hide');
  body.classList.add('no-scroll');

  const addressItemTitle = item.querySelector('.tab-item__point-title');

  addressModalTitle.textContent = addressItemTitle.textContent;

  addressModalCloseButton.addEventListener('click', function () {
    addressItem.removeChild(addressModal)
    body.classList.remove('no-scroll');
  })
}

if (feedbackLocationButton) {
  feedbackLocationButton.addEventListener('click', pointModalOverlayHandler);
}

pointInfoItems.forEach(function (it) {
  const pointInfoButton = it.querySelector('.tab-item__point-info-button');
  const pointAddressField = it.querySelector('.tab-item__point-address');
  const pointInfoMoreButton = it.querySelector('.tab-item__point-info-more-button');

  pointInfoMoreButton.addEventListener('click', function () {

    if (window.innerWidth > 640 && requestForm.contains(feedbackLocationButton)) {
      if (it.textContent === SHOW_MORE_TEXT) {
        it.textContent = SHOW_LESS_TEXT
      } else if (it.textContent === SHOW_LESS_TEXT) {
        it.textContent = SHOW_MORE_TEXT
      }
    } else if (window.innerWidth < 640 && requestForm.contains(feedbackLocationButton)) {
      pointModalOverlay.classList.toggle('tab-item__point-overlay--mobile');
    }

    addressModalOverlayHandler(it);

    const addressGalleryThumbs = new Swiper('.tab-item__point-gallery-thumbs', {
      wrapperClass: 'tab-item__point-gallery-wrapper--thumbs',
      slideClass: 'tab-item__point-gallery-slide-thumbs',
      spaceBetween: 4,
      slidesPerView: 'auto',
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      navigation: {
        nextEl: '.tab-item__point-gallery-next',
        prevEl: '.tab-item__point-gallery-prev',
      },
    });

    const addressGalleryTop = new Swiper('.tab-item__point-gallery-top', {
      wrapperClass: 'tab-item__point-gallery-wrapper--top',
      slideClass: 'tab-item__point-gallery-slide-top',
      slidesPerView: 4,
      autoHeight: true,
      centeredSlides: true,
      spaceBetween: 40,
      thumbs: {
        swiper: addressGalleryThumbs,
      },
      navigation: {
        nextEl: '.tab-item__point-gallery-next',
        prevEl: '.tab-item__point-gallery-prev',
      },
    });
  })

  if (pointInfoButton) {
    pointInfoButton.addEventListener('click', function () {
      for (let i = 0; i < formPointField.options.length; i++) {
        if (formPointField.options[i].textContent === pointAddressField.textContent) {
          formPointField.options[i].setAttribute('selected', 'selected');
        }
      }
      body.classList.remove('no-scroll');
      formPointField.parentElement.classList.add('tab-item__search-input-selected');
      pointModalOverlay.classList.add('tab-item__point-overlay--hide');
    })
  }
})

///// информационные баннеры /////
const covidBanner = document.querySelector('.covid-banner');
const courierBannerOverlay = document.querySelector('.courier-banner__overlay')
const covidBannerCloseButton = document.querySelector('.banner__close--covid');
if (courierBannerOverlay) {
  const bannerCloseButtons = courierBannerOverlay.querySelectorAll('.banner__close')
  bannerCloseButtons.forEach(function (it) {
    it.addEventListener('click', function () {
      courierBannerOverlay.classList.add('courier-banner__overlay--hide')
    })
  })
}

if (covidBannerCloseButton) {
  covidBannerCloseButton.addEventListener('click', function () {
    covidBanner.classList.add('hide');
  })
}

///// Отображает перечень обследований для диспасеризации /////
const preventionButton = document.querySelector('.tab-item__search-button');
const preventionAbout = document.querySelector('.tab-item__about-prevention');
const preventionMore = document.querySelector('.tab-item__about-prevention-more');
const preventionForm = document.querySelector('.tab-item__form--prevention');
const preventionFormYearList = preventionForm.querySelector('.form__result-list--year')

if (preventionButton) {
  preventionButton.addEventListener('click', function () {
    preventionAbout.classList.remove('tab-item__about-prevention--hide');
    preventionMore.classList.remove('tab-item__about-prevention-more--hide');
  })
}
