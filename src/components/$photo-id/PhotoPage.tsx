import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Suspense } from "react";
import { useParams } from "@tanstack/react-router";
import { ErrorBoundary } from "react-error-boundary";
import { photoQueryOptions } from "../../features/auth/api/queries/photo.query";
import SkeletonComments from "../helper/SkeletonComments";
import Image from "../helper/Image";
import ErrorCommentsFallback from "../helper/ErrorCommentsFallback";
import ModalDescription from "../common/feed/modal/ModalDescription";
import ModalFormComment from "../common/feed/modal/ModalFormComment";
import ModalHeader from "../common/feed/modal/ModalHeader";
import Heading2 from "../common/Heading2";
import PhotoPageComments from "./PhotoPageComments";

const PhotoPage = () => {
  const params = useParams({ from: "/photo/$photoId" });
  const { data } = useSuspenseQuery(photoQueryOptions(Number(params.photoId)));

  const { reset } = useQueryErrorResetBoundary();

  const { photo, comments } = data;

  return (
    <section className="flex flex-col items-center animate-content-in">
      <div className="w-full max-w-160">
        <div className="aspect-square rounded-base overflow-hidden">
          <Image src={photo.src} alt={photo.title} />
        </div>
        <div className="flex flex-col gap-2 self-start mt-2 m-auto">
          {/* header */}
          <div className="rounded-base overflow-hidden">
            <ModalHeader isPhotoPage={true} photo={photo} />
          </div>

          {/* infos */}
          <div className="p-3 rounded-base bg-neutral-dogs-200">
            <div className="mb-1">
              <Heading2>{photo.title}</Heading2>
            </div>
            <ModalDescription photo={photo} />
          </div>

          {/* comments */}
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

          {/* comment form */}
          <ModalFormComment photo_id={photo.id} />
        </div>
      </div>
    </section>
  );
};

export default PhotoPage;
