"use client";

import { ChangeEvent, useState } from "react";

function Page() {
  const [video, setVideo] = useState("");

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const videoUrl = URL.createObjectURL(file);
      setVideo(videoUrl);
    }
  };

  return (
    <div className="mx-auto mt-20 max-w-md space-y-6 sm:mt-0 sm:flex sm:h-screen sm:flex-col sm:items-center sm:justify-center">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          Upload mp4
        </label>
        <input
          onChange={handleFileInput}
          className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          accept=".mp4"
        />
      </div>
      {video && <video src={video} controls></video>}
    </div>
  );
}

export default Page;
