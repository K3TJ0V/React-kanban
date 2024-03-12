import { FormEvent, useState } from "react";
import "./styles/TaskCreator.scss";
import { column, task } from "./Classes";
import { fetchPost } from "./fetchMethods";

interface TaskCreatorProps {
  colInstance: column;
  nextTaskID: number;
  setNextTaskID: React.Dispatch<React.SetStateAction<number>>;
  visibility: React.Dispatch<React.SetStateAction<boolean>>;
  userID: number;
}

function TaskCreator({
  colInstance,
  nextTaskID,
  setNextTaskID,
  visibility,
  userID
}: TaskCreatorProps) {
  const [currentShortDesc, setCurrentShortDesc] = useState("");
  const [currentDesc, setCurrentDesc] = useState("");

  async function handleOnSubmit(e: FormEvent ) {
    e.preventDefault();
    let newTask = new task(nextTaskID, currentDesc, currentShortDesc);
    const data = {
      id: nextTaskID,
      description: currentDesc,
      shortDescription: currentShortDesc,
      column_id: colInstance.id,
      userID: userID
    };
    const taskFetch = await fetchPost('/task/add', data);
    setNextTaskID(nextTaskID + 1);
    colInstance.taskList = [...colInstance.taskList, newTask];
    visibility(false);
  }

  return (
    <section className="taskCreator">
      <form
        className="taskCreator__form"
        onSubmit={(e)=> {handleOnSubmit(e)}}
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
