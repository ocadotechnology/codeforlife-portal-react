import React from 'react';

import JokeList from 'features/jokeList/JokeList';
import styles from './JokeListPage.module.scss';

import { SayHello } from 'codeforlife';

export default function JokeListPage(): JSX.Element {
  return (
    <div className={styles.page}>
      <JokeList />
      <SayHello name="Stefan" />
    </div>
  );
}
