import {Web3Provider} from '@ethersproject/providers';
import {BigNumber, ethers} from 'ethers';

export function shortenHash(hash: string) {
  return `${hash.substr(0, 6)}...${hash.substr(-4, 4)}`;
}

export function bigNumberToDecimals(number: BigNumber, decimals: number = 18) {
  return Number(bigNumberToString(number, decimals));
}

export function bigNumberToString(number: BigNumber, decimals: number) {
  return ethers.utils.formatUnits(number, decimals);
}

export function stringToBigNumber(number: string, decimals: number) {
  return ethers.utils.parseUnits(number, decimals);
}

export function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  return library;
}
