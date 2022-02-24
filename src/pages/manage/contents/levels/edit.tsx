import React, { useState, useEffect } from 'react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useLocale } from 'hooks/locales';
import {
  Container,
  SimpleGrid,
  Box,
  Heading,
  Button,
  Grid,
  GridItem,
  List,
  Switch,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';
import { useAuth } from 'hooks/auth';
import { BsTwitter } from 'react-icons/bs';
import { client, clientLegacy } from 'framework/potato/client';
import { Level } from 'framework/potato/api/@types';
import { TwitterShareButton } from 'react-share';
import InputForm from 'components/Forms/Input';
import GenreSelect from 'components/Forms/GenreSelect';
import RateSlider from 'components/Forms/RateSlider';
import FileInput from 'components/Forms/FileInput';
import SEO from 'components/SEO';
import FileList from 'components/Forms/FileList';
import TextareaForm from 'components/Forms/Textarea';

type fileName = {
  original: string;
  uploaded: string;
};

const LevelEdit: React.FC<Level> = ({ name, title, artists, author, description, rating }) => {
  const router = useRouter();
  const { t } = useLocale();
  const { user, status, profile } = useAuth();

  const [cover, setCover] = useState<fileName>();
  const [bgm, setBgm] = useState<fileName>();
  const [data, setData] = useState<fileName>();

  const [shareModal, setShareModal] = useState<boolean>(false);
  const [updateModal, setUpdateModal] = useState<boolean>(false);

  useEffect(() => {
    if (!status.isAuthed) router.push('/');

    setCover({ original: 'artwork.png', uploaded: 'NOT_CHANGED' });
    setBgm({ original: 'bgm.mp3', uploaded: 'NOT_CHANGED' });
    setData({ original: 'data.sus', uploaded: 'NOT_CHANGED' });
  }, []);

  async function handleUpload(type: string, f: File) {
    if (type == 'LevelData' && !f.name.endsWith('.sus')) {
      alert(t.UPLOAD_ERROR.NOT_SUS);
      return;
    }

    const token = await user?.getIdToken();
    const res = await clientLegacy.upload.$post({
      body: {
        file: f,
      },
      config: { headers: { Authorization: `Bearer ${token}` } },
    });

    return {
      original: f.name,
      uploaded: `${res.filename}`,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit: any = async (e: any) => {
    e.preventDefault();

    if (
      cover?.uploaded === undefined ||
      bgm?.uploaded === undefined ||
      data?.uploaded === undefined
    ) {
      alert(t.UPLOAD_ERROR.NEED_MORE_FILE);
      return;
    }

    const tar = e.target;
    const token = await user?.getIdToken();
    const res = await clientLegacy.levels._levelName(name).patch({
      body: {
        name: name,
        version: 1,
        rating: Number(tar.rate.value),
        engine: 'pjsekai',
        title: { ja: tar.title.value },
        artists: { ja: tar.artists.value },
        author: { ja: tar.author.value },
        cover: {
          type: 'LevelCover',
          hash: 'temporary',
          url:
            cover.uploaded === 'NOT_CHANGED'
              ? `/repository/${name}/cover.png`
              : `https://servers-legacy.purplepalette.net/uploads/${cover.uploaded}`,
        },
        bgm: {
          type: 'LevelBgm',
          hash: 'temporary',
          url:
            bgm.uploaded === 'NOT_CHANGED'
              ? `/repository/${name}/bgm.mp3`
              : `https://servers-legacy.purplepalette.net/uploads/${bgm.uploaded}`,
        },
        data: {
          type: 'LevelData',
          hash: 'temporary',
          url:
            data.uploaded === 'NOT_CHANGED'
              ? `/repository/${name}/data.gz`
              : `https://servers-legacy.purplepalette.net/uploads/${data.uploaded}`,
        },
        genre: tar.genre.value,
        public: tar.public.checked,
        userId: profile.uid,
        notes: 1,
        createdTime: 1,
        updatedTime: 1,
        description: { ja: tar.description.value },
      },
      config: { headers: { Authorization: `Bearer ${token}` } },
    });

    if (res.status === 200) {
      if (tar.public.checked) {
        setShareModal(true);
        return;
      }

      setUpdateModal(true);
    } else {
      alert(t.UPLOAD_ERROR.OTHER);
    }
  };

  return (
    <>
      <SEO
        path="/levels/upload"
        title={t.UPLOAD_PAGE.PAGE_TITLE}
        description=""
        thumbnail=""
        allowIndex={false}
      />
      <Box bgColor="componentBg.light">
        <Container px={0} pb={8}>
          <form onSubmit={handleSubmit}>
            <Heading mt={[4, 4, 4, 4, 6]} mb={[6, 6, 6, 6, 8]} fontSize="1.4em" textAlign="center">
              {t.EDIT_PAGE.PAGE_TITLE}
            </Heading>

            <Grid my={8} templateColumns={{ base: 'repeat(1, 1fr)', xl: 'repeat(3, 1fr)' }} gap={6}>
              <GridItem colSpan={{ base: 1, xl: 2 }}>
                <Box px={8} bgColor="bodyBg.light" borderRadius="base">
                  <Box my={2} pt={4} userSelect="none">
                    <Heading my={2} fontSize="1em">
                      {t.UPLOAD_PAGE.SELECT_FILE}
                    </Heading>
                    <SimpleGrid columns={[1, 1, 3]} spacing={[0, 0, 4]}>
                      <Box style={{ display: cover?.uploaded === undefined ? 'block' : 'none' }}>
                        <FileInput
                          image="/uploads/image.png"
                          text={t.UPLOAD_PAGE.ARTWORK}
                          acceptType="image/jpeg, image/png"
                          callback={async (f: Record<string, File>) => {
                            const fileName = await handleUpload('LevelCover', f.file);
                            setCover(fileName);
                          }}
                        />
                      </Box>
                      <Box style={{ display: bgm?.uploaded === undefined ? 'block' : 'none' }}>
                        <FileInput
                          image="/uploads/cd.png"
                          text={t.UPLOAD_PAGE.MUSIC_FILE}
                          acceptType="audio/mpeg"
                          callback={async (f: Record<string, File>) => {
                            const fileName = await handleUpload('LevelBgm', f.file);
                            setBgm(fileName);
                          }}
                        />
                      </Box>
                      <Box style={{ display: data?.uploaded === undefined ? 'block' : 'none' }}>
                        <FileInput
                          image="/uploads/file.png"
                          text={t.UPLOAD_PAGE.SCORE_FILE}
                          acceptType="*"
                          callback={async (f: Record<string, File>) => {
                            const fileName = await handleUpload('LevelData', f.file);
                            setData(fileName);
                          }}
                        />
                      </Box>
                    </SimpleGrid>

                    <List my={4} spacing={3}>
                      {cover?.uploaded !== undefined ? (
                        <FileList
                          text={t.UPLOAD_PAGE.ARTWORK}
                          fileName={cover.original}
                          onClick={() => {
                            setCover(undefined);
                          }}
                        />
                      ) : undefined}
                      {bgm?.uploaded !== undefined ? (
                        <FileList
                          text={t.UPLOAD_PAGE.MUSIC_FILE}
                          fileName={bgm.original}
                          onClick={() => {
                            setBgm(undefined);
                          }}
                        />
                      ) : undefined}
                      {data?.uploaded !== undefined ? (
                        <FileList
                          text={t.UPLOAD_PAGE.SCORE_FILE}
                          fileName={data.original}
                          onClick={() => {
                            setData(undefined);
                          }}
                        />
                      ) : undefined}
                    </List>
                  </Box>
                  <Box my={2} pb={4} userSelect="none">
                    <InputForm
                      id="title"
                      value={title}
                      name={t.FORMS.TITLE}
                      required={true}
                      maxLength={50}
                    />
                    <InputForm
                      id="artists"
                      value={artists}
                      name={t.FORMS.ARTISTS}
                      required={true}
                      maxLength={50}
                    />
                    <InputForm
                      id="author"
                      value={author}
                      name={t.FORMS.AUTHOR}
                      required={true}
                      maxLength={30}
                    />
                    <TextareaForm
                      id="description"
                      value={description}
                      name={t.FORMS.DESCRIPTION}
                      required={true}
                      maxLength={200}
                    />
                    <GenreSelect id="genre" />
                    <RateSlider id="rate" value={rating} />
                  </Box>
                </Box>
              </GridItem>
              <GridItem colSpan={1}>
                <Box px={8} bgColor="bodyBg.light" borderRadius="base">
                  <Box my={2} pt={4} pb={4}>
                    <Heading my={4} fontSize="1.1em">
                      {t.EDIT_PAGE.PUBLISH}
                    </Heading>
                    <Switch id="public" size="lg" />
                    <Button my={8} size="full" type="submit" color="white" bgColor="potato">
                      {t.UPLOAD_PAGE.UPLOAD}
                    </Button>
                  </Box>
                </Box>
              </GridItem>
            </Grid>
          </form>
        </Container>
      </Box>
      <ShareModal opened={shareModal} onClose={() => setShareModal(false)} id={name} />
      <UpdateModal opened={updateModal} onClose={() => setUpdateModal(false)} id={name} />
    </>
  );
};

export default LevelEdit;

const UpdateModal: React.FC<{ opened: boolean; onClose: () => void; id: string }> = ({
  opened,
  onClose,
}) => {
  return (
    <Modal isOpen={opened} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>✅ 成功</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>譜面情報を更新しました。</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const ShareModal: React.FC<{ opened: boolean; onClose: () => void; id: string }> = ({
  opened,
  onClose,
  id,
}) => {
  return (
    <Modal isOpen={opened} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>🎉 譜面が公開されました！</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box my={8} textAlign="center">
            <TwitterShareButton
              url={`${process.env.NEXT_PUBLIC_FRONT_URL}/levels/${id}`}
              title="新しい譜面を投稿しました！"
              hashtags={['創作譜面', 'SweetPotato']}
            >
              <Button color="white" bgColor="#1DA1F2" size="lg">
                <Box mr={2}>
                  <BsTwitter />
                </Box>
                ツイートする
              </Button>
            </TwitterShareButton>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export async function getServerSideProps(context: NextPageContext): Promise<{
  props?: Level;
  notFound?: boolean;
}> {
  const { id, uid } = context.query;

  const res = await client.users._userId(`${uid}`).levels._levelName(`${id}`).get();

  if (res.status !== 200) {
    return {
      notFound: true,
    };
  }

  const level = res.body.item;

  return {
    props: level,
  };
}
