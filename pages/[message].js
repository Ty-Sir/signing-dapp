import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Stack,
  Button,
  Heading,
  Textarea,
  useClipboard
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useSigner } from '../hooks/useSigner';
import { useRouter } from "next/router";

export default function Message() {
  const query = useRouter();
  const { signer } = useSigner();
  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState("");
  const { hasCopied, onCopy } = useClipboard(signature);

  useEffect(() => {
    if(query){
      setMessage(query.query.message)
    }
  }, [query])

  const handleSetMessage = e => setMessage(e.target.value);
  
  const signMessage = async () => {
    const sig = await signer.signMessage(message);
    setSignature(sig);
  }
  return (
    <Flex align={'center'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} w={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign Message</Heading>
        </Stack>
        <Box rounded={'lg'} boxShadow={'lg'} p={8}>
          <Stack spacing={10}>
            <FormControl id="message">
              <FormLabel>Message</FormLabel>
              <Textarea onChange={handleSetMessage} value={message} onChange={handleSetMessage} placeholder='Type anything to sign' />
            </FormControl>
            <FormControl id="signature">
              <FormLabel>Signature</FormLabel>
              <Box>{signature}</Box>
              {signature ? <Button mt={3} onClick={onCopy}>{hasCopied ? "Copied" : "Copy"}</Button> : null}
            </FormControl>
            <Button onClick={signMessage} colorScheme='blue'>
              Sign
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}