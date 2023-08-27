interface TaskProps {
  id: number;
  description: string;
  shortDescription: string;
}

function Task(myTask: TaskProps) {
  return (
    <section className="task">
      <h3 className="task__shortDescription">{myTask.shortDescription}</h3>
      <article className="task__description">{myTask.description}</article>
    </section>
  );
}

export default Task;
