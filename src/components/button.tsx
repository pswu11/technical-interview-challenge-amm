import {ReactNode} from 'react';
import styles from '../styles/components/button.module.sass';

interface Props {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium';
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  variant,
  size,
  children,
  className,
  onClick
}: Props) {
  return (
    <button
      className={`${styles.button} ${className ? className : ''}`}
      onClick={onClick ? onClick : undefined}
    >
      {children}
    </button>
  );
}
