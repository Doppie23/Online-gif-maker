"use client";

import PlayerControls from "@/components/PlayerControls/PlayerControls";
import { useState, useRef } from "react";
import ReactPlayer from "react-player";

export default function PlayerEditor({
  src,
  onInOutChange,
  getLengthOnPlayerReady,
}: {
  src: string;
  onInOutChange?: (L: number, R: number) => void;
  getLengthOnPlayerReady?: (videoLength: number) => void;
}) {
  const [playing, setPlaying] = useState(false);
  const [inOutPoints, setInOutPoints] = useState([0, Infinity]);
  const [videoLength, setVideoLength] = useState(0); // in seconden
  const videoRef = useRef<ReactPlayer>(null);

  const onPlayerReady = () => {
    if (videoRef.current) {
      let duration: number = videoRef.current.getDuration();
      duration = Math.floor(duration);
      setVideoLength(duration);
      if (getLengthOnPlayerReady) getLengthOnPlayerReady(duration);
    }
  };

  const keepPlayerInsidePoints = (secondsPlayed: number) => {
    if (secondsPlayed < inOutPoints[0]) {
      videoRef.current?.seekTo(inOutPoints[0]);
    } else if (secondsPlayed >= inOutPoints[1]) {
      videoRef.current?.seekTo(inOutPoints[0]);
    }
  };

  return (
    <>
      <div className="space-y-2">
        <ReactPlayer
          url={src}
          width={""}
          height={""}
          ref={videoRef}
          controls
          loop
          playing={playing}
          onPlay={() => setPlaying(true)}
          onReady={onPlayerReady}
          onProgress={(progress) => {
            keepPlayerInsidePoints(progress.playedSeconds);
          }}
          onSeek={(seconds) => {
            keepPlayerInsidePoints(seconds);
          }}
        />
        <div className="mx-4">
          <PlayerControls
            maxValue={videoLength}
            onChange={(l, r) => {
              // move player to changed time
              if (l !== inOutPoints[0]) {
                videoRef.current?.seekTo(l);
              } else if (r !== inOutPoints[1]) {
                videoRef.current?.seekTo(r - 1);
              }

              setInOutPoints([l, r]);
              if (onInOutChange) onInOutChange(l, r);
            }}
          />
        </div>
      </div>
    </>
  );
}
