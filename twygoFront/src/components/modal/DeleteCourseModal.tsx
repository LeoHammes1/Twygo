import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react';

interface DeleteCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  courseTitle: string;
}

const DeleteCourseModal: React.FC<DeleteCourseModalProps> = ({ isOpen, onClose, onConfirm, courseTitle }) => {
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirmar Exclusão</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Tem certeza de que deseja excluir o curso <strong>{courseTitle}</strong>?
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onConfirm}>
            Deletar
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCourseModal;
