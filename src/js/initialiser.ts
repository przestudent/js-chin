const dices = document.querySelectorAll<HTMLElement>('.dice-throw>i');
dices[0].style.visibility = 'visible';

export function TurnOnDice(i: number) {
  dices.forEach((e) => {
    e.style.visibility = 'hidden';
  });
  dices[i - 1].style.visibility = 'visible';
}

function WinLaneConstructor(color: possibleColors): Element[] {
  const arr = Array.from(
    document.querySelectorAll<HTMLDivElement>(`[data-win${color}]`)
  );
  arr.sort((a, b) => {
    return (
      parseInt(a['dataset'][`win${color}`] as string) -
      parseInt(b['dataset'][`win${color}`] as string)
    );
  });
  return arr;
}

export function ColorWinLane() {
  return {
    red: WinLaneConstructor('red'),
    blue: WinLaneConstructor('blue'),
    green: WinLaneConstructor('green'),
    yellow: WinLaneConstructor('yellow'),
  };
}

let moveCount = 0;

const boardHistory = document.querySelector<HTMLElement>(
  '.board-history-table>tbody'
) as HTMLElement;
export function AppendBoardHistory(color: possibleColors, diceThrow: number) {
  moveCount++;
  const tableRowFragment = document.createDocumentFragment();
  const tableRow = document.createElement('tr');
  const tableItem1 = document.createElement('td');
  const tableItem2 = document.createElement('td');
  const tableItem3 = document.createElement('td');

  tableItem1.innerText = moveCount.toString();
  tableItem2.style.setProperty('--player-color', color);
  tableItem2.innerText = color;
  tableItem3.innerText = diceThrow.toString();
  if (diceThrow === 6) {
    tableItem3.classList.add('thrown-six');
  }

  tableRow.append(tableItem1, tableItem2, tableItem3);
  tableRowFragment.appendChild(tableRow);
  if (!boardHistory.children.length) {
    boardHistory.appendChild(tableRowFragment);
  } else {
    boardHistory.insertBefore(tableRowFragment, boardHistory.children[0]);
  }
}
export function ClearBoardHistory() {
  boardHistory.innerHTML = '';
  moveCount = 0;
}
export function RemoveMyListeners(element: Element) {
  element.parentElement?.replaceChild(element.cloneNode(true), element);
}

export function RemovePawnListeners(colors: possibleColors[]) {
  for (const color of colors) {
    const pawnOfColor = Array.from(
      document.querySelectorAll(`[data-pawn=${color}]`)
    );
    pawnOfColor.forEach((e) => {
      RemoveMyListeners(e);
    });
  }
}
export function RemoveChildFromAnElement(parent: Element) {
  return parent.removeChild(parent.firstElementChild as Element);
}
