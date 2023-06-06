import {
  SquareInsides,
  ColorWinLane,
  AppendBoardHistory,
  TurnOnDice,
  ClearBoardHistory,
} from "./initialiser";
const colors: possibleColors[] = ["red", "blue", "green", "yellow"];

const roadToWin = 39;

const colorOrder: {
  red: "blue";
  blue: "green";
  green: "yellow";
  yellow: "red";
} = {
  red: "blue",
  blue: "green",
  green: "yellow",
  yellow: "red",
};
const initDiceThrow = 6;
let diceThrow = initDiceThrow;
const initColor = "blue";
let playerColor: possibleColors = initColor;

// #region

const playableSquares = Array.from(
  document.querySelectorAll<HTMLElement>(".square[data-index]")
).sort((a, b) => {
  return (
    parseInt(a.dataset.index as string) - parseInt(b.dataset.index as string)
  );
});

const playerColorShow = document.querySelector(".player") as Element;
const colorWinLane = ColorWinLane();

const colorEnd: { [color in possibleColors]: string } = {
  red: (document.querySelector<HTMLElement>("[data-end=red]") as HTMLElement)
    .dataset.index as string,
  blue: (document.querySelector<HTMLElement>("[data-end=blue]") as HTMLElement)
    .dataset.index as string,
  yellow: (
    document.querySelector<HTMLElement>("[data-end=yellow]") as HTMLElement
  ).dataset.index as string,
  green: (
    document.querySelector<HTMLElement>("[data-end=green]") as HTMLElement
  ).dataset.index as string,
};
const colorStart: { [color in possibleColors]: string } = {
  red: (document.querySelector<HTMLElement>(".red-light") as HTMLElement)
    .dataset.index as string,
  blue: (document.querySelector<HTMLElement>(".blue-light") as HTMLElement)
    .dataset.index as string,
  yellow: (document.querySelector<HTMLElement>(".yellow-light") as HTMLElement)
    .dataset.index as string,
  green: (document.querySelector<HTMLElement>(".green-light") as HTMLElement)
    .dataset.index as string,
};
const colorPawnsSpawn: { [color in possibleColors]: HTMLElement } = {
  red: document.querySelector("#pawns-red") as HTMLElement,
  blue: document.querySelector("#pawns-blue") as HTMLElement,
  yellow: document.querySelector("#pawns-yellow") as HTMLElement,
  green: document.querySelector("#pawns-green") as HTMLElement,
};
const colorFinishedPawns = {
  red: document.querySelector(".finished-pawns-red") as HTMLElement,
  green: document.querySelector(".finished-pawns-green") as HTMLElement,
  blue: document.querySelector(".finished-pawns-blue") as HTMLElement,
  yellow: document.querySelector(".finished-pawns-yellow") as HTMLElement,
};
const placePawn = document.querySelector(".place-pawn") as HTMLElement;
const placeSkip = document.querySelector(".place-skip");
const gameInfo = document.querySelector("#game-info") as HTMLElement;

(
  document.querySelector<HTMLButtonElement>(".close-modal") as HTMLButtonElement
).addEventListener("click", CloseModal);
function CloseModal() {
  (document.querySelector(".win-screen") as HTMLElement).classList.add(
    "display-none"
  );
}

const buttonRestart = document.querySelector(
  ".button-restart"
) as HTMLButtonElement;
buttonRestart.addEventListener("click", KillAllPawns);

