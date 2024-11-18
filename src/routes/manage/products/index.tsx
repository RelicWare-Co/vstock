import { ActionIcon, Affix, LoadingOverlay, Table } from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import ProductModal, {
  ProductModalModes,
} from "../../../components/manage/products/ProductModal";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/manage/products/")({
  component: Products,
});

function Products() {
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | undefined>(undefined);
  const [mode, setMode] = useState<ProductModalModes>("create");
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: () => pb.collection("products").getFullList({
      expand: "category"
    }),
  });

  useEffect(() => {
    console.log(data)
  }, [])

  return (
    <div>
      <LoadingOverlay visible={isLoading} />
      <ProductModal
        isOpen={open}
        onClose={() => setOpen(false)}
        editId={editId}
        refetch={refetch}
        mode={mode}
      />
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
            {data?.map((product) => (
              <Table.Tr
                key={product.id}
                onClick={() => {
                  setEditId(product.id);
                  setMode("edit");
                  setOpen(true);
                }}
              >
                <Table.Td>{product.name}</Table.Td>
                <Table.Td>{product.cost}</Table.Td>
                <Table.Td>{product.price}</Table.Td>
                <Table.Td>{product.expand?.category.name || "Error"}</Table.Td>
                <Table.Td>{product.stock}</Table.Td>
              </Table.Tr>
            ))}
            {data?.length === 0 && (
              <Table.Tr>
                <Table.Td colSpan={5} style={{ textAlign: "center" }}>
                  No hay productos disponibles.
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      {!open && (
        <Affix position={{ bottom: 20, right: 20 }}>
          <ActionIcon
            radius={"xl"}
            size={"xl"}
            onClick={() => {
              setEditId(undefined);
              setMode("create");
              setOpen(true);
            }}
          >
            <PlusIcon />
          </ActionIcon>
        </Affix>
      )}
    </div>
  );
}
