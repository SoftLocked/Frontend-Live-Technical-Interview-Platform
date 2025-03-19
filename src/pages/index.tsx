import NavBar from '@/components/NavBar';
import { useAuth } from '@/context/AuthContext';
import { Button, Container, Grid2, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Home = () => {

    
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
        router.push("/instructions");
    }

    return (
    <React.Fragment>
        <NavBar/>
        <div className='min-h-200 flex justify-center items-center'>
            <div className=''>
                <Button variant='contained' sx={{ px: 4, py: 3, display: 'block' }} onClick={handleRedirect}><Typography variant='h5'>Launch Interview</Typography></Button>
            </div>
        
        </div>
    </React.Fragment> );
}
 
export default Home;