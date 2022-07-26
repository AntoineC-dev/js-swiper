import "./style.css";
import * as scripts from "./scripts";

scripts.initializeSlider.then(() => {
  scripts.initializeNavigation();
  scripts.initializePagination();
  scripts.initializeSwipe();
  scripts.hideLoadingScreen();
});
