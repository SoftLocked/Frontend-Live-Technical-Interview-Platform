import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { redirect } from "next/navigation";

export const useAuth = () => {
    const [user, setUser] = useState<User|null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    }, []);
  
    const logout = async () => {
      await signOut(auth);
      redirect('/');
    };
  
    return { user, loading, logout};
  };