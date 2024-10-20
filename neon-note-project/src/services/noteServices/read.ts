import axios from 'axios';

export async function getNotes() {
  try {
    const response = await axios.get('/api/note/read');
    console.log('response GET:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar notas', error);
  }
}
