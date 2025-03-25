"use server";

import { IconButton, Paper, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef, useState } from "react";
import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources.mjs';

require('dotenv').config()

const openAIClient = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

const ChatInterface = (props:any) => {
    
    let {messages, setMessages} = props;

    const [input, setInput] = useState("");
    const chatRef = useRef(null);
    const endOfChatRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {
      if (endOfChatRef.current) {
        endOfChatRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [messages]);

    const handleSend = async () => {
      setMessages(
        (messages:any) => messages.concat([{
        role: "user",
        content: input
        }])
      )
      setInput('');

      console.log('user msg', messages)

      const completions = await openAIClient.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages.concat([{
          role: "user",
          content: input
          }])
      })

      setMessages(
        (messages:any) => messages.concat([{
            role: "system",
            content: String(completions.choices[0].message.content)
        }])
      )

      console.log('system msg', messages);

    };

    return ( 
        <div className="flex flex-col w-full mx-auto bg-gray-100 shadow-md"
        style={{height: "calc(100vh - 70px)"}}>
      {/* Header */}
      <div className="bg-gray-800 text-white py-3 text-center font-semibold">
        Talk to Your Interviewer
      </div>

      {/* Chat Body */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-scroll p-4 space-y-8 bg-gray-700"
        
      >
        {messages.slice(2).map((msg:any) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <Paper
              className={`max-w-xs px-4 py-2 rounded-2xl shadow-md ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              }`}
              elevation={6}
            >
              {msg.content}
            </Paper>
          </div>
        ))}
        <div ref={endOfChatRef} />
      </div>

      {/* Chat Input */}
      <div className="flex items-center p-2 bg-white border-t border-gray-300">
        <TextField
          variant="outlined"
          size="small"
          value={input}
          onChange={(e:any) => setInput(e.target.value)}
          onKeyDown={(e:any) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1"
          InputProps={{
            className: "rounded-full bg-gray-100",
          }}
        />
        <IconButton onClick={handleSend} className="ml-2" color="primary">
          <SendIcon />
        </IconButton>
      </div>
    </div>
    );
}
 
export default ChatInterface;