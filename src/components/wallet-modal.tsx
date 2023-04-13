import {UnsupportedChainIdError, useWeb3React} from '@web3-react/core';
import {connectors} from '../constants/config';
import {shortenHash} from '../lib/web3';
import styles from '../styles/components/wallet-modal.module.sass';
import Button from './button';
import Modal from './modal/modal';
import ModalCard from './modal/modal-card';
import ModalContent from './modal/modal-content';
import ModalTitle from './modal/modal-title';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function WalletModal({open, setOpen}: Props) {
  const {account, active, error, activate, deactivate} = useWeb3React();

  const handleClose = () => {
    setOpen(false);
  };

  const activateWallet = () => {
    if (!active) {
      activate(connectors.metamask);
    }
  };

  const deactivateWallet = () => {
    deactivate();
  };

  const isWrongNetwork = error && error instanceof UnsupportedChainIdError;

  return (
    <Modal open={open} onClose={() => handleClose()}>
      {!isWrongNetwork && !account && (
        <ModalCard>
          <ModalTitle>Connect Wallet</ModalTitle>
          <ModalContent>
            <div className={styles.walletSelect}>
              <button
                className={styles.walletSelectButton}
                onClick={() => activateWallet()}
              >
                MetaMask
                <img src="/metamask-icon.svg" />
              </button>
            </div>
          </ModalContent>
        </ModalCard>
      )}
      {!isWrongNetwork && account && (
        <ModalCard>
          <ModalTitle>Your Wallet</ModalTitle>
          <ModalContent>
            <h4 className={styles.secondaryTitle}>Your Address</h4>
            <p>{shortenHash(account)}</p>
            <h4 className={styles.secondaryTitle}>Connected With</h4>
            <div className={styles.walletSelect}>
              <button
                className={styles.walletSelectButton}
                onClick={() => activateWallet()}
              >
                MetaMask
                <img src="/metamask-icon.svg" />
              </button>
            </div>
            <Button
              className={styles.walletDisconnectButton}
              onClick={() => deactivateWallet()}
            >
              Disconnect Wallet
            </Button>
          </ModalContent>
        </ModalCard>
      )}
      {isWrongNetwork && (
        <ModalCard>
          <ModalTitle>Error</ModalTitle>
          <ModalContent>
            <p>
              You are connected to the wrong network/chain.
              <br />
              Please switch to Mainnet.
            </p>
          </ModalContent>
        </ModalCard>
      )}
    </Modal>
  );
}
