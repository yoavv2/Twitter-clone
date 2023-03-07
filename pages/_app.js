import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';
import Sidebar from '../components/Sidebar';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <>
          <div className='mx-auto xl:w-3/5'>
            {session && (
              <div className='ml-auto'>
                <Sidebar />
              </div>
            )}
            <Component {...pageProps} />
          </div>
        </>
      </SessionProvider>
    </RecoilRoot>
  );
}
