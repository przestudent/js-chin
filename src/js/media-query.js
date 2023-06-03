const mediaQueryListener = window.matchMedia("(max-width:970px)");
const columnRight = document.querySelector(".column-right");
const columnLeft = document.querySelector(".column-left");
const historyScroll = document.querySelector(".board-history-wrapper");
const gameWrapper = document.querySelector("#game-wrapper");
const pawnsGreen = document.querySelector(".container-green");
const pawnsYellow = document.querySelector(".container-yellow");
const gameInfo = document.querySelector(".game-info");
const body = document.querySelector("body");

let isMobile = false;
mediaQueryListener.addEventListener("change", (e) => {
  console.log("yes");
  if (e.matches) {
    ScreenChangeToMobile();
  } else {
    if (isMobile) {
      isMobile = false;
      historyScroll.classList.remove("wide-history");
      gameInfo.classList.remove("game-info-top-left");
      const removedHistoryWrapper = gameWrapper.removeChild(historyScroll);
      const removedGameInfo = body.removeChild(gameInfo);
      columnLeft.insertBefore(removedGameInfo, pawnsYellow);
      columnRight.insertBefore(removedHistoryWrapper, pawnsGreen);
    }
  }
});

if (mediaQueryListener.matches) {
  ScreenChangeToMobile();
}
function ScreenChangeToMobile() {
  isMobile = true;
  const removedGameInfo = columnLeft.removeChild(gameInfo);
  const removedHistoryWrapper = columnRight.removeChild(historyScroll);
  removedHistoryWrapper.classList.add("wide-history");
  removedGameInfo.classList.add("game-info-top-left");
  body.appendChild(removedGameInfo);
  gameWrapper.appendChild(removedHistoryWrapper);
}

// TODO: ADD DYNAMIC LAYOUT SHIFT, YOU KNOW ;P
