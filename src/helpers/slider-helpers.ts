import {
  innerSlider,
  PAGINATION_ACTIVE_CLASS,
  PAGINATION_ACTIVE_COLOR,
  PAGINATION_DEFAULT_COLOR,
  sliderBtns,
  sliderConfig,
} from "../config";

// ---- NAVIGATION ---- //

function removeDisabledAttributes(elements: NodeListOf<Element> | Element[]) {
  elements.forEach((element) => element.removeAttribute("disabled"));
}

function addDisabledAttribute(element: Element) {
  element.setAttribute("disabled", "true");
}

// ---- GENERAL ---- //

export function updateSliderPosition() {
  const { currentIndex, lastIndex, slideWidth } = sliderConfig;
  // Update disabled attributes
  removeDisabledAttributes(sliderBtns);
  currentIndex === 0 && addDisabledAttribute(sliderBtns[0]); // Previous
  currentIndex === lastIndex && addDisabledAttribute(sliderBtns[1]); // Next
  // Update offsetLeft for swiper
  sliderConfig.offsetLeft = currentIndex * slideWidth * -1;
  // Move slider
  (innerSlider as HTMLElement).style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

export type GetNewIndexOptions = {
  direction: "forward" | "backward";
  from?: number; // Default: sliderConfig.currentIndex
  step?: number; // Default: sliderConfig.nbPerSlide
};

export function getNewIndex(options: GetNewIndexOptions): number {
  let newIndex: number;
  const { currentIndex, lastIndex, nbPerSlide } = sliderConfig;
  const step = options.step ?? nbPerSlide;
  const from = options.from ?? currentIndex;
  if (options.direction === "backward") {
    newIndex = from - step < 0 ? 0 : from - step;
  } else {
    newIndex = from + step > lastIndex ? lastIndex : from + step;
  }
  return newIndex;
}

// ---- PAGINATION ---- //

export function getCurrentPagination() {
  const currentPagination = document.getElementsByClassName(PAGINATION_ACTIVE_CLASS)[0];
  const currentPaginationId = parseInt((currentPagination as HTMLDivElement).dataset.paginationId!);
  return { currentPagination, currentPaginationId };
}

type UpdatePaginationClassesType = {
  currentPagination: Element;
  newPagination: Element;
};

export function updatePaginationClasses({ currentPagination, newPagination }: UpdatePaginationClassesType) {
  // Current pagination classes
  currentPagination.classList.remove(PAGINATION_ACTIVE_CLASS);
  currentPagination.classList.replace(PAGINATION_ACTIVE_COLOR, PAGINATION_DEFAULT_COLOR);
  // New pagination classes
  newPagination.classList.replace(PAGINATION_DEFAULT_COLOR, PAGINATION_ACTIVE_COLOR);
  newPagination.classList.add(PAGINATION_ACTIVE_CLASS);
}

type GetNewPaginationType = {
  step?: number;
  currentPaginationId: number;
};

export function getNewPagination({ currentPaginationId, step }: GetNewPaginationType) {
  const { currentIndex } = sliderConfig;
  let newPaginationId: number;
  if (step) {
    newPaginationId =
      currentIndex > currentPaginationId
        ? getNewIndex({ direction: "forward", from: currentPaginationId, step })
        : getNewIndex({ direction: "backward", from: currentPaginationId, step });
  } else {
    newPaginationId =
      currentIndex > currentPaginationId
        ? getNewIndex({ direction: "forward", from: currentPaginationId })
        : getNewIndex({ direction: "backward", from: currentPaginationId });
  }
  const newPagination = document.querySelector(`[data-pagination-id="${newPaginationId}"]`) as Element;
  return { newPagination, newPaginationId };
}

// ---- SWIPE ---- //

export function getCurrentXCoordonate(e: Event) {
  return (e as MouseEvent).pageX ?? (e as TouchEvent).touches[0].pageX;
}
