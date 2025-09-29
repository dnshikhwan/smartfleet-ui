import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/users/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/users/create"!</div>
}
