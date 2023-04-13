import {NextPage} from 'next';
import dynamic from 'next/dynamic';
import styles from '../styles/pages/index.module.sass';

const LandingPage: NextPage = () => {
  const Navigation = dynamic(() => import('../components/navigation'), {
    ssr: false
  });

  return (
    <div className={styles.container}>
      <Navigation></Navigation>
    </div>
  );
};

export default LandingPage;
