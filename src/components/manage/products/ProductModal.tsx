import {
  Button,
  LoadingOverlay,
  Modal,
  NumberInput,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export type ProductModalModes = "edit" | "create";

export default function ProductModal({
  isOpen,
  onClose,
  mode,
  editId,
  refetch,
}: {
  isOpen: boolean;
  onClose: () => void;
  mode: ProductModalModes;
  editId: string | undefined;
  refetch: () => void;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => pb.collection("categories").getFullList(),
  });
  const [isCreating, setIsCreating] = useState(false);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      description: "",
      cost: 0,
      price: 0,
      category: "",
      stock: 0,
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
    <Modal opened={isOpen} onClose={onClose} fullScreen>
      <Modal.Title>
        <Title ta={"center"} order={3}>
          Nombre del Producto
        </Title>
      </Modal.Title>
      <Modal.Body h={"85dvh"}>
        <LoadingOverlay visible={isLoading || isCreating} />
        <Stack justify="space-between" h={"100%"}>
          <form
            onSubmit={form.onSubmit(async (values) => {
              setIsCreating(true);
              if (mode === "create") {
                await pb.collection("products").create(values);
              }
              if (mode === "edit" && editId) {
                await pb.collection("products").update(editId, values);
              }
              setIsCreating(false);
              onClose();
              refetch();
            })}
          >
            <Stack mt={"md"} w={"100%"}>
              <TextInput
                label="Nombre del Producto"
                key={form.key("name")}
                {...form.getInputProps("name")}
              />
              <Textarea
                label="Descripcion"
                key={form.key("description")}
                {...form.getInputProps("description")}
              />
              <NumberInput
                label="Costo"
                clampBehavior="strict"
                min={0}
                max={1_000_000_000}
                defaultValue={0}
                key={form.key("cost")}
                {...form.getInputProps("cost")}
              />
              <NumberInput
                label="Precio"
                clampBehavior="strict"
                min={0}
                max={1_000_000_000}
                defaultValue={0}
                key={form.key("price")}
                {...form.getInputProps("price")}
              />
              <Select
                searchable
                label="Categoria"
                data={data?.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                key={form.key("category")}
                {...form.getInputProps("category")}
              />
              <NumberInput
                label="Stock"
                clampBehavior="strict"
                min={0}
                max={1_000_000_000}
                defaultValue={0}
                key={form.key("stock")}
                {...form.getInputProps("stock")}
              />
            </Stack>
            <Button mt={"md"} w={"100%"} type="submit">
              Guardar
            </Button>
          </form>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
