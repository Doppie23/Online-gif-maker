"use client";

import ReactPlayer from "react-player";
import { VideoType } from "@/app/page";
import Link from "next/link";
import Image from "next/image";

type Props = {
  finalVideo: Blob;
  videoType: VideoType;
  onDeleteClicked: () => void;
};

function FinalVideo({ finalVideo, videoType, onDeleteClicked }: Props) {
  return (
    <div className="mx-28 flex h-screen flex-col items-center justify-center">
      <div>
        {videoType === "video" ? (
          <ReactPlayer
            width={""}
            height={""}
            url={URL.createObjectURL(finalVideo)}
            controls
          />
        ) : (
          <Image
            src={URL.createObjectURL(finalVideo)}
            alt="GIF"
            width={500}
            height={500}
          />
        )}
        <div className="mt-3 flex flex-row items-center justify-center space-x-6">
          <Link
            href={URL.createObjectURL(finalVideo)}
            target="_blank"
            download
            className="flex items-center rounded-md bg-indigo-600 px-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-600 disabled:text-gray-300"
          >
            <Image
              src="/download.svg"
              alt="Download"
              width={20}
              height={20}
              className="mr-2 invert"
            />
            <div>Download</div>
          </Link>
          <button
            onClick={onDeleteClicked}
            className="flex items-center rounded-md bg-red-600 px-6 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:bg-gray-600 disabled:text-gray-300"
          >
            <Image
              src="/delete.svg"
              alt="Delete"
              width={20}
              height={20}
              className="mr-2 invert"
            />
            <div>Discard</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinalVideo;
