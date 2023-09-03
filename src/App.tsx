import { useState } from "react";
import "./styles/App.scss";
import "./Header";
import Header from "./Header";
import MobileInput from "./MobileInput";
import Column from "./Column";
import { column, task } from "./Classes";

function App() {
  const [currentwidth, setCurrentWidth] = useState(0);
  const [hamburgerVisibility, setHamburgerVisibility] = useState(false);
  const [columns, setColumns] = useState<Array<column>>([]);
  const [columnNextID, setColumnNextID] = useState(1);

  window.addEventListener("resize", (e: Event) => {
    const target = e.currentTarget as Window;
    setCurrentWidth(target.innerWidth);
  });
  function handleOnDelete(id: number) {
    setColumns(columns.filter((item) => item.id !== id));
  }

  function updateColumnTaskList(newList: task[], id: number) {
    let placeholder: column[] = [];
    columns.map((item: column) => {
      if (item.id === id) {
        item.taskList = newList;
        placeholder.push(item);
        return;
      }
      placeholder.push(item);
    });
    return placeholder;
  }

  function handleOnAddTask(list: task[], id: number) {
    setColumns(updateColumnTaskList(list, id));
  }

  return (
    <>
      {currentwidth < 850 ? (
        <Header
          setHamburger={setHamburgerVisibility}
          hamburger={hamburgerVisibility}
        />
      ) : null}

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
              key={column.id}
              instance={column}
              onDelete={handleOnDelete}
              handleAddTask={handleOnAddTask}
              columns={columns}
            />
          );
        })}
      </main>
    </>
  );
}
export default App;
