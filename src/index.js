const colorOrder = {
  red: "blue",
  blue: "green",
  green: "yellow",
  yellow: "red",
};

let playerColor = "red";

//#region
const dices = document.querySelectorAll(".dice-throw>i");
dices[0].style.visibility = "visible";
//const diceCount = document.querySelector(".diceCount");
const board = document.querySelector(".board");
const playableSquares = Array.from(
  document.querySelectorAll(".square[data-index]")
);
playableSquares.sort((a, b) => a.dataset.index - b.dataset.index);
//playableSquares.forEach((e) => console.log(e.getBoundingClientRect()));
const boardPlayArray = new Array(playableSquares.length).fill("");
const redPawns = document.querySelector("#pawns-red");
const greenPawns = document.querySelector("#pawns-green");
const yellowPawns = document.querySelector("#pawns-yellow");
const bluePawns = document.querySelector("#pawns-blue");

const redStart = document.querySelector(".red-light").dataset.index;
const blueStart = document.querySelector(".blue-light").dataset.index;
const yellowStart = document.querySelector(".yellow-light").dataset.index;
const greenStart = document.querySelector(".green-light").dataset.index;

const greenWinLane = Array.from(
  document.querySelectorAll("[data-wingreen]")
).sort((a, b) => a.dataset.wingreen - b.dataset.wingreen);
const bluenWinLane = Array.from(
  document.querySelectorAll("[data-winblue]")
).sort((a, b) => a.dataset.winblue - b.dataset.winblue);
const redWinLane = Array.from(document.querySelectorAll("[data-winred]")).sort(
  (a, b) => a.dataset.winred - b.dataset.winred
);
const yellowWinLane = Array.from(
  document.querySelectorAll("[data-winyellow]")
).sort((a, b) => a.dataset.winyellow - b.dataset.winyellow);

const redEnd = document.querySelector("[data-end=red]");
const blueEnd = document.querySelector("[data-end=blue]");
const yellowEnd = document.querySelector("[data-end=yellow]");
const greenEnd = document.querySelector("[data-end=green]");
const redLaneArray = new Array(4).fill("");
const blueLaneArray = new Array(4).fill("");
const yellowLaneArray = new Array(4).fill("");
const greenLaneArray = new Array(4).fill("");

const colorLaneArray = {
  red: redLaneArray,
  blue: blueLaneArray,
  yellow: yellowLaneArray,
  green: greenLaneArray,
};

const playerColorShow = document.querySelector(".player");
//#endregion
const colorWinLane = {
  red: redWinLane,
  green: greenWinLane,
  yellow: yellowWinLane,
  blue: bluenWinLane,
};
const colorEnd = {
  red: redEnd,
  blue: blueEnd,
  yellow: yellowEnd,
  green: greenEnd,
};
const colorStart = {
  red: redStart,
  blue: blueStart,
  yellow: yellowStart,
  green: greenStart,
};
const colorPawnsSpawn = {
  red: redPawns,
  blue: bluePawns,
  yellow: yellowPawns,
  green: greenPawns,
};
let diceThrow = 0;
document.querySelector(".Dice").addEventListener("click", HandleDice);
function Handle6() {
  const removedPawnFromSpawn = RemoveChildFromAnElement(
    colorPawnsSpawn[playerColor]
  );
  playableSquares[colorStart[playerColor]].appendChild(removedPawnFromSpawn);
  boardPlayArray[colorStart[playerColor]] = playerColor;

  HandleDice();
}
function HandleDice() {
  diceThrow = Math.floor(Math.random() * 6) + 1;
  TurnOnDice(diceThrow, dices);
  //diceCount.innerText = diceThrow;
  let index;
  console.log(
    `CHILDREN__${colorPawnsSpawn[playerColor].childElementCount}__DICE:${diceThrow}__color:${playerColor}`
  );
  if (diceThrow == 6 && colorPawnsSpawn[playerColor].childElementCount > 0) {
    Handle6();
    return;
  }
  if (boardPlayArray.includes(playerColor)) {
    index = boardPlayArray.indexOf(playerColor);
    const indexNext = (index + diceThrow) % boardPlayArray.length;

    PlacePawn(index, indexNext);
  }
  //playerColorShow.innerText = colorOrder[playerColor];
  // playerColor = colorOrder[playerColor];
}
function PlacePawn(currIndex, nextIndex = currIndex) {
  console.log(`${currIndex}    ->      ${nextIndex}`);
  boardPlayArray[currIndex] = "";
  const removedPawn = playableSquares[currIndex].removeChild(
    playableSquares[currIndex].firstChild
  );
  if (boardPlayArray[nextIndex] && boardPlayArray[nextIndex] !== playerColor) {
    const pawnColorToGoBackToSpawn = boardPlayArray[nextIndex].dataset.pawn;
    const knockedPawn = RemoveChildFromAnElement(playableSquares[nextIndex]);
    colorPawnsSpawn[pawnColorToGoBackToSpawn].appendChild(knockedPawn);
  }
  boardPlayArray[nextIndex] = playerColor;
  playableSquares[nextIndex].appendChild(removedPawn);
}

function RemoveChildFromAnElement(parent) {
  return parent.removeChild(parent.children[0]);
}
function TurnOnDice(i, dicesRef) {
  dicesRef.forEach((e) => {
    e.style.visibility = "hidden";
  });
  dicesRef[i - 1].style.visibility = "visible";
}

function FLIP(firstRECT, secondRECT) {
  const rect1 = firstRECT.getBoundingClientRect();
  const rect2 = secondRECT.getBoundingClientRect();
  const [dx, dy] = [rect1.left - rect2.left, rect1.top - rect2.top];
  firstRECT.dataset.filpping = true;
  firstRECT.style.setProperty("--dx", dx);
  firstRECT.style.setProperty("--dy", dy);
  requestAnimationFrame(() => {
    console.log(firstRECT);
    requestAnimationFrame(() => (firstRECT.dataset.flip = "play"));
  });
}
