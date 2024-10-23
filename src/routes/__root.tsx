import "./root.module.css";
import {
  AppShell,
  Burger,
  Container,
  createTheme,
  Image,
  MantineProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { createRootRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { rem } from "@mantine/core";
import {
  Spotlight,
  type SpotlightActionData,
  spotlight,
} from "@mantine/spotlight";
import {
  CircleDollarSignIcon,
  CogIcon,
  HomeIcon,
  LayoutDashboardIcon,
  SearchIcon,
} from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const actions = (
  navigate: ReturnType<typeof useNavigate>
): SpotlightActionData[] => [
  {
    id: "inicio",
    label: "Inicio",
    description: "Pagina principal",
    onClick: () =>
      navigate({
        to: "/",
      }),
    leftSection: <HomeIcon style={{ width: rem(24), height: rem(24) }} />,
  },
  {
    id: "products",
    label: "Productos",
    description: "Get full information about current system status",
    onClick: () =>
      navigate({
        to: "/products",
      }),
    leftSection: (
      <LayoutDashboardIcon style={{ width: rem(24), height: rem(24) }} />
    ),
  },
  {
    id: "ventas",
    label: "Ventas",
    description: "Administrar ventas",
    onClick: () => navigate({ to: "/sales" }),
    leftSection: (
      <CircleDollarSignIcon style={{ width: rem(24), height: rem(24) }} />
    ),
  },
  {
    id: "admin",
    label: "Administrar",
    description: "Administrar sistema",
    onClick: () => navigate({ to: "/manage" }),
    leftSection: <CogIcon style={{ width: rem(24), height: rem(24) }} />,
  },
];
const theme = createTheme({
  fontFamily: "Inter, sans-serif",
});

export const Route = createRootRoute({
  component: () => {
    const navigate = useNavigate();
    return (
      <QueryClientProvider client={queryClient}>
        <MantineProvider theme={theme}>
          <AppShell
            header={{
              height: 55,
            }}
            styles={{
              footer: {
                borderTop: "0px solid #E6ECF1",
              },
            }}
          >
            <AppShell.Header>
              <Container
                size={"md"}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Image
                  my={"xs"}
                  src={"/coco.webp"}
                  h={40}
                  fit="contain"
                  radius={"xl"}
                />
                <Burger onClick={spotlight.open} />
              </Container>
            </AppShell.Header>
            <AppShell.Main>
              <Outlet />
            </AppShell.Main>
          </AppShell>
          <Spotlight
            actions={actions(navigate)}
            nothingFound="Nothing found..."
            highlightQuery
            searchProps={{
              leftSection: (
                <SearchIcon style={{ width: rem(20), height: rem(20) }} />
              ),
              placeholder: "Search...",
            }}
          />
          <TanStackRouterDevtools />
          <Notifications />
        </MantineProvider>
      </QueryClientProvider>
    );
  },
});
