import { useState } from "react";
import clsx from "clsx";
import PetBowlIcon from "../../../svgs/PetBowlIcon";
import CreateForm from "./CreateForm";

const Create = () => {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <section className="grid gap-8 animate-content-in md:grid-cols-2 md:gap-4 md:items-center">
      <CreateForm preview={preview} setPreview={setPreview} />
      <div
        className={clsx(
          "place-self-center aspect-square flex items-center justify-center rounded-base overflow-hidden",
          {
            "hidden md:block": !preview,
          },
        )}
      >
        {preview ? (
          <img className="rounded-base" src={preview} alt="Post prévia" />
        ) : (
          <div
            className={clsx(
              "h-full w-full md:flex md:flex-col md:items-center md:justify-center md:gap-6 ",
              { hidden: !preview },
            )}
          >
            <PetBowlIcon />
            <span className="font-body-primary text-neutral-dogs-300">
              Adicione uma foto.
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Create;
