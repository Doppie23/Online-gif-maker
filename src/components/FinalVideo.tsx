"use client";

import ReactPlayer from "react-player";
import { pb } from "@/lib/pocketbase";
import { VideoType } from "@/app/editor/page";
import CopyLink from "./CopyLink";
import { useState } from "react";

type Props = {
  finalVideo: Blob;
  videoTitle: string;
  videoType: VideoType;
  onDeleteClicked: () => void;
};

function FinalVideo({
  finalVideo,
  videoTitle,
  videoType,
  onDeleteClicked,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [videoLink, setVideoLink] = useState("");

  const uploadVideo = async () => {
    setUploading(true);

    const formData = new FormData();
    const userID = pb.authStore.model?.id as string;

    formData.append("video", finalVideo, "video.mp4");
    formData.append("user", userID);
    formData.append("title", videoTitle);
    formData.append("type", videoType);

    const record = await pb.collection("videos").create(formData);
    const Link = window.location.host + "/" + record.id;
    console.log(Link);
    setVideoLink(Link);
    setUploading(false);
  };

  return (
    <div className="mx-28 flex h-screen flex-col items-center justify-center">
      <div>
        <ReactPlayer
          width={""}
          height={""}
          url={URL.createObjectURL(finalVideo)}
          controls
        />
        <div className="mt-3 flex flex-row items-center justify-center space-x-6">
          <button
            disabled={uploading}
            onClick={uploadVideo}
            className="flex justify-center rounded-md bg-indigo-600 px-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-600 disabled:text-gray-300"
          >
            Upload
          </button>
          <button
            disabled={uploading}
            onClick={onDeleteClicked}
            className="flex justify-center rounded-md bg-red-600 px-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:bg-gray-600 disabled:text-gray-300"
          >
            Delete
          </button>
        </div>
        {videoLink && (
          <div className="mt-3 flex flex-row items-center justify-center">
            <CopyLink link={videoLink} />
          </div>
        )}
      </div>
    </div>
  );
}

export default FinalVideo;
