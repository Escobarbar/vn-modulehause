export const focusWineggSearch = () => {
  const el = document.getElementById("winegg-search");
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  if (el instanceof HTMLInputElement) {
    el.focus();
  }
};
