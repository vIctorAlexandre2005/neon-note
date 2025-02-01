import { fetchPastaById } from "@/services";
import { useEffect, useState } from "react";

export function usePasta(id: string | string[] | undefined) {
  const [pasta, setPasta] = useState<{ id: string; nome: string; descricao: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadPasta = async () => {
      try {
        const data = await fetchPastaById(id as string);
        setPasta(data);
      } catch (err) {
        setError("Erro ao carregar pasta.");
      } finally {
        setLoading(false);
      }
    };

    loadPasta();
  }, [id]);

  return { pasta, loading, error };
};
