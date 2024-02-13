import { useState } from "react";
import "./styles/TaskCreator.scss";
import { column, task } from "./Classes";

interface TaskCreatorProps {
  colInstance: column;
  nextTaskID: number;
  setNextTaskID: React.Dispatch<React.SetStateAction<number>>;
  visibility: React.Dispatch<React.SetStateAction<boolean>>;
}

function TaskCreator({
  colInstance,
  nextTaskID,
  setNextTaskID,
  visibility,
}: TaskCreatorProps) {
  const [currentShortDesc, setCurrentShortDesc] = useState("");
  const [currentDesc, setCurrentDesc] = useState("");

  return (
    <section className="taskCreator">
      <form
        className="taskCreator__form"
        onSubmit={(e) => {
          e.preventDefault();
          let newTask = new task(nextTaskID, currentDesc, currentShortDesc);
          setNextTaskID(nextTaskID + 1);
          colInstance.taskList = [...colInstance.taskList, newTask];
          visibility(false);
        }}
      >
        <input
          className="taskCreator__form--shortDesc"
          type="text"
          name="shortDesc"
          id="shortDesc"
          required
          placeholder="short description"
          onChange={(e) => {
            setCurrentShortDesc(e.target.value);
          }}
        />
        <textarea
          className="taskCreator__form--desc"
          name="desc"
          id="desc"
          placeholder="description"
          onChange={(e) => {
            setCurrentDesc(e.target.value);
          }}
        />
        <div className="taskCreator__buttonsFlex">
          <button className="taskCreator__buttonsFlex--add" type="submit">
            ADD
          </button>
          <button
            className="taskCreator__buttonsFlex--close"
            onClick={() => {
              visibility(false);
            }}
          >
            CLOSE
          </button>
        </div>
      </form>
    </section>
  );
}

export default TaskCreator;
