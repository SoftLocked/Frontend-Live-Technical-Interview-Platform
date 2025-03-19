import { useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null> (null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return user;
}