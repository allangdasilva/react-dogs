import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/profile/statistics')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/user/statistics"!</div>
}
