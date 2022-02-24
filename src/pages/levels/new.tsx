import React, { useState, useEffect } from 'react';
import { useLocale } from 'hooks/locales';
import { Container, SimpleGrid, Heading, Box } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroller';
import { client } from 'framework/potato/client';
import { Level } from 'models/Level';
import SEO from 'components/SEO';
import Score from 'components/Card/Score';
import PagesMenu from 'components/Header/PagesMenu';

const New: React.FC = () => {
  const { t } = useLocale();
  const [levels, setLevels] = useState<Level[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchLevels = async (page: number) => {
    const res = await client.levels.list.$get({ query: { page: page } });

    if (res.items.length < 1) {
      setHasMore(false);
      return;
    }

    console.log(res.items[0]);
    setLevels([...levels, ...res.items]);
  };

  useEffect(() => {
    if (levels.length !== 0) return;
  });

  return (
    <>
      <SEO
        path="/levels/new"
        title={t.TOP_PAGE.PAGE_TITLE}
        description=""
        thumbnail=""
        allowIndex={true}
      />
      <PagesMenu />
      <Container variant="withMenu">
        <Heading my={16} fontSize="1.4em" textAlign="center">
          {t.TOP_PAGE.NEW_SCORE_LIST}
        </Heading>

        <Box mb={16}>
          <InfiniteScroll pageStart={-1} loadMore={fetchLevels} hasMore={hasMore}>
            <SimpleGrid columns={[1, 2, 2, 3, 4, 5, 6]} spacing={[4, 4, 4, 4, 6, 6, 8]}>
              {levels.map((level: Level) => (
                <Score key={level.createdTime} {...level} />
              ))}
            </SimpleGrid>
          </InfiniteScroll>
        </Box>
      </Container>
    </>
  );
};

export default New;
