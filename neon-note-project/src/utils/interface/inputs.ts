export interface NoteInputProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    darkMode: boolean;
};

export interface NoteTextareaProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    darkMode: boolean;
};