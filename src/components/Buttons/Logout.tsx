import React from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { useLocale } from 'hooks/locales';
import { useAuth } from 'hooks/auth';

import { parseCookies, destroyCookie } from 'nookies';
import { APIClient } from 'framework/api/api_client';

const Logout: React.FC = () => {
  const { setStatus, setProfile } = useAuth();
  const { t } = useLocale();

  const revokeToken = async () => {
    const { token } = parseCookies();
    const client = new APIClient({
      token,
      baseURL: process.env.API,
    });

    await client.auth.postLogout({}).catch();
    destroyCookie(undefined, 'token');

    setStatus({
      isLoaded: true,
      isAuthed: false,
    });

    setProfile({
      uid: undefined,
      userName: undefined,
      profileImage: undefined,
    });
  };

  return (
    <Flex justify="right" width="full">
      <Button leftIcon={<FiLogOut />} onClick={revokeToken} fontWeight={400} fontSize="0.8em">
        {t.COMPONENTS.BUTTONS.LOGOUT.TEXT}
      </Button>
    </Flex>
  );
};

export default Logout;
