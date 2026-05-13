import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { photosInfiniteQueryOptions } from "../../features/auth/api/queries/photos.infiniteQuery";
import Feed from "../common/feed/Feed";
import Spacer from "../common/Spacer";
import ProfileIdHeader from "./ProfileIdHeader";
import ProfileIdNoPosts from "./ProfileIdNoPosts";

const ProfileId = () => {
  const params = useParams({ from: "/$profileId" });

  const { data } = useSuspenseInfiniteQuery(
    photosInfiniteQueryOptions(params.profileId),
  );
  const photos = data.pages.flat();
  return (
    <section>
      <ProfileIdHeader profileId={params.profileId} />
      <Spacer className="my-12 bg-neutral-dogs-200" />
      {photos.length ? (
        <Feed isProfile={true} userId={params.profileId} />
      ) : (
        <ProfileIdNoPosts />
      )}
    </section>
  );
};

export default ProfileId;
