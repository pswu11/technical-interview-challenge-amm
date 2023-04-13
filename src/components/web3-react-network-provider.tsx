import React from 'react';
import {createWeb3ReactRoot} from '@web3-react/core';
import {Web3Provider} from '@ethersproject/providers';
import {Chain, chains} from '../constants/config';

type Props = {
  children?: React.ReactNode;
  getLibrary: (provider: any) => Web3Provider;
  chain: Chain;
};

type Providers = {
  [index: string]: any;
};

const providers: Providers = {
  [chains.mainNet.id.toString()]: createWeb3ReactRoot(
    chains.mainNet.id.toString()
  )
};

function Web3ReactNetworkProvider({children, getLibrary, chain}: Props) {
  const Web3ReactProvider = providers[chain.id.toString()];

  return (
    <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
  );
}

export default Web3ReactNetworkProvider;
