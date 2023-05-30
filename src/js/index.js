const colorOrder = {
  red: "blue",
  blue: "green",
  green: "yellow",
  yellow: "red",
};

let playerColor = "red";
let moveCount = 0;

// #region

const boardHistory = document.querySelector(".board-history-table>tbody");
const dices = document.querySelectorAll(".dice-throw>i");
dices[0].style.visibility = "visible";
const board = document.querySelector(".board");
const playableSquares = Array.from(
  document.querySelectorAll(".square[data-index]")
).sort((a, b) => a.dataset.index - b.dataset.index);
const boardPlayArray = new Array(playableSquares.length).fill("");

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

//#endregion

let diceThrow = 0;
const roadToWin = 39;

document.querySelector(".dice").addEventListener("click", HandleDiceREAL);
function Handle6() {
  const removedPawnFromSpawn = RemoveChildFromAnElement(
    colorPawnsSpawn[playerColor]
  );
  playableSquares[colorStart[playerColor]].appendChild(removedPawnFromSpawn);
  boardPlayArray[colorStart[playerColor]] = playerColor;

  HandleDiceREAL();
}
async function HandleDiceREAL() {
  ThrowDice();
  AppendBoardHistory();
  const countPawnsOnBoard = CountPawnsOnBoard();
  console.log(countPawnsOnBoard);
  if (countPawnsOnBoard === 0) {
    if (diceThrow === 6) {
      console.log("STARTING THROW");
      HandleStart6Throw();
    }
  } else {
    if (diceThrow === 6) {
      console.log("START");
      console.log("1");
      await Thrown6AndPawnsOnBoard();
      console.log("3");
      console.log("END");
    } else if (countPawnsOnBoard === 1) {
      BaseThrowCase();
    } else {
      ManyPawnsOnBoard();
    }
  }
  NextMoveSetUp();
}
function ManyPawnsOnBoard() {
  console.log("many dices");
}
function BaseThrowCase() {
  let index = boardPlayArray.indexOf(playerColor);
  let nextIndex = index + diceThrow;
  boardPlayArray[index] = "";
  boardPlayArray[nextIndex] = playerColor;
  playableSquares[nextIndex].appendChild(
    RemoveChildFromAnElement(playableSquares[index])
  );
}
async function Thrown6AndPawnsOnBoard() {
  //TODO: MAKE IT SO THAT YOU CANT DO THINGS HERE, SHOW MODAL AND STUFF
  setTimeout(() => {
    console.log("2");
  }, 1000);
}

function ThrowDice() {
  diceThrow = Math.floor(Math.random() * 6) + 1;
  moveCount++;
  TurnOnDice(diceThrow, dices);
}
function NextMoveSetUp() {
  playerColorShow.innerText = colorOrder[playerColor];
  playerColor = colorOrder[playerColor];
}
function CountPawnsOnBoard() {
  return (
    4 -
    colorFinishedPawns[playerColor].childElementCount -
    colorPawnsSpawn[playerColor].childElementCount
  );
}
function HandleStart6Throw() {
  const removedPawnFromSpawn = RemoveChildFromAnElement(
    colorPawnsSpawn[playerColor]
  );
  console.log(removedPawnFromSpawn);
  playableSquares[colorStart[playerColor]].appendChild(removedPawnFromSpawn);
  boardPlayArray[colorStart[playerColor]] = playerColor;

  HandleDiceREAL();
}

// function HandleDice() {
//   diceThrow = Math.floor(Math.random() * 6) + 1;
//   moveCount++;
//   TurnOnDice(diceThrow, dices);

//   //diceCount.innerText = diceThrow;
//   let index;
//   console.log(
//     `CHILDREN__${colorPawnsSpawn[playerColor].childElementCount}__DICE:${diceThrow}__color:${playerColor}`
//   );
//   AppendBoardHistory();
//   if (diceThrow == 6 && colorPawnsSpawn[playerColor].childElementCount > 0) {
//     Handle6();
//     return;
//   }
//   if (
//     colorFinishedPawns[playerColor].childElementCount +
//       colorPawnsSpawn[playerColor].childElementCount !=
//     3
//   ) {
//     HandleMultiplePawnsOnBoard();
//     return;
//   }
//   if (boardPlayArray.includes(playerColor)) {
//     index = boardPlayArray.indexOf(playerColor);
//     const indexNext = (index + diceThrow) % boardPlayArray.length;

//     PlacePawn(index, indexNext);
//   }
//   //playerColorShow.innerText = colorOrder[playerColor];
//   //playerColor = colorOrder[playerColor];
// }
// function HandleMultiplePawnsOnBoard() {}

// function PlacePawn(currIndex, nextIndex = currIndex) {
//   boardPlayArray[currIndex] = "";
//   const removedPawn = playableSquares[currIndex].removeChild(
//     playableSquares[currIndex].firstChild
//   );

//   if (playerColor === "blue") {
//     let blueTempEnd = [36, 37, 38, 39, 0, 1];
//     if (
//       nextIndex > colorStart[playerColor] &&
//       blueTempEnd.includes(currIndex)
//     ) {
//       HandleWinLane(currIndex, nextIndex, removedPawn);
//     }
//   }
//   if (
//     nextIndex > colorEnd[playerColor] &&
//     currIndex < colorStart[playerColor]
//   ) {
//     HandleWinLane(currIndex, nextIndex, removedPawn);
//     return;
//   }
//   if (boardPlayArray[nextIndex] && boardPlayArray[nextIndex] !== playerColor) {
//     const pawnColorToGoBackToSpawn = boardPlayArray[nextIndex].dataset.pawn;
//     const knockedPawn = RemoveChildFromAnElement(playableSquares[nextIndex]);
//     colorPawnsSpawn[pawnColorToGoBackToSpawn].appendChild(knockedPawn);
//   }
//   boardPlayArray[nextIndex] = playerColor;
//   playableSquares[nextIndex].appendChild(removedPawn);
// }

function RemoveChildFromAnElement(parent) {
  return parent.removeChild(parent.children[0]);
}

function TurnOnDice(i, dicesRef) {
  dicesRef.forEach((e) => {
    e.style.visibility = "hidden";
  });
  dicesRef[i - 1].style.visibility = "visible";
}

function HandleWinLane(currIndex, nextIndex, removedPawn) {
  const steps = 6; //nextIndex - colorEnd[playerColor];
  boardPlayArray[currIndex] = "";
  if (steps > 4) {
    HandleWin(removedPawn);
    return;
  } else {
    removedPawn.classList.add("win-lane");
    colorWinLane[playerColor][steps - 1].appendChild(removedPawn);
    colorLaneArray[playerColor][steps - 1] = "red";
  }
}

function HandleWin(removedPawn) {
  colorFinishedPawns[playerColor].appendChild(removedPawn);
  if (colorFinishedPawns.childElementCount == 4) {
    console.log("YOU WIN");
  }
}

function AppendBoardHistory() {
  const tableRow = document.createElement("tr");
  tableRow.innerHTML = `<td>${moveCount}</td><td style="--player-color:${playerColor}">${playerColor}</td><td>${diceThrow}</td>`;
  if (!boardHistory.children.length) {
    boardHistory.appendChild(tableRow);
  } else {
    boardHistory.insertBefore(tableRow, boardHistory.children[0]);
  }
}
