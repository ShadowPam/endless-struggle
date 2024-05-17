import { LoginView } from "../views/LoginView.jsx";
import { observer } from "mobx-react-lite";
import { auth } from "../firebaseModel.js";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth";

const Login = observer(function LoginRender(props) {

    function GoToMenuACB() {
        window.location.hash = "#/menu";
    }


    function onLoginACB(email, password) {
        setPersistence(auth, browserLocalPersistence).then(() => {
            signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                props.model.resetModel();
                GoToMenuACB();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);

                alert("Email/password is wrong.")
              });
        });
    }

    function onSignUpACB(email, password) {
        setPersistence(auth, browserLocalPersistence).then(() => {
            createUserWithEmailAndPassword(auth, email, password)
            .then((e) => {
                props.model.resetModel();
                GoToMenuACB();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);

                if (errorCode == "auth/email-already-in-use"){
                    alert("Email already in use!")
                } else{
                    alert("Password should be at least 6 characters!")
                }
              });
        });
    }

    return <LoginView user={props.model.user} login={onLoginACB} signup={onSignUpACB} redirectMenu={GoToMenuACB} />;
});

export { Login };
