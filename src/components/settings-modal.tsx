import styles from '../styles/components/settings-modal.module.sass';
import Modal from './modal/modal';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function SettingsModal({open, setOpen}: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => handleClose()}>
      Settings
    </Modal>
  );
}
