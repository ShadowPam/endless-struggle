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
    function onLoginACB(email, password) {
        setPersistence(auth, browserLocalPersistence).then(() => {
            signInWithEmailAndPassword(auth, email, password);
        });
    }

    function onSignUpACB(email, password) {
        setPersistence(auth, browserLocalPersistence).then(() => {
            createUserWithEmailAndPassword(auth, email, password);
        });
    }

    return <LoginView user={props.model.user} login={onLoginACB} signup={onSignUpACB} />;
});

export { Login };
