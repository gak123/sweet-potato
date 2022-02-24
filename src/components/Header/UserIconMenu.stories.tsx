import React from 'react';
import { Box } from '@chakra-ui/react';
import UserIconMenu from 'components/Header/UserIconMenu';
import { profile } from 'hooks/auth';

export default { title: 'Header/UserIconMenu' };

const user: profile = {
  uid: 'N58D0R9uaGVZ1R986qBUgUC9ZZQ2',
  userName: 'A O',
  profileImage:
    'https://lh3.googleusercontent.com/a-/AOh14Gg2e4zCW7ur8SJY4ofQgp1QgSyzOfU5eAhlUBSabw=s96-c',
};

export const normal = (): JSX.Element => (
  <Box h="40px">
    <UserIconMenu {...user} />
  </Box>
);
