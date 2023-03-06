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
      <main className='bg-black min-h-screen flex max-w-[1500px] '>
        <div className='ml-24 xl:ml-0'>
          <div
            className='md:ml-0 text-white flex-grow border-l md:border-r
           border-gray-700 max-w-2xl xl:ml-[336px] md:min-w-[600px]'
          >
            <div
              className='flex items-center px-1.5 py-2  border-b border-gray-700 text-[#d9d9d9]
           font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black opacity-90'
            >
              <div
                className='hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 '
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
      heading: 'React 18 Alpha Release',
      description:
        'Get a sneak peek at the new features and improvements in React 18!',
      img: 'https://rb.gy/ftuqbx',
      tags: ['#React18', '#webdevelopment', '#javascript'],
    },
    {
      heading: 'Google Introduces Material You Design System',
      description:
        'Explore the new design language and tools for building beautiful web apps!',
      img: 'https://rb.gy/jsh5hn',
      tags: ['#MaterialYou', '#webdesign', '#ux'],
    },
    {
      heading: 'GitHub Adds Dark Theme for Web Interface',
      description:
        'Switch to the new dark mode and reduce eye strain while browsing your code!',
      img: 'https://rb.gy/gcquzc',
      tags: ['#GitHub', '#webdevelopment', '#ui'],
    },
    {
      heading: 'Tailwind CSS Becomes Popular CSS Framework',
      description:
        'Learn how to use the utility-first CSS framework and build responsive websites quickly!',
      img: 'https://rb.gy/akvthc',
      tags: ['#TailwindCSS', '#css', '#webdesign'],
    },
    {
      heading: 'Next.js 12 Released with New Features',
      description:
        'Check out the latest version of the popular React framework for building server-side rendered apps!',
      img: 'https://rb.gy/s6w5cg',
      tags: ['#NextJS', '#webdevelopment', '#javascript'],
    },
    {
      heading: 'Qwik Simplifies Web App Development',
      description:
        'Discover the new framework for building lightweight and fast web apps!',
      img: 'https://rb.gy/mjvnc1',
      tags: ['#Qwik', '#webdevelopment', '#javascript'],
    },
    // Add more objects here if needed
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
