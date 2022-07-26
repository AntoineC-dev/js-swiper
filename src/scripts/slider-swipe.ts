import { innerSlider, sliderConfig, SWIPER_THRESHOLD } from "../config";
import {
  getCurrentPagination,
  getCurrentXCoordonate,
  getNewIndex,
  GetNewIndexOptions,
  getNewPagination,
  updatePaginationClasses,
  updateSliderPosition,
} from "../helpers";

export function initializeSwipe() {
  let isDown = false;
  let startX: number;
  let distX: number;

  function toggleCursorAndTransition(element: Element) {
    if (element.classList.contains("cursor-grab")) {
      element.classList.replace("cursor-grab", "cursor-grabbing");
      element.classList.remove("transition-transform", "duration-150", "lg:duration-300");
    } else {
      element.classList.replace("cursor-grabbing", "cursor-grab");
      element.classList.add("transition-transform", "duration-150", "lg:duration-300");
    }
  }

  const end = (_?: Event) => {
    if (!isDown) return;
    isDown = false;
    toggleCursorAndTransition(innerSlider);
    const tmpStep = distX / sliderConfig.slideWidth;
    const direction: GetNewIndexOptions["direction"] = tmpStep < 0 ? "forward" : "backward";
    const tmpRest = Math.abs(tmpStep - Math.trunc(tmpStep));
    const step = tmpRest > SWIPER_THRESHOLD ? Math.ceil(Math.abs(tmpStep)) : Math.floor(Math.abs(tmpStep));
    sliderConfig.currentIndex = getNewIndex({ direction, step: Math.abs(step) });
    updateSliderPosition();
    if (Math.abs(step) !== 0) {
      const { currentPagination, currentPaginationId } = getCurrentPagination();
      const { newPagination } = getNewPagination({ currentPaginationId, step: Math.abs(step) });
      updatePaginationClasses({ currentPagination, newPagination });
    }
  };

  const start = (e: Event) => {
    isDown = true;
    sliderConfig.isMoving = true;
    toggleCursorAndTransition(innerSlider);
    startX = getCurrentXCoordonate(e);
    distX = 0;
  };

  const move = (e: Event) => {
    if (!isDown) return;
    // e.preventDefault();
    const endX = getCurrentXCoordonate(e);
    const diffX = endX - startX;
    startX = startX + diffX;
    if (sliderConfig.offsetLeft + diffX >= 0 || sliderConfig.offsetLeft + diffX <= sliderConfig.maxOffsetLeft) {
      return end();
    } else {
      sliderConfig.offsetLeft += diffX;
      distX += diffX;
      (innerSlider as HTMLElement).style.transform = `translateX(${sliderConfig.offsetLeft}px)`;
    }
  };

  (() => {
    innerSlider.addEventListener("mousedown", start);
    innerSlider.addEventListener("touchstart", start, { passive: true });

    innerSlider.addEventListener("mousemove", move);
    innerSlider.addEventListener("touchmove", move, { passive: true });

    innerSlider.addEventListener("mouseleave", end);
    innerSlider.addEventListener("mouseup", end);
    innerSlider.addEventListener("touchend", end);
  })();

  document.querySelectorAll("[data-slide] img").forEach((img) => ((img as HTMLImageElement).ondragstart = () => false));
}
