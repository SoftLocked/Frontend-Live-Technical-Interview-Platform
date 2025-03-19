"use client"; // Required for Firebase hooks in Next.js App Router

import { auth } from "../../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut, User } from "firebase/auth";
import { useState } from "react";

import { useRouter } from "next/router";

export default function Login() {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter()

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error(error);
    }
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center">
      {user ? (
          <></>
      ) : (
        <button onClick={googleSignIn}>Sign in with Google</button>
      )}
    </div>
  );
}
