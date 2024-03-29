import {
  ColorWinLane,
  AppendBoardHistory,
  TurnOnDice,
  ClearBoardHistory,
  RemoveMyListeners,
  RemovePawnListeners,
  RemoveChildFromAnElement,
} from './initialiser';
import StartConfetti from './confetti';
StartConfetti();

document.querySelector<HTMLDialogElement>('#tutorial')?.showModal();
//Set up

const colors: possibleColors[] = ['red', 'blue', 'green', 'yellow'];

const colorOrder: {
  red: 'blue';
  blue: 'green';
  green: 'yellow';
  yellow: 'red';
} = {
  red: 'blue',
  blue: 'green',
  green: 'yellow',
  yellow: 'red',
};
const initDiceThrow = 6;
let diceThrow = initDiceThrow;
const initColor = 'red';
let playerColor: possibleColors = initColor;

// #region

const playableSquares = Array.from(
  document.querySelectorAll<HTMLDivElement>('.square[data-index]')
).sort((a, b) => {
  return (
    parseInt(a.dataset.index as string) - parseInt(b.dataset.index as string)
  );
});

const playerColorShow = document.querySelector('.player') as HTMLDivElement;
playerColorShow.style.setProperty('--player-color', playerColor);

const colorWinLane = ColorWinLane();

const colorEnd: { [color in possibleColors]: string } = {
  red: (document.querySelector('[data-end=red]') as HTMLDivElement).dataset
    .index as string,
  blue: (document.querySelector('[data-end=blue]') as HTMLDivElement).dataset
    .index as string,
  yellow: (document.querySelector('[data-end=yellow]') as HTMLDivElement)
    .dataset.index as string,
  green: (document.querySelector('[data-end=green]') as HTMLDivElement).dataset
    .index as string,
};
const colorStart: { [color in possibleColors]: string } = {
  red: (document.querySelector('.red-light') as HTMLDivElement).dataset
    .index as string,
  blue: (document.querySelector('.blue-light') as HTMLDivElement).dataset
    .index as string,
  yellow: (document.querySelector('.yellow-light') as HTMLDivElement).dataset
    .index as string,
  green: (document.querySelector('.green-light') as HTMLDivElement).dataset
    .index as string,
};
const colorPawnsSpawn: { [color in possibleColors]: HTMLElement } = {
  red: document.querySelector('#pawns-red') as HTMLElement,
  blue: document.querySelector('#pawns-blue') as HTMLElement,
  yellow: document.querySelector('#pawns-yellow') as HTMLElement,
  green: document.querySelector('#pawns-green') as HTMLElement,
};
const colorFinishedPawns = {
  red: document.querySelector('.finished-pawns-red') as HTMLDivElement,
  green: document.querySelector('.finished-pawns-green') as HTMLDivElement,
  blue: document.querySelector('.finished-pawns-blue') as HTMLDivElement,
  yellow: document.querySelector('.finished-pawns-yellow') as HTMLDivElement,
};
const placePawn = document.querySelector('.place-pawn') as HTMLButtonElement;
const gameInfo = document.querySelector('#game-info') as HTMLDivElement;

const buttonRestart = document.querySelector(
  '.button-restart'
) as HTMLButtonElement;
buttonRestart.addEventListener('click', KillAllPawns);

const dice = document.querySelector('.dice') as HTMLButtonElement;
const diceText = document.querySelector('.dice-before-text') as HTMLDivElement;

//Adding specific event listeneres for the starting pawn area.
for (const color of colors) {
  const colorSpawn: HTMLElement = colorPawnsSpawn[color];
  colorSpawn.addEventListener('click', SpawnCallback(colorSpawn, color));
}

let diceReady = true;
let pickPawn = false;
// #endregion

