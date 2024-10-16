import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sales/')({
  component: Sales,
})

function Sales() {
  return (
    <div>
      <h3>Welcome to the Sales page!!</h3>
    </div>
  )
}