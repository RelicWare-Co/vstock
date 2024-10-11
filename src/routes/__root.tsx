import { useDisclosure } from "@mantine/hooks";
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
import { useState } from "react";

const theme = createTheme({
  fontFamily: "Inter, sans-serif",
});

export const Route = createRootRoute({
  component: () => {
    const [opened, { toggle }] = useDisclosure();

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
              <Burger opened={opened} onClick={toggle} />
            </Container>
          </AppShell.Header>
          <AppShell.Main>
            <Outlet />
          </AppShell.Main>
        </AppShell>
        <TanStackRouterDevtools />
        <Notifications />
      </MantineProvider>
    );
  },
});
