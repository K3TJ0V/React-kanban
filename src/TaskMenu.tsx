import { useState } from "react";
import { task } from "./Classes";
import "./styles/TaskMenu.scss";

interface TaskMenuProps {
  data: task;
  visibilityState: React.Dispatch<React.SetStateAction<boolean>>;
  onDelete: (id: number) => void;
}

function TaskMenu({ data, visibilityState, onDelete }: TaskMenuProps) {
  const [shortDescEdit, setShortDescEdit] = useState(false);
  const [descEdit, setDescEdit] = useState(false);
  return (
    <section className="taskMenu">
      <article className="taskMenu__shortDesc">
        {shortDescEdit ? <Editing item={data.shortDesc} /> : data.shortDesc}
        <button
          className="taskMenu__shortDesc--editButton"
          onClick={() => {
            setShortDescEdit(!shortDescEdit);
          }}
        >
          {shortDescEdit ? "Save" : "Edit"}
        </button>
      </article>
      <article className="taskMenu__desc">
        {descEdit ? <Editing item={data.desc} /> : data.desc}
        <button
          className="taskMenu__desc--editButton"
          onClick={() => {
            setDescEdit(!descEdit);
          }}
        >
          {descEdit ? "Save" : "Edit"}
        </button>
      </article>
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
interface EditingProps {
  item: string;
}
function Editing({ item }: EditingProps) {
  return (
    <article>
      <input type="text" name="" id="" value={item} />
    </article>
  );
}

export default TaskMenu;
