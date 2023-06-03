import { SquareInsides, ColorWinLane } from "./initialiser";
import { TurnOnDice } from "./dices";
const colors: possibleColors[] = ["red", "blue", "green", "yellow"];

let diceThrow = 0;
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
let playerColor = "red";
let moveCount = 0;
// #region
const boardHistory = document.querySelector<HTMLElement>(
  ".board-history-table>tbody"
) as HTMLElement;

const playableSquares = Array.from(
  document.querySelectorAll<HTMLElement>(".square[data-index]")
).sort((a, b) => {
  return (
    parseInt(a.dataset.index as string) - parseInt(b.dataset.index as string)
  );
});
const boardPlayArray = new Array<SquareInsides>(40);
for (let i = 0; i < playableSquares.length; i++) {
  boardPlayArray[i] = new SquareInsides();
}
const colorWin = document.querySelector(".black") as Element;
const playerColorShow = document.querySelector(".player") as Element;
const colorWinLane = ColorWinLane();
const colorLaneArray: { [color in possibleColors]: possibleColors[] } = {
  red: new Array(4).fill(""),
  green: new Array(4).fill(""),
  yellow: new Array(4).fill(""),
  blue: new Array(4).fill(""),
};
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
const placePawn = document.querySelector(".place-pawn");
const placeSkip = document.querySelector(".place-skip");
const placeInfo = document.querySelector(".game-info");

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
function TogglePawnAndDice() {
  diceReady = !diceReady;
  pickPawn = !pickPawn;
  if (diceReady) {
    diceText.innerText = "Ready";
  } else {
    diceText.innerText = "Not Ready";
  }
  if (diceReady) {
    console.log(diceReady);
    dice.focus();
  }
}
function NextIdx(currIdx: number) {
  return (currIdx + diceThrow) % boardPlayArray.length;
}
function CheckAndHandleWin(color: possibleColors) {
  if (colorFinishedPawns[color]?.childElementCount === 4) {
    console.log("WIN");
    document.querySelector(".win-screen")?.classList.remove("display-none");
    diceReady = false;
    pickPawn = false;
  }
}
function PawnHandler(color_: possibleColors) {
  return function HOHandler(this: HTMLElement, e: Event) {
    if (playerColor == color_ && pickPawn) {
      const dataSetIndex = (this.parentElement as HTMLElement).dataset[
        `win${color_}`
      ];
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

      BoardCleanUp(idx, nextIdx, color_, this);
      TogglePawnAndDice();
      console.log(playableSquares);
      console.log(boardPlayArray);
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
    boardPlayArray[currIdx].removePawn(0);
    const steps = currIdx - parseInt(colorEnd[color]) + diceThrow;
    if (steps > 4) {
      if (pawnElement.parentElement) {
        colorWin.appendChild(
          RemoveChildFromAnElement(pawnElement.parentElement)
        );
      } else {
        console.log("SOMETHING HAS GONE HORRIBLY WRONG");
      }
    }

    if (pawnElement.parentElement) {
      colorWinLane[color][steps].appendChild(
        RemoveChildFromAnElement(pawnElement.parentElement)
      );
    } else {
      console.log("SOMETHING HAS GONE HORRIBLY WRONG_2");
    }
    return;
  }
  boardPlayArray[currIdx].removePawn(0);
  boardPlayArray[nextIdx].addPawn(color);
  if (pawnElement.parentElement) {
    playableSquares[nextIdx].appendChild(
      RemoveChildFromAnElement(pawnElement.parentElement)
    );
  } else {
    console.log("no parent");
  }
}
// TODO: FIX IT SO WE HAVE A NICE FUNCTION THAT CHECKS FOR THE PARENT
function SwitchToLane(currIdx: number, nextIdx: number, color: possibleColors) {
  // * TODO: make it pretty maybe
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
        colorSpawn.firstElementChild as Element
      );
      const startIndex: number = parseInt(colorStart[playerColor]);
      removedPawnFromSpawn.addEventListener("click", PawnHandler(color));
      playableSquares[startIndex].appendChild(removedPawnFromSpawn);
      TogglePawnAndDice();
    } else {
      console.log("YOU CANT PICK A PAWN WITHOUT A 6");
    }
  };
}

for (const color of colors) {
  const colorSpawn: HTMLElement = colorPawnsSpawn[color];
  colorSpawn.addEventListener("click", SpawnCallback(colorSpawn, color));
}
dice.addEventListener("click", function (this: HTMLButtonElement, e) {
  if (diceReady) {
    diceThrow = 6; //! PLACE FOR THE CHANGE OF DICE THROW

    AppendBoardHistory();
    TurnOnDice(diceThrow);
    TogglePawnAndDice();
  } else {
    console.log("YOU ARE NOT SUPPOSED TO THROW THE DICE YET");
  }
  this.focus();
});

function RemoveChildFromAnElement(parent: Element) {
  return parent.removeChild(parent.firstElementChild as Element);
}
function AppendBoardHistory() {
  moveCount++;
  const tableRow = document.createElement("tr");
  tableRow.innerHTML = `<td>${moveCount}</td><td style="--player-color:${playerColor}">${playerColor}</td><td>${diceThrow}</td>`;
  if (!boardHistory.children.length) {
    boardHistory.appendChild(tableRow);
  } else {
    boardHistory.insertBefore(tableRow, boardHistory.children[0]);
  }
}
