import { useTheme } from "@/components/ThemeDark";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ErrorConnection() {

  const { darkMode } = useTheme();

  const router = useRouter();

  function tryAgain() {
    router.push("/");
  };

  return (
    <div className='top-2/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 fixed'>
      <div className="flex flex-col gap-4">
        <Image alt="Imagem" src={"/error.svg"} className="animate-bounce" height={400} width={400} />
        <h2 className={`${darkMode ? "text-slate-300" : "text-black-500"} text-lg`}>Oops! Você realmente está conectado(a)? Tenta de novo para vermos!</h2>
      </div>
      <div className="flex justify-center">
      <button
          className="bg-blue-600 text-white w-auto font-medium text-lg hover:bg-blue-500 duration-300 transition-all rounded-md p-2"
          onClick={tryAgain}
        >
          Tente novamente
        </button>
      </div>
    </div>
  );
}