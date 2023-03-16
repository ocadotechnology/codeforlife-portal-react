import React from 'react';

import JokeList from 'features/jokeList/JokeList';
import styles from './JokeListPage.module.scss';

export default function JokeListPage(): JSX.Element {
  return (
    <div className={styles.page}>
      <JokeList />
    </div>
  );
}
