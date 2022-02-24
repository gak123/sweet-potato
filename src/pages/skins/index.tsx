import React from 'react';
import { Container, Box, Heading, Text } from '@chakra-ui/react';
import SEO from 'components/SEO';
import PagesMenu from 'components/Header/PagesMenu';

const SkinsList: React.FC = () => {
  return (
    <>
      <SEO path="/skins" title="Skins" description="" thumbnail="" allowIndex={false} />
      <PagesMenu />
      <Container variant="withMenu" centerContent>
        <Box pt={8} my={2}>
          <Heading fontSize="2.5em">Skins</Heading>
        </Box>
        <Box my={2}>
          <Text>We will release a feature that you can publish your skins! </Text>
        </Box>
      </Container>
    </>
  );
};

export default SkinsList;
