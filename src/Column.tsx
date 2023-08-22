import "./styles/Column.scss";

interface ColumnProps {
  tittle: string;
}

function Column({ tittle }: ColumnProps) {
  return (
    <>
      <section className="column">{tittle}</section>
    </>
  );
}

export default Column;
