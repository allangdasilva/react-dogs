import { createFileRoute } from "@tanstack/react-router";
import Posts from "../../../components/profile/posts/Posts";

export const Route = createFileRoute("/_auth/profile/")({
  staticData: {
    title: "Posts",
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Posts />;
}
