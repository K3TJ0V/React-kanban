import { useState } from "react";
import "./styles/Column.scss";
import Agreement from "./Agreement";
import { task, column } from "./Classes";
import Task from "./Task";

interface ColumnProps {
  instance: column;
  onDelete: (id: number) => void;
  taskMove: (
    movedTaskID: task,
    targetColumnID: number,
    columnInstance: column
  ) => void;
  columns: column[];
  nextTaskID: number;
  setNextTaskID: React.Dispatch<React.SetStateAction<number>>;
}

function Column({
  instance,
  onDelete,
  columns,
  taskMove,
  nextTaskID,
  setNextTaskID,
}: ColumnProps) {
  const [showPopup, setShowPopup] = useState(false);

  function handleTaskDelete(taskID: number) {
    // setCurrentTaskList(currentTaskList.filter((item) => item.id !== taskID));
    let list = instance.taskList;
    list.filter((item) => item.id !== taskID);
    instance.taskList = list;
  }
  return (
    <>
      <section className="column">
        <h2 className="column__h2">{instance.tittle} </h2>
        <button
          className="column__add"
          onClick={() => {
            instance.taskList = [
              ...instance.taskList,
              new task(nextTaskID, "test", "test"),
            ];
            setNextTaskID(nextTaskID + 1);
          }}
        >
          ADD
        </button>
        <div className="column__taskList">
          <hr style={{ width: "99%", margin: 0 }} />
          {instance.taskList.map((taskItem) => {
            return (
              <Task
                key={taskItem.id}
                taskInstance={taskItem}
                deleting={handleTaskDelete}
                columns={columns}
                taskMove={taskMove}
                columnInstance={instance}
              />
            );
          })}
        </div>
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
