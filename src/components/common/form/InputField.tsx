import type { FieldError } from "react-hook-form";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: FieldError;
};

const InputField = ({ id, label, error, ...props }: Props) => {
  return (
    <div className="flex flex-col font-body-base text-base-700">
      <label className="pb-2 cursor-pointer" htmlFor={id}>
        {label}
      </label>
      <input
        // Se o erro existir: indica aos leitores de tela que o input contém dados inválidos
        aria-invalid={!!error}
        // Se o erro existir: vincula esse elemento (input) à mensagem de erro através do id
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full px-4 py-3 rounded-base input-interactive  placeholder:text-base-300 transition-colors-ease-in"
        id={id}
        // O atributo autocomplete no HTML é uma diretriz que informa ao navegador se ele deve ou não preencher automaticamente um campo de formulário com base em dados salvos anteriormente pelo usuário.
        // O Google Chrome incentiva o uso de autocomplete com os valores corretos principalmente por razões de usabilidade e acessibilidade
        // on: O navegador tem permissão para preencher automaticamente de forma genérica
        // off: Desativa explicitamente o preenchimento automático para aquele campo.
        autoComplete="on"
        {...props}
      />
      {error && (
        <span id={`${id}-error`} className="mt-1 font-body-sm text-error">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default InputField;
