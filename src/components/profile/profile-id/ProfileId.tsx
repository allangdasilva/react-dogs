import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import Feed from "../../feed/Feed";
import Spacer from "../../Spacer";
import ProfileIdHeader from "./ProfileIdHeader";
import { useParams } from "@tanstack/react-router";
import { photosInfiniteQueryOptions } from "../../../features/auth/api/queries/photos.infiniteQuery";
import ProfileIdPosts from "./ProfileIdPosts";

const ProfileId = () => {
  const params = useParams({ from: "/$profileId" });

  const { data } = useSuspenseInfiniteQuery(
    photosInfiniteQueryOptions(params.profileId),
  );
  const photos = data.pages.flat();
  return (
    <div>
      <ProfileIdHeader profileId={params.profileId} />
      <Spacer className="my-12 bg-base-200" />
      {photos.length ? (
        <Feed isProfile={true} userId={params.profileId} />
      ) : (
        <ProfileIdPosts />
      )}
    </div>
  );
};

export default ProfileId;
