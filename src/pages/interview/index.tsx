import ChatInterface from '@/components/ChatInterface';
import NavBar from '@/components/NavBar';
import { useAuth } from '@/context/AuthContext';
import { Box, Button, Container, Grid2, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import OpenAI from 'openai'
import { ChatCompletionMessageParam } from 'openai/resources.mjs';

require('dotenv').config()

const openAIClient = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

const Interview = () => {

    const [code, setCode] = useState(
        ''
    );

    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([
        {
            role: "user",
            content: `
            You are a technical interviewer for Google. Without writing anything else, generate, in python comments, a prompt for a leetcode-style technical data structures and algorithms type interview question (for reference, something that might appear here: https://leetcode.com/discuss/topic/google-interview/).
            
            The question must be considered a leetcode medium difficulty question. In other words, the question must be roughly among the questions rated at a "medium" difficulty on leetcode.com
            
            The prompt must intentionally withhold some necessary information for solving the problem such as input and output format as well as input constraints.
            
            Ground the problem in a real-world engineering scenario.

            Subsequent messages should not be formatted in a python comment.
            `
        }
    ])

    const { user } = useAuth();
    const router = useRouter();
    

    useEffect(() => {
        if (!user) {
          router.push("/login"); // Redirect after component mounts
        }

        const fetchQuestionPrompt = async () => {
            const completions = await openAIClient.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: messages
            })
            
            console.log(completions)
            setCode(String(completions.choices[0].message.content))
            setMessages(
                messages.concat([{
                    role: "system",
                    content: String(completions.choices[0].message.content)
                }])
            )
        }
    
        fetchQuestionPrompt();

    }, [user, router]); // Only runs when `user` or `router` changes

    if (!user) {
    return <p>Redirecting...</p>; // Prevent rendering before redirect
    }

    return (
    <React.Fragment>
        <NavBar/>
        <Grid2 container spacing={0}>
            <Grid2 size={8}>
                <Editor
                    value={code}
                    onValueChange={code => setCode(code)}
                    highlight={code => code}
                    //highlight={code => highlight(code, languages.js)}
                    padding={20}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 16,
                        height: "calc(100vh - 70px)",
                    }}
                    className='bg-gray-800'
                />
            </Grid2>
            
            <Grid2 size={4}>
                <Box>
                    <ChatInterface messages={messages} setMessages={setMessages}></ChatInterface>
                </Box>
            </Grid2>
        </Grid2>
        

    </React.Fragment>
    );
}
 
export default Interview;