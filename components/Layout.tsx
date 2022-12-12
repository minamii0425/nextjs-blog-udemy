import Head from "next/head";
import { ReactNode } from "react";
import styles from "./layout.module.scss";
import utilStyles from "../styles/utils.module.scss";
import Link from "next/link";

const name = "Minami Hoshi";
export const siteTitle = "Next.js Blog";

interface LayoutProps {
  children: ReactNode;
  home?: any;
}

const Layout = (props: LayoutProps) => {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className={styles.header}>
          {props.home ? (
            <>
              <img
                src="/images/profile.png"
                className={`${utilStyles.borderCircle} ${styles.headerImage}`}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
          ) : (
            <>
              {" "}
              <img
                src="/images/profile.png"
                className={utilStyles.borderCircle}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
          )}
        </header>
        <main>{props.children}</main>
        {!props.home && (
          <div>
            <Link href="/">←ホームへ戻る</Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;
