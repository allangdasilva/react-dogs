import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ChangeEvent } from "react";
import clsx from "clsx";
import { usePostMutation } from "../../../features/auth/api/usePostMutation";
import {
  postFormSchema,
  type PostFormSchema,
} from "../../../features/auth/types/postForm.schema";
import ButtonSubmit from "../../form/ButtonSubmit";
import PetBowlIcon from "../../svgs/PetBowlIcon";
import InputField from "../../form/InputField";
import ErrorForm from "../../form/ErrorForm";
import InputFile from "../../form/InputFile";
import Form from "../../form/Form";

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
          <div
            className={clsx(
              "h-full w-full md:flex md:flex-col md:items-center md:justify-center md:gap-6 ",
              { hidden: !preview },
            )}
          >
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
