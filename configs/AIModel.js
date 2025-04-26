import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY );

// const apiKey =
//   PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseMimeType: "application/json",
};

export const model = ai.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig,
});

export const chatSession = model.startChat({
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Write a script to generate 30 seconds video on topic: Interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as fields ",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "imagePrompt": "Realistic photograph, wide establishing shot of a bustling medieval street in Strasbourg, Alsace, 1518. Timber-framed houses, cobblestones, townspeople in period clothing going about daily life under a slightly overcast sky. Morning light.",\n    "ContentText": "In the summer of 1518, the city of Strasbourg witnessed one of history\'s strangest events."\n  },\n  {\n    "imagePrompt": "Realistic photograph, medium shot of a single medieval woman (Frau Troffea) dancing fervently and uncontrollably in the middle of a cobblestone street. Her expression is trance-like, oblivious to confused onlookers. Strasbourg, 1518.",\n    "ContentText": "It began innocently, or perhaps ominously, with one woman, Frau Troffea, dancing uncontrollably in the street."\n  },\n  {\n    "imagePrompt": "Realistic photograph, slightly elevated angle showing a growing crowd of about 30 medieval people dancing erratically in the same street. Expressions range from exhausted to ecstatic, movements are disjointed. Strasbourg, 1518, daytime.",\n    "ContentText": "Within a week, she wasn\'t alone. Dozens more joined her compulsive, non-stop dancing."\n  },\n  {\n    "imagePrompt": "Realistic photograph, wide shot capturing a chaotic scene of hundreds of people dancing frantically in a large town square. Some are collapsing from exhaustion. Torches suggest it might be night or twilight. Atmosphere of mass hysteria. Strasbourg, 1518.",\n    "ContentText": "The phenomenon escalated. Soon, hundreds were caught in the \'Dancing Plague\', unable to stop."\n  },\n  {\n    "imagePrompt": "Realistic photograph, eye-level shot of concerned-looking medieval city officials and physicians observing the dancers from the edge of the square. One points towards a newly built wooden stage. Strasbourg, 1518.",\n    "ContentText": "Baffled authorities, believing it was \'hot blood\', prescribed *more* dancing as the cure."\n  },\n  {\n    "imagePrompt": "Realistic photograph, low-angle shot focusing on the feet and lower legs of exhausted dancers on a rough wooden stage. Musicians play pipes and drums nearby with grim faces. Some dancers have collapsed. Strasbourg, 1518.",\n    "ContentText": "They built stages and hired musicians, hoping to sweat the affliction out. But people began dying."\n  },\n  {\n    "imagePrompt": "Realistic photograph, close-up on the face of a collapsing dancer, showing extreme exhaustion, dehydration, and desperation. Blurred dancing figures in the background. Harsh lighting. Strasbourg, 1518.",\n    "ContentText": "Dozens perished from heart attacks, strokes, or sheer exhaustion during the weeks-long ordeal."\n  },\n  {\n    "imagePrompt": "Realistic photograph, atmospheric shot of the now quieter Strasbourg square at dawn. A few lone figures shuffle weakly. Mist hangs in the air. A sense of weary aftermath and lingering mystery. Strasbourg, 1518.",\n    "ContentText": "As mysteriously as it began, the Dancing Plague subsided, leaving behind bewildered survivors and a chilling historical puzzle."\n  }\n]\n```',
        },
      ],
    },
  ],
});
