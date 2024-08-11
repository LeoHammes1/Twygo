import React from 'react';
import { Box, Text, VStack, Stack, Heading, Image, Flex, useColorModeValue } from '@chakra-ui/react';
import Layout from '../components/layout/Layout';
import { useCourses } from '../hooks/useCourses';
import { ICourse } from '../interfaces/course';

const Home: React.FC = () => {
  const { courses } = useCourses();

  const cardBg = useColorModeValue('background.light.card', 'background.dark.card');
  const textColor = useColorModeValue('text.light', 'text.dark');
  const borderColor = useColorModeValue('border.light', 'border.dark');

  return (
    <Layout>
      <Box p={{ base: 2, md: 4 }}>
        <VStack align="stretch" spacing={{ base: 4, md: 6 }}>
          {courses.map((course: ICourse) => (
            <Box
              key={course._id}
              p={{ base: 3, md: 5 }}
              borderWidth="1px"
              borderRadius="md"
              shadow="md"
              bg={cardBg}
              borderColor={borderColor}
            >
              <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 4, md: 6 }}>
                <Image
                  boxSize={{ base: '100%', md: '200px' }}
                  objectFit="cover"
                  src="https://via.placeholder.com/300x200"
                  alt={`Capa do curso ${course.title}`}
                  borderRadius="md"
                />
                <Flex direction="column" flex="1">
                  <Heading size={{ base: 'md', md: 'lg' }} mb={2} color="primary.500">
                    {course.title}
                  </Heading>
                  <Text fontSize={{ base: 'sm', md: 'md' }} mb={4} color={textColor}>
                    {course.description}
                  </Text>
                  <Flex mt="auto" justify="space-between" align="center">
                    <Text color={textColor}>
                      {course.videos.length} {course.videos.length === 1 ? 'Aula' : 'Aulas'}
                    </Text>
                    <Text color={textColor}>
                      Disponível até: {new Date(course.endDate).toLocaleDateString()}
                    </Text>
                  </Flex>
                </Flex>
              </Stack>
            </Box>
          ))}
        </VStack>
      </Box>
    </Layout>
  );
};

export default Home;