//Switching off the state.
function TogglePawnAndDice() {
  diceReady = !diceReady;
  pickPawn = !pickPawn;
  if (diceReady) {
    diceText.innerText = 'Ready';
  } else {
    diceText.innerText = 'Not Ready';
  }
  if (diceReady) {
    dice.focus();
  }
}
function NextIdx(currIdx: number) {
  return (currIdx + diceThrow) % playableSquares.length;
}
function CheckAndHandleWin(color: possibleColors) {
  if (colorFinishedPawns[color]?.childElementCount === 4) {
    diceText.innerText = 'Not Ready';
    dice.removeEventListener('click', DiceClick);
    document.querySelector<HTMLDialogElement>('#win-modal')?.showModal();
    StartConfetti();
    RemovePawnListeners(colors);
    buttonRestart.focus();
    diceReady = false;
    pickPawn = false;
  }
}

//HOF for each individual color of pawns.
function PawnHandler(color_: possibleColors) {
  return function HOHandler(this: HTMLElement) {
    // * Check if we can move the pawn
    if (playerColor == color_ && pickPawn) {
      const dataSetIndex = (this.parentElement as HTMLElement).dataset[
        `win${color_}`
      ];
      // * Check if we are on the lane and if we win
      if (diceThrow !== 6) {
        playerColor = colorOrder[color_];
      }
      if (dataSetIndex !== undefined) {
        if (this.parentElement) {
          const removedPawn = this.parentElement.removeChild(this);
          if (parseInt(dataSetIndex) + diceThrow > 3) {
            this.removeEventListener('click', HOHandler);
            colorFinishedPawns[color_]?.appendChild(removedPawn);
            CheckAndHandleWin(color_);
          } else {
            colorWinLane[color_][
              parseInt(dataSetIndex) + diceThrow
            ].appendChild(removedPawn);
          }
        }

        TogglePawnAndDice();
        return;
      }
      // * We are not on lane
      const idx = parseInt(
        (this.parentElement as HTMLElement).dataset.index as string
      );
      const nextIdx = NextIdx(idx);
      if (SwitchToLane(idx, nextIdx, color_)) {
        //we switch to lane
        BoardCleanUp(idx, idx, color_, this, true);
        TogglePawnAndDice();
        return;
      }
      // * we are on the board
      if (BoardCleanUp(idx, nextIdx, color_, this)) {
        return;
      } else {
        TogglePawnAndDice();
      }
    } else if (pickPawn) {
      document.querySelector<HTMLDialogElement>('#wrong-color')?.showModal();
    }
  };
}

//This function checks if we win/switch to lane and also updates the board
function BoardCleanUp(
  currIdx: number,
  nextIdx = currIdx,
  color: possibleColors,
  pawnElement: Element,
  winLane = false
) {
  if (winLane) {
    const parentSquare = pawnElement.parentElement as Element;
    const steps =
      (currIdx - parseInt(colorEnd[color]) + diceThrow - 1) %
      playableSquares.length;
    if (steps >= 4) {
      colorFinishedPawns[color].appendChild(
        RemoveChildFromAnElement(parentSquare)
      );
      CheckAndHandleWin(color);
      return true;
    } else {
      colorWinLane[color][steps].appendChild(
        RemoveChildFromAnElement(parentSquare)
      );
    }
    return;
  }

  if (pawnElement.parentElement) {
    const movedPawn = RemoveChildFromAnElement(pawnElement.parentElement);
    CheckAndKillEnemyPawns(nextIdx, color);
    playableSquares[nextIdx].appendChild(movedPawn);
  } //WE OMIT ELSE, THERE IS ALWAYS A PARENT
}
function SwitchToLane(currIdx: number, nextIdx: number, color: possibleColors) {
  // * TODO: make it pretty maybe? HYUH WDYM
  if (color === 'blue') {
    let blueTempEnd = [36, 37, 38, 39, 0, 1];
    if (nextIdx > 1 && nextIdx < 8 && blueTempEnd.includes(currIdx)) {
      return true;
    } else {
      return false;
    }
  }
  if (
    nextIdx > parseInt(colorEnd[color]) &&
    currIdx <= parseInt(colorEnd[color])
  ) {
    return true;
  } else {
    return false;
  }
}

