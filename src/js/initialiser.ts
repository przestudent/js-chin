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
