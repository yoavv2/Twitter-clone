import React from 'react';
import { SparklesIcon } from '@heroicons/react/outline';
import { onSnapshot, collection, query, orderBy } from '@firebase/firestore';
import { db } from '../firebase';
import Input from './Input';
import Post from './Post';

function Feed() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(
    () =>
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    []
  );

  return (
    <div
      className=' text-white flex-grow lg:border-l md:border-r
     border-gray-700 max-w-2xl bg-black xl:ml-[336px]'
    >
      <div className='text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700 opacity-90'>
        <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
        <div className='hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto'>
          <SparklesIcon className='h-5 text-white' />
        </div>
      </div>
      <Input placeholder='Whats happening?' />
      <div className=' w-full'>
        {posts.map((post) => (
          <Post key={post.id} name={post.tag} id={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
