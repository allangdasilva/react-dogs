import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import DeleteIcon from "../../svgs/DeleteIcon";

type Props = React.RefAttributes<HTMLButtonElement> & {
  isPending: boolean;
};

const PhotoDeleteTrigger = ({ isPending }: Props) => {
  return (
    <Dialog.Trigger
      disabled={isPending}
      type="button"
      className={clsx(
        "flex items-center justify-center px-4 py-3.5 rounded-base cursor-pointer bg-interactive-200 outline-interactive-primary transition-colors-no-outline",
        { "opacity-60 cursor-default": isPending },
      )}
      aria-label="Deletar foto"
    >
      <DeleteIcon />
    </Dialog.Trigger>
  );
};

export default PhotoDeleteTrigger;
