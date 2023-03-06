import Head from 'next/head';
import {
  getCsrfToken,
  getProviders,
  getSession,
  useSession,
} from 'next-auth/react';
import Feed from '../components/Feed';
import Login from '../components/Login';
import Modal from '../components/Modal';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import Widgets from '../components/Widgets';

export default function Home({
  trendingResults,
  followResults,
  providers,
  csrfToken,
}) {
  const { data: session } = useSession();
  const [isOpen] = useRecoilState(modalState);
  if (!session) return <Login providers={providers} csrfToken={csrfToken} />;
  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/*  <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'> */}
      <main className='flex'>
        <div className='ml-24 xl:ml-0'>
          <Feed />
        </div>

        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />
        {isOpen && <Modal />}
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  // const results = await Promise.allSettled([
  //   fetchData('https://jsonkeeper.com/b/WWMJ'),
  //   fetchData('https://jsonkeeper.com/b/1HOZ'),
  // ]);
  // const [trendingResults, followResults] = results;
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
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
      csrfToken,
    },
  };
}

// Generic function to throw if any errors occurred, or return the responses
// if no errors happened
function handleResults(results) {
  const errors = results
    .filter((result) => result.status === 'rejected')
    .map((result) => result.reason);

  if (errors.length) {
    // Aggregate all errors into one
    throw new AggregateError(errors);
  }

  return results.map((result) => result.value);
}

async function getPageData() {
  const results = await Promise.allSettled([fetchUser(), fetchProduct()]);

  const [user, product] = handleResults(results);
}
