import React, { useState } from "react";
import { Thumbnail } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import PlayerDialog from "./PlayerDialog";

function VideoList({ videoList }) {
  const [openPlayDialog, setOpenPlayDialog] = useState(false);
  const [videoId, setVideoId] = useState();
  return (
    <div className="grid grid-cols-2 gap-10 mt-10 md:grid-cols-3 lg:grid-cols-4">
      {videoList?.map((video, index) => (
        <div
          className="transition-all cursor-pointer hover:scale-105"
          onClick={() => {
            setOpenPlayDialog(Date.now());
            setVideoId(video?.id);
          }}
        >
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={250}
            compositionHeight={390}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            style={{
              borderRadius: 15,
            }}
            inputProps={{
              ...video,
              setDurationInFrame: (v) => console.log(v),
            }}
          />
          <PlayerDialog playVideo={openPlayDialog} videoId={videoId} />
        </div>
      ))}
    </div>
  );
}

export default VideoList;
