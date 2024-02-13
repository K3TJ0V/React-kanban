import { useState } from "react";
import LoginForm from "./LoginForm.tsx";
import Page from "./Page.tsx";

function App(){
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState(Object);
    return(
        <>
            {logged ?  <Page user={user}/>: <LoginForm setLogged={setLogged} setUser={setUser}/>}
        </>
    )
}


export default App;