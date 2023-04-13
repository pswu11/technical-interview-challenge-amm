import {ReactNode} from 'react';
import styles from '../../styles/components/modal.module.sass';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function ModalTitle({children, className}: Props) {
  return (
    <h2 className={`${styles.modalTitle} ${className ? className : ''}`}>
      {children}
    </h2>
  );
}
