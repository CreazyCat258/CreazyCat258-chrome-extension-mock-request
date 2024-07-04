import React from 'react';
import style from './style.module.scss'
import { Switch } from 'antd';

const Home: React.FC = () => {

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };


  return (
    <div className={style.page}>
      <h1>Hello, React with TypeScript!</h1>
      <Switch defaultChecked onChange={onChange} />
    </div>
  );
};

export default Home;