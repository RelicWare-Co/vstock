import { Card, Center, SimpleGrid, Title } from "@mantine/core";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BarcodeIcon, TablePropertiesIcon } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/manage/")({
  component: Manage,
});

function Manage() {
  const navigate = useNavigate();
  return (
    <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}

    >
      <SimpleGrid cols={2} mx={"md"} mt={"md"}>
        <Card
          withBorder
          bg={"teal"}
          onClick={() =>
            navigate({
              to: "/manage/categories",
            })
          }
        >
          <Center>
            <TablePropertiesIcon />
          </Center>
          <Title order={3} ta={"center"}>
            Categorias
          </Title>
        </Card>
        <Card
          withBorder
          bg={"red.3"}
          onClick={() =>
            navigate({
              to: "/manage/products",
            })
          }
        >
          <Center>
            <BarcodeIcon />
          </Center>
          <Title order={3} ta={"center"}>
            Productos
          </Title>
        </Card>
      </SimpleGrid>
    </motion.div>
  );
}
