import { innerSlider, slider, sliderConfig, SLIDER_SPACING, slides } from "../config";
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
