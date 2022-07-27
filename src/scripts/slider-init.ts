import {
  innerSlider,
  slider,
  sliderConfig,
  SLIDER_SPACING,
  slides,
  SWIPER_THRESHOLD_DESKTOP,
  SWIPER_THRESHOLD_MOBILE,
} from "../config";
import { updateSliderPosition } from "../helpers";

export const initializeSlider = new Promise<void>((resolve) => {
  let interval: number;
  const sliderResizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const currentWidth = entry.contentRect.width - SLIDER_SPACING;
      sliderConfig.slideWidth = slides[0].clientWidth;
      let nbPerSlide = Math.round(currentWidth / sliderConfig.slideWidth);
      sliderConfig.nbPerSlide = nbPerSlide;
      sliderConfig.nbOfSlides = Math.ceil(slides.length / nbPerSlide);
      sliderConfig.lastIndex = slides.length - nbPerSlide;
      sliderConfig.maxOffsetLeft = Math.abs(sliderConfig.slideWidth * sliderConfig.lastIndex) * -1;
      sliderConfig.currentIndex = 0;
      updateSliderPosition();
      slider.dispatchEvent(new Event("sliderResize"));
    }
  });

  sliderResizeObserver.observe(slider);
  innerSlider.addEventListener("transitionend", () => (sliderConfig.isMoving = false));

  // Update swiper threshold on window resize
  window.addEventListener("resize", () => {
    sliderConfig.swiperThreshold = window.innerWidth < 768 ? SWIPER_THRESHOLD_MOBILE : SWIPER_THRESHOLD_DESKTOP;
  });

  function finish() {
    clearInterval(interval);
    resolve();
  }

  (function initialize() {
    interval = setInterval(() => {
      if (sliderConfig.lastIndex !== 0) finish();
    });
  })();
});
