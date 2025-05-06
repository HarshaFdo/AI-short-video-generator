import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { VideoData } from "@/configs/schema";
import { useRouter } from "next/navigation";

function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setVideoData] = useState();
  const [durationInFrame, setDurationInFrame] = useState(100);
  const router = useRouter();

  useEffect(() => {
    //   setOpenDialog(!openDialog);
    //   videoId && GetVideoData();
    // }, [playVideo]);
    if (playVideo) {
      setOpenDialog(true);
      videoId && GetVideoData();
    } else {
      setOpenDialog(false);
    }
  }, [playVideo, videoId]);

  const GetVideoData = async () => {
    const result = await db
      .select()
      .from(VideoData)
      .where(eq(VideoData.id, videoId));

    // console.log(result);
    setVideoData(result[0]);
  };

  // Close the dialog manually
  const closeDialog = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <Dialog open={openDialog}>
        <DialogContent className="flex flex-col items-center bg-white">
          <DialogHeader>
            <DialogTitle className="my-5 text-3xl font-bold">
              Your video is ready!
            </DialogTitle>
            <DialogDescription asChild>
              <div className="flex flex-col items-center">
                <Player
                  component={RemotionVideo}
                  durationInFrames={Number(durationInFrame.toFixed(0))}
                  compositionWidth={300}
                  compositionHeight={450}
                  fps={30}
                  controls={true}
                  inputProps={{
                    ...videoData,
                    setDurationInFrame: (frameValue) =>
                      setDurationInFrame(frameValue),
                  }}
                />
                <div className="flex gap-10 mt-10">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      router.replace("/dashboard");
                      closeDialog(); 
                    }}
                  >
                    Cancel
                  </Button>
                  <Button>Export</Button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PlayerDialog;
