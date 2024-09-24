/* interface InputComponentProps {
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} */

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export function InputComponent({ placeholder, value, onChange, ...rest }: InputProps) {
    return (
        <input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...rest}
        />
    );
}