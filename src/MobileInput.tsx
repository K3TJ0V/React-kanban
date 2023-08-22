import "./styles/MobileInput.scss";
import HamburgerButton from "./HamburgerButton";
import { column } from "./Classes";
import { useState } from "react";

interface MobileInputProps {
  hamburger: boolean;
  columnList: column[];
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>;
  setColumns: React.Dispatch<React.SetStateAction<column[]>>;
}

function MobileInput({
  hamburger,
  columnList,
  setHamburger,
  setColumns,
}: MobileInputProps) {
  const [currentText, setCurrentText] = useState("");
  const [columnNextID, setColumnNextID] = useState(1);

  function handleOnChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    setCurrentText(target.value);
  }
  function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    if (target.value.replaceAll(" ", "") === "") {
      return;
    }
    if (event.key === "Enter") {
      const newColumn = new column(columnNextID, currentText.trim(), []);
      setColumns([...columnList, newColumn]);
      setColumnNextID(columnNextID + 1);
      setCurrentText("");
    }
  }

  return (
    <aside className="asideMobile">
      <div className="asideMobile__hamburger">
        <HamburgerButton setHamburger={setHamburger} hamburger={hamburger} />
      </div>
      <label>
        <input
          className="asideMobile__input"
          type="text"
          name="col"
          id="col"
          value={currentText}
          onChange={handleOnChange}
          onKeyDown={handleEnter}
          placeholder="Name your column"
        />
      </label>
    </aside>
  );
}

export default MobileInput;
