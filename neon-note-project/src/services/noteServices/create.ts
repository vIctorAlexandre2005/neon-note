import axios from 'axios';

export async function createNotes(note: any) {
  console.log('O que eu recebi?', note);

  try {
    const response = await axios.post('/api/note/create', { note });
    console.log('response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar notas', error);
  }
}
