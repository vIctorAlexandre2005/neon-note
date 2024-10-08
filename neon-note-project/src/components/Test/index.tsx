import { auth, db } from "@/services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useState } from "react";

export function TestComponent() {

// Função para adicionar título e descrição
const addTitleAndDescription = async (title: string, description: string) => {
  const user = auth.currentUser; // Obtém o usuário autenticado

  if (user) {
    const userRef = doc(db, 'users', user.uid); // Referência ao documento do usuário
    const dataToSave = {
      title: title,
      description: description
    };

    try {
      await setDoc(userRef, { ...dataToSave }, { merge: true }); // Adiciona ou atualiza os dados
      console.log("Título e descrição salvos com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar título e descrição:", error);
    }
  } else {
    console.log("Usuário não autenticado.");
  }
};

const loadTitleAndDescription = async () => {
    const user = auth.currentUser; // Obtém o usuário autenticado
  
    if (user) {
      const userRef = doc(db, 'users', user.uid); // Referência ao documento do usuário
      const docSnap = await getDoc(userRef);
  
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Título:", data.title);
        console.log("Descrição:", data.description);
        // Aqui você pode fazer algo com os dados, como atualizá-los no estado do componente
      } else {
        console.log("Nenhum dado encontrado para este usuário.");
      }
    } else {
      console.log("Usuário não autenticado.");
    }
  };

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    addTitleAndDescription(title, description);
  };

  const handleLoad = () => {
    loadTitleAndDescription();
  };

  return (
    <div>
      <h1>Salvar Título e Descrição</h1>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button style={{ marginTop: '10px', backgroundColor: 'blue' }} onClick={handleSave}>Salvar</button>
      <button style={{ marginTop: '10px', backgroundColor: 'green' }} onClick={handleLoad}>Carregar</button>
    </div>
  );

}