import {ReactNode, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import styles from '../../styles/components/modal.module.sass';

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export default function Modal({open, onClose, children, className}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return () => {
      setMounted(false);
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, []);

  const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!open || !mounted) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={`${styles.modal} ${className ? className : ''}`}
      onClick={() => onClose()}
    >
      <main className={styles.main} onClick={(e) => e.stopPropagation()}>
        {children}
      </main>
    </div>,
    document.getElementById('__next')!
  );
}
