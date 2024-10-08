import {
  Card,
  Text,
  Image,
  Title,
  NumberFormatter,
  Button,
  Center,
  Group
} from "@mantine/core";
import { Plus } from "lucide-react";
function ProductCard() {
  return (
    <Center>
      <Card withBorder w={"fit-content"} mx={"xs"}>
        <Card.Section>
          <Image fit="cover" src={"cafe.JPG"} w={200} className="rounded-t-md" />
        </Card.Section>
        <Title mt={"xs"} order={3}>
          Producto tal
        </Title>
        <Group justify="space-between">
        <Text c={"gray"}>
          <NumberFormatter prefix="$" value={3000} thousandSeparator />
        </Text>
        <Text c={"gray"}>
          Stock: 10
        </Text>
        </Group>
        <Button mt={"sm"} rightSection={<Plus size={20} />}>
          Agregar
        </Button>
      </Card>
    </Center>
  );
}

export default ProductCard;
