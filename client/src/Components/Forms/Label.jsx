import styles from './Label.module.css';

const Label = ({ name, label, children }) => {
  return (
    <>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      {children}
    </>
  );
};

export default Label;
