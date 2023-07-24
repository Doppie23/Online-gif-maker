"use client";

import PlayerControls from "@/components/PlayerControls/PlayerControls";
import { useState, useRef } from "react";
import ReactPlayer from "react-player";

export default function Home() {
  const [inOutPoints, setInOutPoints] = useState([0, Infinity]);
  const [playing, setPlaying] = useState(false);
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
    <div className="m-auto w-1/2">
      <div className="space-y-2">
        <ReactPlayer
          url="/testvideo.mp4"
          width={""}
          height={""}
          playing={playing}
          ref={videoRef}
          loop
          onReady={onPlayerReady}
          onProgress={(progress) => {
            keepPlayerInsidePoints(progress.playedSeconds);
          }}
          onSeek={(seconds) => {
            keepPlayerInsidePoints(seconds);
          }}
        />
        <PlayerControls
          maxValue={videoLength}
          onChange={(l, r) => {
            console.log(l, r);
            setInOutPoints([l, r]);
          }}
          onPlayButtonClicked={(playing) => {
            setPlaying(playing);
          }}
        />
      </div>
    </div>
  );
}