//HOF for each spawn starting area
function SpawnCallback(colorSpawn: HTMLElement, color: possibleColors) {
  return function () {
    console.log('Spawn clicked!');
    if (
      pickPawn &&
      diceThrow === 6 &&
      colorSpawn.childElementCount > 0 &&
      playerColor == color
    ) {
      const removedPawnFromSpawn = colorSpawn.removeChild(
        colorSpawn.lastElementChild as Element
      );
      const startIndex: number = parseInt(colorStart[playerColor]);
      removedPawnFromSpawn.addEventListener('click', PawnHandler(color));
      CheckAndKillEnemyPawns(startIndex, color);
      playableSquares[startIndex].appendChild(removedPawnFromSpawn);
      TogglePawnAndDice();
    } else if (pickPawn && playerColor !== color) {
      document.querySelector<HTMLDialogElement>('#wrong-color')?.showModal();
    }
  };
}

function CheckAndKillEnemyPawns(idx: number, color: possibleColors) {
  if (playableSquares[idx].firstElementChild) {
    const nextIdxSquare = playableSquares[idx];
    const enemyPawn = nextIdxSquare.firstElementChild;
    if (enemyPawn instanceof HTMLElement && enemyPawn) {
      if (
        enemyPawn.dataset.pawn !== undefined &&
        enemyPawn.dataset.pawn !== color
      ) {
        // we encounter an enemy
        const enemyPawnColor = enemyPawn.dataset.pawn as possibleColors;
        const killedPawns = Array.from(nextIdxSquare.children).map((child) => {
          // We make sure to delete it's event listeneres by cloning it and replacing it
          nextIdxSquare.replaceChild(child.cloneNode(true), child);
          return RemoveChildFromAnElement(nextIdxSquare);
        });
        colorPawnsSpawn[enemyPawnColor].append(...killedPawns);
      }
    } else {
      console.log('It is our pawn, we do nothing.');
    }
  } else {
    console.log('No children. we continue as normal.');
  }
}

dice.addEventListener('click', DiceClick);
function DiceClick(this: HTMLButtonElement) {
  if (diceReady) {
    diceThrow = Math.floor(Math.random() * 6) + 1;
    if (diceThrow !== 6) {
      this.style.setProperty('--color-show', colorOrder[playerColor]);
      playerColorShow.innerText = playerColor;
      playerColorShow.style.setProperty('--player-color', playerColor);
    }
    AppendBoardHistory(playerColor, diceThrow);
    TurnOnDice(diceThrow);
    TogglePawnAndDice();
    if (
      diceThrow !== 6 &&
      colorPawnsSpawn[playerColor].childElementCount +
        colorFinishedPawns[playerColor].childElementCount ===
        4
    ) {
      gameInfo.classList.remove('game-info-out');
      placePawn.style.setProperty('--player-top-pass', playerColor);
      gameInfo.classList.add('game-info-in');
      placePawn.focus();
      placePawn.addEventListener('click', PassYourTurn);
    }
  } else {
    document.querySelector<HTMLDialogElement>('#dice-not-ready')?.showModal();
  }
  this.focus();
}
function PassYourTurn(this: Element) {
  this.removeEventListener('click', PassYourTurn);
  gameInfo.classList.add('game-info-out');
  gameInfo.classList.remove('game-info-in');
  TogglePawnAndDice();
  playerColor = colorOrder[playerColor];
  //this.style.setProperty('--color-show', colorOrder[playerColor]);
  playerColorShow.innerText = playerColor;
  playerColorShow.style.setProperty('--player-color', playerColor);
}

function KillAllPawns() {
  for (const color of colors) {
    const spawnForColor = colorPawnsSpawn[color];
    const pawnOfColor = Array.from(
      document.querySelectorAll(`[data-pawn=${color}]`)
    );
    pawnOfColor.forEach((e) => {
      e.parentElement?.removeChild(e);
      RemoveMyListeners(e);
    });
    spawnForColor.append(...pawnOfColor);
  }
  ClearBoardHistory();
  playerColor = initColor;
  diceThrow = initDiceThrow;
  diceReady = true;
  pickPawn = false;
  diceText.innerText = 'Ready';
  dice.addEventListener('click', DiceClick);
}
