import React from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';
import { db, storage } from '../firebase';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { useSession } from 'next-auth/react';
import { addEmoji } from '../utils/addEmoji';
import { addImage } from '../utils/addImage';

function Input({ placeholder }) {
  const [input, setInput] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [showEmojis, setShowEmojis] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { data: session } = useSession();
  const filePickerRef = React.useRef(null);

  const sendPost = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      id: session.user.uid,
      username: session.user.name,
      userImg: session.user.image,
      tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, 'posts', docRef.id), {
          image: downloadURL,
        });
      });
    }

    setIsLoading(false);
    setInput('');
    setSelectedFile(null);
    setShowEmojis(false);
  };

  const handleAddImageToPost = (e) => {
    addImage(e, setSelectedFile);
  };

  const handleAddEmoji = (e) => {
    addEmoji(e, input, setInput, showEmojis);
    setShowEmojis(false);
  };

  return (
    <form
      className={`border-b border-gray-700 p-3 flex space-x-3  ${
        isLoading && 'opacity-60'
      }`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={session.user.image}
        alt='profile pic'
        className='h-11 w-11 rounded-full cursor-pointer'
      />
      <div className='divide-y divide-gray-700 w-full'>
        <div className={``}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            rows='2'
            className='bg-transparent outline-none text-[#d9d9d9]
             text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]'
          />

          {selectedFile && (
            <div className='relative'>
              <div
                className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 
                rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className='text-white h-5' />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedFile}
                alt=''
                className='rounded-2xl max-h-80 object-contain'
              />
            </div>
          )}
        </div>

        {!isLoading && (
          <div className='flex items-center justify-between pt-2.5'>
            <div className='flex items-center'>
              <div
                className='icon'
                onClick={() => filePickerRef.current.click()}
              >
                <PhotographIcon className='text-[#1d9bf0] h-[22px]' />
                <input
                  type='file'
                  ref={filePickerRef}
                  hidden
                  onChange={handleAddImageToPost}
                />
              </div>

              <div className='icon rotate-90'>
                <ChartBarIcon className='text-[#1d9bf0] h-[22px]' />
              </div>

              <div className='icon' onClick={() => setShowEmojis(!showEmojis)}>
                <EmojiHappyIcon className='text-[#1d9bf0] h-[22px]' />
              </div>

              <div className='icon'>
                <CalendarIcon className='text-[#1d9bf0] h-[22px]' />
              </div>

              {showEmojis && (
                <Picker
                  onSelect={handleAddEmoji}
                  style={{
                    position: 'absolute',
                    marginTop: '465px',
                    marginLeft: -40,
                    maxWidth: '320px',
                    borderRadius: '20px',
                  }}
                  theme='dark'
                />
              )}
            </div>
            <button
              className='bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold 
              shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 
              disabled:cursor-default'
              disabled={!input.trim() && !selectedFile}
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export default Input;
