import { useState } from "react";
import "./styles/Column.scss";
import Agreement from "./Agreement";

interface ColumnProps {
  id: number;
  tittle: string;
  onDelete: (id: number) => void;
}

function Column({ id, tittle, onDelete }: ColumnProps) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <section className="column">
        <h2 className="column__h2">{tittle} </h2>
        <hr style={{ width: "80%" }} />
        <button
          className="column__delete"
          onClick={() => {
            setShowPopup(!showPopup);
          }}
        >
          Delete column
        </button>
        {showPopup && (
          <Agreement
            id={id}
            onYes={() => {
              onDelete(id);
            }}
            onNo={setShowPopup}
          />
        )}
      </section>
    </>
  );
}

export default Column;
