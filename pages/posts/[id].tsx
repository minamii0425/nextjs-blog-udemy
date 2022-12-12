import { GetStaticProps } from "next";
import Head from "next/head";
import React, { FC } from "react";
import Layout from "../../components/Layout";
import { getAllPostsIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.scss";

interface PostProps {
  postData: { title: string; blogContentHTML: any; date: string };
}

export const getStaticPaths = async () => {
  const paths = getAllPostsIds();

  return {
    paths,
    fallback: false, // 存在しないページに飛んだ時404ページにとぶ
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params!.id;
  const postData = await getPostData(id!);

  return {
    props: {
      postData,
    },
  };
};

const Post: FC<PostProps> = ({ postData }) => {
  return (
    <>
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingX1}> {postData.title}</h1>
          <div className={utilStyles.lightText}> {postData.date}</div>
          <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
        </article>
      </Layout>
    </>
  );
};

export default Post;
