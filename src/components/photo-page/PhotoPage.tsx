import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { useParams } from "@tanstack/react-router";
import { ErrorBoundary } from "react-error-boundary";
import { photoQueryOptions } from "../../features/auth/api/queries/photo.query";
import SkeletonComments from "../helper/SkeletonComments";
import ErrorCommentsFallback from "../helper/ErrorCommentsFallback";
import ModalDescription from "../feed/modal/ModalDescription";
import ModalFormComment from "../feed/modal/ModalFormComment";
import PhotoPageComments from "./PhotoPageComments";

const PhotoPage = () => {
  const params = useParams({ from: "/photo/$id" });
  const { data } = useSuspenseQuery(photoQueryOptions(Number(params.id)));

  const { reset } = useQueryErrorResetBoundary();

  const { photo, comments } = data;

  return (
    <section className="w-full flex flex-col items-center max-w-base px-4 py-12">
      <div className="w-full max-w-160">
        <div className="rounded-base overflow-hidden">
          <img
            className="w-full h-full object-contain"
            src={photo.src}
            alt={photo.title}
          />
        </div>
        <div className="flex flex-col gap-2 self-start mt-3 m-auto">
          <div className="p-3 rounded-base bg-base-100">
            <h2 className="font-title-sm break-all text-base-700">
              {photo.title}
            </h2>

            <ModalDescription photo={photo} />
          </div>

          <Suspense fallback={<SkeletonComments />}>
            <ErrorBoundary
              FallbackComponent={ErrorCommentsFallback}
              onReset={() => {
                reset();
              }}
            >
              <PhotoPageComments comments={comments} />
            </ErrorBoundary>
          </Suspense>

          <ModalFormComment photo_id={photo.id} />
        </div>
      </div>
    </section>
  );
};

export default PhotoPage;
