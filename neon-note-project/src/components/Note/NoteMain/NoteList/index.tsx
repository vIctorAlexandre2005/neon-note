export function NoteList({ noteList, handleDeleteNote } : any) {
    return (
        <>
            {noteList.map((item: any, idx: number) => (
                <div key={idx} className="note-item">
                    <h1 className="text-neon-800">{item[0]}</h1>
                    <h1 className="text-neon-800">{item[1]}</h1>
                    <button onClick={() => handleDeleteNote(idx)}>Delete</button>
                </div>
            ))}
        </>
    );
}
