import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, HStack, Divider, useColorModeValue } from '@chakra-ui/react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Layout from '../components/layout/Layout';
import { useCourses } from '../hooks/useCourses';
import { ICourse } from '../interfaces/course';

const Reports: React.FC = () => {
  const { courses } = useCourses();
  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({});
  const [totalSize, setTotalSize] = useState<number>(0);

  const maxTitleLength = 20;

  const headingColor = useColorModeValue('text.light', 'text.dark'); 
  const textColor = useColorModeValue('text.light', 'text.dark');  
  const dividerColor = useColorModeValue('border.light', 'border.dark');

  useEffect(() => {
    if (courses.length > 0) {
      const courseData = courses.map((course: ICourse) => {
        const courseSize = course.videos.reduce((sum, video) => sum + video.size, 0);
        const truncatedTitle = course.title.length > maxTitleLength 
          ? course.title.slice(0, maxTitleLength) + '...' 
          : course.title;
        return {
          name: truncatedTitle,
          y: courseSize,
          fullName: course.title,
        };
      });
  
      const totalSize = courseData.reduce((sum, course) => sum + course.y, 0);
  
      setTotalSize(totalSize);
  
      setChartOptions({
        chart: {
          type: 'bar',
          backgroundColor: 'transparent',
        },
        title: {
          text: 'Tamanho Total dos Vídeos por Curso',

        },
        xAxis: {
          categories: courseData.map(course => course.name),
          title: { text: null },
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Tamanho em MB',
       
          },
          labels: {
            overflow: 'justify',
          
          },
        },
        tooltip: {
          useHTML: true,
          formatter: function () {
            return `<div style="text-align: left;"><b>${courseData[this.point.index].fullName}</b><br/>Tamanho: ${this.y} MB</div>`;
          },
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderColor: headingColor,
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true,
            },
          },
          series: {
            borderColor: 'transparent',
          },
        },
        series: [
          {
            type: 'bar',
            name: 'Tamanho',
            data: courseData.map(course => course.y),
            color:  '#ff5722',
          },
        ],
      });
    }
  }, [courses, headingColor, dividerColor]);

  return (
    <Layout>
      <Box p={{ base: 4, md: 8 }}>
        <Heading size={{ base: 'lg', md: 'xl' }} mb={6} color={headingColor}>
          Relatórios de Tamanho Total dos Cursos
        </Heading>
        <VStack align="stretch" spacing={6}>
          <HStack justify="space-between" align="center" w="100%" spacing={6}>
            <Text fontSize={{ base: 'md', md: 'lg' }} color={textColor}>
              Tamanho total ocupado pelos cursos:
            </Text>
            <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color="primary.500">
              {totalSize} MB
            </Text>
          </HStack>
          <Divider borderColor={dividerColor} />
          <Box mt={6} h={{ base: '60vh', md: '70vh' }}>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
          </Box>
        </VStack>
      </Box>
    </Layout>
  );
};

export default Reports;
