import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Box, Flex } from '@chakra-ui/react';
import { Connect } from "../components/Connect/Connect";
import { Footer } from "../components/Footer/Footer";
import { createStandaloneToast } from '@chakra-ui/toast';
const { ToastContainer, toast } = createStandaloneToast();

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Box overflowY="auto" flex="1" as="section" height="100vh">
        <Flex maxW={"2000px"} mx="auto" px="3" py="5" justify="flex-end">
          <Connect />
        </Flex>
        <Box minHeight="calc(100vh - 196px)">
          <Component {...pageProps} />
        </Box>
        <Footer />
      </Box>
      <ToastContainer />
    </ChakraProvider>
  )
}

export default MyApp

export const infoToast = (title, message) => {
  toast({
    title: title,
    description: message,
    status: 'info',
    duration: 2500,
    isClosable: true,
    position: 'top-left'
  })
}