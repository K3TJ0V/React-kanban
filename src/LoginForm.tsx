import "./styles/LoginForm.scss";

function LoginForm(){


    return(
        <form className="form" action="/login">
            <label>Login<br/><input type="text" name="login" id="login" className="form__login" /></label>
            <label>Password<br/><input type="password" name="password" id="pasword" className="form__password" /></label>
            <div>
            <button className="form__loginButton">Log in</button>
            <button className="form__SignupButton">Sign up</button>
            </div>
        </form>
    )
}


export default LoginForm;