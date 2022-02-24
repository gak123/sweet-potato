import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLocale } from 'hooks/locales';
import {
  Container,
  AspectRatio,
  Image,
  Box,
  Heading,
  Button,
  Grid,
  GridItem,
  Flex,
} from '@chakra-ui/react';
import { FiEdit, FiUploadCloud } from 'react-icons/fi';
import InfiniteScroll from 'react-infinite-scroller';
import { useAuth } from 'hooks/auth';
import { clientLegacy } from 'framework/potato/client';
import { Level } from 'framework/potato/legacy/@types';
import SEO from 'components/SEO';
import SideMenu from 'components/SideMenu/DashBoard';

const LevelList: React.FC = () => {
  const [levels, setLevels] = useState<Level[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const { t } = useLocale();
  const { user, status, profile } = useAuth();

  const fetchMyLevels = async (page: number) => {
    const token = await user?.getIdToken();

    const res = await clientLegacy.users._userId(profile.uid).levels.list.$get({
      query: { page: page },
      config: { headers: { Authorization: `Bearer ${token}` } },
    });

    if (res.items.length < 1) {
      setHasMore(false);
      return;
    }

    setLevels([...levels, ...res.items]);
  };

  useEffect(() => {
    if (!status.isAuthed) router.push('/');
  }, []);

  return (
    <>
      <SEO
        path="/manage/contents/levels/list"
        title={t.DASHBOARD.CONTENTS.LEVELS.PAGE_TITLE}
        description=""
        thumbnail=""
        allowIndex={false}
      />
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', xl: 'repeat(4, 1fr)', '2xl': 'repeat(5, 1fr)' }}
      >
        <GridItem colSpan={1}>
          <SideMenu index={0} />
        </GridItem>
        <GridItem mx={{ base: 0, xl: 8 }} colSpan={{ base: 1, xl: 3, '2xl': 4 }}>
          <Container variant="dashboard">
            <Flex align="center" justify="space-between">
              <Heading my={8} fontSize="1.4em" lineHeight={1}>
                {t.DASHBOARD.CONTENTS.LEVELS.PAGE_TITLE}
              </Heading>
              <Button
                leftIcon={<FiUploadCloud />}
                bgColor="potato"
                color="white"
                width="100px"
                onClick={() => {
                  router.push('/manage/contents/levels/add');
                }}
              >
                {t.HEADER.UPLOAD}
              </Button>
            </Flex>
            <InfiniteScroll pageStart={-1} loadMore={fetchMyLevels} hasMore={hasMore}>
              <Grid
                my={8}
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  lg: 'repeat(2, 1fr)',
                  '2xl': 'repeat(3, 1fr)',
                  '3xl': 'repeat(5, 1fr)',
                }}
                gap={8}
              >
                {levels.map((level: Level) => (
                  <GridItem colSpan={1} key={level.name}>
                    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                      <GridItem colSpan={1}>
                        <Flex justify="left">
                          <Box w="100%" borderRadius="base">
                            <AspectRatio ratio={1}>
                              <Image
                                src={`${process.env.API_URL_LEGACY}${level.cover.url}`}
                                alt=""
                                objectFit="cover"
                                borderRadius="base"
                                userSelect="none"
                                pointerEvents="none"
                              />
                            </AspectRatio>
                          </Box>
                        </Flex>
                      </GridItem>
                      <GridItem colSpan={2} position="relative">
                        <Heading fontSize="1em" noOfLines={3}>
                          {level.title}
                        </Heading>

                        <Button
                          mt={4}
                          position="absolute"
                          bottom={0}
                          leftIcon={<FiEdit />}
                          size="xs"
                          color="white"
                          bgColor="potato"
                          onClick={() => {
                            router.push(
                              {
                                pathname: '/manage/contents/levels/edit',
                                query: { id: level.name, uid: profile.uid },
                              },
                              '/manage/contents/levels/edit',
                            );
                          }}
                        >
                          {t.DASHBOARD.CONTENTS.LEVELS.EDIT}
                        </Button>
                      </GridItem>
                    </Grid>
                  </GridItem>
                ))}
              </Grid>
            </InfiniteScroll>
          </Container>
        </GridItem>
      </Grid>
    </>
  );
};

export default LevelList;
