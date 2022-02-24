import React from 'react';
import { Box, Image } from '@chakra-ui/react';

const Logo: React.FC = () => {
  return (
    <Box h={{ base: '32px', lg: '40px' }}>
      <Image
        h="100%"
        src="/logo.png"
        fallbackSrc="https://firebasestorage.googleapis.com/v0/b/sonolus-uploader.appspot.com/o/logo.png?alt=media&token=f89fdd25-183e-4530-b2f4-6b00e1ca52b7"
        alt="Sweet Potato"
        pointerEvents="none"
      />
    </Box>
  );
};

export default Logo;
