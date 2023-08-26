import { useState } from "react";
import "./styles/Column.scss";
import Agreement from "./Agreement";
import { task } from "./Classes";
import Task from "./Task";

interface ColumnProps {
  id: number;
  tittle: string;
  onDelete: (id: number) => void;
  taskList: task[];
  setTaskList: task[];
}

function Column({ id, tittle, onDelete, taskList, setTaskList }: ColumnProps) {
  const [showPopup, setShowPopup] = useState(false);

  setTaskList = [...taskList, new task(1, "test", "test")];
  console.log(typeof taskList);

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
        {taskList.map((taskItem) => {
          return (
            <Task
              id={taskItem.getID}
              getDesc={taskItem.getDesc}
              getShortDesc={taskItem.getShortDesc}
              setDescription={taskItem.setDesc}
              setShortDescription={taskItem.setShortDesc}
            />
          );
        })}
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
