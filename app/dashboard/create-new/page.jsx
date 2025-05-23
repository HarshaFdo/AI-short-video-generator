"use client";

import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import { VideoDataContext } from "@/app/_context/VideoDataContext";
import { db } from "@/configs/db";
import { Users, VideoData } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import PlayerDialog from "../_components/PlayerDialog";
import { useRouter } from "next/navigation";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { toast } from "sonner";
import { eq } from "drizzle-orm";

function CreateNew() {
  useEffect(() => {
    setPlayVideo(false);
    setVideoId(null);
  }, []);  

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const [playVideo, setPlayVideo] = useState(false);
  const [videoId, setVideoId] = useState();

  const { videoData, setVideoData } = useContext(VideoDataContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { user } = useUser();
  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);

    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    if (userDetail?.credits < 10) {
      toast("You don't have enough Credits.");
      return;
    }
    GetVideoScript();
    // GenerateAudioFile(scriptData);
    // GenerateAudioCaption(audioFile);
    // GenerateImage();
  };

  //Get video script
  const GetVideoScript = async () => {
    setLoading(true);
    const prompt =
      "Write a script to generate " +
      formData.duration +
      " video on topic: " +
      formData.topic +
      " along with AI image prompt in " +
      formData.imageStyle +
      " format for each scene and give me result in JSON format with imagePrompt and ContentText as field,No Plain text";
    console.log(prompt);

    const resp = await axios.post("/api/get-video-script", {
      prompt: prompt,
    });
    if (resp.data.result) {
      setVideoData((prev) => ({
        ...prev,
        videoScript: resp.data.result,
      }));
      setVideoScript(resp.data.result);
      await GenerateAudioFile(resp.data.result);
    }
  };

  /**
   * Generate Audio File and Save to Firebase Storage.
   * @param {*} videoScriptData
   */
  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = "";
    const id = uuidv4();
    videoScriptData.forEach((item) => {
      script = script + item.ContentText + " ";
    });

    try {
      console.log("Generating audio for script:", script);
      const resp = await axios.post("/api/generate-audio", {
        text: script,
        id: id,
      });
      console.log("Audio generation response:", resp.data);
      setVideoData((prev) => ({
        ...prev,
        audioFileUrl: resp.data.Result,
      }));
      setAudioFileUrl(resp.data.Result);
      // resp.data.result &&
      //   (await GenerateAudioCaption(resp.data.result, videoScriptData));
      if (resp.data.Result) {
        await GenerateAudioCaption(resp.data.Result, videoScriptData);
      } else {
        console.error("No audio URL returned!");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error generating audio:", error);
      setLoading(false);
    }
  };

  /**
   * used to generate caption from audio file.
   * @param {*} audioFile
   */
  const GenerateAudioCaption = async (audioFile, videoScriptData) => {
    setLoading(true);
    console.log(audioFile);
    const resp = await axios.post("/api/generate-caption", {
      audioFileUrl: audioFile,
    });
    setCaptions(resp?.data?.result);
    setVideoData((prev) => ({
      ...prev,
      captions: resp.data.result,
    }));
    resp.data.result && GenerateImage(videoScriptData);
  };

  // Used to generate AI Images
  const GenerateImage = async (videoScriptData) => {
    let images = [];
    for (const element of videoScriptData) {
      try {
        const resp = await axios.post("/api/generate-image", {
          prompt: element.imagePrompt,
        });
        console.log(resp.data.result);
        images.push(resp.data.result);
      } catch (e) {
        console.log("Error:" + e);
      }
    }
    setVideoData((prev) => ({
      ...prev,
      imageList: images,
    }));
    setImageList(images);
    setLoading(false);
  };

  useEffect(() => {
    if (videoData && Object.keys(videoData).length == 4) {
      console.log(videoData);
      SaveVideoData(videoData);
    }
  }, [videoData]);

  const SaveVideoData = async (videoData) => {
    setLoading(true);
    console.log(videoData);

    const result = await db
      .insert(VideoData)
      .values({
        script: videoData?.videoScript,
        audioFileUrl: videoData?.audioFileUrl ?? "",
        captions: videoData?.captions ?? "",
        imageList: videoData?.imageList ?? [],
        createdBy: user?.primaryEmailAddress?.emailAddress,
      })
      .returning({ id: VideoData?.id });

    await UpdateUserCredits();
    setVideoId(result[0].id);
    setPlayVideo(true);
    console.log(result);
    setLoading(false);
  };

  /**
   * Used to update user credits
   */

  const UpdateUserCredits = async () => {
    const result = await db
      .update(Users)
      .set({
        credits: userDetail?.credits - 10,
      })
      .where(eq(Users?.email, user?.primaryEmailAddress?.emailAddress));
    console.log(result);
    setUserDetail((prev) => ({
      ...prev,
      credits: userDetail?.credits - 10,
    }))
    setVideoData(null);
  };

  return (
    <div className="md:px-20">
      <h2 className="text-4xl font-bold text-center text-primary">
        Create New
      </h2>
      <div className="p-10 mt-4 shadow-md">
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange} />
        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange} />
        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange} />
        {/* Create Button */}
        <Button className="w-full mt-10" onClick={onCreateClickHandler}>
          Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading} />
      {playVideo && <PlayerDialog playVideo={playVideo} videoId={videoId} />}
    </div>
  );
}

export default CreateNew;
