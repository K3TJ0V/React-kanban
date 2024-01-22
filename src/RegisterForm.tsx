import { useRef } from "react";
import "./styles/LoginRegisterForm.scss";

function RegisterForm() {
  const loginRef = useRef<HTMLInputElement>(null);
  const loginLabel = useRef<HTMLLabelElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordLabel = useRef<HTMLLabelElement>(null);

  function handleOnFocus( 
    labelRef: React.RefObject<HTMLLabelElement>
  ) {
    if (labelRef.current?.htmlFor === "login") {
      labelRef.current!.style.transform = "translate(-5px, -15px)";
    } else {
      labelRef.current!.style.transform = "translate(-5px, -15px)";
    }
  }
  function handleOnBlur(
    labelRef: React.RefObject<HTMLLabelElement>,
    inputRef: React.RefObject<HTMLInputElement>
  ) {
    if (inputRef.current?.name === "login") {
      let inputText = inputRef.current.value;
      if (inputText.trim() != "") {
        return;
      }
      labelRef.current!.style.transform = "translate(0, 0)";
    } else {
      if (inputRef.current?.value != "") {
        return;
      }
      labelRef.current!.style.transform = "translate(0,0)";
    }
  }

  return (
    <form className="form">
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
      <button className="form__buttonFlex--signupButton">Sign up</button>
    </form>
  );
}

export default RegisterForm;
