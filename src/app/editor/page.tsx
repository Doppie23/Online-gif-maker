"use client";

// todo - error handling bij render - in out points - ffmpeg command - titel invoer

import { ChangeEvent, useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import FileUpload from "@/components/FileUpload";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { pb } from "@/lib/pocketbase";

const ffmpeg = createFFmpeg({
  log: true,
  mainName: "main",
  corePath: "https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js", // todo gebruik multithread hier
});

function Page() {
  const [video, setVideo] = useState<File>();
  const [videoLength, setVideoLength] = useState(100);
  const [isRendering, setIsRendering] = useState(false);
  const [finalVideo, setFinalVideo] = useState<Blob>();
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
      setVideoLength(duration);
    }
  };

  const loadFFmpeg = async () => {
    await ffmpeg.load();
  };

  const renderVideo = async () => {
    if (video) {
      setIsRendering(true);
      ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));

      const targetSizeInBytes = 1500000;
      const targetSizeInBits = targetSizeInBytes * 8;
      const bitrate = (targetSizeInBits / videoLength).toString();

      await ffmpeg.run("-i", "test.mp4", "-b", bitrate, "out.mp4");

      const data = ffmpeg.FS("readFile", "out.mp4");
      const videoBlob = new Blob([data.buffer], { type: "video/mp4" });

      setFinalVideo(videoBlob);
      setIsRendering(false);
    }
  };

  useEffect(() => {
    loadFFmpeg();
  }, []);

  return (
    <>
      {!isRendering && !finalVideo ? (
        <div className="mx-auto mt-20 max-w-md space-y-6 sm:mt-0 sm:flex sm:h-screen sm:flex-col sm:items-center sm:justify-center">
          <FileUpload onChange={handleFileInput} />
          {video && (
            <>
              <ReactPlayer
                url={URL.createObjectURL(video)}
                controls
                ref={videoRef}
                onReady={onPlayerReady}
              />
              <button
                onClick={renderVideo}
                className="flex justify-center rounded-md bg-indigo-600 px-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Render
              </button>
            </>
          )}
        </div>
      ) : !finalVideo ? (
        <div>rendering</div>
      ) : (
        <>
          <ReactPlayer url={URL.createObjectURL(finalVideo)} controls />
          <button
            onClick={async () => {
              const formData = new FormData();
              const userID = pb.authStore.model?.id as string;

              formData.append("video", finalVideo, "video.mp4");
              formData.append("user", userID);
              formData.append("title", "video.mp4");
              formData.append("type", "video");

              const record = await pb.collection("videos").create(formData);
              console.log(record);
            }}
          >
            upload
          </button>
        </>
      )}
    </>
  );
}

export default Page;
