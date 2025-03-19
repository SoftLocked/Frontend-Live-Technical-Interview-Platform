import NavBar from '@/components/NavBar';
import { useAuth } from '@/context/AuthContext';
import { Button, Container, Grid2, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Instructions = () => {

    
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
          router.push("/login"); // Redirect after component mounts
        }
    }, [user, router]); // Only runs when `user` or `router` changes

    if (!user) {
    return <p>Redirecting...</p>; // Prevent rendering before redirect
    }

    const handleRedirect = () => {
        router.push("/interview");
    }

    return (
    <React.Fragment>
        <NavBar/>
        <div className='min-h-100 flex justify-center items-center'>
            <Stack direction="column" spacing={1} alignItems="center">
            <Typography variant='h2'>Instructions<br/></Typography>
            <ul>
                <li>Upon beginning the interview, you will receive a technical problem to solve</li>
                <li>You must solve this like you would in a real technical interview</li>
                <li>Asking the chat bot for clarification and explaining your thought process in English before coding your solution</li>
            </ul>
            <Button variant='contained' sx={{ px: 4, py: 3, display: 'block' }} onClick={handleRedirect}><Typography variant='h5'>Start Interview</Typography></Button>
            </Stack>
            
        </div>
    </React.Fragment>
    );
}
 
export default Instructions;