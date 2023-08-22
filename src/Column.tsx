import "./styles/Column.scss";

interface ColumnProps {
  id: number;
  tittle: string;
  onDelete: (id: number) => void;
}

function Column({ id, tittle, onDelete }: ColumnProps) {
  return (
    <>
      <section className="column">
        <h2 className="column__h2">{tittle} </h2>
        <hr style={{ width: "80%" }} />
        <button
          className="column__delete"
          onClick={() => {
            onDelete(id);
          }}
        >
          Delete column
        </button>
      </section>
    </>
  );
}

export default Column;
