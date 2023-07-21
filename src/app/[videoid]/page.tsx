import { pb } from "@/lib/pocketbase";
import { Record } from "pocketbase";

type Video = Record & {
  collectionId: string;
  collectionName: string;
  created: string;
  id: string;
  title: string;
  updated: string;
  user: string;
  video: string; // filename
  type: "gif" | "video";
};

export const revalidate = 60;

async function Page({ params }: { params: { videoid: string } }) {
  const videoId = params.videoid;
  const video = (await pb.collection("videos").getOne(videoId)) as Video;
  const serverHost = pb.baseUrl;

  const videoUrl = `${serverHost}/api/files/${video.collectionId}/${video.id}/${video.video}`;

  let isGif = false;
  if (video.type === "gif") {
    isGif = true;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-5">
      <h1 className="text-xl font-semibold sm:text-4xl">{video.title}</h1>
      {videoUrl && (
        <video
          crossOrigin="anonymous"
          controls={!isGif}
          autoPlay={isGif}
          muted={isGif}
          className="w-8/12 max-w-4xl"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

export default Page;
