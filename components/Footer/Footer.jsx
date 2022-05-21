import { Flex, Text, Stack } from "@chakra-ui/react";

export const Footer = () => {
  return(
    <Flex as="footer" justifyContent='center' alignItems="flex-end" textAlign="center" mx='auto' height="100px" role="contentinfo" mt={{base: '6', sm: "0" }} py={'4'}>
      <Stack>
        <Text fontSize="sm" color="subtle">
          Your data is never stored or shared. Complete privacy and transparency.
        </Text>
      </Stack>
    </Flex>
  )
}