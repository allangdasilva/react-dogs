import type { FieldError } from "react-hook-form";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: FieldError;
};

const InputField = ({ id, label, error, ...props }: Props) => {
  return (
    <div className="flex flex-col font-body-primary text-neutral-dogs-900/90">
      <label className="pb-2 cursor-pointer" htmlFor={id}>
        {label}
      </label>
      <input
        // Se o erro existir: indica aos leitores de tela que o input contém dados inválidos
        aria-invalid={!!error}
        // Se o erro existir: vincula esse elemento (input) à mensagem de erro através do id
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full px-4 py-3 rounded-base input-interactive no-spinners  placeholder:text-neutral-dogs-900/30"
        id={id}
        // O atributo autocomplete no HTML é uma diretriz que informa ao navegador se ele deve ou não preencher automaticamente um campo de formulário com base em dados salvos anteriormente pelo usuário.
        // O Google Chrome incentiva o uso de autocomplete com os valores corretos principalmente por razões de usabilidade e acessibilidade
        // on: O navegador tem permissão para preencher automaticamente de forma genérica
        // off: Desativa explicitamente o preenchimento automático para aquele campo.
        autoComplete="on"
        {...props}
      />
      {error && (
        <span
          id={`${id}-error`}
          className="mt-1 font-body-primary text-error-500"
        >
          {error.message}
        </span>
      )}
    </div>
  );
};

export default InputField;
