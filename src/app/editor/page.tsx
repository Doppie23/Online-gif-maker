"use client";

import { ChangeEvent, useState, useRef, useEffect } from "react";
import MultiRangeSlider from "@/components/multiRangeSlider";
import ReactPlayer from "react-player";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const ffmpeg = createFFmpeg({
  log: true,
  mainName: "main",
  corePath: "https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js",
});

function Page() {
  const [video, setVideo] = useState<File>();
  const [maxRange, setMaxRange] = useState(100);
  const [leftValue, setLeftValue] = useState(0);
  const [rightValue, setRightValue] = useState(maxRange);
  const [isRendering, setIsRendering] = useState(false);
  const videoRef = useRef<any>(null);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setVideo(file);
    }
  };

  const onPlayerReady = () => {
    if (videoRef.current) {
      let duration: number = videoRef.current.getDuration();
      duration = Math.floor(duration);
      setMaxRange(duration);
      setRightValue(duration);
    }
  };

  const loadFFmpeg = async () => {
    await ffmpeg.load();
  };

  const renderVideo = async () => {
    if (video) {
      setIsRendering(true);
      ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));

      await ffmpeg.run(
        "-i",
        "test.mp4",
        "-t",
        "2.5",
        "-ss",
        "2.0",
        "-f",
        "gif",
        "out.gif",
      );

      const data = ffmpeg.FS("readFile", "out.gif");

      const url = URL.createObjectURL(
        new Blob([data.buffer], { type: "image/gif" }),
      );
      console.log(url);
      setIsRendering(false);
    }
  };

  useEffect(() => {
    loadFFmpeg();
  }, []);

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
      {video && (
        <>
          <ReactPlayer
            url={URL.createObjectURL(video)}
            controls
            ref={videoRef}
            onReady={onPlayerReady}
          />
          <div className="w-full">
            <MultiRangeSlider
              leftValue={leftValue}
              rightValue={rightValue}
              setLeftvalue={setLeftValue}
              setRightValue={setRightValue}
              maxRange={maxRange}
            />
          </div>
          <button
            onClick={renderVideo}
            className="flex justify-center rounded-md bg-indigo-600 px-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Render
          </button>
          {isRendering && <div>Rendering...</div>}
        </>
      )}
    </div>
  );
}

export default Page;
