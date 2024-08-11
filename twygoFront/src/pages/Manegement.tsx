import React, { useState } from 'react';
import { Box, Button, Flex, Heading, Text, VStack, Stack, Image, Badge, useBreakpointValue, useColorModeValue } from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import AddCourseModal from '../components/modal/AddCourseModal';
import EditCourseModal from '../components/modal/EditCourseModal';
import DeleteCourseModal from '../components/modal/DeleteCourseModal';
import Layout from '../components/layout/Layout';
import { ICourse } from '../interfaces/course';
import { useAllCourses } from '../hooks/useCourses';

const CourseManagement: React.FC = () => {
    const { courses, addCourse, updateCourse, deleteCourse } = useAllCourses();
    const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState<ICourse | null>(null);

    const isMobile = useBreakpointValue({ base: true, md: false });

    const headingColor = useColorModeValue('text.light', 'text.dark');
    const textColor = useColorModeValue('text.light', 'text.dark');
    const bgColor = useColorModeValue('background.light.default', 'background.dark.default');
    const cardBgColor = useColorModeValue('background.light.card', 'background.dark.card');

    const deleteButtonBgColor = useColorModeValue('red.500', 'red.600');
    const deleteButtonHoverBgColor = useColorModeValue('red.600', 'red.700');

    const handleAddCourse = () => {
        setAddModalOpen(true);
    };

    const handleEditCourse = (course: ICourse) => {
        setSelectedCourse(course);
        setEditModalOpen(true);
    };

    const handleUpdateCourse = async (_id: string, updatedCourse: Partial<ICourse>) => {
        await updateCourse(_id, updatedCourse);
        setEditModalOpen(false);
        setSelectedCourse(null);
    };

    const handleDeleteCourse = (course: ICourse) => {
        setCourseToDelete(course);
        setDeleteModalOpen(true);
    };

    const confirmDeleteCourse = async () => {
        if (courseToDelete) {
            await deleteCourse(courseToDelete._id);
            setDeleteModalOpen(false);
            setCourseToDelete(null);
        }
    };

    const isCourseExpired = (endDate: Date) => {
        return new Date(endDate) < new Date();
    };

    return (
        <Layout>
            <Box p={{ base: 2, md: 4 }} bg={bgColor}>
                <Flex
                    justify="space-between"
                    align="center"
                    mb={{ base: 2, md: 4 }}
                >
                    <Heading size={{ base: 'lg', md: 'xl' }} fontWeight="bold" color={headingColor}>
                        Gerenciamento de Cursos
                    </Heading>
                    <Button
                        leftIcon={<AddIcon />}
                        colorScheme="accent"
                        variant="solid"
                        onClick={handleAddCourse}
                        size={isMobile ? 'sm' : 'md'}
                        ml={4}
                        px={4}
                        py={2}
                        bg="accent.700"
                        _hover={{ bg: 'accent.600' }}
                    >
                        Adicionar
                    </Button>
                </Flex>

                <VStack align="stretch" spacing={{ base: 2, md: 4 }}>
                    {courses.map((course) => (
                        <Box
                            key={course._id}
                            p={{ base: 3, md: 5 }}
                            borderWidth="1px"
                            borderRadius="md"
                            shadow={isMobile ? 'sm' : 'md'}
                            position="relative"
                            bg={cardBgColor}
                        >
                            <Stack
                                direction="row"
                                justify="space-between"
                                align="center"
                                spacing={{ base: 2, md: 4 }}
                            >
                                <Image
                                    boxSize={{ base: '60px', md: '100px' }}
                                    objectFit="cover"
                                    src="https://via.placeholder.com/100"
                                    alt={`Capa do curso ${course.title}`}
                                    borderRadius="md"
                                />
                                <Box flex="2" mr={4} maxW="70%">
                                    <Flex align="center">
                                        <Heading size={{ base: 'sm', md: 'md' }} color="primary.500">
                                            {course.title}
                                        </Heading>
                                        {isCourseExpired(course.endDate) && (
                                            <Badge
                                                bg={deleteButtonBgColor}
                                                color="white"
                                                ml={2}
                                                fontSize="0.6em"
                                                borderRadius="md"
                                                px={2}
                                                py={0.5}
                                            >
                                                Expirado
                                            </Badge>
                                        )}
                                    </Flex>
                                    <Text
                                        fontSize={{ base: 'sm', md: 'md' }}
                                        color={textColor}
                                        noOfLines={isMobile ? 3 : 2}
                                        overflow="hidden"
                                        textOverflow="ellipsis"
                                    >
                                        {course.description}
                                    </Text>
                                </Box>
                                <Stack direction="column" spacing={2} mt={{ base: 2, md: 0 }} flex="1">
                                    <Button leftIcon={<EditIcon />} onClick={() => handleEditCourse(course)} size={isMobile ? 'xs' : 'sm'} width="full">
                                        Editar
                                    </Button>
                                    <Button
                                        bg={deleteButtonBgColor}
                                        color="white" 
                                        _hover={{ bg: deleteButtonHoverBgColor }}
                                        leftIcon={<DeleteIcon />}
                                        size={isMobile ? 'xs' : 'sm'}
                                        width="full"
                                        onClick={() => handleDeleteCourse(course)}
                                    >
                                        Excluir
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    ))}
                </VStack>

                <AddCourseModal
                    isOpen={isAddModalOpen}
                    onClose={() => setAddModalOpen(false)}
                    onSave={addCourse}
                />

                <EditCourseModal
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    course={selectedCourse}
                    onSave={handleUpdateCourse}
                />

                <DeleteCourseModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={confirmDeleteCourse}
                    courseTitle={courseToDelete?.title || ''}
                />
            </Box>
        </Layout>
    );
};

export default CourseManagement;
