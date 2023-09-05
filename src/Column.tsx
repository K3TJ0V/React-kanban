import { useState } from "react";
import "./styles/Column.scss";
import Agreement from "./Agreement";
import { task, column } from "./Classes";
import Task from "./Task";

interface ColumnProps {
  instance: column;
  onDelete: (id: number) => void;
  handleAddTask: (list: task[], id: number) => void;
  taskMove: (movedTaskID: task, targetColumnID: number) => void;
  columns: column[];
}

function Column({
  instance,
  onDelete,
  handleAddTask,
  columns,
  taskMove,
}: ColumnProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [nextTaskID, setNextTaskID] = useState(1);
  const [currentTaskList, setCurrentTaskList] = useState<task[]>(
    instance.taskList
  );

  function handleTaskDelete(taskID: number) {
    setCurrentTaskList(currentTaskList.filter((item) => item.id !== taskID));
  }

  return (
    <>
      <section className="column">
        <h2 className="column__h2">{instance.tittle} </h2>
        <button
          className="column__add"
          onClick={() => {
            setCurrentTaskList([
              ...currentTaskList,
              new task(nextTaskID, "test", "test"),
            ]);
            setNextTaskID(nextTaskID + 1);
            handleAddTask(currentTaskList, instance.id);
          }}
        >
          ADD
        </button>
        <div className="column__taskList">
          <hr style={{ width: "99%", margin: 0 }} />
          {currentTaskList.map((taskItem) => {
            return (
              <Task
                key={taskItem.id}
                taskInstance={taskItem}
                deleting={handleTaskDelete}
                columns={columns}
                taskMove={taskMove}
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
