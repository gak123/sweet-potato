import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Box,
  Text,
  Input,
  SimpleGrid,
  InputGroup,
  InputRightElement,
  Button,
  Flex,
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';
import InfiniteScroll from 'react-infinite-scroller';
import { client } from 'framework/potato/client';
import { Level } from 'models/Level';
import SEO from 'components/SEO';
import Score from 'components/Card/Score';
import { useLocale } from 'hooks/locales';

const Search: React.FC = () => {
  const { t } = useLocale();
  const router = useRouter();
  const { pathname, query } = router;
  const { keyword } = query;

  const [page, setPage] = useState<number>(-1);
  const [value, setValue] = useState<string>();
  const [levels, setLevels] = useState<Level[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => setValue(event.target.value);

  const fetchScoresByKeyword = async (page: number) => {
    const res = await client.levels.list.$get({ query: { page, keywords: value } });

    if (res.items.length < 1) {
      setHasMore(false);
      setIsLoading(false);
      return;
    }

    setPage(page + 1);
    setLevels([...levels, ...res.items]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (keyword === undefined || keyword === '') return;

    setPage(0);
    setLevels([]);
    setHasMore(true);
    setValue(`${keyword}`);
  }, [query.keyword]);

  return (
    <>
      <SEO path="/search" title={t.SEARCH.TITLE} description="" thumbnail="" allowIndex={false} />
      <Container centerContent>
        <Box w="full" pt={0}>
          <InputGroup>
            <Input
              type="text"
              autoFocus={true}
              placeholder={t.SEARCH.KEYWORD}
              onChange={handleChange}
              border="2px"
              _focus={{ borderColor: 'potato' }}
            />
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => {
                  router.push({ pathname, query: { keyword: value } });
                }}
              >
                <Box fontSize="2em">
                  <Icon icon="mdi:magnify" />
                </Box>
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box my={16} w="full">
          {value !== undefined ? (
            <Box>
              <InfiniteScroll
                loadMore={() => {
                  if (!isLoading) {
                    setIsLoading(true);
                    fetchScoresByKeyword(page);
                  }
                }}
                hasMore={hasMore}
              >
                <SimpleGrid columns={[1, 2, 2, 3, 4, 5, 6]} spacing={[4, 4, 4, 4, 6, 6, 8]}>
                  {levels.map((level: Level) => (
                    <Score key={level.createdTime} {...level} />
                  ))}
                </SimpleGrid>
              </InfiniteScroll>
              {page !== -1 && !isLoading && levels.length === 0 ? (
                <Flex justify="center">
                  <Text>{keyword} の検索結果が見つかりませんでした</Text>
                </Flex>
              ) : (
                ''
              )}
            </Box>
          ) : undefined}
        </Box>
      </Container>
    </>
  );
};

export default Search;