const dice = document.querySelector<HTMLButtonElement>(
  ".dice"
) as HTMLButtonElement;
const diceText = document.querySelector<HTMLElement>(
  ".dice-before-text"
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
    diceText.innerText = "Ready";
  } else {
    diceText.innerText = "Not Ready";
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
    console.log("WIN");
    dice.removeEventListener("click", DiceClick);
    document.querySelector(".win-screen")?.classList.remove("display-none");
    buttonRestart.focus();
    diceReady = false;
    pickPawn = false;
  }
}
function PawnHandler(color_: possibleColors) {
  return function HOHandler(this: HTMLElement, e: Event) {
    // * Check if we can move the pawn
    if (playerColor == color_ && pickPawn) {
      const dataSetIndex = (this.parentElement as HTMLElement).dataset[
        `win${color_}`
      ];
      // * Check if we are on the lane and if we win
      //playerColor = colorOrder[color_];
      if (dataSetIndex !== undefined) {
        if (this.parentElement) {
          const removedPawn = this.parentElement.removeChild(this);
          if (parseInt(dataSetIndex) + diceThrow > 3) {
            this.removeEventListener("click", HOHandler);
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
        console.log("lane");
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
    const parentSquare = pawnElement.parentElement as Element;
    const steps =
      (currIdx - parseInt(colorEnd[color]) + diceThrow - 1) %
      playableSquares.length;
    if (steps > 4) {
      colorFinishedPawns[color].appendChild(
        RemoveChildFromAnElement(parentSquare)
      );
    } else {
      colorWinLane[color][steps].appendChild(
        RemoveChildFromAnElement(parentSquare)
      );
    }
  }
  // ! we need to kill pawns
  if (pawnElement.parentElement) {
    const movedPawn = RemoveChildFromAnElement(pawnElement.parentElement);
    playableSquares[nextIdx].appendChild(movedPawn);
    CheckAndKillEnemyPawns(nextIdx, color);
  } else {
    console.log("no parent");
  }
}
// TODO: FIX IT SO WE HAVE A NICE FUNCTION THAT CHECKS FOR THE PARENT
function SwitchToLane(currIdx: number, nextIdx: number, color: possibleColors) {
  // * TODO: make it pretty maybe
  if (color === "blue") {
    let blueTempEnd = [36, 37, 38, 39, 0, 1];
    if (nextIdx > 1 && blueTempEnd.includes(currIdx)) {
      return true;
    } else {
      return false;
    }
  }
  if (
    nextIdx > parseInt(colorEnd[color]) &&
    currIdx < parseInt(colorEnd[color])
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
      removedPawnFromSpawn.addEventListener("click", PawnHandler(color));
      playableSquares[startIndex].appendChild(removedPawnFromSpawn);
      CheckAndKillEnemyPawns(startIndex, color);
      TogglePawnAndDice();
    } else {
      console.log("you gavbe to throw 6 to move");
    }
  };
}

for (const color of colors) {
  const colorSpawn: HTMLElement = colorPawnsSpawn[color];
  colorSpawn.addEventListener("click", SpawnCallback(colorSpawn, color));
}
function CheckAndKillEnemyPawns(idx: number, color: possibleColors) {
  if (playableSquares[idx].firstElementChild) {
    const nextIdxSquare = playableSquares[idx];
    const enemyPawn = nextIdxSquare.firstElementChild;
    console.log(enemyPawn);
    if (enemyPawn instanceof HTMLElement && enemyPawn) {
      if (
        enemyPawn.dataset.pawn !== undefined &&
        enemyPawn.dataset.pawn !== color
      ) {
        console.log("enemy");
        const enemyPawnColor = enemyPawn.dataset.pawn as possibleColors;
        Array.from(nextIdxSquare.children).forEach((child) => {
          child.removeEventListener("click", PawnHandler(enemyPawnColor));
        });
        colorPawnsSpawn[enemyPawnColor].append(...nextIdxSquare.children);
      }
    } else {
      console.log("its our pawn, do nofin");
    }
  } else {
    console.log("no children, we can proceed");
  }
}
// ! TODO FIX IT SO YOU CANT CLICK THE DICE

dice.addEventListener("click", DiceClick);
function DiceClick(this: HTMLButtonElement, e: Event) {
  if (diceReady) {
    //diceThrow = Math.floor(Math.random() * 6) + 1; //! PLACE FOR THE CHANGE OF DICE THROW
    // diceThrow = Math.floor(Math.random() * 6) + 1;
    diceThrow = 6;
    this.style.setProperty("--color-show", playerColor);
    AppendBoardHistory(playerColor, diceThrow);
    TurnOnDice(diceThrow);
    TogglePawnAndDice();
    if (
      diceThrow !== 6 &&
      colorPawnsSpawn[playerColor].childElementCount +
        colorFinishedPawns[playerColor].childElementCount ===
        4
    ) {
      gameInfo.classList.remove("game-info-out");
      gameInfo.classList.add("game-info-in");
      placePawn.focus();
      placePawn.addEventListener("click", PassYourTurn);
    }
  } else {
    console.log("YOU ARE NOT SUPPOSED TO THROW THE DICE YET");
  }
  this.focus();
}
function PassYourTurn(this: Element) {
  this.removeEventListener("click", PassYourTurn);
  gameInfo.classList.add("game-info-out");
  gameInfo.classList.remove("game-info-in");
  TogglePawnAndDice();
  dice.focus();
  //playerColor = colorOrder[playerColor];
}
function RemoveChildFromAnElement(parent: Element) {
  return parent.removeChild(parent.lastElementChild as Element);
}

document.addEventListener("keydown", (e) => console.log(e.target));

function KillAllPawns() {
  for (const color of colors) {
    const spawnForColor = colorPawnsSpawn[color];
    const pawnOfColor = Array.from(
      document.querySelectorAll(`[data-pawn=${color}]`)
    );
    pawnOfColor.forEach((e) => {
      e.parentElement?.removeChild(e);
      e.removeEventListener("click", PawnHandler(color));
      console.log(e);
    });
    spawnForColor.append(...pawnOfColor);
  }
  CloseModal();
  ClearBoardHistory();
  playerColor = initColor;
  diceThrow = initDiceThrow;
  diceReady = true;
  pickPawn = false;
  diceText.innerText = "Ready";
  dice.addEventListener("click", DiceClick);
}
