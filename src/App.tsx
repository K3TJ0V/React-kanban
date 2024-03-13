import { useState } from "react";
import LoginForm from "./LoginForm.tsx";
import Page from "./Page.tsx";
import { column, fetchedColumns, task } from "./Classes.ts";

function App(){
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState(Object);
    const [columns, setColumns] = useState<Array<fetchedColumns>>([]);

    let downloadedColumns: column[] = []

    columns.forEach(row =>{
      let columnTemplate = new column(
        row.colid,
        row.tittle,
        [],
      )
      if(downloadedColumns.find(element => element.id === row.column_id)){
        return;
      }
      downloadedColumns.push(columnTemplate);
    })
    columns.forEach(row =>{
      downloadedColumns.map(item =>{
        if(item.id === row.column_id){
          if(row.column_id === null){
            return;
          }
          let taskTemplate = new task(row.id, row.description, row.short_description)
          item.taskList.push(taskTemplate);
        }
      })
    })

    return(
        <>
            {logged ?  <Page user={user} fetchedColumns={downloadedColumns}/>: <LoginForm setLogged={setLogged} setUser={setUser} setColumns={setColumns}/>}
        </>
    )
}


export default App;