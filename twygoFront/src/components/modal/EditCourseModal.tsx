import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  IconButton,
  VStack,
  HStack,
  Box,
  Text,
  Divider,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { ICourse, IVideo } from '../../interfaces/course';

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: ICourse | null;
  onSave: (_id: string, updatedCourse: Partial<ICourse>) => void;
}

const EditCourseModal: React.FC<EditCourseModalProps> = ({ isOpen, onClose, course, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [videoTitle, setVideoTitle] = useState('');
  const [videoSize, setVideoSize] = useState<number | ''>('');
  const [error, setError] = useState('');

  const modalSize = useBreakpointValue({ base: 'full', md: 'md' });

 const modalBgColor = useColorModeValue('background.light.card', 'background.dark.default');
 const modalFooterBgColor = useColorModeValue('background.light.sidebar', 'background.dark.sidebar');
 const textColor = useColorModeValue('text.light', 'text.dark');
 const inputBgColor = useColorModeValue('background.light.default', 'background.dark.card');
 const inputBorderColor = useColorModeValue('border.light', 'border.dark');
 const videoBgColor = useColorModeValue('background.light.default', 'background.dark.default');
 const errorTextColor = useColorModeValue('accent.800', 'accent.800'); 


  useEffect(() => {
    if (isOpen && course) {
      setTitle(course.title);
      setDescription(course.description);
      setEndDate(course.endDate.toString().substring(0, 10));
      setVideos(course.videos);
    }
  }, [isOpen, course]);

  const handleAddVideo = () => {
    if (!videoTitle || !videoSize) {
      setError('Todos os campos de vídeo são obrigatórios');
      return;
    }

    const newVideo: IVideo = {
      title: videoTitle,
      size: Number(videoSize),
    };

    setVideos((prevVideos) => [...prevVideos, newVideo]);
    setVideoTitle('');
    setVideoSize('');
    setError('');
  };

  const handleRemoveVideo = (index: number) => {
    setVideos((prevVideos) => prevVideos.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!title || !description || !endDate || videos.length === 0) {
      setError('Todos os campos são obrigatórios e pelo menos um vídeo deve permanecer');
      return;
    }

    if (course) {
      onSave(course._id, { title, description, endDate: new Date(endDate), videos });
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setEndDate('');
    setVideos([]);
    setVideoTitle('');
    setVideoSize('');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size={modalSize}>
      <ModalOverlay />
      <ModalContent bg={modalBgColor}>
        <ModalHeader fontSize="2xl" fontWeight="bold" textAlign="center" color={textColor}>
          Editar Curso
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody p={6} overflowY="auto">
          <Divider mb={6} />
          <FormControl id="title" mb={4} isRequired>
            <FormLabel fontWeight="bold" color={textColor}>Título</FormLabel>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título do curso"
              bg={inputBgColor}
              borderColor={inputBorderColor}
              color={textColor}
            />
          </FormControl>
          <FormControl id="description" mb={4} isRequired>
            <FormLabel fontWeight="bold" color={textColor}>Descrição</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrição do curso"
              bg={inputBgColor}
              borderColor={inputBorderColor}
              color={textColor}
            />
          </FormControl>
          <FormControl id="endDate" mb={4} isRequired>
            <FormLabel fontWeight="bold" color={textColor}>Data de Término</FormLabel>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="Data de término"
              bg={inputBgColor}
              borderColor={inputBorderColor}
              color={textColor}
            />
          </FormControl>

          <Divider my={4} />
          <Text fontWeight="bold" mb={2} color={textColor}>Vídeos</Text>

          <FormControl id="videoTitle" mb={2} isRequired>
            <FormLabel color={textColor}>Título do Vídeo</FormLabel>
            <Input
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="Título do vídeo"
              bg={inputBgColor}
              borderColor={inputBorderColor}
              color={textColor}
            />
          </FormControl>
          <FormControl id="videoSize" mb={4} isRequired>
            <FormLabel color={textColor}>Tamanho do Vídeo (MB)</FormLabel>
            <Input
              type="number"
              value={videoSize}
              onChange={(e) => setVideoSize(Number(e.target.value))}
              placeholder="Tamanho do vídeo"
              bg={inputBgColor}
              borderColor={inputBorderColor}
              color={textColor}
            />
          </FormControl>
          <Button
            leftIcon={<AddIcon />}
            onClick={handleAddVideo}
            colorScheme="teal"
            mb={4}
            width="100%" 
          >
            Adicionar Vídeo
          </Button>

          <VStack align="stretch" spacing={4} maxH="120px" overflowY="auto" mb={4}>
            {videos.length > 0 ? (
              videos.map((video, index) => (
                <HStack key={index} spacing={3} p={3} bg={videoBgColor} borderRadius="md" shadow="sm">
                  <Box flex="1">
                    <Text color={textColor}>{video.title} - {video.size} MB</Text>
                  </Box>
                  <IconButton
                    aria-label="Remover vídeo"
                    icon={<CloseIcon />}
                    size="sm"
                    onClick={() => handleRemoveVideo(index)}
                  />
                </HStack>
              ))
            ) : (
              <Text color={textColor}>Nenhum vídeo adicionado</Text>
            )}
          </VStack>

          {error && (
            <Text color={errorTextColor} mb={4}>
              {error}
            </Text>
          )}
        </ModalBody>
        <ModalFooter position="sticky" bottom="0" bg={modalFooterBgColor} zIndex="10">
          <Button colorScheme="accent" bg="accent.700" mr={3} onClick={handleSave}>
            Salvar
          </Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditCourseModal;
