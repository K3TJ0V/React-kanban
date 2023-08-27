import { useState } from "react";
import "./styles/Column.scss";
import Agreement from "./Agreement";
import { task, column } from "./Classes";
import Task from "./Task";

interface ColumnProps {
  instance: column;
  onDelete: (id: number) => void;
}

function Column({ instance, onDelete }: ColumnProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [currentTaskList, setCurrentTaskList] = useState<task[]>([]);
  const [nextTaskID, setNextTaskID] = useState(1);

  function handleAddTask() {
    setCurrentTaskList([
      ...currentTaskList,
      new task(nextTaskID, "test", "test"),
    ]);
    instance.taskList = currentTaskList;
    setNextTaskID(nextTaskID + 1);
    console.log(instance.taskList);
  }

  return (
    <>
      <section className="column">
        <h2 className="column__h2">{instance.tittle} </h2>
        <hr style={{ width: "80%" }} />
        <button
          className="column__delete"
          onClick={() => {
            setShowPopup(!showPopup);
          }}
        >
          Delete column
        </button>
        <button onClick={handleAddTask}>add</button>
        {currentTaskList.map((taskItem) => {
          return (
            <Task
              key={taskItem.id}
              id={taskItem.id}
              description={taskItem.desc}
              shortDescription={taskItem.shortDesc}
            />
          );
        })}
        {showPopup && (
          <Agreement
            id={instance.id}
            onYes={() => {
              onDelete(instance.id);
            }}
            onNo={setShowPopup}
          />
        )}
      </section>
    </>
  );
}

export default Column;
