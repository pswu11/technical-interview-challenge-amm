import {InjectedConnector} from '@web3-react/injected-connector';
import {NetworkConnector} from '@web3-react/network-connector';

export type Chain = {
  id: number;
  name: string;
  currencySymbol: string;
  rpcUrls: Array<string>;
  blockExplorerUrl: string;
};

export type Chains = {
  [index: string]: Chain;
};

export const chains: Chains = {
  mainNet: {
    id: 1,
    name: 'ETH Mainnet',
    currencySymbol: 'ETH',
    rpcUrls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    blockExplorerUrl: 'https://etherscan.io'
  }
};

export const connectors = {
  metamask: new InjectedConnector({
    supportedChainIds: [chains.mainNet.id]
  }),
  network: new NetworkConnector({
    urls: {
      [chains.mainNet.id]: chains.mainNet.rpcUrls[0]
    },
    defaultChainId: chains.mainNet.id
  })
};

export const defaultSwapTokenAddresses = {
  from: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  to: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
};
