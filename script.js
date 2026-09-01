const backToTop = document.querySelector(".back-to-top");

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const updateFilters = document.querySelectorAll("[data-update-filter]");
const updateCards = document.querySelectorAll("[data-update-project]");

updateFilters.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedProject = button.dataset.updateFilter;

    updateFilters.forEach((filter) => {
      const isActive = filter === button;
      filter.classList.toggle("active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });

    updateCards.forEach((card) => {
      card.hidden = selectedProject !== "all"
        && card.dataset.updateProject !== selectedProject;
    });
  });
});
