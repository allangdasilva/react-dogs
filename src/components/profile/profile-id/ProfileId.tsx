import Feed from "../../feed/Feed";
import Spacer from "../../Spacer";
import ProfileIdHeader from "./ProfileIdHeader";
import { useParams } from "@tanstack/react-router";

const ProfileId = () => {
  const params = useParams({ from: "/$profileId" });

  return (
    <div>
      <ProfileIdHeader profileId={params.profileId} />
      <Spacer className="my-12 bg-base-200" />
      <Feed isProfile={true} userId={params.profileId} />
    </div>
  );
};

export default ProfileId;
