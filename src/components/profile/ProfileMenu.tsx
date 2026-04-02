import AnchorRouter from "../AnchorRouter";
import AddIcon from "../svgs/AddIcon";
import ExitIcon from "../svgs/ExitIcon";
import PostsIcon from "../svgs/PostsIcon";
import StatsIcon from "../svgs/StatsIcon";

const ProfileMenu = () => {
  return (
    <div className="hidden gap-3 sm:flex">
      <AnchorRouter
        activeOptions={{ exact: true }}
        activeProps={{
          className: "bg-primary",
        }}
        className="px-4 py-3 bg-base-200 flex flex-col items-center text-base-700"
        to="/profile"
      >
        <PostsIcon />
        <span>Posts</span>
      </AnchorRouter>
      <AnchorRouter
        activeProps={{ className: "bg-primary" }}
        className="px-4 py-3 bg-base-200 flex flex-col items-center text-base-700"
        to="/profile/post"
      >
        <AddIcon />
        <span>Criar</span>
      </AnchorRouter>
      <AnchorRouter
        activeProps={{ className: "bg-primary" }}
        className="px-4 py-3 bg-base-200 flex flex-col items-center text-base-700"
        to="/profile/statistics"
      >
        <StatsIcon />
        <span>Dados</span>
      </AnchorRouter>
      <button className="px-4 py-3 flex flex-col items-center text-base-700">
        <ExitIcon />
        <span>Sair</span>
      </button>
    </div>
  );
};

export default ProfileMenu;
