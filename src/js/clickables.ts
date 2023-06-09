import {
  SquareInsides,
  ColorWinLane,
  AppendBoardHistory,
  TurnOnDice,
  ClearBoardHistory,
} from './initialiser';

document.querySelector<HTMLDialogElement>('#tutorial')?.showModal();
const colors: possibleColors[] = ['red', 'blue', 'green', 'yellow'];

const roadToWin = 39;

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
const initColor = 'blue';
let playerColor: possibleColors = initColor;

// #region

const playableSquares = Array.from(
  document.querySelectorAll<HTMLElement>('.square[data-index]')
).sort((a, b) => {
  return (
    parseInt(a.dataset.index as string) - parseInt(b.dataset.index as string)
  );
});

const playerColorShow = document.querySelector('.player') as Element;
const colorWinLane = ColorWinLane();

const colorEnd: { [color in possibleColors]: string } = {
  red: (document.querySelector<HTMLElement>('[data-end=red]') as HTMLElement)
    .dataset.index as string,
  blue: (document.querySelector<HTMLElement>('[data-end=blue]') as HTMLElement)
    .dataset.index as string,
  yellow: (
    document.querySelector<HTMLElement>('[data-end=yellow]') as HTMLElement
  ).dataset.index as string,
  green: (
    document.querySelector<HTMLElement>('[data-end=green]') as HTMLElement
  ).dataset.index as string,
};
const colorStart: { [color in possibleColors]: string } = {
  red: (document.querySelector<HTMLElement>('.red-light') as HTMLElement)
    .dataset.index as string,
  blue: (document.querySelector<HTMLElement>('.blue-light') as HTMLElement)
    .dataset.index as string,
  yellow: (document.querySelector<HTMLElement>('.yellow-light') as HTMLElement)
    .dataset.index as string,
  green: (document.querySelector<HTMLElement>('.green-light') as HTMLElement)
    .dataset.index as string,
};
const colorPawnsSpawn: { [color in possibleColors]: HTMLElement } = {
  red: document.querySelector('#pawns-red') as HTMLElement,
  blue: document.querySelector('#pawns-blue') as HTMLElement,
  yellow: document.querySelector('#pawns-yellow') as HTMLElement,
  green: document.querySelector('#pawns-green') as HTMLElement,
};
const colorFinishedPawns = {
  red: document.querySelector('.finished-pawns-red') as HTMLElement,
  green: document.querySelector('.finished-pawns-green') as HTMLElement,
  blue: document.querySelector('.finished-pawns-blue') as HTMLElement,
  yellow: document.querySelector('.finished-pawns-yellow') as HTMLElement,
};
const placePawn = document.querySelector('.place-pawn') as HTMLElement;
const placeSkip = document.querySelector('.place-skip');
const gameInfo = document.querySelector('#game-info') as HTMLElement;

(
  document.querySelector<HTMLButtonElement>('.close-modal') as HTMLButtonElement
).addEventListener('click', CloseModal);
function CloseModal() {
  (document.querySelector('.win-screen') as HTMLElement).classList.add(
    'display-none'
  );
}

const buttonRestart = document.querySelector(
  '.button-restart'
) as HTMLButtonElement;
buttonRestart.addEventListener('click', KillAllPawns);

const dice = document.querySelector<HTMLButtonElement>(
  '.dice'
) as HTMLButtonElement;
const diceText = document.querySelector<HTMLElement>(
  '.dice-before-text'
) as HTMLElement;

