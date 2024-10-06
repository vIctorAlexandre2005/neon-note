import { NextApiRequest, NextApiResponse } from "next";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/services/firebase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
        try {
            const { note } = req.body;
            console.log("note:", req.body);
            const docRef = await addDoc(collection(db, 'note'), { note });
            console.log("Document written with ID: ", docRef);
            res.status(200).json({ id: docRef.id, message: "Task added successfully" });
        } catch (error) {
            res.status(500).json({ error: 'Error adding note' });
        };
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    };
};