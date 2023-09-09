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
        onSubmit={(e) => {
          e.preventDefault();
          let newTask = new task(nextTaskID, currentDesc, currentShortDesc);
          setNextTaskID(nextTaskID + 1);
          colInstance.taskList = [...colInstance.taskList, newTask];
          visibility(false);
        }}
      >
        <input
          type="text"
          name="shortDesc"
          id="shortDesc"
          required
          onChange={(e) => {
            setCurrentShortDesc(e.target.value);
          }}
        />
        <textarea
          name="desc"
          id="desc"
          required
          onChange={(e) => {
            setCurrentDesc(e.target.value);
          }}
        />
        <button className="column_add" type="submit">
          ADD
        </button>
      </form>
    </section>
  );
}

export default TaskCreator;
