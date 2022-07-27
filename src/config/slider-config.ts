// Elements
export const slider = document.querySelector("[data-slider]") as Element;
export const innerSlider = document.querySelector("[data-inner-slider]") as Element;
export const sliderPagination = document.querySelector("[data-slider-pagination]") as Element;

// NodeListOf<Element>
export const slides = document.querySelectorAll("[data-slide]");
export const sliderBtns = document.querySelectorAll("[data-slider-btn]");

// Const
export const SLIDER_SPACING = 16;
export const PAGINATION_ACTIVE_CLASS = "pagination-active";
export const PAGINATION_ACTIVE_COLOR = "bg-zinc-700";
export const PAGINATION_DEFAULT_COLOR = "bg-zinc-200";
export const SWIPER_THRESHOLD_MOBILE = 0.2;
export const SWIPER_THRESHOLD_DESKTOP = 0.4;

// Config
export type SliderConfigType = {
  currentIndex: number;
  isMoving: boolean;
  lastIndex: number;
  nbOfSlides: number;
  nbPerSlide: number;
  slideWidth: number;
  offsetLeft: number;
  maxOffsetLeft: number;
  swiperThreshold: number;
};

export let sliderConfig: SliderConfigType = {
  currentIndex: 0,
  isMoving: false,
  lastIndex: 0,
  nbOfSlides: 0,
  nbPerSlide: 0,
  slideWidth: slides[0].clientWidth,
  offsetLeft: 0,
  maxOffsetLeft: 0,
  swiperThreshold: window.innerWidth < 768 ? SWIPER_THRESHOLD_MOBILE : SWIPER_THRESHOLD_DESKTOP,
};
