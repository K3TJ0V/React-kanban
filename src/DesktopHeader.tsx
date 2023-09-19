import "./styles/DesktopHeader.scss";
import { column } from "./Classes";
import { useState } from "react";

interface DesktopHeaderProps {
  setColumns: React.Dispatch<React.SetStateAction<column[]>>;
  currentID: number;
  setCurrentID: React.Dispatch<React.SetStateAction<number>>;
  columnList: column[];
}

function DesktopHeader({
  setColumns,
  currentID,
  setCurrentID,
  columnList,
}: DesktopHeaderProps) {
  const [currentText, setCurrentText] = useState("");

  function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    if (target.value.replaceAll(" ", "") === "") {
      return;
    }
    if (event.key === "Enter") {
      const newColumn = new column(currentID, currentText.trim(), []);
      setColumns([...columnList, newColumn]);
      setCurrentID(currentID + 1);
      setCurrentText("");
    }
  }

  return (
    <div className="flexHeader">
      <header className="desktopHeader">
        <input
          value={currentText}
          type="text"
          name="column"
          id="column"
          className="desktopHeader__input"
          placeholder="Name your column"
          onChange={(e) => {
            setCurrentText(e.target.value);
          }}
          onKeyDown={handleEnter}
        />
        <h1 className="desktopHeader__h1">Welcome back USER</h1>
      </header>
    </div>
  );
}

export default DesktopHeader;
