import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import { db } from "../firebase";
import styles from "../styles/Home.module.css";

function PostPage() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  //   useEffect(
  //     () =>
  //       onSnapshot(
  //         query(collection(db, "posts"), orderBy("timestamp", "desc")),
  //         (snapshot) => {}
  //       ),
  //     [db]
  //   );

  return (
    <div className={styles.container}>
      <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />

        {/* <p className="text-white"> {session?.user?.name}</p> */}

        {isOpen && <Modal />}
      </main>
    </div>
  );
}

export default PostPage;
