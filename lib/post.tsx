import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

// const matter = require("gray-matter");

// process.cwd=カレントディレクトリ
const postsDirectory = path.join(process.cwd(), "posts");

// mdファイルのデータを取り出す
export const getPostsData = () => {
  // 外部APIの場合は
  // const fetchData = await fetch("endpoint")

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // ファイル名
    const id = fileName.replace(/\.md$/, "");

    // mdファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    // idとデータを返す
    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData;
};

// getStaticPathでreturnで使うpathを取得
export const getAllPostsIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
};

// IDに基づいてブロク投稿データを返す
export const getPostData = async (id: string | string[] | undefined) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContent);

  const blogContent = await remark().use(html).process(matterResult.content);

  const blogContentHTML = blogContent.toString();

  return {
    id,
    blogContentHTML,
    ...matterResult.data,
  };
};
