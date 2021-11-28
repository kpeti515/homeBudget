import { Button } from '@chakra-ui/core';
import {
  GoogleAuthProvider, getAuth, signInWithRedirect, signInWithPopup, FacebookAuthProvider,
} from 'firebase/auth';

export const Login = () => {
  const provider = new GoogleAuthProvider();
  const fbProvider = new FacebookAuthProvider();
  const auth = getAuth();
  const handleGoogleAuth = () => {
    signInWithRedirect(auth, provider);
  };
  const handleFacebookAuth = () => {
    signInWithRedirect(auth, fbProvider);
  };

  return (
    <>
      <div>
        <Button type="button" variantColor="cyan" onClick={handleGoogleAuth}>Bejelentkezés Google fikókkal</Button>
      </div>
      <div>
        <Button type="button" variantColor="blue" onClick={handleFacebookAuth}>Bejelentkezés Facebook fikókkal</Button>
      </div>
    </>
  );
};
