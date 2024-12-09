import React from 'react';
import { auth } from '../config/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ROUTES } from '../constants/routes';
import LocalStorage from '../utils/storageUtils/LocalStorage';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate=useNavigate()
  const signin = () => {
    const provider = new GoogleAuthProvider(); 
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('User signed in:', result.user);
        LocalStorage.login(result.user);
        navigate(ROUTES.FEED);
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
        alert(error.message);
      });
  };

  return (
    <div>
      <button onClick={signin}>
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
