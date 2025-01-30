"use client";
import { Camera, ThumbsUp, Squirrel, Settings } from "lucide-react";

const Page: React.FC = () => {
  return (
    <main>
      <div className="mb-4 text-2xl font-bold">Lucide React Icon</div>

      <div className="flex gap-4">
        <div className="flex flex-col items-center">
          <div className="rounded-md border-2 p-2">
            <Camera className="size-24 text-red-500" />
          </div>
          <div>Camera</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-md border-2 p-2">
            <ThumbsUp className="size-24 text-red-500" />
          </div>
          <div>ThumbsUp</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-md border-2 p-2">
            <Squirrel className="size-24 text-red-500" />
          </div>
          <div>Squirrel</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-md border-2 p-2">
            <Settings className="size-24 text-red-500" />
          </div>
          <div>Settings</div>
        </div>
      </div>
    </main>
  );
};

export default Page;
