import { chatSession } from "@/configs/AIModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    console.log("Received prompt:", prompt);

    const result = await chatSession.sendMessage(prompt);
    console.log("Gemini result:", result);

    const responseText = result.response
      ? result.response.text()
      : "No response text found";
    console.log("Response text:", responseText);

    return NextResponse.json({ result: JSON.parse(responseText) });
  } catch (e) {
    console.error("Error occurred:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
