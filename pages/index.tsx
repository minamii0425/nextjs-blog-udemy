import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Props } from "next/script";
import { FC, VFC } from "react";
import Layout, { siteTitle } from "../components/Layout";
import { getPostsData } from "../lib/post";
import styles from "../styles/Home.module.css";
import utilStyles from "../styles/utils.module.scss";

//
type HomeProps = {
  allPostsData: [];
};

// SSGの場合・プリレンダリング時に一回だけ外部からデータを持ってくる
// これをDBから取ってくる場合は？
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getPostsData();
  console.log(`allPostsData: ${allPostsData}`);

  return {
    props: {
      allPostsData: allPostsData,
    },
  };
};

// SSRの場合
// export const getServerSideProps = async (context) => {

//   return {
//     props: {
//       // コンポーネントに渡すProps
//     },
//   };
// };

const Home: FC<HomeProps> = ({ allPostsData }) => {
  return (
    <div>
      <Layout home={true}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>最近Reactをはじめました。Reactのスペシャリストになりたいです。</p>
        </section>

        <section className={`${utilStyles.padding1px} ${utilStyles.headingMd}`}>
          <h2>✍エンジニアのブログ</h2>

          <div className={styles.grid}>
            {allPostsData.map(({ id, title, date, thumbnail }) => (
              <article key={id}>
                <Link href={`/posts/${id}`}>
                  {" "}
                  <img
                    src={`${thumbnail}`}
                    className={styles.thumbnailImage}
                    alt={""}
                  />
                </Link>
                <Link href="/" legacyBehavior>
                  <a className={utilStyles.boldText}>{title}</a>
                </Link>
                <br />
                <small className={utilStyles.lightText}>{date}</small>
              </article>
            ))}
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default Home;
