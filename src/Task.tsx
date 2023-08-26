interface TaskProps {
  id: number;
  setDescription: string;
  setShortDescription: string;
  getDesc: string;
  getShortDesc: string;
}

function Task(myTask: TaskProps) {
  return (
    <section className="task">
      <h3 className="task__shortDescription">{myTask.getShortDesc}</h3>
      <article className="task__description">{myTask.getDesc}</article>
    </section>
  );
}

export default Task;
