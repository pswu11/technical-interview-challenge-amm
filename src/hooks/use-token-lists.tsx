import useSWR from 'swr';
import {fetcher} from '../lib/fetcher';
import {Token} from '../types/token';

export default function useDefaultTokenList() {
  const {data, error} = useSWR<Token[]>(
    'https://raw.githubusercontent.com/Uniswap/default-token-list/main/src/tokens/mainnet.json',
    fetcher
  );

  let defaultTokenList = null;

  if (data && !error) {
    // Access IPFS-based images via a public gateway
    const filteredData = data?.map((token) => {
      if (token.logoURI?.startsWith('ipfs')) {
        const contentID = token.logoURI.replace('ipfs://', '');
        token.logoURI = `https://ipfs.io/ipfs/${contentID}`;
      }

      return token;
    });

    defaultTokenList = filteredData;
  }

  return {
    defaultTokenList: defaultTokenList as Array<Token>,
    loading: !error && !data,
    error
  };
}
