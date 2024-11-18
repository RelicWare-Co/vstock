import "./index.css";
import "@mantine/core/styles.css"
import "@mantine/notifications/styles.css"
import '@mantine/spotlight/styles.css';
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import Pocketbase from "pocketbase";

globalThis.pb = new Pocketbase(import.meta.env.VITE_PB_URL)

// Import the generated route tree
import { routeTree } from './routeTree.gen'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
// biome-ignore lint/style/noNonNullAssertion: element is not null
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}