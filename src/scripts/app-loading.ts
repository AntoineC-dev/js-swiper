import { loadingScreen } from "../config";

export function hideLoadingScreen() {
  setTimeout(() => loadingScreen.classList.add("hidden"), 1000);
}
