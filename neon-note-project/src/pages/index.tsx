import { LoginComponent } from "@/components/LoginComponent";
import { NeonNote } from "@/components/Note";
import { useTheme } from "@/components/ThemeDark";
import { auth } from "@/services/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MoonLoader } from "react-spinners";

export default function Home() {
  const [user] = useAuthState(auth);
  const {darkMode} = useTheme();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      setLoading(false);
    };
  }, [user]);

  return (
    <div className={`${darkMode ? 'bg-black-900' : 'bg-neon-50'} h-full`}>
    {console.log(user)}
      {/* {loading && (
        <MoonLoader />
      )} */}

      {user && (
        <NeonNote />
      )}
      {console.log(user)}
      {!user && (
       <LoginComponent />
      )}
    </div>
  );
}