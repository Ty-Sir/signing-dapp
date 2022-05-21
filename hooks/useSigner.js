import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useConnectWallet } from '@web3-onboard/react';

export const useSigner = () => {
  const [{ wallet }] = useConnectWallet();
  const [signer, setSigner] = useState(null);

  const handleSetSigner = () =>{
    const provider = new ethers.providers.Web3Provider(wallet.provider);
    const currentSigner = provider.getSigner();
    setSigner(currentSigner);
  }

  useEffect(() => {
    if(signer === null && wallet) handleSetSigner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signer, wallet]);

  return { signer };
}