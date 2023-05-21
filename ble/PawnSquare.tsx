type position = "top-right" | "bottom-left" | "top-left" | "bottom-right";

const PawnSquare = ({
  pawns,
  position,
}: {
  pawns?: JSX.Element[];
  position: position;
}) => {
  return <div className={`pawn-square-spawn ${position}`}>{pawns}</div>;
};
export default PawnSquare;
