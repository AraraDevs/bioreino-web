import styles from './Testimony.module.css';

const Testimony = ({ src, name, children }) => {
  return (
    <blockquote className={styles.student}>
      <img src={src} alt="Foto do aluno que fez o depoimento" />
      <cite>{name}</cite>
      <hr className={styles.divider} />
      <p>{children}</p>
    </blockquote>
  );
};

export default Testimony;
