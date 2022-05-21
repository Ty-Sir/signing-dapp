import { useEffect } from "react";
import {
  Button,
  Image,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalFooter,
  IconButton,
  useClipboard,
  Flex
} from '@chakra-ui/react'
import { useConnectWallet } from '@web3-onboard/react';
import { onboard } from "./config";
import { getEllipsisTxt } from "../../utils/formatters";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons"

export const Connect = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ wallet }, connect, disconnect] = useConnectWallet();
  const { hasCopied, onCopy } = useClipboard(wallet?.accounts[0].address);
  const walletsSub = onboard.state.select('wallets');
  const { unsubscribe } = walletsSub.subscribe(wallets => {
    const connectedWallets = wallets.map(({ label }) => label);
    window.localStorage.setItem('connectedWallets', JSON.stringify(connectedWallets));
  })

  const connectWallet = () => {
    connect();
    const state = onboard.state.get();
    state.accountCenter.enabled = false;
  }

  const signOut = () => {
    disconnect(wallet);
    window.localStorage.removeItem('connectedWallets');
    onClose();
  }

  const connectOnLoad = async () => {
    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem('connectedWallets')
    )

    if (previouslyConnectedWallets) {
      connect({ autoSelect: previouslyConnectedWallets[0] });
      const state = onboard.state.get();
      state.accountCenter.enabled = false;
    }
  }

  useEffect(() => {
    if(!wallet) connectOnLoad();
    return () => {
      // unsubscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(
    <>
      {wallet ? 
        <>
          <Button onClick={onOpen}>{getEllipsisTxt(wallet.accounts[0].address)}</Button>
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent borderRadius="lg">
              <ModalHeader fontSize="2xl">Account</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex borderRadius="md" px="3" py='5' fontWeight="500" fontSize="lg" alignItems='center'>
                  {getEllipsisTxt(wallet.accounts[0].address, 6)} 
                  <IconButton size="sm" bg="transparent" aria-label='Copy' onClick={onCopy} ml={2} icon={hasCopied ? <CheckIcon /> : <CopyIcon />} />
                </Flex>
              </ModalBody>
              <ModalFooter justifyContent="center" >
                <Button w="75%" onClick={signOut}>Disconnect</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
        :
        <Button onClick={connectWallet}>
          Connect
        </Button>
      }
    </>
  )
}
