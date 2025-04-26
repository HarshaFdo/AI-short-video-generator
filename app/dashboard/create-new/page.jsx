"use client";

import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";

function CreateNew() {
  const [formData, setFormData] = useState({});
  
  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue);
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onCreateClickHandler = () => {
    GetVideoScript();
  };

  //Get video script
  const GetVideoScript = async () => {
    const prompt =
      "Write a script to generate " +
      formData.duration +
      " video on topic: " +
      formData.topic +
      " along with AI image prompt in " +
      formData.imageStyle +
      " format for each scene and give me result in JSON format with imagePrompt and ContentText as field,No Plain text";
    console.log(prompt);

    const result = await axios.post("/api/get-video-script", {
      prompt: prompt,
    }).then(resp=>{
      console.log(resp.data);
    });
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
    </div>
  );
}

export default CreateNew;
