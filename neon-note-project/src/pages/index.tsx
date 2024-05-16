import { LoginComponent } from "@/components/LoginComponent";
import { NeonNote } from "@/components/Note";
import { auth } from "@/services/firebase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MoonLoader } from "react-spinners";

export default function Home() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      setLoading(false);
    };
  }, [user]);

  return (
    <>
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
    </>
  );
}