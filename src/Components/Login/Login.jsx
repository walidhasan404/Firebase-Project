import React, { useState } from 'react';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from '../../firebase/firebase.init';

const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const logggedInUser = result.user;
                console.log(logggedInUser);
                setUser(logggedInUser);
            })
            .catch(error => {
                console.log('error', error.message);
            })
    }

    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const logggedUser = result.user;
                console.log(logggedUser);
                setUser(logggedUser);
            })
            .catch(error =>{
                console.log(error);
            })
    }

    const handleGoogleLogOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result);
                setUser(null);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            {user ?
                <button onClick={handleGoogleLogOut}>Log Out</button> :
                <>
                    <button onClick={handleGoogleSignIn}>Google Login</button>
                    <button onClick={handleGithubSignIn}>Github Login</button>
                </>
            }
            {user && <div>
                User: {user?.displayName} <br />
                email: {user?.email} <br />
                <img src={user?.photoURL} alt="" />
            </div>}
        </div>
    );
};

export default Login;