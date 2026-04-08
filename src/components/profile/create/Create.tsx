import { useForm, type FieldError } from "react-hook-form";
import ButtonSubmit from "../../form/ButtonSubmit";
import Form from "../../form/Form";
import InputField from "../../form/InputField";
import UploadIcon from "../../svgs/UploadIcon";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  postFormSchema,
  type PostFormSchema,
} from "../../../features/auth/types/postForm.schema";
import { usePostMutation } from "../../../features/auth/api/usePostMutation";
import { useState, type ChangeEvent } from "react";
import PetBowlIcon from "../../svgs/PetBowlIcon";
import ErrorForm from "../../form/ErrorForm";
import clsx from "clsx";

const Create = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormSchema>({
    resolver: zodResolver(postFormSchema),
    mode: "onSubmit",
  });

  const { mutate, isPending, error } = usePostMutation();

  function handlePost(data: PostFormSchema) {
    // FormData: É um objeto que simula um formulário HTML tradicional.
    // Ele é obrigatório para enviar arquivos binários (fotos) para a API,
    // pois o JSON comum não suporta o envio de arquivos de forma eficiente.
    const formData = new FormData();

    // Adicionamos os campos de texto
    formData.append("nome", data.nome);
    // FormData só aceita strings ou Blobs/Files
    formData.append("peso", String(data.peso));
    formData.append("idade", String(data.idade));

    // Pegamos o primeiro arquivo da lista (o que seria o files[0])
    if (data.img && data.img.length > 0) {
      formData.append("img", data.img[0]);
    }

    mutate(formData); // Agora enviamos o FormData
  }

  function handlePreview({
    target,
  }: ChangeEvent<HTMLInputElement, HTMLInputElement>) {
    if (target.files && target.files.length > 0) {
      setPreview(URL.createObjectURL(target.files[0]));
    }
  }

  return (
    <section className="max-w-base px-4 py-12 flex flex-col gap-8 md:flex-row md:gap-6 md:items-center">
      <Form onSubmit={handleSubmit(handlePost)} className="flex-1">
        <div
          className={clsx("auth-form-fields-wrapper", {
            "opacity-60": isPending,
          })}
        >
          <InputField
            id="name"
            label="Nome"
            type="text"
            placeholder="Nome do cachorro"
            {...register("nome")}
            error={errors.nome}
          />
          <InputField
            id="weight"
            label="Peso"
            type="number"
            placeholder="Peso do cachorro"
            {...register("peso")}
            error={errors.peso}
          />
          <InputField
            id="age"
            label="Idade"
            type="number"
            placeholder="Idade do cachorro"
            {...register("idade")}
            error={errors.idade}
          />

          <InputFile
            id="img"
            label="Enviar foto"
            type="file"
            // accpet: instrui o navegador a filtrar arquivos (como JPG, PNG, GIF, BMP) na caixa de diálogo de seleção, facilitando a escolha correta.
            accept="image/*"
            {...register("img")}
            // Forçamos o TS a entender que, se houver erro, ele segue o padrão FieldError
            error={errors.img as FieldError}
            preview={preview}
            onChange={handlePreview}
          />
        </div>

        {error && <ErrorForm error={error} />}

        {isPending ? (
          <ButtonSubmit disabled>Postando...</ButtonSubmit>
        ) : (
          <ButtonSubmit>Postar</ButtonSubmit>
        )}
      </Form>
      <div className="flex-1 flex items-center rounded-base aspect-square overflow-hidden">
        {preview ? (
          <img src={preview} alt="Post prévia" />
        ) : (
          <div className="h-full w-full flex flex-col items-center justify-center gap-6">
            <PetBowlIcon />
            <span className="font-body-base text-base-300">
              Adicione uma foto.
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Create;

type InputFileProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  preview: string | null;
  error?: FieldError;
};

function InputFile({ id, label, error, preview, ...props }: InputFileProps) {
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
}
