import React, { useState } from 'react';
import { Button, Text } from '@chakra-ui/react';
import { FiLogIn } from 'react-icons/fi';
import { useLocale } from 'hooks/locales';
import { useAuth } from 'hooks/auth';
import { setCookie } from 'nookies';

import { APIClient } from 'framework/api/api_client';
import ErrorModal from 'components/Modal/Error';

import firebase from 'framework/firebase/sdk';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();

const Login: React.FC = () => {
  const { setStatus } = useAuth();
  const { t } = useLocale();
  const [error, setError] = useState<string>();

  const popupLogin = (): void => {
    const auth = getAuth(firebase);
    signInWithPopup(auth, provider).then(async () => {
      const idToken = await auth!.currentUser!.getIdToken();

      const client = new APIClient({
        baseURL: process.env.API,
      });

      try {
        const res = await client.auth
          .postLogin({
            Token: idToken,
          })
          .catch(() => {
            throw new Error(t.COMPONENTS.BUTTONS.LOGIN.MODAL.ERROR);
          });

        const session = res.Session;

        setCookie(undefined, 'token', session, {
          maxAge: 60 * 60 * 24 * 14,
          secure: true,
          path: '/',
        });

        setStatus({
          isLoaded: false,
          isAuthed: true,
        });
      } catch (e) {
        if (e instanceof Error) setError(e.message);
      }
    });
  };

  return (
    <>
      <Button
        leftIcon={<FiLogIn />}
        bgColor="potato"
        color="white"
        onClick={popupLogin}
        width="full"
      >
        {t.COMPONENTS.BUTTONS.LOGIN.TEXT}
      </Button>
      <ErrorModal
        opened={error !== undefined}
        title={t.COMPONENTS.BUTTONS.LOGIN.MODAL.TITLE}
        onClose={() => {
          setError(undefined);
        }}
      >
        <Text>{error}</Text>
      </ErrorModal>
    </>
  );
};

export default Login;
