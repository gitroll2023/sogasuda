'use client';

import React from 'react';
import styles from '../page.module.css';

const ScrollButton = ({ targetId }) => {
  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button className={styles.heroButton} onClick={handleClick}>
      <span className={styles.heroButtonText}>체험하러 가기</span>
      <span className={styles.heroButtonIcon}>→</span>
    </button>
  );
};

export default ScrollButton;
