import { ActionIcon, Affix, Table } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import ProductModal from "../../../components/manage/products/ProductModal";
import { useState } from "react";

export const Route = createFileRoute("/manage/products/")({
  component: Products,
});

function Products() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <ProductModal isOpen={open} onClose={() => setOpen(false)} />
      <Table.ScrollContainer minWidth={"100%"}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Nombre</Table.Th>
              <Table.Th>Costo</Table.Th>
              <Table.Th>Precio</Table.Th>
              <Table.Th>Categoria</Table.Th>
              <Table.Th>Stock</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <Table.Tr onClick={() => setOpen(true)}>
              <Table.Td>Producto 1</Table.Td>
              <Table.Td>10</Table.Td>
              <Table.Td>20</Table.Td>
              <Table.Td>Categoria 1</Table.Td>
              <Table.Td>100</Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      {!open && (
        <Affix position={{ bottom: 20, right: 20 }}>
          <ActionIcon radius={"xl"} size={"xl"}>
            <PlusIcon />
          </ActionIcon>
        </Affix>
      )}
    </div>
  );
}
