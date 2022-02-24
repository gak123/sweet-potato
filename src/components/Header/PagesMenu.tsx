import React from 'react';
import { Flex, Box, Container, Heading } from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import Link from 'components/Link';
import { useLocale } from 'hooks/locales';

const PagesMenu: React.FC = () => {
  const { t } = useLocale();

  return (
    <Box
      w="full"
      position="fixed"
      bgColor="bodyBg.light"
      borderBottom="1px"
      borderColor="componentBg.light"
      zIndex={2}
    >
      <Container pt={{ base: '60px', xl: '85px' }}>
        <Flex
          justify={{ base: undefined, xl: 'center' }}
          flexWrap="nowrap"
          overflowX="auto"
          sx={{
            scrollbarWidth: 'none',
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Box my={4} mr={6} flexShrink={0} fontSize="1.4em">
            <Link href="/levels/new">
              <Flex align="center" gap={2}>
                <Box fontSize="1.2em" color="#67C7D4">
                  <Icon icon="mdi:file-edit" />
                </Box>
                <Heading fontSize="0.75em">{t.PAGES_MENU.LEVELS}</Heading>
              </Flex>
            </Link>
          </Box>

          <Box my={4} mx={6} flexShrink={0} fontSize="1.4em">
            <Link href="/effects">
              <Flex align="center" gap={2}>
                <Box fontSize="1.2em">
                  <Icon icon="mdi:star-shooting" style={{ color: '#f9ca24' }} />
                </Box>
                <Heading fontSize="0.75em">{t.PAGES_MENU.EFFECTS}</Heading>
              </Flex>
            </Link>
          </Box>

          <Box my={4} mx={6} flexShrink={0} fontSize="1.4em">
            <Link href="/engines">
              <Flex align="center" gap={2}>
                <Box fontSize="1.2em" color="#777777">
                  <Icon icon="mdi:engine" />
                </Box>
                <Heading fontSize="0.75em">{t.PAGES_MENU.ENGINES}</Heading>
              </Flex>
            </Link>
          </Box>

          <Box my={4} mx={6} flexShrink={0} fontSize="1.4em">
            <Link href="/backgrounds">
              <Flex align="center" gap={2}>
                <Box fontSize="1.2em" color="#60CAAD">
                  <Icon icon="mdi:panorama-variant" />
                </Box>
                <Heading fontSize="0.75em">{t.PAGES_MENU.BACKGROUNDS}</Heading>
              </Flex>
            </Link>
          </Box>

          <Box my={4} mx={6} flexShrink={0} fontSize="1.4em">
            <Link href="/skins">
              <Flex align="center" gap={2}>
                <Box fontSize="1.2em" color="#6495ED">
                  <Icon icon="ant-design:skin-fill" />
                </Box>
                <Heading fontSize="0.75em">{t.PAGES_MENU.SKINS}</Heading>
              </Flex>
            </Link>
          </Box>

          <Box my={4} mx={6} flexShrink={0} fontSize="1.4em">
            <Link href="/particles">
              <Flex align="center" gap={2}>
                <Box fontSize="1.2em" color="#EE817B">
                  <Icon icon="mdi:dots-grid" />
                </Box>
                <Heading fontSize="0.75em">{t.PAGES_MENU.PARTICLES}</Heading>
              </Flex>
            </Link>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default PagesMenu;
