import { useRef, useState } from "react";
import "./styles/LoginForm.scss";

function LoginForm(){
    const loginRef = useRef<HTMLInputElement>(null);
    const loginLabel = useRef<HTMLLabelElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordLabel = useRef<HTMLLabelElement>(null);
    
    function handleLoginFocus(){
        loginLabel.current!.style.transform = 'translate(-5px, -15px)';
    }
    function handleLoginBlur(){
        let inputText = loginRef.current?.value 
        if(inputText?.trim() != ''){
            return
        }
        loginLabel.current!.style.transform = 'translate(0, 0)';
    }
    function handlePasswordFocus(){
        passwordLabel.current!.style.transform = 'translate(-5px, -15px)';
    }
    function handlePasswordBlur(){
        if(passwordRef.current?.value != ''){
            return
        }
        passwordLabel.current!.style.transform = 'translate(0, 0)';
    }
    return(
        <form  className="form" action="/login">
            <div className="form__loginPosition">
            <label ref={loginLabel} className="form__loginPosition--label" htmlFor="login">Login</label><br/>
            <input onFocus={handleLoginFocus} onBlur={handleLoginBlur} ref={loginRef} type="text" name="login" id="login" className="form__loginPosition--login" />
            </div>
            <div className="form__passwordPosition">
            <label ref={passwordLabel} className="form__passwordPosition--label" htmlFor="password">Password</label><br/>
            <input onFocus={handlePasswordFocus} onBlur={handlePasswordBlur} ref={passwordRef} type="password" name="password" id="password" className="form__passwordPosition--password" />
            </div>
            <div className="form__buttonFlex">
            <button className="form__buttonFlex--loginButton">Log in</button>
            <button className="form__buttonFlex--signupButton">Sign up</button>
            </div>
        </form>
    )
}


export default LoginForm;