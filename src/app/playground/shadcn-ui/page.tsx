"use client";
import { useState } from "react";
import dayjs from "dayjs";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";

const Page: React.FC = () => {
  // スイッチ関連
  const [isDebugMode, setIsDebugMode] = useState(false);
  const handleIsDebugModeChange = (checked: boolean) => {
    if (checked) {
      console.log("Debug mode is enabled.");
    } else {
      console.log("Debug mode is disabled.");
    }
    setIsDebugMode(checked);
  };

  // カレンダ関連
  const dtFmt = "YYYY年MM月DD日が選択されました。";
  const [date, setDate] = useState<Date | undefined>();
  const [msg, setMsg] = useState<string>("日付を選択してください。");

  const handleDateChange = (date: Date | undefined) => {
    if (date === undefined) {
      setMsg("日付を選択してください。");
      return;
    }
    setMsg(dayjs(date).format(dtFmt));
    setDate(date);
  };

  return (
    <main>
      <div className="mb-4 text-2xl font-bold">shadcn/ui</div>

      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-3">
          <Switch
            id="debug-mode"
            checked={isDebugMode}
            onCheckedChange={handleIsDebugModeChange}
          />
          <label htmlFor="debug-mode" className="cursor-pointer">
            デバッグモード
          </label>
        </div>

        <div className="">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            className="inline-block rounded-md border"
          />
        </div>
        <div>{msg}</div>
      </div>
    </main>
  );
};

export default Page;
