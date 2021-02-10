import Link from "next/link";
import styles from "../styles/Nav.module.css";

export default function DenseAppBar() {
  return (
    <div className={styles.nav}>
      <div>
        <h1>
          <Link href="/">
            <a>Math Placement Test</a>
          </Link>
        </h1>
      </div>
      <div className={styles.nav_links}>
        <Link href="/">
          <a> Home</a>
        </Link>
        <Link href="/about">
          <a> About</a>
        </Link>
      </div>
    </div>
  );
}
