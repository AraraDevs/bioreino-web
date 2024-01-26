import React from 'react';
import styles from './Modal.module.css';
import { MdClose } from 'react-icons/md';
import bus from 'Components/Helper/bus';
import { Link } from 'react-router-dom';

const Modal = () => {
  const [visibility, setVisibility] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [textDeny, setTextDeny] = React.useState('');
  const [textConfirm, setTextConfirm] = React.useState('');
  const [anchor, setAnchor] = React.useState({ active: false, href: '' });
  const descriptionRef = React.useRef();

  React.useEffect(() => {
    bus.on('modal', ({ title, description, textDeny, textConfirm, anchor }) => {
      setTitle(title);
      setDescription(description);
      setTextDeny(textDeny);
      setTextConfirm(textConfirm);
      setAnchor(anchor);
      setVisibility(true);
    });
  }, []);

  React.useEffect(() => {
    if (visibility) {
      descriptionRef.current.innerHTML = description;
    }
  }, [visibility, description]);

  function closeModal() {
    setVisibility(false);
  }

  if (!visibility) return null;
  return (
    <div
      className={styles.bg}
      onClick={({ target, currentTarget }) => {
        if (target === currentTarget) closeModal();
      }}
    >
      <div className={styles.modal}>
        <div className={styles.wrapper}>
          <h3>{title}</h3>
          <button
            className={styles.close}
            aria-label="Fechar modal"
            onClick={closeModal}
          >
            <MdClose size="1.5em" color="#252525" />
          </button>
        </div>
        <p ref={descriptionRef} className={styles.description}></p>
        <div className={styles.actions}>
          <button className={styles.btnDeny} onClick={closeModal}>
            {textDeny || 'Negar'}
          </button>
          {anchor.active ? (
            <Link
              to={anchor.href}
              className={styles.btnConfirm}
              onClick={closeModal}
            >
              {textConfirm || 'Confirmar'}
            </Link>
          ) : (
            <button className={styles.btnConfirm} onClick={closeModal}>
              {textConfirm || 'Confirmar'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
