"use client";
import { useState } from "react";
import type { Post } from "@/app/_types/Post";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";

type Props = {
  post: Post;
  reloadAction: () => Promise<void>;
  setIsSubmitting: (isSubmitting: boolean) => void;
};

const AdminPostSummary: React.FC<Props> = (props) => {
  const { post } = props;
  const dtFmt = "YYYY-MM-DD";
  const safeHTML = DOMPurify.sanitize(post.content, {
    ALLOWED_TAGS: ["b", "strong", "i", "em", "u", "br"],
  });

  // メニュー表示の状態
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 「削除」のボタンが押下されたときにコールされる関数
  const handleDelete = async (post: Post) => {
    if (!window.confirm(`投稿記事「${post.title}」を本当に削除しますか？`)) {
      return;
    }

    try {
      props.setIsSubmitting(true);
      const requestUrl = `/api/admin/posts/${post.id}`;
      const res = await fetch(requestUrl, {
        method: "DELETE",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
      await props.reloadAction();
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? `投稿記事のDELETEリクエストに失敗しました\n${error.message}`
          : `予期せぬエラーが発生しました\n${error}`;
      console.error(errorMsg);
      window.alert(errorMsg);
    } finally {
      props.setIsSubmitting(false);
    }
  };

  return (
    <div className="border border-slate-400 p-3">
      {/* 日付とカテゴリの位置調整 */}
      <div className="flex items-center justify-between">
        <div>{dayjs(post.createdAt).format(dtFmt)}</div>
        <div className="flex space-x-1.5">
          {post.categories.map((category) => (
            <div
              key={category.id}
              className={twMerge(
                "rounded-md px-2 py-0.5",
                "text-xs font-bold",
                "border border-slate-400 text-slate-500"
              )}
            >
              <Link href={`/admin/categories/${category.id}`}>
                {category.name}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* タイトルと三点リーダーの位置調整 */}
      <div className="mt-2 flex items-center justify-between">
        <Link href={`/posts/${post.id}`} className="font-bold">
          {post.title}
        </Link>
        {/* 三点リーダー */}
        <button
          type="button"
          className="rounded-md px-3 py-2 text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ...
        </button>
      </div>

      {/* メニュー表示 */}
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border border-slate-200 bg-white shadow-lg">
          <div className="cursor-pointer px-4 py-2 hover:bg-gray-100">
            <Link href={`/admin/posts/${post.id}`}>編集</Link>
          </div>
          <div
            className="cursor-pointer px-4 py-2 text-red-600 hover:bg-gray-100"
            onClick={() => handleDelete(post)}
          >
            削除
          </div>
        </div>
      )}

      {/* 本文の要約 */}
      <div
        className="line-clamp-3"
        dangerouslySetInnerHTML={{ __html: safeHTML }}
      />
    </div>
  );
};

export default AdminPostSummary;
