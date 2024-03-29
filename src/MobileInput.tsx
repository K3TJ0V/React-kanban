import "./styles/MobileInput.scss";
import HamburgerButton from "./HamburgerButton";
import { column } from "./Classes";
import { useState } from "react";
import { fetchPost } from "./fetchMethods";

interface MobileInputProps {
  hamburger: boolean;
  columnList: column[];
  setHamburger: React.Dispatch<React.SetStateAction<boolean>>;
  setColumns: React.Dispatch<React.SetStateAction<column[]>>;
  currentID: number;
  setCurrentID: React.Dispatch<React.SetStateAction<number>>;
  userID: number;
}

function MobileInput({
  hamburger,
  columnList,
  currentID,
  setCurrentID,
  setHamburger,
  setColumns,
  userID
}: MobileInputProps) {
  const [currentText, setCurrentText] = useState("");

  function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    if (target.value.replaceAll(" ", "") === "") {
      return;
    }
    if (event.key === "Enter") {
      const newColumn = new column(currentID, currentText.trim(), []);
      const data = {
        userID: userID,
        tittle: newColumn.tittle,
        id: newColumn.id
      };
      fetchPost("/column/add", data);
      setColumns([...columnList, newColumn]);
      setCurrentID(currentID + 1);
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
          onChange={(e) => {
            setCurrentText(e.target.value);
          }}
          onKeyDown={handleEnter}
          placeholder="Name your column"
        />
      </label>
    </aside>
  );
}

export default MobileInput;
