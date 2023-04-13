import {NextPage} from 'next';
import Navigation from '../components/navigation';
import FarmCard from '../components/farm-card';
import styles from '../styles/pages/farms.module.sass';

const farms = [
  {
    id: 'test1',
    name: 'Test1'
  },
  {
    id: 'test2',
    name: 'Test2'
  },
  {
    id: 'test3',
    name: 'Test3'
  },
  {
    id: 'test4',
    name: 'Test4'
  },
  {
    id: 'test5',
    name: 'Test5'
  },
  {
    id: 'test6',
    name: 'Test5'
  },
  {
    id: 'test7',
    name: 'Test5'
  }
];

const FarmsPage: NextPage = () => {
  return (
    <div className={styles.container}>
      <Navigation active="farms"></Navigation>
      <main className={styles.main}>
        <h1 className={styles.tvlNumber}>$248,391,480.41</h1>
        <h2 className={styles.tvlTitle}>Total Value Locked In All Farms</h2>
        <div className={styles.farmCards}>
          {farms.map((farm) => (
            <FarmCard key={farm.id} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default FarmsPage;
