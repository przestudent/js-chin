export class SquareInsides {
  public colors: possibleColors | "";
  public elements: number;
  public powerUp: null;
  constructor() {
    this.colors = "";
    this.elements = 0;
    this.powerUp = null;
  }
  addPawn(color: possibleColors) {
    this.elements++;
    this.colors = color;
  }
  removePawn(idx: number) {
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
const dices = document.querySelectorAll<HTMLElement>(".dice-throw>i");
dices[0].style.visibility = "visible";

export function TurnOnDice(i: number) {
  dices.forEach((e) => {
    e.style.visibility = "hidden";
  });
  dices[i - 1].style.visibility = "visible";
}

function WinLaneConstructor(color: possibleColors): Element[] {
  const arr = Array.from(
    document.querySelectorAll<HTMLElement>(`[data-win${color}]`)
  );
  arr.sort((a, b) => {
    return (
      parseInt(a["dataset"][`win${color}`] as string) -
      parseInt(b["dataset"][`win${color}`] as string)
    );
  });
  return arr;
}

export function ColorWinLane() {
  return {
    red: WinLaneConstructor("red"),
    blue: WinLaneConstructor("blue"),
    green: WinLaneConstructor("green"),
    yellow: WinLaneConstructor("yellow"),
  };
}

let moveCount = 0;

const boardHistory = document.querySelector<HTMLElement>(
  ".board-history-table>tbody"
) as HTMLElement;
export function AppendBoardHistory(color: possibleColors, diceThrow: number) {
  moveCount++;
  const tableRow = document.createElement("tr");
  const tableItem1 = document.createElement("td");
  const tableItem2 = document.createElement("td");
  const tableItem3 = document.createElement("td");

  tableItem1.innerText = moveCount.toString();
  tableItem2.style.setProperty("--player-color", color);
  tableItem2.innerText = color;
  tableItem3.innerText = diceThrow.toString();

  tableRow.append(tableItem1, tableItem2, tableItem3);

  // tableRow.innerHTML = `<td>${moveCount}</td><td style="--player-color:${color}">${color}</td><td>${diceThrow}</td>`;
  if (!boardHistory.children.length) {
    boardHistory.appendChild(tableRow);
  } else {
    boardHistory.insertBefore(tableRow, boardHistory.children[0]);
  }
}
export function ClearBoardHistory() {
  boardHistory.innerHTML = "";
  moveCount = 0;
}
