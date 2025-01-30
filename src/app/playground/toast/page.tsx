"use client";
import toast, { Toaster } from "react-hot-toast";
import { twMerge } from "tailwind-merge";

const Page: React.FC = () => {
  const buttonStyle = twMerge(
    "rounded-md  px-3 py-1 ",
    "font-bold text-white",
    "bg-indigo-500 hover:bg-indigo-700"
  );

  const successNotify = (msg: string) => toast.success(msg);
  const errorNotify = (msg: string) => toast.error(msg);

  return (
    <main>
      <div className="mb-2 text-2xl font-bold ">トースト通知</div>
      <div className="flex gap-x-3">
        <button
          className={buttonStyle}
          onClick={() => successNotify("成功スタイルのトースト通知")}
        >
          success
        </button>
        <button
          className={buttonStyle}
          onClick={() => errorNotify("エラースタイルのトースト通知")}
        >
          error
        </button>
      </div>

      <Toaster position="top-center" />
    </main>
  );
};

export default Page;
