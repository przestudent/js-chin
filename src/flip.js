console.clear();

const elApp = document.querySelector("#app");
const elFeaturedButton = document.querySelector("#featured-button");

const elSmallPlan = document.querySelector("#small-plan");
const elBigPlan = document.querySelector("#big-plan");

const getRect = (el) => {
  return el.getBoundingClientRect();
};

/**
 * FLIP
 * F = First
 * L = Last
 * I = Invert
 * P = Play
 */
function flip(doSomething, firstEl, getLastEl = () => firstEl) {
  // First
  const firstRect = getRect(firstEl);

  requestAnimationFrame(() => {
    // (something that changes layout)
    doSomething();

    // Last
    let lastEl = getLastEl();
    const lastRect = getRect(lastEl);

    // Invert
    const dx = lastRect.x - firstRect.x;
    const dy = lastRect.y - firstRect.y;
    const dw = lastRect.width / firstRect.width;
    const dh = lastRect.height / firstRect.height;

    // (so CSS knows it's being flipped)
    lastEl.dataset.flipping = true;

    lastEl.style.setProperty("--dx", dx);
    lastEl.style.setProperty("--dy", dy);
    lastEl.style.setProperty("--dw", dw);
    lastEl.style.setProperty("--dh", dh);

    // Play
    requestAnimationFrame(() => {
      delete lastEl.dataset.flipping;
    });
  });
}

elFeaturedButton.addEventListener("click", (e) => {
  e.stopPropagation();
  flip(
    () => {
      elApp.dataset.state = "featured";
    },
    elSmallPlan,
    () => elBigPlan
  );
});

document.body.addEventListener("click", () => {
  if (elApp.dataset.state === "featured") {
    flip(
      () => {
        elApp.dataset.prevState = elApp.dataset.state;
        elApp.dataset.state = "plans";
      },
      elBigPlan,
      () => elSmallPlan
    );
  }
});
