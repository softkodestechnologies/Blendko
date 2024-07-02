"use client";
import Modal from './Modal';
import Register from '../register/Register';

interface SignUpModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onRequestClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} title="">
      <Register />
      <button className="modal-button close" onClick={onRequestClose}>&times;</button>
    </Modal>
  );
};

export default SignUpModal;