import { useContextGlobal } from '@/Context';
import { ClipLoader } from 'react-spinners';

type ButtonProps = {
  text?: string;
  onClick?: () => void;
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
  const { darkMode } = useContextGlobal();
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading} // Desabilitar se estiver carregando ou desabilitado
      className={`transition duration-200 rounded-lg p-2 flex justify-center text-center items-center ${className}`} // Permite adicionar classes extras
      {...rest}
    >
      {!isLoading && text && (
        <span>
          {text}
        </span>
      )}{' '}
      {isLoading ? loader : icon}
      {/* Exibe o texto se não estiver carregando */}
    </button>
  );
}
