import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/authcallback')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/authcallback"!</div>
}
