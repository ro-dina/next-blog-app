"use client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Modal } from "./_components/Modals"; // コンポーネントのインポート

const Page: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      <div className="mb-2 text-2xl font-bold">モーダル</div>
      <div className="flex gap-x-3">
        <button
          className={twMerge(
            "rounded-md  px-3 py-1",
            "font-bold text-white",
            "bg-indigo-500 hover:bg-indigo-700"
          )}
          onClick={() => setIsModalOpen(true)}
        >
          モーダルウィンドウを開く
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* モーダル内に表示するコンテンツを <Modal>...</Modal> の子要素として与える */}
        <div>
          <div className="text-xl font-bold">徒然草</div>
          <div>
            <p>
              つれづれなるままに、日暮らし硯に向かひて、心にうつりゆくよしなしごとを、
              そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。
            </p>
          </div>
        </div>
      </Modal>
    </main>
  );
};

export default Page;
