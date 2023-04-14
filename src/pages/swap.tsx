import type {NextPage} from 'next';
import {useRouter} from 'next/router';
import {ParsedUrlQuery} from 'querystring';
import {useCallback, useEffect, useState} from 'react';
import {
  IoArrowDown,
  IoSettingsOutline,
  IoChevronDown,
  IoInformationCircleOutline
} from 'react-icons/io5';
import Button from '../components/button';
import Card from '../components/card';
import styles from '../styles/pages/swap.module.sass';
import Navigation from '../components/navigation';
import TokenSelectModal from '../components/token-select-modal';
import {Token} from '../types/token';
import useTokenLists from '../hooks/use-token-lists';
import {defaultSwapTokenAddresses} from '../constants/config';

type TokenPair = {
  from: Token | null | undefined;
  to: Token | null | undefined;
};

const SwapPage: NextPage = () => {
  const router = useRouter();
  const [tokens, setTokens] = useState<TokenPair>({from: null, to: null});
  const [fromTokenSelectOpen, setFromTokenSelectOpen] = useState(false);
  const [toTokenSelectOpen, setToTokenSelectOpen] = useState(false);
  const {defaultTokenList} = useTokenLists();

  useEffect(() => {
    const setTokensFromQueryParams = (params: ParsedUrlQuery) => {
      const oldFrom = tokens.from;
      const oldTo = tokens.to;

      let from = defaultTokenList.find(
        (token) => token.address === defaultSwapTokenAddresses.from
      );
      let to = defaultTokenList.find(
        (token) => token.address === defaultSwapTokenAddresses.to
      );

      if (params.from) {
        from = defaultTokenList.find((token) => token.address === params.from);
      }
      if (params.to) {
        to = defaultTokenList.find((token) => token.address === params.to);
      }

      if (oldFrom !== from || oldTo !== to) {
        setTokens({from, to});
      }
    };
    console.log('rerender !!!');

    if (router.isReady && defaultTokenList) {
      setTokensFromQueryParams(router.query);
    }
  }, [router.isReady, router.query, defaultTokenList, tokens.from, tokens.to]);

  const updateQueryParamsFromTokens = (tokens: TokenPair) => {
    const params = {} as any;

    if (tokens.from) {
      params.from = tokens.from.address;
    }

    if (tokens.to) {
      params.to = tokens.to.address;
    }

    router.replace({pathname: router.pathname, query: params}, undefined, {
      shallow: true
    });
  };

  const swapInputs = () => {
    const newTokens = {from: tokens.to, to: tokens.from};
    updateQueryParamsFromTokens(newTokens);
    setTokens(newTokens);
  };

  const onFromTokenSelect = (token: Token) => {
    const newTokens = {from: token, to: tokens.to};
    updateQueryParamsFromTokens(newTokens);
    setTokens(newTokens);
  };

  const onToTokenSelect = (token: Token) => {
    const newTokens = {from: tokens.from, to: token};
    updateQueryParamsFromTokens(newTokens);
    setTokens(newTokens);
  };

  return (
    <div className={styles.container}>
      <Navigation active="swap"></Navigation>
      <Card className={styles.swapCard}>
        <div className={styles.header}>
          <div></div>
          <h2>Swap</h2>
          <button className={styles.settingsButton}>
            <span className={styles.slippageValue}>
              Slippage: <b>0.5%</b>
            </span>
            <IoSettingsOutline className={styles.settingsIcon} />
          </button>
        </div>
        <div className={styles.inputsContainer}>
          <div className={styles.inputContainer}>
            <button
              className={styles.tokenSelectButton}
              onClick={() => setFromTokenSelectOpen(true)}
            >
              {tokens.from && (
                <img
                  className={styles.tokenLogo}
                  src={tokens.from.logoURI}
                  alt="Token Logo"
                />
              )}
              <span className={styles.tokenSymbol}>
                {tokens.from ? tokens.from.symbol : 'Select Token'}
              </span>
              <IoChevronDown className={styles.chevronDownIcon} />
            </button>
            <input
              className={styles.tokenAmountInput}
              type="string"
              spellCheck="false"
              autoCorrect="off"
              autoComplete="off"
              inputMode="decimal"
              pattern="\d*"
              placeholder="0"
            />
            <span className={styles.tokenBalance}>Balance: 89.40</span>
          </div>
          <button
            className={styles.swapInputsButton}
            onClick={() => swapInputs()}
          >
            <IoArrowDown className={styles.swapInputsIcon} />
          </button>
          <div className={styles.inputContainer}>
            <button
              className={styles.tokenSelectButton}
              onClick={() => setToTokenSelectOpen(true)}
            >
              {tokens.to && (
                <img
                  className={styles.tokenLogo}
                  src={tokens.to.logoURI}
                  alt="Token Logo"
                />
              )}
              <span className={styles.tokenSymbol}>
                {tokens.to ? tokens.to.symbol : 'Select Token'}
              </span>
              <IoChevronDown className={styles.chevronDownIcon} />
            </button>
            <input
              className={styles.tokenAmountInput}
              type="string"
              spellCheck="false"
              autoCorrect="off"
              autoComplete="off"
              inputMode="decimal"
              pattern="\d*"
              placeholder="0"
            />
            <span className={styles.tokenBalance}>Balance: 103.4</span>
          </div>
        </div>
        <Button variant="primary">Connect Wallet</Button>
        <div className={styles.footer}>
          <div className={styles.footerRow}>
            <span>Price</span>
            <span>
              {tokens.from && tokens.to
                ? `1 ${tokens.from.symbol} = 0.5 ${tokens.to.symbol}`
                : '-'}
            </span>
          </div>
          <div className={styles.footerRow}>
            <span>
              Price Impact
              <IoInformationCircleOutline
                className={styles.informationCircleIcon}
              />
            </span>
            <span>
              <b>0.5%</b>
            </span>
          </div>
          <div className={styles.footerRow}>
            <span>
              Minimum Received
              <IoInformationCircleOutline
                className={styles.informationCircleIcon}
              />
            </span>
            <span>{tokens.to ? `0 ${tokens.to.symbol}` : '-'}</span>
          </div>
          <div className={styles.footerRow}>
            <span>
              Liquidity Provider Fee
              <IoInformationCircleOutline
                className={styles.informationCircleIcon}
              />
            </span>
            <span>{tokens.from ? `0.005 ${tokens.from.symbol}` : '-'}</span>
          </div>
        </div>
      </Card>
      {tokens.to && tokens.from && (
        <TokenSelectModal
          open={fromTokenSelectOpen}
          setOpen={setFromTokenSelectOpen}
          defaultTokenList={defaultTokenList}
          disabledAddresses={[tokens.to.address, tokens.from.address]}
          onTokenSelect={onFromTokenSelect}
        />
      )}
      {tokens.to && tokens.from && (
        <TokenSelectModal
          open={toTokenSelectOpen}
          setOpen={setToTokenSelectOpen}
          defaultTokenList={defaultTokenList}
          disabledAddresses={[tokens.to.address, tokens.from.address]}
          onTokenSelect={onToTokenSelect}
        />
      )}
    </div>
  );
};

export default SwapPage;
