import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/LoginRegisterForm.scss";
import { fetchPost } from "./fetchMethods";
import { handleOnBlur, handleOnFocus } from "./inputAnimations";
import { popup } from './popup.ts';
import { fetchedColumns } from "./Classes.ts";

interface LoginFormProps{
  setLogged: React.Dispatch<React.SetStateAction<boolean>>,
  setUser: React.Dispatch<React.SetStateAction<{}>>,
  setColumns: React.Dispatch<React.SetStateAction<fetchedColumns[]>> 
}

function LoginForm({setLogged, setUser, setColumns} : LoginFormProps) {
  const loginRef = useRef<HTMLInputElement>(null);
  const loginLabel = useRef<HTMLLabelElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordLabel = useRef<HTMLLabelElement>(null);
  const navigate = useNavigate();
  const [popupText, setPopupText] = useState('test');
  const popupRef = useRef<HTMLElement>(null);

  function handleLogIn() {}

  async function handleOdSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();    
    const form = e.target as HTMLFormElement
    const data = {
        login: form.login.value,
        password: form.password.value
    };
    const userFetch = await fetchPost('/user/login', data);
    if('error' in userFetch){
      popup({type: 'error', message: userFetch.error, popupRef, setPopupText});
    }else{
      popup({type: 'succes', message: userFetch.message, popupRef, setPopupText});
      setTimeout(() => {
        setLogged(true)
        setUser(userFetch.user);
        setColumns(userFetch.columnData)
      }, 4000);
    }
  }
  
  return (
    <>
    <section className="popup" ref={popupRef}>
    {popupText}
    </section>
    <form
      onSubmit={(e) => {
        handleOdSubmit(e);
      }}
      className="form"
    >
      <div className="form__loginPosition">
        <label
          ref={loginLabel}
          className="form__loginPosition--label"
          htmlFor="login"
        >
          Login
        </label>
        <br />
        <input
          onFocus={()=>{handleOnFocus(loginLabel)}}
          onBlur={()=>{handleOnBlur(loginLabel, loginRef)}}
          ref={loginRef}
          type="text"
          name="login"
          id="login"
          className="form__loginPosition--login"
        />
      </div>
      <div className="form__passwordPosition">
        <label
          ref={passwordLabel}
          className="form__passwordPosition--label"
          htmlFor="password"
        >
          Password
        </label>
        <br />
        <input
          onFocus={()=>{handleOnFocus(passwordLabel)}}
          onBlur={()=>{handleOnBlur(passwordLabel, passwordRef)}}
          ref={passwordRef}
          type="password"
          name="password"
          id="password"
          className="form__passwordPosition--password"
        />
      </div>
      <div className="form__buttonFlex">
        <button className="form__buttonFlex--loginButton" onClick={handleLogIn}>
          Log in
        </button>
        <button className="form__buttonFlex--signupButton" onClick={()=>{navigate('/signup')}}>Sign up</button>
      </div>
    </form>
    </>
  );
}

export default LoginForm;
 