let diceReady = true;
let pickPawn = false;
const colorPawn = {
  red: Array.from(document.querySelectorAll(`[data-pawn=red]`)),
  blue: Array.from(document.querySelectorAll(`[data-pawn=blue]`)),
  green: Array.from(document.querySelectorAll(`[data-pawn=green]`)),
  yellow: Array.from(document.querySelectorAll(`[data-pawn=yellow]`)),
};
// #endregion
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
  if (colorFinishedPawns[color]?.childElementCount === 1) {
    console.log('WIN');
    diceText.innerText = 'Not Ready';
    dice.removeEventListener('click', DiceClick);
    const winModal = document.querySelector<HTMLDialogElement>('#win-modal');
    winModal?.showModal();
    buttonRestart.focus();
    diceReady = false;
    pickPawn = false;
  }
}
function PawnHandler(color_: possibleColors) {
  return function HOHandler(this: HTMLElement) {
    // * Check if we can move the pawn
    if (playerColor == color_ && pickPawn) {
      const dataSetIndex = (this.parentElement as HTMLElement).dataset[
        `win${color_}`
      ];
      // * Check if we are on the lane and if we win
      // if (diceThrow !== 6) {
      //   playerColor = colorOrder[color_];
      // }
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
        BoardCleanUp(idx, idx, color_, this, true);
        TogglePawnAndDice();
        return;
      }
      // * we are on the board
      BoardCleanUp(idx, nextIdx, color_, this);
      TogglePawnAndDice();
    }
  };
  // ! TODO: ADD HISTORY APPEND
}
function BoardCleanUp(
  currIdx: number,
  nextIdx = currIdx,
  color: possibleColors,
  pawnElement: Element,
  winLane = false
) {
  if (winLane) {
    console.log('yup we are on boardcleanup for tha pawn');
    const parentSquare = pawnElement.parentElement as Element;
    const steps =
      (currIdx - parseInt(colorEnd[color]) + diceThrow - 1) %
      playableSquares.length;
    if (steps >= 4) {
      console.log('we gp straigth to finished');
      colorFinishedPawns[color].appendChild(
        RemoveChildFromAnElement(parentSquare)
      );
    } else {
      console.log('win lane now');
      console.log(steps);
      console.log(colorWinLane[color]);
      console.log(colorWinLane[color][steps]);
      colorWinLane[color][steps].appendChild(
        RemoveChildFromAnElement(parentSquare)
      );
    }
    return;
  }
  // ! we need to kill pawns
  if (pawnElement.parentElement) {
    const movedPawn = RemoveChildFromAnElement(pawnElement.parentElement);
    CheckAndKillEnemyPawns(nextIdx, color);
    playableSquares[nextIdx].appendChild(movedPawn);
  } else {
    console.log('no parent');
  }
}
// TODO: FIX IT SO WE HAVE A NICE FUNCTION THAT CHECKS FOR THE PARENT
function SwitchToLane(currIdx: number, nextIdx: number, color: possibleColors) {
  // * TODO: make it pretty maybe
  console.log([
    ['currIdx', currIdx],
    ['nextIdx', nextIdx],
  ]);
  if (color === 'blue') {
    let blueTempEnd = [36, 37, 38, 39, 0, 1];
    if (nextIdx > 1 && nextIdx < 8 && blueTempEnd.includes(currIdx)) {
      // ! TODO FIX THIS SHIT, THROWN 2 WHEN ON 37/38 I BELIEVE AND WON, FIX!!!!
      // ? Might work now!
      console.log('TEPTPEPTEPTPEP WE SHOULD SWITCH NOW~~');
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
function SpawnCallback(colorSpawn: HTMLElement, color: possibleColors) {
  return function (e: Event) {
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
    } else {
      console.log([
        ['Spawn', colorSpawn],
        ['diceThrow', diceThrow],
        ['playerColor', playerColor],
        'Unable to pick a pawn.',
      ]);
    }
  };
}

for (const color of colors) {
  const colorSpawn: HTMLElement = colorPawnsSpawn[color];
  colorSpawn.addEventListener('click', SpawnCallback(colorSpawn, color));
}
function CheckAndKillEnemyPawns(idx: number, color: possibleColors) {
  console.log(
    '--logging the next square nnd its child. its supposed to not have any? huh--'
  );
  console.log(playableSquares[idx].firstElementChild);
  console.log(playableSquares[idx]);
  console.log('---');
  if (playableSquares[idx].firstElementChild) {
    const nextIdxSquare = playableSquares[idx];
    const enemyPawn = nextIdxSquare.firstElementChild;
    console.log(['enemyPawn?', enemyPawn]);
    if (enemyPawn instanceof HTMLElement && enemyPawn) {
      if (
        enemyPawn.dataset.pawn !== undefined &&
        enemyPawn.dataset.pawn !== color
      ) {
        console.log('WE ENCOUNTER AN ENEMY, WE KILL THE PAWNS, PLACE OUR OWN.');
        console.log(
          `😒😒😒😒😒Enemy: ${enemyPawn} The Square ${nextIdxSquare}`
        );
        console.log('STACK TRACE');
        console.trace();
        const enemyPawnColor = enemyPawn.dataset.pawn as possibleColors;
        const killedPawns = Array.from(nextIdxSquare.children).map((child) => {
          console.log(child);
          // We make sure to delete it's event listeneres by cloning it and replacing it
          nextIdxSquare.replaceChild(child.cloneNode(true), child);
          return RemoveChildFromAnElement(nextIdxSquare);
        });
        //HERE
        colorPawnsSpawn[enemyPawnColor].append(...killedPawns);
      }
    } else {
      console.log('its our pawn, do nofin');
    }
  } else {
    console.log('no children, we can proceed');
  }
}
// ! TODO FIX IT SO YOU CANT CLICK THE DICE
// ! TODO FIX IT SO WHEN THROWN 6 6 6 YOU THROW UNTIL YOU DONT HIT 6
dice.addEventListener('click', DiceClick);
function DiceClick(this: HTMLButtonElement, e: Event) {
  if (diceReady) {
    diceThrow = Math.floor(Math.random() * 6) + 1; //! PLACE FOR THE CHANGE OF DICE THROW
    // diceThrow = Math.floor(Math.random() * 6) + 1;
    // diceThrow = 6;
    if (diceThrow !== 6) {
      this.style.setProperty('--color-show', colorOrder[playerColor]);
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
    console.log('YOU ARE NOT SUPPOSED TO THROW THE DICE YET');
  }
  this.focus();
}
function PassYourTurn(this: Element) {
  this.removeEventListener('click', PassYourTurn);
  gameInfo.classList.add('game-info-out');
  gameInfo.classList.remove('game-info-in');
  TogglePawnAndDice();
  // dice.focus();
  // playerColor = colorOrder[playerColor];
}
function RemoveChildFromAnElement(parent: Element) {
  return parent.removeChild(parent.firstElementChild as Element);
}

//document.addEventListener('keydown', (e) => console.log(e.target));

function KillAllPawns() {
  for (const color of colors) {
    const spawnForColor = colorPawnsSpawn[color];
    const pawnOfColor = Array.from(
      document.querySelectorAll(`[data-pawn=${color}]`)
    );
    pawnOfColor.forEach((e) => {
      e.parentElement?.removeChild(e);
      e.removeEventListener('click', PawnHandler(color));
    });
    spawnForColor.append(...pawnOfColor);
  }
  CloseModal();
  ClearBoardHistory();
  playerColor = initColor;
  diceThrow = initDiceThrow;
  diceReady = true;
  pickPawn = false;
  diceText.innerText = 'Ready';
  dice.addEventListener('click', DiceClick);
}
