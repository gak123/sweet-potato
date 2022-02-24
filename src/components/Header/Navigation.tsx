import React, { useEffect, useState } from 'react';
import { useMediaQuery, Flex, Box, useColorModeValue, Spacer, Spinner } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import { useAuth } from 'hooks/auth';
import Logo from 'components/Header/Logo';
import Login from 'components/Buttons/Login';
import Link from 'components/Link';
import DrawerMenu from 'components/Header/DrawerMenu';
import UserIconMenu from 'components/Header/UserIconMenu';

const HeaderNav: React.FC = () => {
  const { status, profile } = useAuth();
  const [isLargerThan1024] = useMediaQuery('(min-width: 1024px)');
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    setVisible(isLargerThan1024);
  }, [isLargerThan1024]);

  return (
    <Flex
      pl={4}
      pr={[2, 4, 8, 8, 16]}
      w="full"
      h={{ base: '60px', xl: '85px' }}
      align="center"
      position="fixed"
      zIndex={10}
      borderBottom="1px"
      borderColor={useColorModeValue('componentBg.light', 'componentBg.dark')}
      bgColor={useColorModeValue('bodyBg.light', 'bodyBg.dark')}
      userSelect="none"
    >
      <Flex h={{ base: '32px', lg: '40px' }}>
        <Flex align="center" gap={4}>
          <Box>
            <DrawerMenu />
          </Box>
          <Box>
            <Link href="/">
              <Logo />
            </Link>
          </Box>
        </Flex>
      </Flex>
      <Spacer />
      <Flex h={{ base: '32px', lg: '40px' }}>
        <Flex align="center" gap={{ base: 2, lg: 4 }}>
          <Box>
            <Link href="/search">
              <Box fontSize="1.6em">
                <Icon icon="mdi:magnify" />
              </Box>
            </Link>
          </Box>
          <Box style={{ display: visible ? undefined : 'none' }}>
            {!status.isLoaded ? (
              <Flex align="center" justify="center" boxSize="40px">
                <Spinner size="sm" color="potato" />
              </Flex>
            ) : (
              <>
                {status.isAuthed ? (
                  <UserIconMenu {...profile} />
                ) : (
                  <Box>
                    <Login />
                  </Box>
                )}
              </>
            )}
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HeaderNav;
