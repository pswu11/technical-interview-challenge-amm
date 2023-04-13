import styles from '../styles/components/farm-card.module.sass';
import Button from './button';
import Card from './card';
import {IoAdd, IoRemove} from 'react-icons/io5';
import {ReactNode} from 'react';
import Image from 'next/image';

interface Props {
  children?: ReactNode;
  className?: string;
}

export default function FarmCard({children, className}: Props) {
  return (
    <Card className={styles.farmCard}>
      <div className={styles.tokenLogos}>
        <Image src="/generic-logo.png" width="30px" height="30px" />
        <Image src="/eth-token-logo.svg" width="30px" height="30px" />
      </div>
      <span className={styles.earnBadge}>Earn GEN + Fees</span>
      <h4 className={styles.tokenName}>
        GEN-ETH<span className={styles.tokenType}>LP</span>
      </h4>
      <h6 className={styles.title}>Current APR</h6>
      <h5 className={styles.value}>1,312 %</h5>
      <div className={styles.twoCols}>
        <div>
          <h6 className={styles.title}>GEN Earned</h6>
          <h5 className={styles.value}>932.41</h5>
        </div>
        <Button className={styles.harvestButton}>Harvest</Button>
      </div>
      <div className={styles.twoCols}>
        <div>
          <h6 className={styles.title}>GEN-ETH LP Staked</h6>
          <h5 className={styles.value}>-</h5>
        </div>
        <div>
          <Button className={styles.addRemoveButton}>
            <IoRemove className={styles.addRemoveIcon} />
          </Button>
          <Button className={styles.addRemoveButton}>
            <IoAdd className={styles.addRemoveIcon} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
