"use client";

// todo - error handling met error page - in out points

import { ChangeEvent, useState, useRef, useEffect } from "react";
import Switch from "@/components/Switch";
import { useForm, SubmitHandler } from "react-hook-form";
import LogoutButton from "@/components/LogoutButton";
import ReactPlayer from "react-player";
import FileUpload from "@/components/FileUpload";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import FinalVideo from "@/components/FinalVideo";
import ProgressBar from "@/components/ProgressBar";

const ffmpeg = createFFmpeg({
  log: false,
  // @ts-ignore
  corePath: new URL("/ffmpeg-core.js", document.location).href,
});

type FormValues = {
  title: string;
};

export type VideoType = "gif" | "video";

function Page() {
  const { register, handleSubmit } = useForm<FormValues>();
  const [videoTitle, setVideoTitle] = useState("");
  const [videoType, setVideoType] = useState<VideoType>("video");
  const [video, setVideo] = useState<File>();
  const [videoLength, setVideoLength] = useState(100);
  const [isRendering, setIsRendering] = useState(false);
  const [progress, setProgress] = useState(0);
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
      ffmpeg.setProgress(({ ratio }) => {
        setProgress(Math.floor(ratio * 100));
      });

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

  const onRenderClicked: SubmitHandler<FormValues> = (data) => {
    setVideoTitle(data.title);
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
        <form
          onSubmit={handleSubmit(onRenderClicked)}
          className="mx-auto mt-20 max-w-md space-y-3 sm:mt-0 sm:flex sm:h-screen sm:flex-col sm:items-center sm:justify-center"
        >
          <div className="absolute right-0 top-0 m-6">
            <LogoutButton />
          </div>
          <FileUpload onChange={handleFileInput} />
          {video && (
            <>
              <ReactPlayer
                width={""}
                height={""}
                url={URL.createObjectURL(video)}
                controls
                ref={videoRef}
                onReady={onPlayerReady}
              />
              <div className="w-3/4">
                <input
                  {...register("title")}
                  placeholder="Title"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 bg-gray-800 px-2 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-gray-700  placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="w-3/5">
                <Switch
                  onChange={(activeButton) => {
                    if (activeButton === "left") {
                      setVideoType("video");
                    } else {
                      setVideoType("gif");
                    }
                  }}
                />
              </div>
              <button
                type="submit"
                className="flex justify-center rounded-md bg-indigo-600 px-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Render
              </button>
            </>
          )}
        </form>
      ) : !finalVideo ? (
        <div className="flex h-screen items-center justify-center">
          <div className="w-3/5">
            <ProgressBar progress={progress} />
          </div>
        </div>
      ) : (
        <FinalVideo
          finalVideo={finalVideo}
          videoTitle={videoTitle}
          videoType={videoType}
          onDeleteClicked={() => document.location.reload()}
        />
      )}
    </>
  );
}

export default Page;
