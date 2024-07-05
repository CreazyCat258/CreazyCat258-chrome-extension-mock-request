import React, { useState, useEffect } from 'react';
import { Switch } from 'antd';
import { chromeStorageSet, chromeRuntimeSendMessage } from '../../utils/chromeApi'
import styles from './index.module.scss';

const Home: React.FC = () => {

  const [pluginEnabled, setPluginEnabled] = useState(false);

  // 插件开关状态变化
  const handlePluginSwitchChange = (checked: boolean) => {
    chromeStorageSet(
      { pluginSwitch: checked },
      () => {
        console.log(`切换到 ${checked}`);
        chromeRuntimeSendMessage(
          { action: 'pluginStatusChange', payload: { checked } },
          (response) => {
            console.log('插件状态:', response.result);
            if (response.result) {
              setPluginEnabled(checked)
            }
          }
        )
      },
      () => {
        console.log('设置开关状态', checked)
        setPluginEnabled(checked)
      }
    )
  };


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>欢迎使用该插件</h1>
      <Switch value={pluginEnabled} onChange={handlePluginSwitchChange} />
    </div>
  );
};

export default Home;