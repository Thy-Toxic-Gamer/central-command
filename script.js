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

const liveStatusApi = "https://hdwhhyrlmktiynyujozk.supabase.co/functions/v1/poll-center-api/api/live/status";
const platformCards = document.querySelectorAll("[data-live-platform]");

async function refreshLivePlatforms() {
  if (!platformCards.length) return;
  try {
    const response = await fetch(liveStatusApi, { cache: "no-store" });
    if (!response.ok) throw new Error("Live status unavailable");
    const payload = await response.json();
    platformCards.forEach((card) => {
      const live = Boolean(payload?.platforms?.[card.dataset.livePlatform]?.live);
      card.classList.toggle("is-live-now", live);
      const label = card.querySelector(".platform-status em");
      if (label) label.textContent = live ? "Live Now" : "Offline";
    });
  } catch {
    platformCards.forEach((card) => {
      card.classList.remove("is-live-now");
      const label = card.querySelector(".platform-status em");
      if (label) label.textContent = "Status unavailable";
    });
  }
}

refreshLivePlatforms();
window.setInterval(refreshLivePlatforms, 15000);
