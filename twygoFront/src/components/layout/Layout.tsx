import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleContentClick = () => {
    if (isSidebarOpen) {
      handleSidebarClose();
    }
  };

  return (
    <Flex direction="column" minH="100vh">
      <Topbar onOpen={handleSidebarToggle} />
      <Flex flex="1">
        <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
        <Box
          flex="1"
          mt="60px"
          p={{ base: 4, md: 12 }} 
          onClick={handleContentClick}
          minH="calc(100vh - 60px)"
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
