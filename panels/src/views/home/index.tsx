import React, { useState, useEffect } from 'react';
import { Switch } from 'antd';
import styles from './index.module.scss';

const Home: React.FC = () => {

  const [pluginEnabled, setPluginEnabled] = useState(false);

  useEffect(() => {
    // 获取存储的状态
    if (chrome?.storage?.local) {
      chrome.storage.local.get(['pluginSwitch'], function (result) {
        setPluginEnabled(result.pluginSwitch);
      });
    }
  }, []);

  // 插件开关状态变化
  const handlePluginSwitchChange = (checked: boolean) => {
    if (chrome?.storage?.local) {
      chrome.storage.local.set({ pluginSwitch: checked }, function () {

        console.log(`切换到 ${checked}`);
        // 通知 service_worker，进行相关响应
        if (chrome?.runtime) {
          chrome.runtime.sendMessage({ action: 'pluginStatusChange' }, function (response) {
            console.log('插件状态:', response.pluginEnabled);
          });
        }

      });
    }else{
      console.log('storage is not available');
    }
  };


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>欢迎使用该插件</h1>
      <Switch value={pluginEnabled} onChange={handlePluginSwitchChange} />
    </div>
  );
};

export default Home;