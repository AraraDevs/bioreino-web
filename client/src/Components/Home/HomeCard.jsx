import React from 'react';
import styles from './HomeCard.module.css';
import stylesButton from '../Forms/Button.module.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Checked } from '../../Assets/checked.svg';
import useAnalyticsEventTracker from '../../Hooks/useAnalyticsEventTracker';

const HomeCard = ({ title, benefits, price }) => {
  const gaEventTracker = useAnalyticsEventTracker('Debug');

  function handleClick() {
    gaEventTracker('click', 'scholar');
  }

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
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
        <Link
          to={`/login/inscreva/${title}`}
          className={stylesButton.button}
          onClick={handleClick}
        >
          Assine já!
        </Link>
      </div>
    </div>
  );
};

export default HomeCard;
