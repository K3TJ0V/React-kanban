import { useState } from "react";
import "./styles/Page.scss";
import "./Header";
import Header from "./Header";
import MobileInput from "./MobileInput";
import Column from "./Column";
import { column, task } from "./Classes";
import DesktopHeader from "./DesktopHeader";
import { fetchPost } from "./fetchMethods";

interface PageProps{
  user: {id: number ,login: string, password: string, next_column_id: number, next_task_id: number},
  fetchedColumns: column[];
}

function Page({user, fetchedColumns} : PageProps) {
  const [currentwidth, setCurrentWidth] = useState(window.innerWidth);
  const [hamburgerVisibility, setHamburgerVisibility] = useState(false);
  const [columns, setColumns] = useState<Array<column>>(fetchedColumns);
  const [columnNextID, setColumnNextID] = useState(user.next_column_id);
  const [nextTaskID, setNextTaskID] = useState(user.next_task_id);

  window.addEventListener("resize", (e: Event) => {
    const target = e.currentTarget as Window;
    setCurrentWidth(target.innerWidth);
  });

  async function handleOnDelete(id: number) {
    setColumns(columns.filter((item) => item.id !== id));
    const deletingColumn = await fetchPost("/column/delete", {id: id})
  }
  function handleTaskDelete(newTaskList: task[], colID: number) {
    let placeholder: column[] = [];
    columns.map((item) => {
      if (colID === item.id) {
        item.taskList = newTaskList;
        placeholder.push(item);
        return;
      }
      placeholder.push(item);
    });
    setColumns(placeholder);
  }
  async function handleTaskMove(
    movedTask: task,
    targetColumnID: number,
    columnInstance: column
  ) {
    columns.forEach((item) => {
      if (item.id == columnInstance.id) {
        item.taskList = item.taskList.filter(
          (Task) => Task.id !== movedTask.id
        );
      }
      if (item.id == targetColumnID) {
        item.taskList = [...item.taskList, movedTask];
      }
    });
    await fetchPost("/task/move", {taskID: movedTask.id, column_id: targetColumnID});
    setColumns([...columns]);
  }

  return(
    <>
      {currentwidth < 850 ? (
        <Header
          setHamburger={setHamburgerVisibility}
          hamburger={hamburgerVisibility}
          username={user.login}
        />
      ) : (
        <DesktopHeader
          setColumns={setColumns}
          columnList={columns}
          currentID={columnNextID}
          setCurrentID={setColumnNextID}
          username={user.login}
          userID={user.id}
        />
      )}

      {hamburgerVisibility && (
        <MobileInput
          setHamburger={setHamburgerVisibility}
          hamburger={hamburgerVisibility}
          setColumns={setColumns}
          columnList={columns}
          currentID={columnNextID}
          setCurrentID={setColumnNextID}
        ></MobileInput>
      )}

      <main className="main">
        {columns.map((column: column) => {
          return (
            <Column
              deleteRerender={handleTaskDelete}
              key={column.id}
              colInstance={column}
              onDelete={handleOnDelete}
              columns={columns}
              taskMove={handleTaskMove}
              nextTaskID={nextTaskID}
              setNextTaskID={setNextTaskID}
              userID={user.id}
            />
          );
        })}
      </main>
    </>
  );
}
export default Page;
