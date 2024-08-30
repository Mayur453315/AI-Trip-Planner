import { GoogleGenerativeAI } from "@google/generative-ai";

  
  const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "Generate Travel Plan for Location : Las vegas, for 3 Days for Couple with a cheap budget , Give me a Hotels option list with HotelName , Hotel Address,price,hotel image url,geo coordination ,rating,descriptions and suggest itinerary with placeName,place Details,place image URL,Geo coordinates,ticket pricing, rating,time t travel each of the  location for 3 days with each day plan with best time to visit in json format.\n",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
  export  const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
      ],
    });
  
    