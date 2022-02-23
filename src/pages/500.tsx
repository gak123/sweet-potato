import React from 'react';
import { Container, Box, Heading, Text } from '@chakra-ui/react';
import SEO from 'components/SEO';
import PagesMenu from 'components/Header/PagesMenu';
import { useLocale } from 'hooks/locales';

const NotFound: React.FC = () => {
  const { t } = useLocale();
  return (
    <>
      <SEO path="/500" title="500" description="" thumbnail="" allowIndex={false} />
      <PagesMenu />
      <Container variant="withMenu" centerContent>
        <Box pt={16}>
          <Heading fontSize={['4em', '5em', '6em']}>500</Heading>
        </Box>
        <Box>
          <Text>{t.PAGE_ERROR['500']}</Text>
        </Box>
      </Container>
    </>
  );
};

export default NotFound;
