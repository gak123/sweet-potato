import React from 'react';
import { Container, Box, Heading, Text } from '@chakra-ui/react';
import SEO from 'components/SEO';
import PagesMenu from 'components/Header/PagesMenu';
import { useLocale } from 'hooks/locales';

const NotFound: React.FC = () => {
  const { t } = useLocale();
  return (
    <>
      <SEO path="/404" title="404" description="" thumbnail="" allowIndex={false} />
      <PagesMenu />
      <Container variant="withMenu" centerContent>
        <Box pt={16}>
          <Heading fontSize={['4em', '5em', '6em']}>404</Heading>
        </Box>
        <Box>
          <Text>{t.PAGE_ERROR['404']}</Text>
        </Box>
      </Container>
    </>
  );
};

export default NotFound;
