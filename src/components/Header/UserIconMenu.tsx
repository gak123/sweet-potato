import React from 'react';
import {
  AspectRatio,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Text,
} from '@chakra-ui/react';
import { profile } from 'hooks/auth';
import Link from 'components/Link';

const UserIconMenu: React.FC<profile> = ({ profileImage }) => {
  return (
    <Menu autoSelect={false}>
      <MenuButton p={0} as={Button}>
        <AspectRatio boxSize="40px" ratio={[1]}>
          <Box>
            <Image src={profileImage} borderRadius="circle" pointerEvents="none" />
          </Box>
        </AspectRatio>
      </MenuButton>
      <MenuList>
        <MenuItem>
          <Link href="/manage/contents/levels/list">
            <Text>ダッシュボード</Text>
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserIconMenu;
