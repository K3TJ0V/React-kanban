import { useState } from "react";
import "./styles/App.scss";
import "./Header";
import Header from "./Header";
import MobileInput from "./MobileInput";
import Column from "./Column";
import { column, task } from "./Classes";
import DesktopHeader from "./DesktopHeader";

function App() {
  const [currentwidth, setCurrentWidth] = useState(window.innerWidth);
  const [hamburgerVisibility, setHamburgerVisibility] = useState(false);
  const [columns, setColumns] = useState<Array<column>>([]);
  const [columnNextID, setColumnNextID] = useState(1);
  const [nextTaskID, setNextTaskID] = useState(1);

  window.addEventListener("resize", (e: Event) => {
    const target = e.currentTarget as Window;
    setCurrentWidth(target.innerWidth);
  });

  function handleOnDelete(id: number) {
    setColumns(columns.filter((item) => item.id !== id));
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
  function handleTaskMove(
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
    setColumns([...columns]);
  }

  return (
    <>
      {currentwidth < 850 ? (
        <Header
          setHamburger={setHamburgerVisibility}
          hamburger={hamburgerVisibility}
        />
      ) : (
        <DesktopHeader
          setColumns={setColumns}
          columnList={columns}
          currentID={columnNextID}
          setCurrentID={setColumnNextID}
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
            />
          );
        })}
      </main>
    </>
  );
}
export default App;
