import { Button, Modal, NumberInput, Select, Stack, TextInput, Title } from "@mantine/core";

export default function ProductModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal opened={isOpen} onClose={onClose} fullScreen>
      <Modal.Title>
        <Title ta={"center"} order={3}>
          Nombre del Producto
        </Title>
      </Modal.Title>
      <Modal.Body h={"85dvh"}>
        <Stack justify="space-between" h={"100%"}>
          <Stack mt={"md"} w={"100%"}>
            <TextInput label="Nombre del Producto" />
            <NumberInput label="Costo" clampBehavior="strict" min={0} max={1_000_000_000} defaultValue={0} />
            <NumberInput label="Precio" clampBehavior="strict" min={0} max={1_000_000_000} defaultValue={0} />
            <Select label="Categoria" />
            <NumberInput label="Stock" clampBehavior="strict" min={0} max={1_000_000_000} defaultValue={0} />
          </Stack>
          <Button w={"100%"}>Guardar</Button>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
