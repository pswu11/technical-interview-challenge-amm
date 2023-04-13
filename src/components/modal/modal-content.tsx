import {ReactNode} from 'react';
import styles from '../../styles/components/modal.module.sass';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function ModalContent({children, className}: Props) {
  return (
    <div className={`${styles.modalContent} ${className ? className : ''}`}>
      {children}
    </div>
  );
}
