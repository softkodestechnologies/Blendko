'use client';
import Modal from './Modal';
import Login from '../auth/Login';

interface LoginModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onRequestClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} title="Log in">
      <Login />
      <button className="modal-button close" onClick={onRequestClose}>
        &times;
      </button>
    </Modal>
  );
};

export default LoginModal;
