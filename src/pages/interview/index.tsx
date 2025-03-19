import NavBar from '@/components/NavBar';
import { useAuth } from '@/context/AuthContext';
import { Button, Container, Grid2, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
const Interview = () => {

    
    const { user } = useAuth();
    const router = useRouter();

    const [code, setCode] = useState(
        `function add(a, b) {\n  return a + b;\n}`
    );

    useEffect(() => {
        if (!user) {
          router.push("/login"); // Redirect after component mounts
        }
    }, [user, router]); // Only runs when `user` or `router` changes

    if (!user) {
    return <p>Redirecting...</p>; // Prevent rendering before redirect
    }

    return (
    <React.Fragment>
        <NavBar/>
        <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => code}
            //highlight={code => highlight(code, languages.js)}
            padding={20}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
            }}
            className='bg-gray-800'
        />
    </React.Fragment>
    );
}
 
export default Interview;