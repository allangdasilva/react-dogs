import ButtonSubmit from "../../form/ButtonSubmit";
import Form from "../../form/Form";
import InputField from "../../form/InputField";
import UploadIcon from "../../svgs/UploadIcon";

const Create = () => {
  return (
    <section className="max-w-base px-4 py-12 flex flex-col gap-8 md:flex-row md:gap-6 md:items-center">
      <Form className="flex-1">
        <div className="auth-form-fields-wrapper">
          <InputField
            id="name"
            label="Nome"
            type="text"
            placeholder="Nome do cachorro"
          />
          <InputField
            id="weight"
            label="Peso"
            type="number"
            placeholder="Peso do cachorro"
          />
          <InputField
            id="age"
            label="Idade"
            type="number"
            placeholder="Idade do cachorro"
          />

          <InputFile />
        </div>

        <ButtonSubmit>Postar</ButtonSubmit>
      </Form>
      <div className="flex-1 flex items-center rounded-base aspect-square overflow-hidden">
        <img src="/img/login-bg.jpg" alt="Post prévia" />
      </div>
    </section>
  );
};

export default Create;

function InputFile() {
  return (
    <div className="flex text-center mt-2">
      <label
        htmlFor="photo"
        className="flex items-center justify-center gap-3 button-form text-base-700 anchor-bg-200"
      >
        <UploadIcon />
        Enviar foto
      </label>
      <input className="hidden" id="photo" type="file" />
    </div>
  );
}
