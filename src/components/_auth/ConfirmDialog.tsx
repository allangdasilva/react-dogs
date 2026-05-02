import * as Dialog from "@radix-ui/react-dialog";
import { usePhotoDeleteMutation } from "../../features/auth/api/mutations/usePhotoDeleteMutation";
import PhotoDeleteTrigger from "../common/feed/photo/PhotoDeleteTrigger";

type Props = {
  photo_id: number;
};

const ConfirmDialog = ({ photo_id }: Props) => {
  const { mutate, isPending } = usePhotoDeleteMutation();

  return (
    <Dialog.Root>
      <PhotoDeleteTrigger isPending={isPending} />

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-base-700/40 z-70" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-1/2 flex flex-col gap-6 justify-between p-3 rounded-base shadow-lg z-80 bg-base-100 will-change-auto data-[state=open]:animate-modal-in">
          <Dialog.Title className="font-body-base">
            Tem certeza que deseja apagar esta foto?
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            Deseja apagar esta foto?
          </Dialog.Description>
          <div className="flex items-center justify-end gap-3 *:py-2 *:px-4 *:cursor-pointer *:rounded-base *:font-body-base *:text-base-700">
            <Dialog.Close className="anchor-bg-200">Cancelar</Dialog.Close>
            <Dialog.Close
              onClick={() => mutate(photo_id)}
              className="anchor-bg-primary"
            >
              Apagar
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ConfirmDialog;
