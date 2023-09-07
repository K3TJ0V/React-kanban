import { useState } from "react";
import { column, task } from "./Classes";
import "./styles/TaskMenu.scss";

interface TaskMenuProps {
  taskInstance: task;
  visibilityState: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: (id: number) => void;
  taskMove: (
    movedTaskID: task,
    targetColumnID: number,
    columnInstance: column
  ) => void;
  columns: column[];
  columnInstance: column;
}

function TaskMenu({
  taskInstance,
  visibilityState,
  onDelete,
  columns,
  taskMove,
  columnInstance,
}: TaskMenuProps) {
  const [shortDescEdit, setShortDescEdit] = useState(false);
  const [descEdit, setDescEdit] = useState(false);
  const [currentDesc, setCurrentDesc] = useState(taskInstance.desc);
  const [currentShortDesc, setCurrentShortDesc] = useState(
    taskInstance.shortDesc
  );

  return (
    <section className="taskMenu">
      <article className="taskMenu__shortDesc">
        {shortDescEdit ? (
          <ShortDescEditing
            item={taskInstance}
            setShortDesc={setCurrentShortDesc}
          />
        ) : (
          taskInstance.shortDesc
        )}
        <button
          className="taskMenu__shortDesc--editButton"
          onClick={() => {
            setShortDescEdit(!shortDescEdit);
            taskInstance.shortDesc = currentShortDesc;
          }}
        >
          {shortDescEdit ? "Save" : "Edit"}
        </button>
      </article>
      <article className="taskMenu__desc">
        {descEdit ? (
          <DescEditing item={taskInstance} setDesc={setCurrentDesc} />
        ) : (
          taskInstance.desc
        )}
        <button
          className="taskMenu__desc--editButton"
          onClick={() => {
            setDescEdit(!descEdit);
            taskInstance.desc = currentDesc;
          }}
        >
          {descEdit ? "Save" : "Edit"}
        </button>
      </article>
      <select
        name="columns"
        id="columns"
        onChange={(e) => {
          const columnTarget = e.target.value as unknown as number;
          taskMove(taskInstance, columnTarget, columnInstance);
          visibilityState(false);
        }}
      >
        <option defaultValue={""}>Where to move</option>
        {columns.map((item: column) => {
          return (
            <option key={item.id} value={item.id}>
              {item.tittle}
            </option>
          );
        })}
      </select>
      <div className="taskMenu__flexButtons">
        <button
          className="taskMenu__flexButtons--close"
          onClick={() => {
            visibilityState(false);
          }}
        >
          Close
        </button>
        <button
          className="taskMenu__flexButtons--delete"
          onClick={() => {
            onDelete(taskInstance.id);
          }}
        >
          Delete
        </button>
      </div>
    </section>
  );
}
interface ShortDescEditingProps {
  item: task;
  setShortDesc: React.Dispatch<React.SetStateAction<string>>;
}
function ShortDescEditing({ item, setShortDesc }: ShortDescEditingProps) {
  return (
    <article>
      <input
        type="text"
        name="shortDesc"
        id="shortDesc"
        value={item.shortDesc}
        onChange={(e) => {
          setShortDesc(e.target.value);
          item.shortDesc = e.target.value;
        }}
      />
    </article>
  );
}
interface DescEditingProps {
  item: task;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
}
function DescEditing({ item, setDesc }: DescEditingProps) {
  return (
    <article>
      <input
        type="text"
        name="desc"
        id="desc"
        value={item.desc}
        onChange={(e) => {
          setDesc(e.target.value);
          item.desc = e.target.value;
        }}
      />
    </article>
  );
}
export default TaskMenu;
