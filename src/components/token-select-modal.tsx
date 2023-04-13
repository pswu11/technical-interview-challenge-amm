import styles from '../styles/components/token-select-modal.module.sass';
import Modal from './modal/modal';
import ModalCard from './modal/modal-card';
import ModalContent from './modal/modal-content';
import ModalTitle from './modal/modal-title';
import {useEffect, useState} from 'react';
import {chains, connectors} from '../constants/config';
import {useWeb3React} from '@web3-react/core';
import erc20Abi from '../abis/erc20.json';
import {Contract} from 'ethers';
import {Token} from '../types/token';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  defaultTokenList: Array<Token>;
  disabledAddresses: Array<string>;
  onTokenSelect: (token: Token) => void;
}

export default function TokenSelectModal({
  open,
  setOpen,
  defaultTokenList,
  disabledAddresses,
  onTokenSelect
}: Props) {
  const {library, active, activate} = useWeb3React(
    chains.mainNet.id.toString()
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [showingUserToken, setShowingUserToken] = useState(false);
  const [filteredTokens, setFilteredTokens] =
    useState<Array<Token>>(defaultTokenList);

  console.log('rerender !!!');

  useEffect(() => {
    if (!active) {
      activate(connectors.network);
    }
  }, [active]);

  const handleClose = () => {
    setOpen(false);
    setShowingUserToken(false);
    setSearchQuery('');
  };

  const handleSearchInput = (event: any) => {
    setSearchQuery(event.target.value);
    filterTokens(event.target.value);
  };

  const filterTokens = (query: string) => {
    if (!query) {
      setShowingUserToken(false);
      return setFilteredTokens(defaultTokenList);
    }

    if (query.length === 42 && query.startsWith('0x')) {
      fetchTokenFromChain(query);
    } else {
      const newFilteredTokens = defaultTokenList.filter((token) => {
        const tokenSymbol = token.symbol.toLowerCase();
        return tokenSymbol.includes(query);
      });

      setShowingUserToken(false);
      setFilteredTokens(newFilteredTokens);
    }
  };

  const fetchTokenFromChain = async (address: string) => {
    const tokenContract = new Contract(address, erc20Abi, library);
    const [name, symbol, decimals] = await Promise.all([
      tokenContract.name(),
      tokenContract.symbol(),
      tokenContract.decimals()
    ]);

    const token: Token = {
      chainId: chains.mainNet.id,
      address,
      decimals,
      name,
      symbol
    };

    setShowingUserToken(true);
    setFilteredTokens([token]);
  };

  const addUserToken = (token: Token) => {};

  const selectToken = (token: Token) => {
    if (!disabledAddresses.includes(token.address)) {
      onTokenSelect(token);
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={() => handleClose()}>
      <ModalCard className={styles.tokenSelectCard}>
        <ModalTitle className={styles.title}>Select a token</ModalTitle>
        <ModalContent>
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search name or paste address"
              autoFocus
              value={searchQuery}
              onInput={(e) => handleSearchInput(e)}
            />
          </div>
          <ul className={styles.tokenList}>
            {filteredTokens.map((token) => {
              return (
                <li
                  key={token.address}
                  className={`${styles.tokenListItem} ${
                    disabledAddresses.includes(token.address)
                      ? styles.disabled
                      : ''
                  }`}
                  onClick={() => selectToken(token)}
                >
                  <img
                    className={styles.tokenLogo}
                    src={
                      token.logoURI
                        ? token.logoURI
                        : '/default-token-logo-white.png'
                    }
                    alt={token.name}
                  />
                  <div>
                    <span className={styles.tokenSymbol}>{token.symbol}</span>
                    {showingUserToken && (
                      <span className={styles.userToken}>
                        Found by address (
                        <span
                          className={styles.addUserToken}
                          onClick={() => addUserToken(token)}
                        >
                          Add
                        </span>
                        )
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </ModalContent>
      </ModalCard>
    </Modal>
  );
}
