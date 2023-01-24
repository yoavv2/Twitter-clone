import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../atoms/modalAtom';
import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { useRouter } from 'next/router';
import Moment from 'react-moment';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { db, storage } from '../firebase';
import { useSession } from 'next-auth/react';
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from '@heroicons/react/outline';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import Link from 'next/link';

function Modal() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  const [showEmojis, setShowEmojis] = React.useState(false);
  const [post, setPost] = React.useState({});
  const [comment, setComment] = React.useState('');
  const [selectedFile, setSelectedFile] = React.useState(null);
  const router = useRouter();
  const filePickerRef = React.useRef(null);
  React.useEffect(
    () =>
      onSnapshot(doc(db, 'posts', postId), (snapshot) => {
        setPost(snapshot.data());
      }),
    [postId]
  );

  const sendComment = async (e) => {
    e.preventDefault();

    const docRef = await addDoc(collection(db, 'posts', postId, 'comments'), {
      userId: session.user.uid,
      postId: postId,
      comment: comment,
      username: session.user.name,
      tag: session.user.tag,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, 'posts', postId, 'comments', docRef.id), {
          image: downloadURL,
        });
      });
    }
    setIsOpen(false);
    setComment('');
    setShowEmojis(false);
    router.push(`/${postId}`);
  };

  const addEmoji = (e) => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setComment(comment + emoji);
    setShowEmojis(false);
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (!e.target.files[0]) return;
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <Transition.Root
      show={isOpen}
      // as={Fragment}
    >
      <Dialog as='div' className='fixed z-50 inset-0 pt-8' onClose={setIsOpen}>
        <div className='flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            // as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity' />
          </Transition.Child>

          <Transition.Child
            enter='ease-out duration-300'
            enterFrom='opacity-0 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            {/* ... */}

            <dialog
              className='inline-block align-bottom bg-black rounded-2xl
            text-left overflow-hidden shadow-xl transform transition-all
            sm:my-8 sm:align-middle sm:max-w-xl sm:w-full '
            >
              <div
                className='flex items-center px-1.5 py-2 border-b
               border-gray-700'
                onClick={() => setIsOpen(false)}
              >
                <div className='hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0'>
                  <XIcon className='h-[22px] text-white' />
                </div>
              </div>

              <div
                className='flex px-4 pt-5 pb-2.5 
                sm:px-6'
              >
                <div className='w-full'>
                  <div className='text-[#6e767d] flex gap-x-3 relative'>
                    <span className='w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-600' />

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post?.userImg}
                      alt=''
                      className='h-11 w-11 rounded-full'
                    />
                    <div>
                      <div className='inline-block group'>
                        <h4 className='font-bold text-[#d9d9d9] inline-block text-[15px] sm:text-base'>
                          {post?.username}
                        </h4>
                        <span className='ml-1.5 text-sm sm:text-[15px]'>
                          @{post?.tag}{' '}
                        </span>
                      </div>{' '}
                      ·{' '}
                      <span className='hover:underline text-sm sm:text-[15px]'>
                        <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                      </span>
                      <p className='text-[#d9d9d9] text-[15px] sm:text-base'>
                        {post?.text}
                      </p>
                      <p className='ml-1.5 text-xs sm:text-[15px]'>
                        Replying to
                        <Link
                          href='/hello'
                          className='ml-1.5 text-xm sm:text-[15px] text-blue'
                        >
                          <a> @{post?.tag}</a>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className='mt-7 flex space-x-3 w-full'>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={session.user.image}
                      alt=''
                      className='h-11 w-11 rounded-full'
                    />
                    <form className='flex-grow mt-2'>
                      <textarea
                        resize='none'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder='Tweet your reply'
                        rows='10'
                        className='bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[80px] resize-none'
                      />
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
                              onChange={addImageToPost}
                            />
                          </div>
                          <div className='icon rotate-90'>
                            <ChartBarIcon className='text-[#1d9bf0] h-[22px]' />
                          </div>
                          <div
                            className='icon'
                            onClick={() => setShowEmojis(true)}
                          >
                            <EmojiHappyIcon className='text-[#1d9bf0] h-[22px]' />
                          </div>

                          <div className='icon'>
                            <CalendarIcon className='text-[#1d9bf0] h-[22px] ' />
                          </div>
                        </div>
                        {showEmojis && (
                          <Picker
                            onSelect={addEmoji}
                            style={{
                              position: 'absolute',
                              top: 50,
                              maxWidth: '320px',
                              borderRadius: '20px',
                            }}
                            theme='dark'
                          />
                        )}
                        <button
                          type='submit'
                          onClick={sendComment}
                          disabled={!comment.trim()}
                          className='bg-[#1d9bf0] 
                        text-white rounded-full px-4 py-1.5 font-bold
                         shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0]
                          disabled:opacity-50 disabled:cursor-default'
                        >
                          Reply
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </dialog>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
