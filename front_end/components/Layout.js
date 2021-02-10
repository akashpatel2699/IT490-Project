import Head from "next/head";
import styles from "../styles/Layout.module.css";;
import Nav from "./Nav.js";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
            	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
	            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
	            <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                    />
            </Head>
	        <Nav />
            <div className={styles.container}>
                <main className={styles.main}>
                    {children}
                </main>
            </div>
            <footer className={styles.footer}>
        Copyright &copy; 2021
      </footer>
        </>
    )
}

export default Layout;
