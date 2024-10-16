import { createFileRoute } from "@tanstack/react-router";
import { ActionIcon, Affix, Button, Modal, Table, Text, Textarea, TextInput } from "@mantine/core";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import CategoriesModal from "@/src/components/manage/categories/CategoriesModal";

export const Route = createFileRoute("/manage/categories/")({
  component: Categories,
});

function Categories() {
  const [open, setOpen] = useState(false);
  const [createOpened, setCreateOpened] = useState(false);
  return (
    <div>
      <CategoriesModal isOpen={open} onClose={() => setOpen(false)} />
      <Modal opened={createOpened} onClose={() => setCreateOpened(false)} title="Crear Categoria">
        <TextInput label="Nombre"/>
        <Textarea label="Descripcion">

        </Textarea>
        <Button w={"100%"} mt={"lg"}>
          Guardar
        </Button>
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
            <Table.Tr onClick={() => setOpen(true)}>
              <Table.Td>Producto 1</Table.Td>
              <Table.Td>
                Descripcion 1
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      {(!createOpened && !open) && (
        <Affix position={{ bottom: 20, right: 20 }}>
          <ActionIcon radius={"xl"} size={"xl"} onClick={() => setCreateOpened(true)}>
            <PlusIcon />
          </ActionIcon>
        </Affix>
      )}
    </div>
  );
}
