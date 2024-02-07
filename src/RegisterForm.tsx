import { useRef, useState } from "react";
import "./styles/LoginRegisterForm.scss";
import {handleOnBlur, handleOnFocus} from "./inputAnimations";
import { useNavigate } from "react-router-dom";
import { fetchPost } from "./fetchMethods";
import { popup } from './popup.ts';

function RegisterForm() {
  const loginRef = useRef<HTMLInputElement>(null);
  const loginLabel = useRef<HTMLLabelElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordLabel = useRef<HTMLLabelElement>(null);
  const navigate = useNavigate();
  const [popupText, setPopupText] = useState('test');
  const popupRef = useRef<HTMLElement>(null);

  async function handleOdSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();    
    const form = e.target as HTMLFormElement
    const data = {
        login: form.login.value, 
        password: form.password.value
    };
    if(data.login.length < 8){
      popup({type:'error', message:'login is too short (min. 8 characters)', popupRef, setPopupText});
      return
    }else if(data.password.length < 8){
      popup({type:'error', message:'password is too short (min. 8 characters)', popupRef, setPopupText});
      return
    }
    const userFetch = await fetchPost('/user/create', data);
    if('error' in userFetch){
      popup({type: 'error', message: userFetch.error, popupRef, setPopupText});
    }else{
      popup({type: 'succes', message: userFetch.message, popupRef, setPopupText});
    }
    
  }
  
  return (
    <>
    <section className="popup" ref={popupRef}>
    {popupText}
    </section>
    <form className="form" onSubmit={handleOdSubmit}>
      <div className="form__loginPosition">
        <label
          className="form__loginPosition--label"
          htmlFor="login"
          ref={loginLabel}
        >
          Login
        </label>
        <br />
        <input
          name="login"
          id="login"
          className="form__loginPosition--login"
          ref={loginRef}
          onFocus={() => {
            handleOnFocus(loginLabel);
          }}
          onBlur={() => {
            handleOnBlur(loginLabel, loginRef);
          }}
        />
      </div>
      <div className="form__passwordPosition">
        <label
          className="form__passwordPosition--label"
          htmlFor="password"
          ref={passwordLabel}
        >
          Password
        </label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          className="form__passwordPosition--password"
          ref={passwordRef}
          onFocus={() => {
            handleOnFocus(passwordLabel);
          }}
          onBlur={() => {
            handleOnBlur(passwordLabel, passwordRef);
          }}
        />
      </div>
      <button type="submit" className="form__buttonFlex--signupButton">Sign up</button>
    </form>
    </>
  );
}



export default RegisterForm;
