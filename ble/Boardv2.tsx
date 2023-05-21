import Square from "./Square";

const Board = () => {
  return (
    <div className="board">
      <div className="three-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="three-row">
        <Square />
        <Square squareColorClass="blue" />
        <Square />
      </div>
      <div className="three-row">
        <Square />
        <Square squareColorClass="blue" />
        <Square />
      </div>
      <div className="three-row">
        <Square />
        <Square squareColorClass="blue" />
        <Square />
      </div>
      <div className="longest-row">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square squareColorClass="blue" />
        <div className="square">
          <div className="pawn"></div>
        </div>
        <div className="square">
          <div className="pawn"></div>
        </div>
        <div className="square">
          <div className="pawn"></div>
        </div>
        <div className="square">
          <div className="pawn"></div>
        </div>
        <div className="square">
          <div className="pawn"></div>
        </div>
      </div>
      <div className="longest-row">
        <div className="square">
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
        <div className="square">
          <div className="pawn"></div>
        </div>
      </div>
      <div className="longest-row">
        <div className="square">
          <div className="pawn"></div>
        </div>
        <div className="square">
          <div className="pawn"></div>
        </div>
        <div className="square">
          <div className="pawn"></div>
        </div>
        <div className="square">
          <div className="pawn"></div>
        </div>
        <div className="square">
          <div className="pawn"></div>
        </div>
        <div className="square yellow">
          <div className="pawn"></div>
        </div>
        <div className="square">
          <div className="pawn"></div>
        </div>
        <div className="square">
          <div className="pawn"></div>
        </div>
        <div className="square">
          <div className="pawn"></div>
        </div>
        <div className="square">
          <div className="pawn"></div>
        </div>
        <div className="square">
          <div className="pawn"></div>
        </div>
      </div>
      <div className="three-row">
        <div className="square">
          <div className="pawn"></div>
        </div>
        <div className="square yellow">
          <div className="pawn"></div>
        </div>
        <div className="square">
          <div className="pawn"></div>
        </div>
      </div>
      <div className="three-row">
        <div className="square">
          <div className="pawn"></div>
        </div>
        <div className="square yellow">
          <div className="pawn"></div>
        </div>
        <div className="square">
          <div className="pawn"></div>
        </div>
      </div>
      <div className="three-row">
        <div className="square">
          <div className="pawn"></div>
        </div>
        <div className="square yellow">
          <div className="pawn"></div>
        </div>
        <div className="square">
          <div className="pawn"></div>
        </div>
      </div>
      <div className="three-row">
        <div className="square">
          <div className="pawn"></div>
        </div>
        <div className="square">
          <div className="pawn"></div>
        </div>
        <div className="square">
          <div className="pawn"></div>
        </div>
      </div>
    </div>
  );
};

export default Board;
