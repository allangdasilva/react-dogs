import AnchorLabel from "../AnchorLabel";
import AnchorRouter from "../AnchorRouter";
import AddIcon from "../svgs/AddIcon";
import ExitIcon from "../svgs/ExitIcon";
import PostsIcon from "../svgs/PostsIcon";
import StatsIcon from "../svgs/StatsIcon";

const ProfileMenu = () => {
  return (
    <div className="hidden sm:gap-3 sm:flex sm:items-center">
      <AnchorRouter
        activeOptions={{ exact: true }}
        activeProps={{
          className: "anchor-bg-primary",
        }}
        className="anchor-bg-200"
        to="/profile"
      >
        <PostsIcon />
        <AnchorLabel>Posts</AnchorLabel>
      </AnchorRouter>
      <AnchorRouter
        activeProps={{ className: "anchor-bg-primary" }}
        className="anchor-bg-200"
        to="/profile/post"
      >
        <AddIcon />
        <AnchorLabel>Criar</AnchorLabel>
      </AnchorRouter>
      <AnchorRouter
        activeProps={{ className: "anchor-bg-primary" }}
        className="anchor-bg-200"
        to="/profile/statistics"
      >
        <StatsIcon />
        <AnchorLabel>Dados</AnchorLabel>
      </AnchorRouter>
      <button className="flex flex-col items-center px-4 py-2 rounded-base whitespace-nowrap cursor-pointer group">
        <ExitIcon />
        <AnchorLabel>Sair</AnchorLabel>
      </button>
    </div>
  );
};

export default ProfileMenu;
