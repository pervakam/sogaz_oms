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
const pageMainVisionVersion = document.querySelector('.page-main--vision');
const omsAboutList = document.querySelector('.oms-about__list');

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
const SCROLL_DISTANCE = 200;

const scrollHandler = () => {
	const scrolled = window.pageYOffset || document.documentElement.scrollTop;
	if (scrolled > SCROLL_DISTANCE) {
		upButton.classList.remove('up-button-hide');
	} else {
		upButton.classList.add('up-button-hide');
	}
};

window.addEventListener('scroll', scrollHandler);

upButton.addEventListener('click', function (evt) {
	evt.preventDefault();
	scrollToTop();
});

///// слайдер в ОМС /////
if (!pageMainVisionVersion) {
	const mySwiper = new Swiper('.oms-about__list', {
		on: {
			slidePrevTransitionEnd: function () {
				omsAboutList.classList.remove('oms-about__list--no-mask');
			},
			reachEnd: function () {
				omsAboutList.classList.add('oms-about__list--no-mask');
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
}

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
	const MONTHS_ARRAY = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

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
				it.classList.add('tab-item__search-input-selected');
			}
		});
	}

	if (monthResultList) {
		MONTHS_ARRAY.forEach(function (it) {
			let newMonthOption = new Option(it, it);
			monthResultList.append(newMonthOption);
		});
	}

	if (formResultList) {
		formResultList.addEventListener('change', function (evt) {
			if (evt.target.value != '') {
				it.classList.add('tab-item__search-input-selected');
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
});

const feedbackFormButton = document.querySelector('.feedback__form-button');

// if (feedbackFormButton) {
// 	feedbackFormButton.addEventListener('click', function () {
// 		secondNameFeedbackField.removeAttribute('required');
// 		locationFeedbackField.removeAttribute('required');
// 	});
// }

///// вывод данных о загруженных файлах /////
const feedbackUploadButton = document.getElementById('upload-feedback-field');
const feedbackUploadResult = document.querySelector('.feedback__upload-result');
const feedbackUploadResultList = document.querySelector('.feedback__upload-result-list');
const feedbackUploadResultItem = document.querySelector('.feedback__upload-result-item');
const feedbackUploadMore = document.querySelector('.feedback__upload-more');

if (feedbackUploadButton) {
	feedbackUploadButton.addEventListener('change', function () {
		feedbackUploadResult.classList.remove('feedback__upload-result--hide');
		feedbackUploadMore.textContent = 'прикрепить ещё';

		const createUploadFileList = function () {
			let fragment = new DocumentFragment();
			for (let i = 1; i < feedbackUploadButton.files.length; i++) {
				const feedbackUploadResultItemNext = feedbackUploadResultItem.cloneNode(true);
				fragment.append(feedbackUploadResultItemNext);
			}
			return fragment;
		};
		feedbackUploadResultList.append(createUploadFileList());

		const uploadFileName = document.querySelectorAll('.feedback__upload-result-name');
		const uploadFileSize = document.querySelectorAll('.feedback__upload-result-size');
		const uploadResultList = document.querySelector('.feedback__upload-result-list');
		const feedbackUploadResultDel = uploadResultList.querySelectorAll('.feedback__upload-result-del');

		for (let i = 0; i < feedbackUploadButton.files.length; i++) {
			uploadFileName[i].textContent = feedbackUploadButton.files[i].name;
			uploadFileSize[i].textContent = feedbackUploadButton.files[i].size;
		}

		feedbackUploadResultDel.forEach(function (it) {
			it.addEventListener('click', function () {
				uploadResultList.removeChild(it.parentElement);
			});
		});
	});
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
	const swiperSlides = it.querySelectorAll('.tab__photo-section-slide');
	const slideNumber = it.querySelector('.tab__article-photo-number');

	slideNumber.textContent = swiperSlides.length.toString();

	const PhotoSectionSlider = new Swiper(swiperList, {
		on: {
			slidePrevTransitionEnd: function () {
				it.classList.remove('tab__photo-section--no-mask');
			},
			reachEnd: function () {
				it.classList.add('tab__photo-section--no-mask');
			},
		},

		slidesPerView: 'auto',

		wrapperClass: 'tab__photo-section-wrapper',

		slideClass: 'tab__photo-section-slide',

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

	if (showMorePhotoButton) {
		showMorePhotoButton.addEventListener('click', function () {
			tabItemMediaModal.classList.remove('tab-item__media-modal--hide');
			const tabMediaModalPhotoSection = tabPhotoSection.cloneNode(true);
			const photoModal = tabItemMediaModal.appendChild(tabMediaModalPhotoSection);

			body.classList.add('no-scroll');
			upButton.classList.add('up-button-hide');
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
				body.classList.remove('no-scroll');
				scrollHandler();

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
const pointSearchInput = document.querySelector('.tab-item__search-input--map-region');
const pointModalCloseButton = document.querySelector('.tab-item__point-modal-close');
const pointInfoCloseButton = document.querySelector('.tab-item__point-info-close');
const pointInfoItems = document.querySelectorAll('.tab-item__point-item');
const formPointField = document.querySelector('.form__result-list--point');
const requestForm = document.querySelector('.feedback__form');
const addressItem = document.querySelector('.tab-item--address');
const pointPin = document.querySelector('.tab-item__point-pin');
const pointModal = document.querySelector('.point-modal__overlay');
const SHOW_MORE_TEXT = 'подробнее';
const SHOW_LESS_TEXT = 'скрыть';

const pointModalOverlayHandler = function () {
	pointModalOverlay.classList.remove('tab-item__point-overlay--hide');
	body.classList.add('no-scroll');
	pointModalCloseButton.addEventListener('click', function () {
		pointModalOverlay.classList.add('tab-item__point-overlay--hide');
		body.classList.remove('no-scroll');
	});
};

const addressModalOverlayHandler = function (item) {
	const addressModalOverlay = pointModalOverlay.cloneNode(true);
	const addressModal = addressItem.appendChild(addressModalOverlay);
	const addressModalItemsList = addressModal.querySelector('.tab-item__point-list');
	const addressModalTitle = addressModal.querySelector('.tab-item__point-modal-title');
	const addressModalCloseButton = addressModal.querySelector('.tab-item__point-modal-close');

	const currentItem = item.cloneNode(true);
	const currentAddressModalItem = addressModalItemsList.appendChild(currentItem);
	currentAddressModalItem.style.display = 'block';
	const currentItemInfo = currentAddressModalItem.querySelectorAll('.tab__info-item');

	for (let i = 0; i < currentItemInfo.length; i++) {
		const currentItemInfoInput = currentItemInfo[i].querySelector('input[type="checkbox"]');
		const currentItemInfoLabel = currentItemInfo[i].querySelector('.tab__info-item-title');
		currentItemInfoInput.setAttribute('id', 'address-info-10' + [i]);
		currentItemInfoLabel.setAttribute('for', 'address-info-10' + [i]);
	}

	addressModal.classList.remove('tab-item__point-overlay--address');
	addressModal.classList.add('tab-item__point-overlay--address-modal');
	upButton.classList.add('up-button-hide');
	body.classList.add('no-scroll');

	const addressItemTitle = item.querySelector('.tab-item__point-title');

	addressModalTitle.textContent = addressItemTitle.textContent;

	addressModalCloseButton.addEventListener('click', function () {
		addressItem.removeChild(addressModal);
		body.classList.remove('no-scroll');
	});
};

if (feedbackLocationButton) {
	feedbackLocationButton.addEventListener('click', pointModalOverlayHandler);
}

pointInfoItems.forEach(function (it) {
	const pointInfoButton = it.querySelector('.tab-item__point-info-button');
	const pointAddressField = it.querySelector('.tab-item__point-address');
	const pointInfoMoreButton = it.querySelector('.tab-item__point-info-more-button');
	const pointMoreButton = it.querySelector('.tab-item__point-more-button');

	if (pointMoreButton) {
		pointMoreButton.addEventListener('click', () => {
			pointModal.classList.remove('point-modal__overlay--hide');

			pointModal.querySelector('.point-modal__title').textContent = pointModal.querySelector('.point-modal__point-title').textContent = it.querySelector('.tab-item__point-title').textContent;

			const pointModalCloseButton = document.querySelector('.point-modal__close');
			pointModalCloseButton.addEventListener('click', () => {
				pointModal.classList.add('point-modal__overlay--hide');
			});
		});
	}

	if (pointInfoMoreButton) {
		pointInfoMoreButton.addEventListener('click', function () {
			if (window.innerWidth > 640 && requestForm.contains(feedbackLocationButton)) {
				if (pointInfoMoreButton.textContent === SHOW_MORE_TEXT) {
					pointInfoMoreButton.textContent = SHOW_LESS_TEXT;
				} else if (pointInfoMoreButton.textContent === SHOW_LESS_TEXT) {
					pointInfoMoreButton.textContent = SHOW_MORE_TEXT;
				}
			} else if (window.innerWidth < 640 && requestForm.contains(feedbackLocationButton)) {
				pointModalOverlay.classList.toggle('tab-item__point-overlay--mobile');
			}

			if (addressItem) {
				addressModalOverlayHandler(it);
			}
		});
	}

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
		});
	}
});

if (pointPin) {
	pointPin.addEventListener('click', () => {
		pointModal.classList.remove('point-modal__overlay--hide');
		body.classList.add('no-scroll');
		upButton.style.display = 'none';

		const pointModalCloseButton = document.querySelector('.point-modal__close');
		const closePointModalHandler = () => {
			pointModal.classList.add('point-modal__overlay--hide');
			body.classList.remove('no-scroll');
			upButton.style.display = 'block';
		};
		const escPointModalHandler = (evt) => {
			if (evt.keyCode === 27) {
				evt.preventDefault();
				closePointModalHandler();
			}
		};

		pointModalCloseButton.addEventListener('click', closePointModalHandler);
		window.addEventListener('keydown', escPointModalHandler);
	});
}

if (pointModal) {
	const addressGalleryThumbs = new Swiper('.point-modal__gallery-thumbs', {
		wrapperClass: 'point-modal__gallery-wrapper--thumbs',
		slideClass: 'point-modal__gallery-slide-thumbs',
		slidesPerView: 'auto',
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,

		navigation: {
			nextEl: '.point-modal__gallery-next',
			prevEl: '.point-modal__gallery-prev',
		},
	});

	const addressGalleryTop = new Swiper('.point-modal__gallery-top', {
		wrapperClass: 'point-modal__gallery-wrapper--top',
		slideClass: 'point-modal__gallery-slide-top',
		slidesPerView: 'auto',
		autoHeight: true,
		centeredSlides: true,

		thumbs: {
			swiper: addressGalleryThumbs,
		},
		navigation: {
			nextEl: '.point-modal__gallery-next',
			prevEl: '.point-modal__gallery-prev',
		},
	});
}

///// информационные баннеры /////
const covidBanner = document.querySelector('.covid-banner');
const courierBannerOverlay = document.querySelector('.courier-banner__overlay');
const covidBannerCloseButton = document.querySelector('.banner__close--covid');
const covidBannerMoreButton = document.querySelector('.covid-banner__button');

if (courierBannerOverlay) {
	const bannerCloseButtons = courierBannerOverlay.querySelectorAll('.banner__close');
	bannerCloseButtons.forEach(function (it) {
		it.addEventListener('click', function () {
			courierBannerOverlay.classList.add('courier-banner__overlay--hide');
		});
	});
}

if (covidBannerCloseButton) {
	covidBannerCloseButton.addEventListener('click', function () {
		covidBanner.classList.add('hide');
	});
}

if (covidBannerMoreButton) {
	covidBannerMoreButton.addEventListener('click', function () {
		covidBanner.classList.add('hide');
	});
}

///// Отображает перечень обследований для диспасеризации /////
const preventionButton = document.querySelector('.tab-item__search-button');
const preventionAbout = document.querySelector('.tab-item__about-prevention');
const preventionMore = document.querySelector('.tab-item__about-prevention-more');

if (preventionButton) {
	preventionButton.addEventListener('click', function () {
		preventionAbout.classList.remove('tab-item__about-prevention--hide');
		preventionMore.classList.remove('tab-item__about-prevention-more--hide');
	});
}

///// Бордеры в списке филиалов /////
const viewSectionList = document.querySelector('.tab-item__view-section--list');

if (viewSectionList) {
	const viewSectionListPointItems = viewSectionList.querySelectorAll('.tab-item__point-item');

	if (viewSectionListPointItems.length > 4) {
		viewSectionList.classList.add('tab-item__view-section--border');
	}
}

///// активная кнопка в версии для слабовидящих /////
const visionVersion = document.querySelector('.vision');
const visionActivateButton = document.querySelector('.page-header__version-toggle');
const visionCustomActiveButton = document.querySelector('.vision__custom--active');
const visionSwitches = document.querySelectorAll('.vision__settings-item:not(.vision__settings-item--control)');
const customMoreButton = document.querySelector('.vision__custom--more');
const hideSettings = document.querySelectorAll('.vision__settings-item--hide');
const visionVersionBackButtons = document.querySelectorAll('.vision__back-button');
const visionCustomButtons = document.querySelectorAll('.vision__custom');

const visionFontSerifButton = document.querySelector('.vision__custom--serif');
const visionFontSansSerifButton = document.querySelector('.vision__custom--sans-serif');
const visionFontSmallButton = document.querySelector('.vision__custom--small');
const visionFontMiddleButton = document.querySelector('.vision__custom--middle');
const visionFontBigButton = document.querySelector('.vision__custom--big');
const visionViewStandardButton = document.querySelector('.vision__custom--standard');
const visionViewBlackWhiteButton = document.querySelector('.vision__custom--black-white');
const visionViewInversionButton = document.querySelector('.vision__custom--inversion');
const visionViewBlueButton = document.querySelector('.vision__custom--blue');
const visionViewComfortButton = document.querySelector('.vision__custom--comfort');
const visionViewBrownButton = document.querySelector('.vision__custom--brown');
const visionKerningStandardButton = document.querySelector('.vision__custom--kerning-standard');
const visionKerningMiddleButton = document.querySelector('.vision__custom--kerning-middle');
const visionKerningBigButton = document.querySelector('.vision__custom--kerning-big');
const visionInterlineSingleButton = document.querySelector('.vision__custom--interline-single');
const visionInterlineOneHalfButton = document.querySelector('.vision__custom--one-half');
const visionInterlineDoubleButton = document.querySelector('.vision__custom--interline-double');
const visionImgOffButton = document.querySelector('.vision__custom--img-off');
const visionImgOnButton = document.querySelector('.vision__custom--img-on');

const HIDE_SETTINGS_TEXT = 'Скрыть дополнительные настройки';
const SHOW_SETTINGS_TEXT = 'Открыть дополнительные настройки';

const INVALID_VERSION = 'INVALID_VERSION';
const FONT_TYPE = 'FONT_TYPE';
const FONT_SIZE = 'FONT_SIZE';
const COLOR_SCHEME = 'COLOR_SCHEME';
const FONT_KERNING = 'FONT_KERNING';
const FONT_INTERLINE = 'FONT_INTERLINE';
const IMG_SHOW = 'IMG_SHOW';

function readCookie(name) {
	var matches = document.cookie.match(new RegExp(
		'(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)',
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

visionSwitches.forEach(function (item) {
	const visionCustomButtons = item.querySelectorAll('.vision__custom');

	visionCustomButtons.forEach(function (button) {
		button.addEventListener('click', function () {
			visionCustomButtons.forEach(function (it) {
				it.classList.remove('vision__custom--active');
			});
			button.classList.add('vision__custom--active');
		});
	});
});

if (customMoreButton) {
	customMoreButton.addEventListener('click', function () {
		hideSettings.forEach(function (it) {
			it.classList.toggle('vision__settings-item--hide');
		});
		if (customMoreButton.textContent === SHOW_SETTINGS_TEXT) {
			customMoreButton.textContent = HIDE_SETTINGS_TEXT;
		} else if (customMoreButton.textContent === HIDE_SETTINGS_TEXT) {
			customMoreButton.textContent = SHOW_SETTINGS_TEXT;
		}
	});
}

const visionActivateHandler = () => {
	visionVersion.classList.remove('vision--hide');
	header.classList.add('page-header--vision');
	pageMain.classList.add('page-main--vision');
	pageFooter.classList.add('page-footer--vision');

	let INVALID_VERSION_STATUS = 'true';
	let IMG_SHOW_STATUS = 'false';
	document.cookie = INVALID_VERSION + '=' + INVALID_VERSION_STATUS;
	document.cookie = IMG_SHOW + '=' + IMG_SHOW_STATUS;
};

const visionDefaultSettings = () => {
	visionActivateHandler();
	body.classList.add('font-middle');
	body.classList.add('color-scheme-black-white');
	body.classList.add('img-off');
};

const visionDeactivateHandler = () => {
	visionVersion.classList.add('vision--hide');
	header.classList.remove('page-header--vision');
	pageMain.classList.remove('page-main--vision');
	pageFooter.classList.remove('page-footer--vision');
	visionActivateButton.classList.remove('page-header__version-toggle--hide');
	body.removeAttribute('class');

	let INVALID_VERSION_STATUS = 'false';
	let FONT_TYPE_STATUS = 'false';
	let FONT_SIZE_STATUS = 'false';
	let FONT_KERNING_STATUS = 'false';
	let COLOR_SCHEME_STATUS = 'false';
	let FONT_INTERLINE_STATUS = 'false';
	let IMG_SHOW_STATUS = 'true';
	document.cookie = INVALID_VERSION + '=' + INVALID_VERSION_STATUS;
	document.cookie = FONT_TYPE + '=' + FONT_TYPE_STATUS;
	document.cookie = FONT_SIZE + '=' + FONT_SIZE_STATUS;
	document.cookie = FONT_KERNING + '=' + FONT_KERNING_STATUS;
	document.cookie = COLOR_SCHEME + '=' + COLOR_SCHEME_STATUS;
	document.cookie = FONT_INTERLINE + '=' + FONT_INTERLINE_STATUS;
	document.cookie = IMG_SHOW + '=' + IMG_SHOW_STATUS;
	console.log(document.cookie);
};

visionActivateButton.addEventListener('click', visionDefaultSettings);

visionVersionBackButtons.forEach(function (button) {
	button.addEventListener('click', visionDeactivateHandler);
});

const fontSizeArray = ['font-small', 'font-middle', 'font-big'];
const colorSchemeArray = ['color-scheme-black-white', 'color-scheme-inversion', 'color-scheme-blue', 'color-scheme-comfort', 'color-scheme-brown'];
const fontKerningArray = ['font-kerning-middle', 'font-kerning-big'];
const fontInterlineArray = ['font-interline-single', 'font-interline-double'];

const removeOtherTypes = (array) => {
	array.forEach((it) => {
		body.classList.remove(it);
	});
};

document.addEventListener('DOMContentLoaded', () => {
	let INVALID_VERSION_STATUS = readCookie(INVALID_VERSION);
	let FONT_TYPE_STATUS = readCookie(FONT_TYPE);
	let FONT_SIZE_STATUS = readCookie(FONT_SIZE);
	let COLOR_SCHEME_STATUS = readCookie(COLOR_SCHEME);
	let FONT_KERNING_STATUS = readCookie(FONT_KERNING);
	let FONT_INTERLINE_STATUS = readCookie(FONT_INTERLINE);
	let IMG_SHOW_STATUS = readCookie(IMG_SHOW);

	if (INVALID_VERSION_STATUS === 'true') {
		visionDefaultSettings();
	}

	if (FONT_TYPE_STATUS === 'font-serif') {
		body.classList.add('font-serif');
	}

	if (FONT_SIZE_STATUS === 'font-small') {
		body.classList.add('font-small');
	}

	if (FONT_SIZE_STATUS === 'font-middle') {
		body.classList.add('font-middle');
	}

	if (FONT_SIZE_STATUS === 'font-big') {
		body.classList.add('font-big');
	}

	if (COLOR_SCHEME_STATUS === 'false') {
		body.classList.remove('color-scheme-black-white');
	}

	if (COLOR_SCHEME_STATUS === 'color-scheme-black-white') {
		body.classList.add('color-scheme-black-white');
	}

	if (COLOR_SCHEME_STATUS === 'color-scheme-inversion') {
		removeOtherTypes(colorSchemeArray);
		body.classList.add('color-scheme-inversion');
	}

	if (COLOR_SCHEME_STATUS === 'color-scheme-blue') {
		removeOtherTypes(colorSchemeArray);
		body.classList.add('color-scheme-blue');
	}

	if (COLOR_SCHEME_STATUS === 'color-scheme-comfort') {
		removeOtherTypes(colorSchemeArray);
		body.classList.add('color-scheme-comfort');
	}

	if (COLOR_SCHEME_STATUS === 'color-scheme-brown') {
		removeOtherTypes(colorSchemeArray);
		body.classList.add('color-scheme-brown');
	}

	if (FONT_KERNING_STATUS === 'font-kerning-middle') {
		removeOtherTypes(fontKerningArray);
		body.classList.add('font-kerning-middle');
	}

	if (FONT_KERNING_STATUS === 'font-kerning-big') {
		removeOtherTypes(fontKerningArray);
		body.classList.add('font-kerning-big');
	}

	if (FONT_INTERLINE_STATUS === 'font-interline-single') {
		removeOtherTypes(fontInterlineArray);
		body.classList.add('font-interline-single');
	}

	if (FONT_INTERLINE_STATUS === 'font-interline-double') {
		removeOtherTypes(fontInterlineArray);
		body.classList.add('font-interline-double');
	}

	if (IMG_SHOW_STATUS === 'true') {
		body.classList.remove('img-off');
	}

	if (IMG_SHOW_STATUS === 'false') {
		body.classList.add('img-off');
	}
});


visionCustomButtons.forEach(function (it) {
	it.addEventListener('click', function (evt) {
			if (evt.target === visionFontSerifButton) {
				body.classList.add('font-serif');

				let FONT_TYPE_STATUS = 'font-serif';
				document.cookie = FONT_TYPE + '=' + FONT_TYPE_STATUS;
			}
			if (evt.target === visionFontSansSerifButton) {
				body.classList.remove('font-serif');

				let FONT_TYPE_STATUS = 'false';
				document.cookie = FONT_TYPE + '=' + FONT_TYPE_STATUS;
			}

			if (evt.target === visionFontSmallButton) {
				removeOtherTypes(fontSizeArray);
				body.classList.add('font-small');

				let FONT_SIZE_STATUS = 'font-small';
				document.cookie = FONT_SIZE + '=' + FONT_SIZE_STATUS;
			}
			if (evt.target === visionFontMiddleButton) {
				removeOtherTypes(fontSizeArray);
				body.classList.add('font-middle');

				let FONT_SIZE_STATUS = 'font-middle';
				document.cookie = FONT_SIZE + '=' + FONT_SIZE_STATUS;
			}
			if (evt.target === visionFontBigButton) {
				removeOtherTypes(fontSizeArray);
				body.classList.add('font-big');

				let FONT_SIZE_STATUS = 'font-big';
				document.cookie = FONT_SIZE + '=' + FONT_SIZE_STATUS;
			}

			if (evt.target === visionViewStandardButton) {
				removeOtherTypes(colorSchemeArray);

				let COLOR_SCHEME_STATUS = 'false';
				document.cookie = COLOR_SCHEME + '=' + COLOR_SCHEME_STATUS;
			}
			if (evt.target === visionViewBlackWhiteButton) {
				removeOtherTypes(colorSchemeArray);
				body.classList.add('color-scheme-black-white');

				let COLOR_SCHEME_STATUS = 'color-scheme-black-white';
				document.cookie = COLOR_SCHEME + '=' + COLOR_SCHEME_STATUS;
			}
			if (evt.target === visionViewInversionButton) {
				removeOtherTypes(colorSchemeArray);
				body.classList.add('color-scheme-inversion');

				let COLOR_SCHEME_STATUS = 'color-scheme-inversion';
				document.cookie = COLOR_SCHEME + '=' + COLOR_SCHEME_STATUS;
			}
			if (evt.target === visionViewBlueButton) {
				removeOtherTypes(colorSchemeArray);
				body.classList.add('color-scheme-blue');

				let COLOR_SCHEME_STATUS = 'color-scheme-blue';
				document.cookie = COLOR_SCHEME + '=' + COLOR_SCHEME_STATUS;
			}
			if (evt.target === visionViewComfortButton) {
				removeOtherTypes(colorSchemeArray);
				body.classList.add('color-scheme-comfort');

				let COLOR_SCHEME_STATUS = 'color-scheme-comfort';
				document.cookie = COLOR_SCHEME + '=' + COLOR_SCHEME_STATUS;
			}
			if (evt.target === visionViewBrownButton) {
				removeOtherTypes(colorSchemeArray);
				body.classList.add('color-scheme-brown');

				let COLOR_SCHEME_STATUS = 'color-scheme-brown';
				document.cookie = COLOR_SCHEME + '=' + COLOR_SCHEME_STATUS;
				console.log(document.cookie);
			}

			if (evt.target === visionKerningStandardButton) {
				removeOtherTypes(fontKerningArray);

				let FONT_KERNING_STATUS = 'false';
				document.cookie = FONT_KERNING + '=' + FONT_KERNING_STATUS;
			}
			if (evt.target === visionKerningMiddleButton) {
				removeOtherTypes(fontKerningArray);
				body.classList.add('font-kerning-middle');

				let FONT_KERNING_STATUS = 'font-kerning-middle';
				document.cookie = FONT_KERNING + '=' + FONT_KERNING_STATUS;
			}
			if (evt.target === visionKerningBigButton) {
				removeOtherTypes(fontKerningArray);
				body.classList.add('font-kerning-big');

				let FONT_KERNING_STATUS = 'font-kerning-big';
				document.cookie = FONT_KERNING + '=' + FONT_KERNING_STATUS;
			}

			if (evt.target === visionInterlineSingleButton) {
				removeOtherTypes(fontInterlineArray);
				body.classList.add('font-interline-single');

				let FONT_INTERLINE_STATUS = 'font-interline-single';
				document.cookie = FONT_INTERLINE + '=' + FONT_INTERLINE_STATUS;
			}
			if (evt.target === visionInterlineOneHalfButton) {
				removeOtherTypes(fontInterlineArray);

				let FONT_INTERLINE_STATUS = 'false';
				document.cookie = FONT_INTERLINE + '=' + FONT_INTERLINE_STATUS;
			}
			if (evt.target === visionInterlineDoubleButton) {
				removeOtherTypes(fontInterlineArray);
				body.classList.add('font-interline-double');

				let FONT_INTERLINE_STATUS = 'font-interline-double';
				document.cookie = FONT_INTERLINE + '=' + FONT_INTERLINE_STATUS;
			}

			if (evt.target === visionImgOffButton) {
				body.classList.add('img-off');

				let IMG_SHOW_STATUS = 'false';
				document.cookie = IMG_SHOW + '=' + IMG_SHOW_STATUS;
			}
			if (evt.target === visionImgOnButton) {
				body.classList.remove('img-off');

				let IMG_SHOW_STATUS = 'true';
				document.cookie = IMG_SHOW + '=' + IMG_SHOW_STATUS;
			}
		},
	);
});

// visionCustomButtons.forEach(function (it) {
// 	it.addEventListener('click', function (evt) {
// 			// if (evt.target === document.querySelector('.vision__custom--serif')) {
// 			// 	body.classList.add('font-serif');
// 			//
// 			// 	let FONT_TYPE_STATUS = "font-serif";
// 			// 	document.cookie = FONT_TYPE + "=" + FONT_TYPE_STATUS;
// 			// 	console.log(document.cookie);
// 			// }
// 			visionCustomButtonsChecker(evt, visionFontSerifButton, 'font-serif')
// 			if (evt.target === document.querySelector('.vision__custom--sans-serif')) {
// 				body.classList.remove('font-serif');
//
// 				let FONT_TYPE_STATUS = "false";
// 				document.cookie = FONT_TYPE + "=" + FONT_TYPE_STATUS;
// 				console.log(document.cookie);
// 			}
//
// 			if (evt.target === document.querySelector('.vision__custom--small')) {
// 				removeOtherTypes(fontSizeArray)
// 				body.classList.add('font-small');
//
// 				let FONT_SIZE_STATUS = "font-small";
// 				document.cookie = FONT_SIZE + "=" + FONT_SIZE_STATUS;
// 				console.log(document.cookie);
// 			}
// 			if (evt.target === document.querySelector('.vision__custom--middle')) {
// 				removeOtherTypes(fontSizeArray)
// 				body.classList.add('font-middle');
//
// 				let FONT_SIZE_STATUS = "font-middle";
// 				document.cookie = FONT_SIZE + "=" + FONT_SIZE_STATUS;
// 				console.log(document.cookie);
//
// 			}
// 			if (evt.target === document.querySelector('.vision__custom--big')) {
// 				removeOtherTypes(fontSizeArray)
// 				body.classList.add('font-big');
//
// 				let FONT_SIZE_STATUS = "font-big";
// 				document.cookie = FONT_SIZE + "=" + FONT_SIZE_STATUS;
// 				console.log(document.cookie);
// 			}
//
// 			if (evt.target === document.querySelector('.vision__custom--standard')) {
// 				removeOtherTypes(colorSchemeArray)
//
// 				let COLOR_SCHEME_STATUS = "false";
// 				document.cookie = COLOR_SCHEME + "=" + COLOR_SCHEME_STATUS;
// 				console.log(document.cookie);
// 			}
// 			if (evt.target === document.querySelector('.vision__custom--black-white')) {
// 				removeOtherTypes(colorSchemeArray);
// 				body.classList.add('color-scheme-black-white');
//
// 				let COLOR_SCHEME_STATUS = "color-scheme-black-white";
// 				document.cookie = COLOR_SCHEME + "=" + COLOR_SCHEME_STATUS;
// 				console.log(document.cookie);
// 			}
// 			if (evt.target === document.querySelector('.vision__custom--inversion')) {
// 				removeOtherTypes(colorSchemeArray);
// 				body.classList.add('color-scheme-inversion');
//
// 				let COLOR_SCHEME_STATUS = "color-scheme-inversion";
// 				document.cookie = COLOR_SCHEME + "=" + COLOR_SCHEME_STATUS;
// 				console.log(document.cookie);
//
// 			}
// 			if (evt.target === document.querySelector('.vision__custom--blue')) {
// 				removeOtherTypes(colorSchemeArray);
// 				body.classList.add('color-scheme-blue');
//
// 				let COLOR_SCHEME_STATUS = "color-scheme-blue";
// 				document.cookie = COLOR_SCHEME + "=" + COLOR_SCHEME_STATUS;
// 				console.log(document.cookie);
// 			}
// 			if (evt.target === document.querySelector('.vision__custom--comfort')) {
// 				removeOtherTypes(colorSchemeArray);
// 				body.classList.add('color-scheme-comfort');
//
// 				let COLOR_SCHEME_STATUS = "color-scheme-comfort";
// 				document.cookie = COLOR_SCHEME + "=" + COLOR_SCHEME_STATUS;
// 				console.log(document.cookie);
// 			}
// 			if (evt.target === document.querySelector('.vision__custom--brown')) {
// 				removeOtherTypes(colorSchemeArray);
// 				body.classList.add('color-scheme-brown');
//
// 				let COLOR_SCHEME_STATUS = "color-scheme-brown";
// 				document.cookie = COLOR_SCHEME + "=" + COLOR_SCHEME_STATUS;
// 				console.log(document.cookie);
// 			}
//
// 			if (evt.target === document.querySelector('.vision__custom--kerning-standard')) {
// 				removeOtherTypes(fontKerningArray);
//
// 				let FONT_KERNING_STATUS = "false";
// 				document.cookie = FONT_KERNING + "=" + FONT_KERNING_STATUS;
// 				console.log(document.cookie);
// 			}
// 			if (evt.target === document.querySelector('.vision__custom--kerning-middle')) {
// 				removeOtherTypes(fontKerningArray);
// 				body.classList.add('font-kerning-middle');
//
// 				let FONT_KERNING_STATUS = "font-kerning-middle";
// 				document.cookie = FONT_KERNING + "=" + FONT_KERNING_STATUS;
// 				console.log(document.cookie);
// 			}
// 			if (evt.target === document.querySelector('.vision__custom--kerning-big')) {
// 				removeOtherTypes(fontKerningArray);
// 				body.classList.add('font-kerning-big');
//
// 				let FONT_KERNING_STATUS = "font-kerning-big";
// 				document.cookie = FONT_KERNING + "=" + FONT_KERNING_STATUS;
// 				console.log(document.cookie);
// 			}
//
// 			if (evt.target === document.querySelector('.vision__custom--interline-single')) {
// 				removeOtherTypes(fontInterlineArray);
// 				body.classList.add('font-interline-single');
//
// 				let FONT_INTERLINE_STATUS = "font-interline-single";
// 				document.cookie = FONT_INTERLINE + "=" + FONT_INTERLINE_STATUS;
// 				console.log(document.cookie);
// 			}
// 			if (evt.target === document.querySelector('.vision__custom--one-half')) {
// 				removeOtherTypes(fontInterlineArray);
//
// 				let FONT_INTERLINE_STATUS = "false";
// 				document.cookie = FONT_INTERLINE + "=" + FONT_INTERLINE_STATUS;
// 				console.log(document.cookie);
// 			}
// 			if (evt.target === document.querySelector('.vision__custom--interline-double')) {
// 				removeOtherTypes(fontInterlineArray);
// 				body.classList.add('font-interline-double');
//
// 				let FONT_INTERLINE_STATUS = "font-interline-double";
// 				document.cookie = FONT_INTERLINE + "=" + FONT_INTERLINE_STATUS;
// 				console.log(document.cookie);
// 			}
//
// 			if (evt.target === document.querySelector('.vision__custom--img-off')) {
// 				body.classList.add('img-off');
//
// 				let IMG_SHOW_STATUS = "false";
// 				document.cookie = IMG_SHOW + "=" + IMG_SHOW_STATUS;
// 				console.log(document.cookie);
// 			}
// 			if (evt.target === document.querySelector('.vision__custom--img-on')) {
// 				body.classList.remove('img-off');
//
// 				let IMG_SHOW_STATUS = "true";
// 				document.cookie = IMG_SHOW + "=" + IMG_SHOW_STATUS;
// 				console.log(document.cookie);
// 			}
// 		},
// 	);
// });

///// кнопка в тестах /////
const testForm = document.querySelector('.test__form');

if (testForm) {
	const testInputs = testForm.querySelectorAll('input[type="radio"]');
	const testButton = testForm.querySelector('.test__button');

	testInputs.forEach(function (it) {
		it.addEventListener('click', function () {
			testButton.classList.remove('test__button--hide');
		});
	});
}

///// диаграммы в опросах /////
const canvas = document.getElementById('myChart');
const canvasSecond = document.getElementById('myChart-2');

const getOrCreateLegendList = (chart, id) => {
	const legendContainer = document.getElementById(id);
	let listContainer = legendContainer.querySelector('ul');

	if (!listContainer) {
		listContainer = document.createElement('ul');
		listContainer.style.margin = 0;
		listContainer.style.padding = 0;

		legendContainer.appendChild(listContainer);
	}

	return listContainer;
};

const htmlLegendPlugin = {
	id: 'htmlLegend',
	afterUpdate(chart, args, options) {
		const ul = getOrCreateLegendList(chart, options.containerID);

		// Remove old legend items
		while (ul.firstChild) {
			ul.firstChild.remove();
		}

		// Reuse the built-in legendItems generator
		const items = chart.options.plugins.legend.labels.generateLabels(chart);

		// Reuse data value
		const percents = chart.data.datasets[0].data;

		items.forEach(item => {
			const li = document.createElement('li');
			li.style.alignItems = 'center';
			li.style.cursor = 'pointer';
			li.style.display = 'flex';
			li.style.flexDirection = 'row';
			li.style.marginBottom = '16px';

			li.onclick = () => {
				chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
				chart.update();
			};

			// Color box
			const boxSpan = document.createElement('span');
			boxSpan.style.background = item.fillStyle;
			boxSpan.style.borderColor = item.strokeStyle;
			boxSpan.style.borderWidth = item.lineWidth + 'px';
			boxSpan.style.display = 'inline-block';
			boxSpan.style.height = '28px';
			boxSpan.style.marginRight = '8px';
			boxSpan.style.minWidth = '52px';
			boxSpan.style.borderRadius = '4px';
			boxSpan.style.color = '#ffffff';

			// Text
			const textContainer = document.createElement('p');
			textContainer.style.color = item.fontColor;
			textContainer.style.margin = 0;
			textContainer.style.padding = 0;
			textContainer.style.textDecoration = item.hidden ? 'line-through' : '';

			const text = document.createTextNode(item.text);
			textContainer.appendChild(text);

			li.appendChild(boxSpan);
			li.appendChild(textContainer);
			ul.appendChild(li);
		});

		const boxSpans = document.querySelector('.interview__diagram-legend').querySelectorAll('span');

		for (let i = 0; i < percents.length; i++) {
			boxSpans[i].textContent = percents[i].toString() + '%';
		}
	},
};

if (canvas) {
	const ctx = canvas.getContext('2d');

	const data = {
		labels: [
			'Удовлетворительно, в течение последнего года периодически возникал дискомфорт',
			'Неудовлетворительно, часто возникает потребность в обращении к медперсоналу',
			'Думаю, что ее проводят некачественно (неполное обследование, рекомендации)',
			'Думаю, что она плохо организована (большие очереди, неудобный режим работы врачей)',
			'Не считаю необходимым тратить время на диспансеризацию',
			'Хорошо, ничего не беспокоило последний год',
			'Уже прошел',
		],
		datasets: [{
			label: 'Вы курите?',
			data: [23, 21, 24, 19, 18, 33, 4],
			backgroundColor: [
				'#000078',
				'#02b9fd',
				'#ed7e17',
				'#00d4bf',
				'#e20a3b',
				'#9300d9',
				'#ffc907',
			],
		}],
	};

	const myChart = new Chart(ctx, {
		type: 'doughnut',
		data: data,
		options: {
			plugins: {
				legend: {
					display: false,
				},
				htmlLegend: {
					containerID: 'legend-container',
				},
			},
		},
		plugins: [htmlLegendPlugin],
	});
}

if (canvasSecond) {
	const ctx = canvasSecond.getContext('2d');

	const dataSecond = {
		labels: [
			'Нет',
			'Да, реже, чем раз в месяц',
			'Да, раз в месяц',
			'Да, каждый день',
		],
		datasets: [{
			label: 'Вы курите?',
			data: [7, 23, 30, 40],
			backgroundColor: [
				'#000078',
				'#02b9fd',
				'#ed7e17',
				'#00d4bf',

			],
		}],
	};

	const myChartSecond = new Chart(ctx, {
		type: 'doughnut',
		data: dataSecond,
		options: {
			plugins: {
				legend: {
					display: false,
				},
				htmlLegend: {
					containerID: 'legend-container-2',
				},
			},
		},
		plugins: [htmlLegendPlugin],
	});
}

///// валидация инпутов /////
const sendFormTrigger = document.querySelector('.js-feedback__form-button');

const matchRegexp = (string, regexp) => {
	return string.match(regexp);
};

const validators = {
	fio(value) {
		const regexp = /^(?:[А-ЯЁ][а-яё]+(?:-[А-ЯЁ]?[а-яё]+)?(?:[\s]|$)){1,3}(?:[Оо]глы|[Гг]ызы|[Кк]ызы|[Гг]зы)?$/u;
		const matched = matchRegexp(value, regexp);
		return matched ? !!matched[matched.index] : false;
	},
	snils(value) {
		const regexp = /^[0-9]{11}$/;
		const matched = matchRegexp(value, regexp);
		return matched ? !!matched[matched.index] : false;
	},
	empty(value) {
		return !!value;
	},
	phone(value) {
		const regexp = /^(\+7)[\s]{1}[(]*\d{3}[)][\s]{1}\d{3}[-]{1}\d{2}[-]{1}\d{2}$/;
		const matched = matchRegexp(value, regexp);
		return matched ? !!matched[matched.index] : false;
	},
	email(value) {
		// eslint-disable-next-line
		const regexp = /^[a-zA-Z0-9_\-\.\+\^!#\$%&*+\/\=\?`\|\{\}~\']+@((?:(?:[a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.?)+|(\[([0-9]{1,3}(\.[0-9]{1,3}){3}|[0-9a-fA-F]{1,4}(\:[0-9a-fA-F]{1,4}){7})\]))$/;
		const matched = matchRegexp(value, regexp);
		return matched ? !!matched[matched.index] : false;
	},
	temporaryCertificate(value) {
		// eslint-disable-next-line
		const regexp = /^[0-9]{9}$/;
		const matched = matchRegexp(value, regexp);
		return matched ? !!matched[matched.index] : false;
	},
};

function validateForm(e, form) {
	e.preventDefault();
	const inputs = form.querySelectorAll('.js-input--validate');
	const agreeCheckbox = form.querySelector('.feedback__form-agree');

	// if(!form.querySelector('input[type="checkbox"]').checked) {
	// 	agreeCheckbox.classList.add('feedback__form-agree--error')
	// }

	let valid = true;

	inputs.forEach((input) => {
		const validator = input.dataset.validate;
		const value = input.querySelector('.input__value').value;
		const fieldRequired = input
			.querySelector('.input__value')
			.hasAttribute('required');
		const fieldEmpty = !validators.empty(value);
		const fieldValid = validators[validator](value);

		// console.log('empty: ', fieldEmpty, 'valid: ', fieldValid);
		// console.log(input, '\n\n\n\n');

		if (
			(fieldRequired && fieldEmpty) ||
			(fieldRequired && !fieldEmpty && !fieldValid) ||
			(!fieldRequired && !fieldEmpty && !fieldValid)
		) {
			valid = false;
			input.classList.add('error');
		}
	});

	const checkbox = form.querySelector('.js-feedback__checkbox');

	if (
		checkbox &&
		form.querySelector('input[type="checkbox"]').hasAttribute('required') &&
		!form.querySelector('input[type="checkbox"]').checked
	) {
		valid = false;
		agreeCheckbox.classList.add('feedback__form-agree--error');
	}
}

if (sendFormTrigger) {
	sendFormTrigger.addEventListener('click', function (e) {
		const form = e.target.closest('.js-feedback__form');
		validateForm(e, form);
	});
}

///// слайдер в блоке других новостей /////
const articleNewsBlock = document.querySelector('.tab__article-news');
if (articleNewsBlock) {
	const otherNewsSwiper = new Swiper('.tab-item__list-container--article', {
		slidesPerView: 'auto',

		spaceBetween: 24,

		wrapperClass: 'tab-item__list-wrapper--article',

		slideClass: 'tab-item__list-slide--article',

		navigation: {
			nextEl: '.tab-item__list-next--article',
			prevEl: '.tab-item__list-prev--article',
		},
	});
}
