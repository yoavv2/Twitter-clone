import React from 'react';
import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../atoms/modalAtom';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import Moment from 'react-moment';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { db } from '../firebase';
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
import Input from './Input';

const Modal2 = () => {
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  return (
    <Transition.Root show={isOpen}>
      <Dialog as='div' className='fixed z-50 inset-0 pt-8' onClose={setIsOpen}>
        <Transition.Child
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
          enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          enterTo='opacity-100 translate-y-0 sm:scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 translate-y-0 sm:scale-100'
          leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
        >
          <dialog
            className='inline-block align-bottom bg-black rounded-2xl 
            text-left overflow-hidden shadow-xl transform transition-all 
            sm:my-8 sm:align-middle sm:max-w-xl sm:w-full'
          >
            <Input placeholder='Tweet your reply' />
          </dialog>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal2;
