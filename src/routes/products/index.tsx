import {
  ScrollArea,
  SegmentedControl,
  SimpleGrid,
  TextInput,
  Title,
} from "@mantine/core";
import { createFileRoute, redirect } from "@tanstack/react-router";
import ProductCard from "../../components/products/ProductCard";
import { Search } from "lucide-react";
import { useState } from "react";
export const Route = createFileRoute("/products/")({
  component: Products,
  beforeLoad: async () => {
    if(!pb.authStore.isValid) {
      throw redirect({
        to: "/auth",
        search: {
          redirect: location.href
        }
      })
    }
  }
});

function Products() {
  const [scrollPosition, onScrollPositionChange] = useState({ x: 0, y: 0 });

  return (
    <div>
      <TextInput mt={"sm"} mx={"md"} radius={"xl"} leftSection={<Search />} />
      <Title ta={"center"} my={"md"}>
        Categorias
      </Title>
      <SegmentedControl
        mx={"md"}
        fullWidth
        radius={"xl"}
        data={[
          { value: "all", label: "Todos" },
          { value: "coffee", label: "Café" },
          { value: "tea", label: "Té" },
          { value: "accessories", label: "Accesorios" },
          { value: "other", label: "Otros" },
        ]}
      />
      <Title ta={"center"} my={"xs"}>
        Productos
      </Title>
      <ScrollArea h={"76.5dvh"} onScrollPositionChange={onScrollPositionChange}>
        <SimpleGrid
          cols={{ base: 2, sm: 2, lg: 5 }}
          spacing={{ base: 10, sm: "xl" }}
          verticalSpacing={{ base: "md", sm: "xl" }}
        >
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </SimpleGrid>
      </ScrollArea>
      {/* <Affix position={{ bottom: 0, left: 110 }}>
        <Transition transition="slide-up" mounted={scrollPosition.y === 0}>
          {(transitionStyles) => (
        <Button
          rightSection={<Plus />}
          color="cyan"
          style={{...transitionStyles, borderEndEndRadius: 0, borderEndStartRadius: 0}}
        >
          Agregar producto
        </Button>
          )}
        </Transition>
      </Affix> */}
    </div>
  );
}
