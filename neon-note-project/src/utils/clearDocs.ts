import { useEffect } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase';

async function deleteCollection(collectionPath: any) {
  const querySnapshot = await getDocs(collection(db, collectionPath));
  const deletePromises: any[] = [];

  querySnapshot.forEach(document => {
    deletePromises.push(deleteDoc(doc(db, collectionPath, document.id)));
  });

  await Promise.all(deletePromises);
}

// Chame a função passando o nome da coleção que você quer excluir
deleteCollection('notes').then(() => {
  console.log('Todos os documentos da coleção foram excluídos.');
});

useEffect(() => {
  async function clearAllCollections() {
    const collections = ['notes']; // adicione o nome de todas as coleções

    for (const collectionName of collections) {
      await deleteCollection(collectionName);
    }

    console.log('Todas as coleções foram excluídas.');
  }

  clearAllCollections();
});
