// pages/api/notes/create.ts
import { NextApiRequest, NextApiResponse } from "next";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, content } = req.body;

    console.log("title:", req.body);

    try {
      const docRef = await addDoc(collection(db, "notes"), { title, content, createdAt: new Date() });
      res.status(200).json({ id: docRef.id, message: "Note created successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to create note" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
