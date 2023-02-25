import SidebarLink from './SidebarLink';
import { HomeIcon } from '@heroicons/react/solid';
import { useSession, signOut } from 'next-auth/react';
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';

function Sidebar() {
  const { data: session } = useSession();
  const router = useRouter();

  const pathname = router.pathname;

  return (
    <nav
      className='bg-black sm:flex flex-col items-center xl:items-start  w-20  p-2 fixed h-full border-1
    '
    >
      <div
        className='flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-24'
        onClick={() => router.push('/')}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src='https://rb.gy/ogau5a'
          alt='twitter-logo'
          className='h-10 w-10'
        />
      </div>
      <ul className='space-y-2.5 mt-4 mb-2.5 xl:ml-24'>
        <li>
          <SidebarLink
            text='Home'
            Icon={HomeIcon}
            active={pathname === '/'}
            linkTo={'/'}
          />
        </li>
        <li>
          <SidebarLink text='Explore' Icon={HashtagIcon} />
        </li>
        <li>
          <SidebarLink text='Notifications' Icon={BellIcon} />
        </li>
        <li>
          <SidebarLink text='Messages' Icon={InboxIcon} />
        </li>
        <li>
          <SidebarLink text='Bookmarks' Icon={BookmarkIcon} />
        </li>
        <li>
          <SidebarLink text='Lists' Icon={ClipboardListIcon} />
        </li>
        <li>
          <SidebarLink text='Profile' Icon={UserIcon} />
        </li>
        <li>
          <SidebarLink text='More' Icon={DotsCircleHorizontalIcon} />
        </li>
      </ul>
      <button className='hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[60px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]'>
        Tweet
      </button>
      <button
        className='xl:w-56 h-[70px] text-[#d9d9d9] flex items-center justify-between mt-auto mb-5 hoverAnimation xl:ml-auto xl:-mr-5'
        onClick={signOut}
      >
        {/* eslint-disable-next-line @next/next/no-img-element  */}
        <img
          src={`${session?.user?.image}`}
          alt='profile_pic'
          className='h-10 w-10 rounded-full xl:mr-2.5'
        />

        <div className='hidden xl:inline leading-5'>
          <h4 className='font-bold'>{session?.user.name}</h4>
          <p className='text-[#6e767d]'>@{session?.user.tag}</p>
        </div>
        <DotsHorizontalIcon className='hidden h-5 xl:inline ml-10' />
      </button>
    </nav>
  );
}

export default Sidebar;
