/** Theme selection, persisted to localStorage and applied as data-theme. */

const STORAGE_KEY = "portfolio-theme";
const root = document.documentElement;

export const getTheme = (): "light" | "dark" => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const setTheme = (theme: "light" | "dark") => {
  root.dataset.theme = theme;
  localStorage.setItem(STORAGE_KEY, theme);
  syncToggle(theme);
};

const syncToggle = (theme: "light" | "dark") => {
  const toggle = document.querySelector<HTMLButtonElement>(".theme-toggle");
  if (!toggle) return;
  const isDark = theme === "dark";
  toggle.setAttribute("aria-pressed", String(isDark));
  toggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
};

export const initTheme = () => {
  setTheme(getTheme());

  document
    .querySelector(".theme-toggle")
    ?.addEventListener("click", () =>
      setTheme(root.dataset.theme === "dark" ? "light" : "dark"),
    );
};
