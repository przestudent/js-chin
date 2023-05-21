import { useState } from "react";
import Pawn from "./Pawn";
import Square from "./Square";
import PawnSquare from "./PawnSquare";
type Colors = ["blue", "red", "yellow", "green"];

//#region initials
const bluePawnsInit = [
  <Pawn key={0} color="blue" />,
  <Pawn key={1} color="blue" />,
  <Pawn key={2} color="blue" />,
  <Pawn key={3} color="blue" />,
];
const redPawnsInit = [
  <Pawn key={0} color="red" />,
  <Pawn key={1} color="red" />,
  <Pawn key={2} color="red" />,
  <Pawn key={3} color="red" />,
];

const yellowPawnsInit = [
  <Pawn key={0} color="yellow" />,
  <Pawn key={1} color="yellow" />,
  <Pawn key={2} color="yellow" />,
  <Pawn key={3} color="yellow" />,
];

const greenPawnsInit = [
  <Pawn key={0} color="green" />,
  <Pawn key={1} color="green" />,
  <Pawn key={2} color="green" />,
  <Pawn key={3} color="green" />,
];
//#endregion
const initBoardSquare: (undefined | JSX.Element)[] = Array(40).fill(undefined);

function SetSquare({ index }: { index: number }): (undefined | JSX.Element)[] {
  initBoardSquare[index] = <Pawn color="red" />;
  return initBoardSquare;
}

const Board = () => {
  const [bluePawns, bluesetPawns] = useState(bluePawnsInit);
  const [yellowPawns, yellowsetPawns] = useState(yellowPawnsInit);
  const [redPawns, redsetPawns] = useState(redPawnsInit);
  const [greenPawns, greensetPawns] = useState(greenPawnsInit);
  const [nextPawn, setNextPawn] = useState<JSX.Element | undefined>(undefined);
  const [squares, setSquares] = useState(initBoardSquare);

  function ThrowDice(): void {
    const step = Math.floor(Math.random() * 6) + 1;
    console.log(step);
  }
  function PlacePawn() {
    const pawnsCopy = [...bluePawns];
    const squaresCopy = [...squares];
    const pawnToPlace = pawnsCopy.shift();
    squaresCopy[0] = pawnToPlace;
    setSquares(squaresCopy);
    bluesetPawns(pawnsCopy);

    console.log(squares);
    console.log(squares[0]);
  }
  return (
    <>
      <div className="board">
        <div className="three-row">
          <Square pawn={squares[0]} number={1} />
          <Square pawn={squares[1]} number={2} />
          <Square pawn={squares[2]} number={3} squareColorClass="blue-light" />
        </div>
        <div className="three-row">
          <Square pawn={squares[39]} number={40} />
          <Square squareColorClass="blue" />
          <Square pawn={squares[3]} number={4} />
        </div>
        <div className="three-row">
          <Square pawn={squares[38]} number={39} />
          <Square squareColorClass="blue" />
          <Square pawn={squares[4]} number={5} />
        </div>
        <div className="three-row">
          <Square pawn={squares[37]} number={38} />
          <Square squareColorClass="blue" />
          <Square pawn={squares[5]} number={6} />
        </div>
        <div className="longest-row">
          <Square pawn={squares[32]} number={33} squareColorClass="red-light" />
          <Square pawn={squares[33]} number={34} />
          <Square pawn={squares[34]} number={35} />
          <Square pawn={squares[35]} number={36} />
          <Square pawn={squares[36]} number={37} />
          <Square squareColorClass="blue" />
          <Square pawn={squares[6]} number={7} />
          <Square pawn={squares[7]} number={8} />
          <Square pawn={squares[8]} number={9} />
          <Square pawn={squares[9]} number={10} />
          <Square pawn={squares[10]} number={11} />
        </div>
        <div className="longest-row">
          <Square pawn={squares[31]} number={32} />
          <div className="square red">
            <div className="pawn"></div>
          </div>
          <div className="square red">
            <div className="pawn"></div>
          </div>
          <div className="square red">
            <div className="pawn"></div>
          </div>
          <div className="square red">
            <div className="pawn"></div>
          </div>
          <div className="square black">
            <div className="pawn"></div>
          </div>
          <div className="square green">
            <div className="pawn"></div>
          </div>
          <div className="square green">
            <div className="pawn"></div>
          </div>
          <div className="square green">
            <div className="pawn"></div>
          </div>
          <div className="square green">
            <div className="pawn"></div>
          </div>
          <Square pawn={squares[11]} number={12} />
        </div>
        <div className="longest-row">
          <Square pawn={squares[30]} number={31} />
          <Square pawn={squares[29]} number={30} />
          <Square pawn={squares[28]} number={29} />
          <Square pawn={squares[27]} number={28} />
          <Square pawn={squares[26]} number={27} />
          <div className="square yellow">
            <div className="pawn"></div>
          </div>
          <Square pawn={squares[16]} number={17} />
          <Square pawn={squares[15]} number={16} />
          <Square pawn={squares[14]} number={15} />
          <Square pawn={squares[13]} number={14} />
          <Square
            pawn={squares[12]}
            number={13}
            squareColorClass="green-light"
          />
        </div>
        <div className="three-row">
          <Square pawn={squares[25]} number={26} />
          <div className="square yellow">
            <div className="pawn"></div>
          </div>
          <Square pawn={squares[17]} number={18} />
        </div>
        <div className="three-row">
          <Square pawn={squares[24]} number={25} />
          <div className="square yellow">
            <div className="pawn"></div>
          </div>
          <Square pawn={squares[18]} number={19} />
        </div>
        <div className="three-row">
          <Square pawn={squares[23]} number={24} />
          <div className="square yellow">
            <div className="pawn"></div>
          </div>
          <Square pawn={squares[19]} number={20} />
        </div>
        <div className="three-row">
          <Square
            pawn={squares[20]}
            number={21}
            squareColorClass="yellow-light"
          />
          <Square pawn={squares[21]} number={22} />
          <Square pawn={squares[22]} number={23} />
        </div>
      </div>
      <PawnSquare pawns={bluePawns} position={"top-right"} />
      <PawnSquare pawns={yellowPawns} position={"bottom-left"} />
      <PawnSquare pawns={redPawns} position={"top-left"} />
      <PawnSquare pawns={greenPawns} position={"bottom-right"} />
      <div className="Dice" onClick={ThrowDice}></div>
      <div className="place-pawn" onClick={PlacePawn}></div>
    </>
  );
};

export default Board;
