"use client";

import PlayerControls from "@/components/PlayerControls/PlayerControls";
import { useState, useRef } from "react";
import ReactPlayer from "react-player";

export default function PlayerEditor({
  src,
  onInOutChange,
}: {
  src: string;
  onInOutChange?: (L: number, R: number) => void;
}) {
  const [inOutPoints, setInOutPoints] = useState([0, Infinity]);
  const [videoLength, setVideoLength] = useState(0); // in seconden
  const videoRef = useRef<ReactPlayer>(null);

  const onPlayerReady = () => {
    if (videoRef.current) {
      let duration: number = videoRef.current.getDuration();
      duration = Math.floor(duration);
      setVideoLength(duration);
    }
  };

  const keepPlayerInsidePoints = (secondsPlayed: number) => {
    if (secondsPlayed < inOutPoints[0]) {
      videoRef.current?.seekTo(inOutPoints[0]);
    } else if (secondsPlayed > inOutPoints[1]) {
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
              videoRef.current?.seekTo(l);
              setInOutPoints([l, r]);
              if (onInOutChange) onInOutChange(l, r);
            }}
          />
        </div>
      </div>
    </>
  );
}
