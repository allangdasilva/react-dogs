import type { FieldError } from "react-hook-form";
import UploadIcon from "../../svgs/UploadIcon";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  preview: string | null;
  error?: FieldError;
};

const InputFile = ({ id, label, error, preview, ...props }: Props) => {
  return (
    <div className="flex flex-col text-center mt-2">
      <input {...props} className="sr-only peer" id={id} />
      <label
        // Se o erro existir: indica aos leitores de tela que o input contém dados inválidos
        aria-invalid={!!error}
        // Se o erro existir: vincula esse elemento (input) à mensagem de erro através do id
        aria-describedby={error ? `${id}-error` : undefined}
        htmlFor={id}
        className="flex items-center justify-center gap-3 button-form text-base-700 bg-base-200 hover:bg-base-300 peer-focus:bg-base-300 peer-focus:outline-2"
      >
        {preview ? (
          "Alterar foto"
        ) : (
          <>
            <UploadIcon />
            {label}
          </>
        )}
      </label>
      {error && (
        <span
          id={`${id}-error`}
          className="mt-1 font-body-sm text-left text-error"
        >
          {error.message}
        </span>
      )}
    </div>
  );
};

export default InputFile;
