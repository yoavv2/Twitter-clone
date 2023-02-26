import React from 'react';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from '@firebase/firestore';
import { getProviders, getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import Login from '../components/Login';
import Post from '../components/Post';
import { db } from '../firebase';
import Widgets from '../components/Widgets';
import Head from 'next/head';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import Comment from '../components/Comment';

const PostPage = ({ trendingResults, followResults, providers }) => {
  const { data: session } = useSession();
  const [isOpen] = useRecoilState(modalState);
  const [post, setPost] = React.useState();
  const [comments, setComments] = React.useState([]);
  const router = useRouter();
  const { id } = router.query;

  React.useEffect(
    () =>
      onSnapshot(doc(db, 'posts', id), (snapshot) => {
        setPost(snapshot.data());
      }),
    [id]
  );

  React.useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, 'posts', id, 'comments'),
          orderBy('timestamp', 'desc')
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [id]
  );

  if (!session) return <Login providers={providers} />;

  return (
    <div>
      <Head>
        <title>
          ` ${post?.username} on Twitter: "${post?.text}"`
        </title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
        {/* <Sidebar /> */}
        <div className='ml-24 xl:ml-0'>
          <div
            className='md:ml-0 text-white flex-grow border-l md:border-r
           border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]'
          >
            <div
              className='flex items-center px-1.5 py-2  border-b border-gray-700 text-[#d9d9d9]
           font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black'
            >
              <div
                className='hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0'
                onClick={() => router.push('/')}
              >
                <ArrowLeftIcon className='h-5 text-white' />
              </div>
              Tweet
            </div>
            <Post id={id} post={post} postPage />
            {comments.length > 0 && (
              <>
                {comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    id={comment.id}
                    comment={comment.data()}
                  />
                ))}
              </>
            )}
          </div>
        </div>
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />
        {isOpen && <Modal />}
      </main>
    </div>
  );
};

export default PostPage;

export async function getServerSideProps(context) {
  const trendingResults = [
    {
      heading: 'T20 World Cup 2021 Â· LIVE',
      description:
        'NZvAUS: New Zealand and Australia clash in the T20 World Cup final',
      img: 'https://rb.gy/d9yjtu',
      tags: ['#T20WorldCupFinal, ', 'Kane Williamson'],
    },
    {
      heading: 'Trending in United Arab Emirates',
      description: '#earthquake',
      img: 'https://rb.gy/jvuy4v',
      tags: ['#DubaiAirshow, ', '#gessdubai'],
    },
    {
      heading: 'Trending in Digital Creators',
      description: 'tubbo and quackity',
      img: '',
      tags: ['QUACKITY AND TUBBO,'],
    },
  ];
  const followResults = [
    { userImg: 'https://rb.gy/urakiy', username: 'SpaceX', tag: '@SpaceX' },
    {
      userImg: 'https://rb.gy/aluxgh',
      username: 'Elon Musk',
      tag: '@elonmusk',
    },
    { userImg: 'https://rb.gy/zyvazm', username: 'Tesla', tag: '@Tesla' },
  ];
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}
