import "./styles/DesktopHeader.scss";
import { column } from "./Classes";
import { useState } from "react";
import { fetchPost } from "./fetchMethods";

interface DesktopHeaderProps {
  setColumns: React.Dispatch<React.SetStateAction<column[]>>;
  currentID: number;
  setCurrentID: React.Dispatch<React.SetStateAction<number>>;
  columnList: column[];
  username: string;
  userID: number;
}

function DesktopHeader({
  setColumns,
  currentID,
  setCurrentID,
  columnList,
  username,
  userID
}: DesktopHeaderProps) {
  const [currentText, setCurrentText] = useState("");

  async function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
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
  }}

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
          onKeyDown={(e)=>{
            handleEnter(e)
          }}
        />
        <h1 className="desktopHeader__h1">Welcome back {username}</h1>
      </header>
    </div>
  );
}

export default DesktopHeader;
