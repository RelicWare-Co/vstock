import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/")({
  component: () => <Auth />,
  beforeLoad: async () => {
    if (pb.authStore.isValid) {
      throw redirect({
        to: "/products",
      });
    }
  },
});

import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import classes from "./auth.module.css";
import { useState } from "react";
import { ClientResponseError } from "pocketbase";
import { notifications } from "@mantine/notifications";

export function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    try {
      const res = await pb
        .collection("users")
        .authWithPassword(email, password);
      console.log(res);
      await navigate({
        to: "/products"
      })
    } catch (error) {
      if (error instanceof ClientResponseError) {
        notifications.show({
          title: "Error",
          message: "Credenciales incorrectas",
          color: "red",
          position: "top-left"
        })
      }
    }
  }

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Bienvenido a VStock!
        </Title>

        <TextInput
          label="Correo"
          placeholder="hello@gmail.com"
          size="md"
          onChange={(event) => setEmail(event.currentTarget.value)}
          value={email}
        />
        <PasswordInput
          label="Contraseña"
          placeholder="Tu contraseña"
          mt="md"
          size="md"
          onChange={(event) => setPassword(event.currentTarget.value)}
          value={password}
        />
        <Button fullWidth mt="xl" size="md" onClick={login}>
          Iniciar Sesion
        </Button>

        <Text ta="center" mt="md">
          No tienes cuenta?{" "}
          <Anchor<"a">
            href="#"
            fw={700}
            onClick={(event) => event.preventDefault()}
          >
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
