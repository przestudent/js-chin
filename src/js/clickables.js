const colorOrder = {
  red: "blue",
  blue: "green",
  green: "yellow",
  yellow: "red",
};

let playerColor = "red";
let moveCount = 0;

// #region
class SquareInsides {
  constructor() {
    this.colors = "";
    this.elements = 0;
    this.powerUp = null;
  }
  addPawn(color) {
    this.elements++;
    this.colors = color;
  }
  removePawn(idx) {
    // RemoveChildFromAnElement(playableSquares[idx])
    // * TODO: CONSIDER PUTTING IT HERE
    if (this.elements) {
      this.elements--;
    }
    if (this.elements <= 0) {
      this.colors = "";
    }
  }
}

const boardHistory = document.querySelector(".board-history-table>tbody");
const dices = document.querySelectorAll(".dice-throw>i");
dices[0].style.visibility = "visible";
const board = document.querySelector(".board");
const playableSquares = Array.from(
  document.querySelectorAll(".square[data-index]")
).sort((a, b) => a.dataset.index - b.dataset.index);
const boardPlayArray = [];
for (let i = 0; i < playableSquares.length; i++) {
  boardPlayArray[i] = new SquareInsides();
}

const colorWin = document.querySelector(".black");

const playerColorShow = document.querySelector(".player");

const colorWinLane = {
  red: Array.from(document.querySelectorAll("[data-winred]")).sort(
    (a, b) => a.dataset.winred - b.dataset.winred
  ),
  blue: Array.from(document.querySelectorAll("[data-winblue]")).sort(
    (a, b) => a.dataset.winblue - b.dataset.winblue
  ),
  yellow: Array.from(document.querySelectorAll("[data-winyellow]")).sort(
    (a, b) => a.dataset.winyellow - b.dataset.winyellow
  ),
  green: Array.from(document.querySelectorAll("[data-wingreen]")).sort(
    (a, b) => a.dataset.wingreen - b.dataset.wingreen
  ),
};

const colorLaneArray = {
  red: new Array(4).fill(""),
  green: new Array(4).fill(""),
  yellow: new Array(4).fill(""),
  blue: new Array(4).fill(""),
};
const colorEnd = {
  red: document.querySelector("[data-end=red]").dataset.index,
  blue: document.querySelector("[data-end=blue]").dataset.index,
  yellow: document.querySelector("[data-end=yellow]").dataset.index,
  green: document.querySelector("[data-end=green]").dataset.index,
};
const colorStart = {
  red: document.querySelector(".red-light").dataset.index,
  blue: document.querySelector(".blue-light").dataset.index,
  yellow: document.querySelector(".yellow-light").dataset.index,
  green: document.querySelector(".green-light").dataset.index,
};
const colorPawnsSpawn = {
  red: document.querySelector("#pawns-red"),
  blue: document.querySelector("#pawns-blue"),
  yellow: document.querySelector("#pawns-yellow"),
  green: document.querySelector("#pawns-green"),
};
const colorFinishedPawns = {
  red: document.querySelector(".finished-pawns-red"),
  green: document.querySelector(".finished-pawns-green"),
  blue: document.querySelector(".finished-pawns-blue"),
  yellow: document.querySelector(".finished-pawns-yellow"),
};
const placePawn = document.querySelector(".place-pawn");
const placeSkip = document.querySelector(".place-skip");
const placeInfo = document.querySelector(".game-info");

const dice = document.querySelector(".dice");
const diceText = document.querySelector(".dice-before-text");

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
}
function NextIdx(currIdx) {
  return (parseInt(currIdx) + parseInt(diceThrow)) % boardPlayArray.length;
}

