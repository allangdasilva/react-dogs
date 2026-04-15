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
        className="w-full px-4 py-3 rounded-base border border-base-300 outline-0 bg-base-100 placeholder:text-base-300 hover:border-base-500 focus:border-primary focus:ring-2 focus:ring-primary/40 focus:bg-base-000 transition-colors ease-in"
        id={id}
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
