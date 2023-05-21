const Pawn = ({ color }: { color: string }) => {
  return (
    <div className="pawn" style={{ backgroundColor: color }}>
      {color}
    </div>
  );
};

export default Pawn;
