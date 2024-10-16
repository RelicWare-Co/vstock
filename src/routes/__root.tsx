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
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { rem } from "@mantine/core";
import { Spotlight, type SpotlightActionData, spotlight } from "@mantine/spotlight";
import { FileTextIcon, HomeIcon, LayoutDashboardIcon, SearchIcon } from "lucide-react";


const actions: SpotlightActionData[] = [
  {
    id: "home",
    label: "Home",
    description: "Get to home page",
    onClick: () => console.log("Home"),
    leftSection: (
      <HomeIcon style={{ width: rem(24), height: rem(24) }}  />
    ),
  },
  {
    id: "dashboard",
    label: "Dashboard",
    description: "Get full information about current system status",
    onClick: () => console.log("Dashboard"),
    leftSection: (
      <LayoutDashboardIcon style={{ width: rem(24), height: rem(24) }}  />
    ),
  },
  {
    id: "documentation",
    label: "Documentation",
    description: "Visit documentation to lean more about all features",
    onClick: () => console.log("Documentation"),
    leftSection: (
      <FileTextIcon style={{ width: rem(24), height: rem(24) }}  />
    ),
  },
];
const theme = createTheme({
  fontFamily: "Inter, sans-serif",
});

export const Route = createRootRoute({
  component: () => {

    return (
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
                src={"coco.webp"}
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
          actions={actions}
          nothingFound="Nothing found..."
          highlightQuery
          searchProps={{
            leftSection: (
              <SearchIcon
                style={{ width: rem(20), height: rem(20) }}
              />
            ),
            placeholder: "Search...",
          }}
        />
        <TanStackRouterDevtools />
        <Notifications />
      </MantineProvider>
    );
  },
});
