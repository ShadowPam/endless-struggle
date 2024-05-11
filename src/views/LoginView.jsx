import { signOut } from "firebase/auth";
import { auth } from "../firebaseModel";

export function LoginView(props) {
    let buttonIndex = 0;

    function GoToMenu() {
        window.location.hash = "#/menu";
    }

    function loginOrSignUpACB(e) {
        e.preventDefault();
        console.log("here");
        if (buttonIndex === 0) {
            loginACB();
        } else {
            signUpACB();
        }
        GoToMenu();
    }

    function loginACB(e) {
        console.log("login");
        props.login(
            document.getElementById("email").value,
            document.getElementById("password").value
        );
    }

    function signUpACB(e) {
        console.log("signup");
        props.signup(
            document.getElementById("email").value,
            document.getElementById("password").value
        );
    }

    return (
        <div>
            <button className="pausebutton" onClick={GoToMenu}>
                Back to Menu
            </button>
            {!props.user ? (
                <form onSubmit={loginOrSignUpACB}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <br />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                        <br />
                        <label htmlFor="password">password:</label>
                        <br />
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                        <br />
                        <br />
                        <button type="submit" name="login">
                            Login
                        </button>
                        <button type="submit" onClick={() => buttonIndex++} name="signup">
                            Sign-up
                        </button>
                    </div>
                </form>
            ) : (
                ""
            )}
        </div>
    );
}
