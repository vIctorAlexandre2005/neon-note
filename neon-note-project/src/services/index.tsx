export const fetchPastaById = async (id: string) => {
    try {
      const response = await fetch(`/api/pastas/${id}`); // Exemplo de API interna
      if (!response.ok) throw new Error("Erro ao buscar a pasta");
      return response.json();
    } catch (error) {
      console.error("Erro ao buscar pasta:", error);
      return null;
    }
  };
  