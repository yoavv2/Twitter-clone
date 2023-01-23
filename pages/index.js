import Head from 'next/head';
import { getProviders, getSession, useSession } from 'next-auth/react';
import Feed from '../components/Feed';
import Sidebar from '../components/Sidebar';
import Login from '../components/Login';
import Modal from '../components/Modal';
import { useRecoilState } from 'recoil';
import { modalState } from '../atoms/modalAtom';
import Widgets from '../components/Widgets';

export default function Home({ trendingResults, followResults, providers }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  if (!session) return <Login providers={providers} />;
  return (
    <>
      <Head>
        <title>Twitter Clone</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
        <Sidebar />
      
        <Feed />

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

  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      // followResults,
      providers,
      session,
    },
  };
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch data from the URL: ${error.message}`);
  }
}

// Generic function to throw if any errors occured, or return the responses
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

  // Nicer on the eyes
  const [user, product] = handleResults(results);
}
