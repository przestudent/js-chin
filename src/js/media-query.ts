const mediaQueryListener = window.matchMedia('(max-width:970px)');
const columnRight = document.querySelector('.column-right') as Element;
const columnLeft = document.querySelector('.column-left') as Element;
const historyScroll = document.querySelector(
  '.board-history-wrapper'
) as Element;
const gameWrapper = document.querySelector('#game-wrapper') as Element;
const pawnsGreen = document.querySelector('.container-green') as Element;
const pawnsYellow = document.querySelector('.container-yellow') as Element;
const gameInfo = document.querySelector('#game-info') as Element;
const body = document.querySelector('body') as HTMLBodyElement;

let isMobile = false;
mediaQueryListener.addEventListener('change', (e) => {
  if (e.matches) {
    ScreenChangeToMobile();
  } else {
    if (isMobile) {
      isMobile = false;
      historyScroll.classList.remove('wide-history');
      gameInfo.classList.remove('game-info-top-left');
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
  removedHistoryWrapper.classList.add('wide-history');
  removedGameInfo.classList.add('game-info-top-left');
  body.appendChild(removedGameInfo);
  gameWrapper.appendChild(removedHistoryWrapper);
}
