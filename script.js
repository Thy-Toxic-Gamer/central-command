const backToTop = document.querySelector(".back-to-top");

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const updateFilters = document.querySelectorAll("[data-update-filter]");
const updateCards = document.querySelectorAll("[data-update-project]");

function selectUpdateProject(selectedProject, updateAddress = true) {
  const selectedButton = [...updateFilters].find(
    (button) => button.dataset.updateFilter === selectedProject
  );

  if (!selectedButton) return;

  updateFilters.forEach((filter) => {
    const isActive = filter === selectedButton;
    filter.classList.toggle("active", isActive);
    filter.setAttribute("aria-pressed", String(isActive));
  });

  updateCards.forEach((card) => {
    card.hidden = selectedProject !== "all"
      && card.dataset.updateProject !== selectedProject;
  });

  if (updateAddress) {
    const address = selectedProject === "all"
      ? `${window.location.pathname}${window.location.search}`
      : `#${selectedProject}`;

    window.history.replaceState(null, "", address);
  }
}

updateFilters.forEach((button) => {
  button.addEventListener("click", () => {
    selectUpdateProject(button.dataset.updateFilter);
  });
});

const requestedProject = window.location.hash.slice(1);

if (requestedProject) {
  selectUpdateProject(requestedProject, false);
}