function PawnHandler(color_) {
  return function (e) {
    if (playerColor == color_ && pickPawn) {
      const idx = this.parentElement.dataset.index;
      const nextIdx = NextIdx(idx);
      if (SwitchToLane(idx, nextIdx, color_)) {
        console.log("lane");
        BoardCleanUp(idx, idx, color_, this, true);
        TogglePawnAndDice();
        return;
      }

      //   playableSquares[nextIdx].appendChild(
      //     RemoveChildFromAnElement(this.parentElement)
      //   );
      //   boardPlayArray[idx].removePawn();
      //   boardPlayArray[nextIdx].addPawn(color_);
      BoardCleanUp(idx, nextIdx, color_, this);
      TogglePawnAndDice();
    }
  };
}
function BoardCleanUp(
  currIdx,
  nextIdx = currIdx,
  color,
  pawnElement,
  winLane = false
) {
  if (winLane) {
    boardPlayArray[currIdx].removePawn();
    const steps = currIdx - colorEnd[color] + diceThrow;
    if (steps > 4) {
      colorWin.appendChild(RemoveChildFromAnElement(pawnElement.parentElement));
    }
    colorWinLane[color][steps].appendChild(
      RemoveChildFromAnElement(pawnElement.parentElement)
    );
    return;
  }
  boardPlayArray[currIdx].removePawn();
  boardPlayArray[nextIdx].addPawn(color);
  playableSquares[nextIdx].appendChild(
    RemoveChildFromAnElement(pawnElement.parentElement)
  );
}

function SwitchToLane(currIdx, nextIdx, color) {
  // * TODO: make it pretty maybe
  if (nextIdx > colorEnd[color] && currIdx < colorEnd[color]) {
    return true;
  } else {
    return false;
  }
}
function SpawnCallback(colorSpawn, color) {
  return function (e) {
    if (
      pickPawn &&
      diceThrow === 6 &&
      colorSpawn.childElementCount > 0 &&
      playerColor == color
    ) {
      const removedPawnFromSpawn = colorSpawn.removeChild(
        colorSpawn.firstElementChild
      );
      const startIndex = colorStart[playerColor];
      removedPawnFromSpawn.addEventListener("click", PawnHandler(color));
      playableSquares[startIndex].appendChild(removedPawnFromSpawn);
      TogglePawnAndDice();
    } else {
      console.log("YOU CANT PICK A PAWN WITHOUT A 6");
    }
  };
}

for (const color in colorPawnsSpawn) {
  const colorSpawn = colorPawnsSpawn[color];
  colorSpawn.addEventListener("click", SpawnCallback(colorSpawn, color));
}
dice.addEventListener("click", (e) => {
  if (diceReady) {
    diceThrow = 6;
    TogglePawnAndDice();
  } else {
    console.log("YOU ARE NOT SUPPOSED TO THROW THE DICE YET");
  }
});

// placeInfo.addEventListener("click", function (e) {
//   if (e.target.classList.contains("place-pawn")) {
//     console.log(e.target);
//     if (colorPawnsSpawn[playerColor].childElementCount > 0) {
//       dice.addEventListener("click", HandleDiceREAL);
//       this.classList.toggle("display-none");
//       Handle6();
//       return;
//     }
//   } else {
//     console.log("BASE THROW CASE");
//     BaseThrowCase();
//     Handle6();
//   }
//   dice.addEventListener("click", HandleDiceREAL);
//   this.classList.toggle("display-none");
// });

//#endregion

let diceThrow = 0;
const roadToWin = 39;

//   dice.addEventListener("click", HandleDiceREAL);
//   function Handle6() {
//     const removedPawnFromSpawn = RemoveChildFromAnElement(
//       colorPawnsSpawn[playerColor]
//     );
//     playableSquares[colorStart[playerColor]].appendChild(removedPawnFromSpawn);
//     boardPlayArray[colorStart[playerColor]].addPawn(playerColor);

//     HandleDiceREAL();
//   }
//   function HandleDiceREAL() {
//     ThrowDice();
//     AppendBoardHistory();
//     const countPawnsOnBoard = CountPawnsOnBoard();
//     // console.log(countPawnsOnBoard);
//     if (countPawnsOnBoard === 0) {
//       if (diceThrow === 6) {
//         console.log("STARTING THROW");
//         HandleStart6Throw();
//       }
//     } else {
//       // TODO: FIX FOR MULTIPLE PAWNS
//       if (diceThrow === 6) {
//         console.log(
//           "🚀 ~ file: index.js:142 ~ HandleDiceREAL ~ diceThrow:",
//           diceThrow
//         );

//         Thrown6AndPawnsOnBoard();
//         return;
//       } else if (countPawnsOnBoard === 1) {
//         console.log("we do da base throw");
//         BaseThrowCase();
//       } else {
//         ManyPawnsOnBoard();
//       }
//     }
//     //NextMoveSetUp();
//   }
function RemoveChildFromAnElement(parent) {
  return parent.removeChild(parent.firstElementChild);
}
