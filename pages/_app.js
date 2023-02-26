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
        <div className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
          {session && <Sidebar />}
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </RecoilRoot>
  );
}
