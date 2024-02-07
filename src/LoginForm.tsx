import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/LoginRegisterForm.scss";
import { fetchPost } from "./fetchMethods";
import { handleOnBlur, handleOnFocus } from "./inputAnimations";


function LoginForm() {
  const loginRef = useRef<HTMLInputElement>(null);
  const loginLabel = useRef<HTMLLabelElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordLabel = useRef<HTMLLabelElement>(null);
  const navigate = useNavigate();

  function handleLogIn() {}

  async function handleOdSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();    
    const form = e.target as HTMLFormElement
    const data = {
        login: form.login.value,
        password: form.password.value
    };
  }
  
  return (
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
  );
}

export default LoginForm;
 