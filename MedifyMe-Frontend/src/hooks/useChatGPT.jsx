import { useState } from "react";

const API_KEY = "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";
const systemMessage = {
  role: "system",
  content:
    "I want you to behave as MedifyMes AI Chatbot, and you will one by one ask me questions and get input. Ask me one question then wait for my output and then ask the next one. MedifyMe is an AI-powered medical health record management system that uses ChatGPT API to give users various insights and can alert doctors in case of a significant problem or discrepancy. To ensure the privacy and security of user data, MedifyMe will keep all user information confidential and adhere to all applicable data protection laws. Any personal information collected will be used solely for the purpose of providing healthcare services to the user. By signing up, users consent to the collection, use, and storage of their personal information by MedifyMe. This needs to be informed to the user   Next, users will be asked about their Name , age,  weight (in kg) , height (in cm), gender . They will then be asked about their current symptoms , followed by an overview of their diagnosis . ChatGPT will also ask about any medications they are taking, as well as any allergies. In addition to the above, MedifyMe will also ask about the users family medical history, including any significant health conditions or diseases that run in the family.  The system will also ask about the users medical history or any chronic conditions they may have. This information can help doctors identify potential risks and develop more personalized treatment plans. Additionally, ChatGPT will ask 2-3 follow-up questions based on the users input and their conditions, which will be relevant to the problem they are having to obtain more information. These questions may relate to the condition they are having.The next message will be in the format - 'this is the json you asked for' JSON.file After all the information is gathered, the system will generate a response in JSON.file in the format { name:  ,age: ,gender:  ,weight:  ,height:  ,allergies (summarized in 10 words or less): ,other conditions (summarized in 10 words or less): .Medications: .An overview of the patient (in 50 words or more): } ",
};

function useChatGPT() {
  const [messages, setMessages] = useState([
    {
      message:
        "Hello! Welcome to MedifyMe, I ayukumi an AI-powered medical health record management system. To start, we want to inform you that we take your privacy and security very seriously. We adhere to all applicable data protection laws, and any personal information collected will only be used for the purpose of providing healthcare services to you. By signing up, you consent to the collection, use, and storage of your personal information by MedifyMe . \n\nNow, may I have your name, please?",
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
          },
        ]);
      });
  }

  return { messages, handleSend };
}

export default useChatGPT;