"use client"

import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";

function CreateNew() {
  const [formData,setFormData]=useState([]);
  const onHandleInputChange=(fieldName,fieldValue)=>{
    console.log(fieldName,fieldValue)

    setFormData(prev=>({
      ...prev,
      [fieldName]:fieldValue
    }))
  }
  return (
    <div className="md:px-20">
      <h2 className="text-4xl font-bold text-center text-primary">
        Create New
      </h2>
      <div className="p-10 mt-4 shadow-md">
        {/* Select Topic */}
        <SelectTopic onUserSelect={onHandleInputChange}/>
        {/* Select Style */}
        <SelectStyle onUserSelect={onHandleInputChange}/>
        {/* Duration */}
        <SelectDuration onUserSelect={onHandleInputChange}/>
        {/* Create Button */}
        <Button className='w-full mt-10'>Create Short Video</Button>
      </div>
    </div>
  );
}

export default CreateNew;
