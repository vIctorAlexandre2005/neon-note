import { useRouter } from "next/router";
import NProgress from "nprogress";

export const mockPastas = [
  { id: "1", nome: "Trabalho", descricao: "Arquivos e documentos do trabalho." },
  { id: "2", nome: "Estudos", descricao: "Materiais de estudo e anotações." },
  { id: "3", nome: "Pessoal", descricao: "Fotos, lembranças e informações pessoais." },
];

export default function PastaDetalhes() {
  const router = useRouter();
  const { id } = router.query;

  const pasta = mockPastas.find((p) => p.id === id);

  if (!pasta) return <p className="text-black-600">Pasta não encontrada.</p>;

  const handleNavigation = (url: string) => {
    NProgress.start(); // Inicia a barra de carregamento
    router.push(url).finally(() => NProgress.done()); // Finaliza quando a navegação termina
  };

  return (
    <div>
      <h1 className="text-black-600">{pasta.nome}</h1>
      <p className="text-black-600">{pasta.descricao}</p>
      <button
        className="bg-blue-600 text-white w-auto font-medium text-lg hover:bg-blue-500 duration-300 transition-all rounded-lg p-2"
        onClick={() => handleNavigation("/tasks")}
      >
        Voltar
      </button>
    </div>
  );
}
