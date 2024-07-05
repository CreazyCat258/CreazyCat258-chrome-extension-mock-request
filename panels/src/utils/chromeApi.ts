// chrome Storage 设置值
export const chromeStorageSet = (data, funcCallback, funcCallbackNoChrome?) => {
  if (typeof chrome !== 'undefined' && chrome?.storage) {
    chrome.storage.local.set({ ...data }, funcCallback)
  } else if(funcCallbackNoChrome) {
    funcCallbackNoChrome()
  }
}

// chrome runtime 发送消息
export const chromeRuntimeSendMessage = (data, funcCallback, funcCallbackNoChrome?) => {
  if (typeof chrome !== 'undefined' && chrome?.runtime) {
    chrome.runtime.sendMessage({...data}, funcCallback);
  } else if(funcCallbackNoChrome) {
    funcCallbackNoChrome()
  }
}