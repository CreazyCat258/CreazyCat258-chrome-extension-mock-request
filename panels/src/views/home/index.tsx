import React from 'react';
import { Switch } from 'antd';
import styles from './index.module.scss';

const Home: React.FC = () => {

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello, Webpack and Sass Modules!</h1>
      <Switch defaultChecked onChange={onChange} />
    </div>
  );
};

export default Home;