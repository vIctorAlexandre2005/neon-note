import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface ProjectDetails {
    id: string;
    name: string;
    description: string;
  }

export default function MainPageProject() {
  const router = useRouter();

  const { id, projectId } = router.query; // Obtém o ID da pasta e do projeto
  const [project, setProject] = useState<ProjectDetails | null>(null);

  useEffect(() => {
    if (!id || !projectId) return;

    // Simulando uma API para buscar detalhes do projeto
    setProject({
      id: projectId as string,
      name: `Projeto ${projectId}`,
      description: `Descrição do projeto ${projectId} dentro da pasta ${id}`,
    });
  }, [id, projectId]);

  if (!projectId) {
    return <p>Projeto não encontrado.</p>;
  }


  return (
    <div>
      <h1>{project?.name}</h1>
      <p>{project?.description}</p>
      <button onClick={() => router.push(`/tasks/${id}`)}>Voltar</button>
    </div>
  );
}
