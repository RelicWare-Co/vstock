import { Modal, Title } from "@mantine/core";

export default function CategoriesModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal opened={isOpen} onClose={onClose} fullScreen>
      <Modal.Body>
        Contenido
      </Modal.Body>
    </Modal>
  );
}
