import {NextPage} from 'next';
import Navigation from '../components/navigation';
import styles from '../styles/pages/liquidity.module.sass';

const LiquidityPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Navigation active="liquidity"></Navigation>
    </div>
  );
};

export default LiquidityPage;
