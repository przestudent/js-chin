const Square = ({
  pawn,
  squareColorClass,
  number,
}: {
  pawn?: JSX.Element;
  squareColorClass?: string;
  number?: number;
}) => {
  return <div className={`square ${squareColorClass}`}>{pawn}</div>;
};

export default Square;
