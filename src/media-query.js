const mediaQueryListener = window.matchMedia("(max-width:970px)");

if (mediaQueryListener.matches) {
  const columnRight = document.querySelector(".column-right");
  const historyScroll = document.querySelector(".board-history-wrapper");
  const boardHistory = columnRight.removeChild(historyScroll);
  boardHistory.classList.add("wide-history");
  const gameWrapper = document.querySelector("#game-wrapper");
  gameWrapper.appendChild(boardHistory);
}

// TODO: ADD DYNAMIC LAYOUT SHIFT, YOU KNOW ;P
