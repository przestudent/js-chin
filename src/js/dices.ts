const dices = document.querySelectorAll<HTMLElement>(".dice-throw>i");
dices[0].style.visibility = "visible";

export function TurnOnDice(i: number) {
  dices.forEach((e) => {
    e.style.visibility = "hidden";
  });
  dices[i - 1].style.visibility = "visible";
}
