import { useState } from "react";
import { column, task } from "./Classes";
import "./styles/TaskMenu.scss";

interface TaskMenuProps {
  data: task;
  visibilityState: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: (id: number) => void;
  columns: column[];
}

function TaskMenu({ data, visibilityState, onDelete, columns }: TaskMenuProps) {
  const [shortDescEdit, setShortDescEdit] = useState(false);
  const [descEdit, setDescEdit] = useState(false);
  const [currentDesc, setCurrentDesc] = useState(data.desc);
  const [currentShortDesc, setCurrentShortDesc] = useState(data.shortDesc);

  function handleTaskMove(item: string) {
    console.log(item);
  }

  return (
    <section className="taskMenu">
      <article className="taskMenu__shortDesc">
        {shortDescEdit ? (
          <ShortDescEditing item={data} setShortDesc={setCurrentShortDesc} />
        ) : (
          data.shortDesc
        )}
        <button
          className="taskMenu__shortDesc--editButton"
          onClick={() => {
            setShortDescEdit(!shortDescEdit);
            data.shortDesc = currentShortDesc;
          }}
        >
          {shortDescEdit ? "Save" : "Edit"}
        </button>
      </article>
      <article className="taskMenu__desc">
        {descEdit ? (
          <DescEditing item={data} setDesc={setCurrentDesc} />
        ) : (
          data.desc
        )}
        <button
          className="taskMenu__desc--editButton"
          onClick={() => {
            setDescEdit(!descEdit);
            data.desc = currentDesc;
          }}
        >
          {descEdit ? "Save" : "Edit"}
        </button>
      </article>
      <select
        name="columns"
        id="columns"
        onChange={(e) => {
          handleTaskMove(e.target.value);
        }}
      >
        {columns.map((item: column) => {
          return <option value={item.tittle}>{item.tittle}</option>;
        })}
      </select>
      <button
        className="taskMenu__close"
        onClick={() => {
          visibilityState(false);
        }}
      >
        Close
      </button>
      <button
        onClick={() => {
          onDelete(data.id);
        }}
      >
        Delete
      </button>
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
        name=""
        id=""
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
        name=""
        id=""
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
