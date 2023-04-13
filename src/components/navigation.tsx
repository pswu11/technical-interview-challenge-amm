import {UnsupportedChainIdError, useWeb3React} from '@web3-react/core';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {
  IoBookOutline,
  IoSettingsOutline,
  IoWalletOutline,
  IoWarningOutline
} from 'react-icons/io5';
import Image from 'next/image';
import {connectors} from '../constants/config';
import styles from '../styles/components/navigation.module.sass';
import {shortenHash} from '../lib/web3';
import SettingsModal from './settings-modal';
import WalletModal from './wallet-modal';

type Props = {
  active?: string;
};

export default function Navigation({active}: Props) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const {account, active: walletActive, error, activate} = useWeb3React();

  useEffect(() => {
    eagerConnectMetamask();
  }, []);

  const eagerConnectMetamask = async () => {
    const isAuthorized = await connectors.metamask.isAuthorized();
    if (isAuthorized) {
      activate(connectors.metamask);
    }
  };

  const isWrongNetwork = error && error instanceof UnsupportedChainIdError;

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        <Image
          width="60px"
          height="60px"
          src="/generic-logo.png"
          alt="Generic Blockchain Logo"
        />
      </Link>
      <nav className={`${styles.navigation}`}>
        <Link
          href="/swap"
          className={active && active === 'swap' ? styles.active : ''}
        >
          Swap
        </Link>
        <Link
          href="/liquidity"
          className={active && active === 'liquidity' ? styles.active : ''}
        >
          Liquidity
        </Link>
        <Link
          href="/farms"
          className={active && active === 'farms' ? styles.active : ''}
        >
          Farms
        </Link>
        <Link
          href="/staking"
          className={active && active === 'staking' ? styles.active : ''}
        >
          Staking
        </Link>
      </nav>
      <nav className={`${styles.navigation} ${styles.sub}`}>
        <button className={styles.button} onClick={() => setWalletOpen(true)}>
          {isWrongNetwork && (
            <span>
              <IoWarningOutline className={styles.warningIcon} />
              Wrong Network
            </span>
          )}
          {!walletActive && !isWrongNetwork && 'Connect Wallet'}
          {walletActive && !isWrongNetwork && account && (
            <span>
              <IoWalletOutline className={styles.walletIcon} />
              {shortenHash(account)}
            </span>
          )}
        </button>
        <button className={styles.button}>
          <IoBookOutline className={styles.settingsIcon} />
        </button>
        <button className={styles.button} onClick={() => setSettingsOpen(true)}>
          <IoSettingsOutline className={styles.settingsIcon} />
        </button>
      </nav>
      <WalletModal open={walletOpen} setOpen={setWalletOpen} />
      <SettingsModal open={settingsOpen} setOpen={setSettingsOpen} />
    </div>
  );
}
