import React from 'react';
import styles from './Modal.module.css';
import What from 'src/Assets/modal/message-what.png';
import bus from 'Components/Helper/bus';
import { Link } from 'react-router-dom';

const Modal = () => {
  const [visibility, setVisibility] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [textDeny, setTextDeny] = React.useState('');
  const [textConfirm, setTextConfirm] = React.useState('');
  const [href, setHref] = React.useState({ active: false, href: '' });
  const descriptionRef = React.useRef();

  React.useEffect(() => {
    bus.on('modal', ({ title, description, textDeny, textConfirm, href }) => {
      setTitle(title);
      setDescription(description);
      setTextDeny(textDeny || 'Negar');
      setTextConfirm(textConfirm || 'Confirmar');
      setHref(href);
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
        <img src={What} alt="O que?" />
        <h3>{title}</h3>
        <p ref={descriptionRef} className={styles.description}></p>
        <div className={styles.actions}>
          <Link to={href} className={styles.btnConfirm} onClick={closeModal}>
            {textConfirm}
          </Link>
          <button className={styles.btnDeny} onClick={closeModal}>
            {textDeny}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
