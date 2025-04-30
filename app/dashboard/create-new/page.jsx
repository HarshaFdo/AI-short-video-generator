"use client";

import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";

const scriptData =
  "In the pixelated city of Gridopolis, lived a little electric car named Sparky. Sparky loved to zoom around, but sometimes he needed to recharge his batteries. One night, Sparky got lost in a dark, pixelated forest. But he wasn't alone. He met a group of friendly fireflies who lit up the way. The fireflies guided Sparky back to the city, their lights twinkling like tiny stars. Sparky made it home safely, thanks to his new friends, and dreamed of their magical glow.";
const audioFile =
  "https://firebasestorage.googleapis.com/v0/b/romie-startups.firebasestorage.app/o/ai-video-generator%2F3b1fce66-7a87-47ef-8813-c8adca2ab3ac.mp3?alt=media&token=11326c42-904e-4a73-a46d-f8cf3ec23596";

const VideoSCRIPT = [
  {
    imagePrompt:
      "Realistic photo of ancient Egyptian temple walls covered in weathered hieroglyphs under a golden desert sun, dust motes floating in the air, evoking a sense of mystery and forgotten knowledge.",
    contentText:
      "For centuries, the secrets of ancient Egypt were locked away. Their intricate hieroglyphs, a beautiful but lost language, remained a profound mystery to the world.",
  },
  {
    imagePrompt:
      "Realistic photo depicting French soldiers in late 18th-century uniforms digging near the town of Rosetta in Egypt. One soldier points excitedly at a partially unearthed large, dark stone slab buried in the sand. Hot, dusty atmosphere.",
    contentText:
      "Then, in 1799, during Napoleon's campaign in Egypt, a pivotal discovery was made near the town of Rosetta. French soldiers unearthed a stone unlike any other.",
  },
];

function CreateNew() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioFileUrl, setAudioFileUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imageList, setImageList] = useState();
  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);

    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    // GetVideoScript();
    // GenerateAudioFile(scriptData);
    // GenerateAudioCaption(audioFile);
    GenerateImage();
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
    const result = await axios
      .post("/api/get-video-script", {
        prompt: prompt,
      })
      .then((resp) => {
        console.log("EXE");
        setVideoScript(resp.data.result);
        resp.data.result && GenerateAudioFile(resp.data.result);
      });
  };

  const GenerateAudioFile = async (videoScriptData) => {
    setLoading(true);
    let script = "";
    const id = uuidv4();
    videoScriptData.forEach((item) => {
      script = script + item.ContentText + " ";
    });

    await axios
      .post("/api/generate-audio", {
        text: script,
        id: id,
      })
      .then((resp) => {
        setAudioFileUrl(resp.data.result);
        resp.data.result && GenerateAudioCaption(resp.data.result);
      });
  };

  const GenerateAudioCaption = async (audioFile) => {
    setLoading(true);
    console.log(audioFile);
    await axios
      .post("/api/generate-caption", {
        audioFileUrl: audioFile,
      })
      .then((resp) => {
        console.log(resp.data.result);
        setCaptions(resp?.data?.result);
        GenerateImage();
      });

    console.log(videoScript, captions, audioFileUrl);
  };

  // Used to generate AI Images
  const GenerateImage = () => {
    let images = [];
    VideoSCRIPT.forEach(async (element) => {
      await axios
        .post("/api/generate-image", {
          prompt: element?.imagePrompt,
        })
        .then((resp) => {
          console.log(resp.data.result);
          images.push(resp.data.result);
        });
    });
    console.log(images);
    setImageList(images);
    setLoading(false);
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
    </div>
  );
}

export default CreateNew;
