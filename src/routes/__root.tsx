import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanstackDevtools } from "@tanstack/react-devtools";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/components/not-found";

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster richColors position="top-right" />
        <Outlet />
        <TanstackDevtools
          config={{
            position: "bottom-left",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </ThemeProvider>
    </>
  ),
  notFoundComponent: () => {
    return <NotFound />;
  },
});
