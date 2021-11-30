import { Button } from '@chakra-ui/react';
import {
  GoogleAuthProvider, getAuth, signInWithRedirect, FacebookAuthProvider,
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
        <Button type="button" colorScheme="cyan" onClick={handleGoogleAuth}>Bejelentkezés Google fikókkal</Button>
      </div>
      <div>
        <Button type="button" colorScheme="blue" onClick={handleFacebookAuth}>Bejelentkezés Facebook fikókkal</Button>
      </div>
    </>
  );
};
