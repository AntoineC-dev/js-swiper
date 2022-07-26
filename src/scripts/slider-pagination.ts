import {
  PAGINATION_ACTIVE_CLASS,
  PAGINATION_ACTIVE_COLOR,
  PAGINATION_DEFAULT_COLOR,
  slider,
  sliderConfig,
  sliderPagination,
} from "../config";
import {
  getCurrentPagination,
  getNewIndex,
  getNewPagination,
  updatePaginationClasses,
  updateSliderPosition,
} from "../helpers";

export function initializePagination() {
  function handlePaginationClick(e: Event) {
    if (sliderConfig.isMoving) return;
    const { currentPagination, currentPaginationId } = getCurrentPagination();
    const newPagination = e.target as Element;
    const newPaginationId = parseInt(newPagination.getAttribute("data-pagination-id")!);
    if (currentPaginationId === newPaginationId) return;
    sliderConfig.isMoving = true;
    const step = newPaginationId - currentPaginationId;
    sliderConfig.currentIndex =
      step > 0
        ? getNewIndex({ direction: "forward", step })
        : getNewIndex({ direction: "backward", step: Math.abs(step) });
    updateSliderPosition();
    updatePaginationClasses({ currentPagination, newPagination });
  }

  function createPagination() {
    sliderPagination.childElementCount !== 0 && sliderPagination.replaceChildren();
    for (let index = 0; index <= sliderConfig.lastIndex; index++) {
      const dot = document.createElement("div");
      const color = index === sliderConfig.currentIndex ? PAGINATION_ACTIVE_COLOR : PAGINATION_DEFAULT_COLOR;
      dot.classList.add("w-2", "h-2", "xl:w-3", "xl:h-3", "rounded-full", "cursor-pointer", color);
      dot.dataset.paginationId = `${index}`;
      index === sliderConfig.currentIndex && dot.classList.add(PAGINATION_ACTIVE_CLASS);
      dot.addEventListener("click", handlePaginationClick);
      sliderPagination.appendChild(dot);
    }
  }

  // Initialize pagination
  createPagination();

  // Listen to slider resize to update pagination
  slider.addEventListener("sliderResize", createPagination);

  slider.addEventListener("sliderMove", () => {
    const { currentPagination, currentPaginationId } = getCurrentPagination();
    const { newPagination } = getNewPagination({ currentPaginationId });
    updatePaginationClasses({ currentPagination, newPagination });
  });
}
