import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useEffect, useState } from "react";
import axios from "axios"; // Uncomment if you're using Axios

const provider = new GoogleAuthProvider();

export const googleLogin = () => {
  return signInWithPopup(auth, provider);
};

export const logOut = () => {
  return signOut(auth)
}

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        const userData = { email: currentUser.email };

        // Example: Sending user data to backend for token storage
        // try {
        //   const res = await axios.post("/token", userData);
        //   localStorage.setItem("token", res.data.token);
        // } catch (error) {
        //   console.error("Token storage error:", error);
        // }
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};

export default useAuth;
