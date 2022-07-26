import { slider, sliderConfig, sliderBtns } from "../config";
import { getNewIndex, updateSliderPosition } from "../helpers";

export function initializeNavigation() {
  // Functions
  function handleSliderBtnClick(e: Event) {
    if (sliderConfig.isMoving) return;
    sliderConfig.isMoving = true;
    const { id } = e.currentTarget as Element;
    sliderConfig.currentIndex =
      id === "prev-slide-btn" ? getNewIndex({ direction: "backward" }) : getNewIndex({ direction: "forward" });
    slider.dispatchEvent(new Event("sliderMove"));
  }

  // Listeners
  sliderBtns.forEach((btn) => btn.addEventListener("click", handleSliderBtnClick));

  slider.addEventListener("sliderMove", updateSliderPosition);
}
