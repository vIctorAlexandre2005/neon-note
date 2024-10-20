import { ClipLoader } from 'react-spinners';

type ButtonProps = {
  text?: string;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  loader?: JSX.Element;
  icon?: JSX.Element;
  className?: string; // Caso queira adicionar estilos personalizados
};

export function ButtonComponent({
  text,
  onClick,
  disabled = false,
  isLoading = false,
  loader = <ClipLoader color='white' size={24} />, // Definir valor padrão para loader
  icon, // Definir valor padrão para o ícone
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading} // Desabilitar se estiver carregando ou desabilitado
      className={`transition duration-200 p-2 flex justify-center items-center ${className}`} // Permite adicionar classes extras
      {...rest}
    >
      {!isLoading && text && <span className='ml-2'>{text}</span>}{' '}
      {isLoading ? loader : icon}
      {/* Exibe o texto se não estiver carregando */}
    </button>
  );
}
