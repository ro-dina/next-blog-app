"use client";
import { useState, useEffect } from "react";
import type { Post } from "@/app/_types/Post";
import type { PostApiResponse } from "@/app/_types/PostApiResponse";
import PostSummary from "@/app/_components/PostSummary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Page: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // microCMS から記事データを取得
        const requestUrl = `/api/posts`;
        const response = await fetch(requestUrl, {
          method: "GET",
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("データの取得に失敗しました");
        }
        const postResponse: PostApiResponse[] = await response.json();
        setPosts(
          postResponse.map((rawPost) => ({
            id: rawPost.id,
            title: rawPost.title,
            content: rawPost.content,
            coverImage: {
              url: rawPost.coverImageURL,
              width: 1000,
              height: 1000,
            },
            createdAt: rawPost.createdAt,
            categories: rawPost.categories.map((category) => ({
              id: category.category.id,
              name: category.category.name,
            })),
          }))
        );
      } catch (e) {
        setFetchError(
          e instanceof Error ? e.message : "予期せぬエラーが発生しました"
        );
      }
    };
    fetchPosts();
  }, []);

  if (fetchError) {
    return <div>{fetchError}</div>;
  }

  if (!posts) {
    return (
      <div className="text-gray-500">
        <FontAwesomeIcon icon={faSpinner} className="mr-1 animate-spin" />
        Loading...
      </div>
    );
  }

  return (
    <main>
      <div className="text-2xl font-bold">投稿記事一覧</div>
      <div className="mb-1 flex justify-end">
        <Link href="/admin" className="text-blue-500 underline">
          管理者機能
        </Link>
      </div>
      <div className="space-y-3">
        {posts.map((post) => (
          <PostSummary key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default Page;

// "use client";
// import { useState, useEffect } from "react";
// import type { Post } from "@/app/_types/Post";
// import PostSummary from "@/app/_components/PostSummary";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// const Page: React.FC = () => {
//   const [posts, setPosts] = useState<Post[] | null>(null);
//   const [fetchError, setFetchError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const requestUrl = "https://w1980.blob.core.windows.net/pg3/posts.json";
//         const response = await fetch(requestUrl, {
//           method: "GET",
//           cache: "no-store", // キャッシュを利用しない
//         });
//         if (!response.ok) {
//           throw new Error("データの取得に失敗しました");
//         }
//         const data = (await response.json()) as Post[];
//         setPosts(data);
//       } catch (e) {
//         setFetchError(
//           e instanceof Error ? e.message : "予期せぬエラーが発生しました"
//         );
//       }
//     };
//     fetchPosts();
//   }, []);

//   if (fetchError) {
//     return <div>{fetchError}</div>;
//   }

//   if (!posts) {
//     return (
//       <div className="text-gray-500">
//         <FontAwesomeIcon icon={faSpinner} className="mr-1 animate-spin" />
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <main>
//       <div className="mb-2 text-2xl font-bold">Main</div>
//       <div className="space-y-3">
//         {posts.map((post) => (
//           <PostSummary key={post.id} post={post} />
//         ))}
//       </div>
//     </main>
//   );
// };

// export default Page;

// "use client";
// import { useState, useEffect } from "react";
// import type { Post } from "@/app/_types/Post";
// import PostSummary from "@/app/_components/PostSummary";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// const Page: React.FC = () => {
//   const [posts, setPosts] = useState<Post[] | null>(null);
//   const [fetchError, setFetchError] = useState<string | null>(null);

//   // 環境変数から API キーとエンドポイントを取得
//   const apiBaseEp = process.env.NEXT_PUBLIC_MICROCMS_BASE_EP!;
//   const apiKey = process.env.NEXT_PUBLIC_MICROCMS_API_KEY!;

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         // microCMS から記事データを取得
//         const requestUrl = `${apiBaseEp}/posts`;
//         const response = await fetch(requestUrl, {
//           method: "GET",
//           cache: "no-store",
//           headers: {
//             "X-MICROCMS-API-KEY": apiKey,
//           },
//         });
//         if (!response.ok) {
//           throw new Error("データの取得に失敗しました");
//         }
//         const data = await response.json();
//         setPosts(data.contents as Post[]);
//       } catch (e) {
//         setFetchError(
//           e instanceof Error ? e.message : "予期せぬエラーが発生しました"
//         );
//       }
//     };
//     fetchPosts();
//   }, [apiBaseEp, apiKey]);

//   if (fetchError) {
//     return <div>{fetchError}</div>;
//   }

//   if (!posts) {
//     return (
//       <div className="text-gray-500">
//         <FontAwesomeIcon icon={faSpinner} className="mr-1 animate-spin" />
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <main>
//       <div className="mb-2 text-2xl font-bold">Main</div>
//       <div className="space-y-3">
//         {posts.map((post) => (
//           <PostSummary key={post.id} post={post} />
//         ))}
//       </div>
//     </main>
//   );
// };

// export default Page;
