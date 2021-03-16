import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Math Placement Test</title>
      </Head>

      <div>
        <h1 className={styles.title}>Hello World</h1>
      </div>
    </>
  );
}
