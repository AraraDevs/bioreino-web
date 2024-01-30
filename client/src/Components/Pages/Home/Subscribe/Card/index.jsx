import styles from './Card.module.css';
import stylesButton from 'Components/Forms/Button.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Checked } from 'src/Assets/checked.svg';

const Card = ({ name, benefits, price }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{name}</h2>
      <ul>
        {benefits.map((benefit) => (
          <li key={benefit} className={styles.listItem}>
            <Checked />
            <p>{benefit}</p>
          </li>
        ))}
      </ul>
      <p className={styles.price}>R$ {price}</p>
      <div className={styles.signButton}>
        <Link to={`/login/inscreva/${name}`} className={stylesButton.button}>
          Assine já!
        </Link>
      </div>
    </div>
  );
};

export default Card;
