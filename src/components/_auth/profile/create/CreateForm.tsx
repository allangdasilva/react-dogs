import type { ChangeEvent } from "react";
import Form from "../../../common/form/Form";
import Fieldset from "../../../common/form/Fieldset";
import InputField from "../../../common/form/InputField";
import InputFile from "../../../common/form/InputFile";
import { useForm, type FieldError } from "react-hook-form";
import {
  postFormSchema,
  type PostFormSchema,
} from "../../../../features/auth/types/postForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostMutation } from "../../../../features/auth/api/mutations/usePostMutation";
import ButtonSubmit from "../../../common/form/ButtonSubmit";
import ErrorForm from "../../../common/form/ErrorForm";

type Props = {
  preview: string | null;
  setPreview: React.Dispatch<React.SetStateAction<string | null>>;
};

const CreateForm = ({ preview, setPreview }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormSchema>({
    resolver: zodResolver(postFormSchema),
    mode: "onSubmit",
  });

  const { mutate, isPending, isError, error } = usePostMutation();

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
    <Form onSubmit={handleSubmit(handlePost)}>
      <Fieldset isPending={isPending}>
        <div className="form-fields-wrapper">
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
            // accept: é utilizado para limitar os tipos de arquivos que o usuário pode selecionar.
            // accept="image/*": aceitar qualquer imagem (jpeg, jpg, png, gif, svg, webp, ico, bmp)
            // tem limitador para arquivos (como pdf e outros) e aúdio e vídeos.
            // Também é possível listar extensões separadas por vírgula, assim:
            accept=".jpg, .jpeg, .png, .webp"
            {...register("img")}
            // Forçamos o TS a entender que, se houver erro, ele segue o padrão FieldError
            error={errors.img as FieldError}
            preview={preview}
            onChange={handlePreview}
          />
        </div>

        <div className="mt-6">
          <ButtonSubmit disabled={isPending}>
            {isPending ? "Postando..." : "Postar"}
          </ButtonSubmit>
        </div>

        <div className="mt-1">{isError && <ErrorForm error={error} />}</div>
      </Fieldset>
    </Form>
  );
};

export default CreateForm;
