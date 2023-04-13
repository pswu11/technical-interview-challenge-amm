import {NextPage} from 'next';
import Navigation from '../components/navigation';
import styles from '../styles/pages/staking.module.sass';

const StakingPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Navigation active="staking"></Navigation>
    </div>
  );
};

export default StakingPage;
