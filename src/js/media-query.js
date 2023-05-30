const mediaQueryListener = window.matchMedia("(max-width:970px)");
const columnRight = document.querySelector(".column-right");
const historyScroll = document.querySelector(".board-history-wrapper");
const gameWrapper = document.querySelector("#game-wrapper");
const pawnsGreen = document.querySelector(".container-green");

mediaQueryListener.addEventListener("change", (e) => {
  console.log("yes");
  if (e.matches) {
    const boardHistory = columnRight.removeChild(historyScroll);
    boardHistory.classList.add("wide-history");
    gameWrapper.appendChild(boardHistory);
  } else {
    if (historyScroll.classList.contains("wide-history")) {
      historyScroll.classList.remove("wide-history");
      const removedHistoryWrapper = gameWrapper.removeChild(historyScroll);
      columnRight.insertBefore(removedHistoryWrapper, pawnsGreen);
    }
  }
});

if (mediaQueryListener.matches) {
  console.log("start");
  const boardHistory = columnRight.removeChild(historyScroll);
  boardHistory.classList.add("wide-history");
  gameWrapper.appendChild(boardHistory);
}

// TODO: ADD DYNAMIC LAYOUT SHIFT, YOU KNOW ;P
