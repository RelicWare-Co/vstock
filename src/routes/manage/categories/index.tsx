import { createFileRoute } from "@tanstack/react-router";
import {
  ActionIcon,
  Affix,
  Anchor,
  Button,
  LoadingOverlay,
  Modal,
  Table,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import CategoriesModal from "@/src/components/manage/categories/CategoriesModal";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
export const Route = createFileRoute("/manage/categories/")({
  component: Categories,
});

function Categories() {
  const [open, setOpen] = useState(false);
  const [createOpened, setCreateOpened] = useState(false);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () => pb.collection("categories").getFullList(),
  });
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      description: "",
    },
    validate: {
      name: (value) => {
        if (value.trim().length === 0) {
          return "Nombre es requerido";
        }
        return null;
      },
    },
  });
  return (
    <div>
      <LoadingOverlay visible={isLoading} />
      <CategoriesModal isOpen={open} onClose={() => setOpen(false)} />
      <Modal
        opened={createOpened}
        onClose={() => setCreateOpened(false)}
        title="Crear Categoria"
      >
        <form
          onSubmit={form.onSubmit(async (values) => {
            await pb.collection("categories").create(values);
            await refetch();
            setCreateOpened(false);
          })}
        >
          <TextInput label="Nombre" key={form.key("name")} {...form.getInputProps("name")} />
          <Textarea label="Descripcion" key={form.key("description")} {...form.getInputProps("description")} />
          <Button w={"100%"} mt={"lg"} type="submit">
            Guardar
          </Button>
        </form>
      </Modal>
      <Table.ScrollContainer minWidth={"100%"}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Nombre</Table.Th>
              <Table.Th>Descripcion</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data?.map((category) => (
              <Table.Tr key={category.id}>
                <Table.Td>{category.name}</Table.Td>
                <Table.Td>{category.description}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        {data?.length === 0 && (
          <Text mt={"md"} ta={"center"} fw={600}>
            No hay categorias.{" "}
            <Anchor onClick={() => setCreateOpened(true)}>Crea una</Anchor>
          </Text>
        )}
      </Table.ScrollContainer>
      {!createOpened && !open && (
        <Affix position={{ bottom: 20, right: 20 }}>
          <ActionIcon
            radius={"xl"}
            size={"xl"}
            onClick={() => setCreateOpened(true)}
          >
            <PlusIcon />
          </ActionIcon>
        </Affix>
      )}
    </div>
  );
}
