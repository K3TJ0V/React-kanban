import React, { useState } from "react";
import "./styles/Column.scss";
import Agreement from "./Agreement";
import { task, column } from "./Classes";
import Task from "./Task";
import TaskCreator from "./TaskCreator";


interface ColumnProps {
  colInstance: column;
  onDelete: (id: number) => void;
  deleteRerender: (newList: task[], colID: number) => void;
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
  colInstance,
  onDelete,
  deleteRerender,
  columns,
  taskMove,
  nextTaskID,
  setNextTaskID,
}: ColumnProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [creatorVisibility, setCreatorVisibility] = useState(false);

  function handleTaskDelete(taskID: number) {
    colInstance.taskList = colInstance.taskList.filter(
      (item) => item.id !== taskID
    );
    deleteRerender(colInstance.taskList, colInstance.id);
  }
  return (
    <>
      <section className="column">
        <h2 className="column__h2">{colInstance.tittle} </h2>
        <button
          className="column__add"
          onClick={() => {
            setCreatorVisibility(!creatorVisibility);
          }}
        >
          ADD
        </button>
        {creatorVisibility && (
          <TaskCreator
            colInstance={colInstance}
            nextTaskID={nextTaskID}
            setNextTaskID={setNextTaskID}
            visibility={setCreatorVisibility}
          />
        )}
        <div className="column__taskList">
          <hr style={{ width: "99%", margin: 0 }} />
          {colInstance.taskList.map((taskItem) => {
            return (
              <Task
                key={taskItem.id}
                taskInstance={taskItem}
                onDelete={handleTaskDelete}
                columns={columns}
                taskMove={taskMove}
                colInstance={colInstance}
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
            id={colInstance.id}
            onYes={() => {
              onDelete(colInstance.id);
            }}
            onNo={setShowPopup}
          />
        )}
      </section>
    </>
  );
}

export default Column;
