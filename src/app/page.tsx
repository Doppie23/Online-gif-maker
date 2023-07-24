"use client";

import { ChangeEvent, useState, useRef, useEffect } from "react";
import Switch from "@/components/Switch";
import FileUpload from "@/components/FileUpload";
import { FFmpeg, createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import FinalVideo from "@/components/FinalVideo";
import ProgressBar from "@/components/ProgressBar";
import PlayerEditor from "@/components/PlayerEditor";
import { formatTime } from "@/utils/formatTime";

export type VideoType = "gif" | "video";

let ffmpeg: FFmpeg;
try {
  ffmpeg = createFFmpeg({
    log: false,
    // @ts-ignore
    corePath: new URL("/ffmpeg-core.js", document.location).href,
  });
} catch (error) {}

function Page() {
  const videoTypeRef = useRef<VideoType>("video");
  const inOutPointsRef = useRef<[number, number]>();
  const videoLengthRef = useRef<number>(0);
  const [video, setVideo] = useState<File>();
  const [isRendering, setIsRendering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [finalVideo, setFinalVideo] = useState<Blob>();

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setVideo(file);
    }
  };

  const loadFFmpeg = async () => {
    await ffmpeg.load();
  };

  const renderVideo = async () => {
    if (video) {
      setIsRendering(true);
      ffmpeg.setProgress(({ ratio }) => {
        setProgress(Math.floor(ratio * 100));
      });

      ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));

      const targetSizeInBytes = 5000000;
      const targetSizeInBits = targetSizeInBytes * 8;
      let videoLength: number;
      if (inOutPointsRef.current) {
        videoLength = inOutPointsRef.current[1] - inOutPointsRef.current[0];
      } else {
        videoLength = videoLengthRef.current;
      }
      const bitrate = (targetSizeInBits / videoLength).toString();

      let ffmpegCommand: string[];

      if (inOutPointsRef.current) {
        const inTime = formatTime(inOutPointsRef.current[0]);
        const outTime = formatTime(inOutPointsRef.current[1]);
        ffmpegCommand = [
          "-ss",
          inTime,
          "-to",
          outTime,
          "-i",
          "test.mp4",
          "-b",
          bitrate,
        ];
      } else {
        ffmpegCommand = ["-i", "test.mp4", "-b", bitrate];
      }

      if (videoTypeRef.current === "video") {
        ffmpegCommand.push("out.mp4");
      } else {
        ffmpegCommand.push("-vf", "fps=15", "-f", "gif", "out.gif");
      }

      await ffmpeg.run(...ffmpegCommand);

      let videoBlob: Blob;
      if (videoTypeRef.current === "video") {
        const data = ffmpeg.FS("readFile", "out.mp4");
        videoBlob = new Blob([data.buffer], { type: "video/mp4" });
      } else {
        const data = ffmpeg.FS("readFile", "out.gif");
        videoBlob = new Blob([data.buffer], { type: "image/gif" });
      }

      setFinalVideo(videoBlob);
      setIsRendering(false);
    }
  };

  const onRenderClicked = () => {
    renderVideo();
  };

  useEffect(() => {
    if (!ffmpeg.isLoaded()) {
      loadFFmpeg();
    }
  }, []);

  return (
    <>
      {!isRendering && !finalVideo ? (
        <div className="mx-auto  mt-0 flex h-screen max-w-md flex-col items-center justify-center space-y-3">
          {!video ? (
            <FileUpload onChange={handleFileInput} />
          ) : (
            <>
              <button
                onClick={() => setVideo(undefined)}
                className="absolute left-0 top-0 z-10 m-6 flex justify-center rounded-md bg-gray-800 px-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
              >
                Back
              </button>
              <PlayerEditor
                src={URL.createObjectURL(video)}
                onInOutChange={(l, r) => (inOutPointsRef.current = [l, r])}
                getLengthOnPlayerReady={(length) =>
                  (videoLengthRef.current = length)
                }
              />
              <div className="w-3/5">
                <Switch
                  onChange={(activeButton) => {
                    if (activeButton === "left") {
                      videoTypeRef.current = "video";
                    } else {
                      videoTypeRef.current = "gif";
                    }
                  }}
                />
              </div>
              <button
                onClick={onRenderClicked}
                className="flex justify-center rounded-md bg-indigo-600 px-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Render
              </button>
            </>
          )}
        </div>
      ) : !finalVideo ? (
        <div className="flex h-screen items-center justify-center">
          <div className="w-3/5">
            <ProgressBar progress={progress} />
          </div>
        </div>
      ) : (
        <FinalVideo
          finalVideo={finalVideo}
          videoType={videoTypeRef.current}
          onDeleteClicked={() => document.location.reload()}
        />
      )}
    </>
  );
}

export default Page;
