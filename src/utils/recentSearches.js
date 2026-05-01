import { RECENT_SEARCHES_KEY } from "../config/weather";

export function loadRecentSearches() {
  try {
    const savedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
    return savedSearches ? JSON.parse(savedSearches) : [];
  } catch {
    return [];
  }
}

export function saveRecentSearches(searches) {
  localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
}
