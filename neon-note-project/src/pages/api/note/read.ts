// pages/api/notes/read.ts
import { db } from '@/services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const querySnapshot = await getDocs(collection(db, 'note'));
      const notes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching notes' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
