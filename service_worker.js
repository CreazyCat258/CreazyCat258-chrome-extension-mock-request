// panel窗口的唯一标识
let panelWindowId = null;

// 【事件监听】插件安装/更新
chrome.runtime.onInstalled.addListener(() => {
  console.log("插件-安装")
});

// 【事件监听】浏览区工具栏点击插件
// 只有在没有设置 popup 弹窗页面的时候才会被触发
chrome.action.onClicked.addListener((tab) => {
  console.log('插件-弹窗-点击事件')

  // 创建/聚焦 操作面板窗口（单例）
  if (panelWindowId) {
    chrome.windows.update(panelWindowId, { focused: true }, (win) => {
      if (!win) {
        createPanelWindow();
      } else if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
      }
    });
  } else {
    createPanelWindow();
  }

});

// 监听来自 window 的消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'pluginStatusChange') {
    console.log('background——插件状态变化', message)
    if (message.payload.checked) {
      enableExtension()
    } else {
      disableExtension()
    }
    sendResponse({ result: true });
  }
});



// 创建面板窗口
function createPanelWindow() {
  try {
    chrome.windows.create({
      url: "./panels/dist/index.html",
      type: "panel",
    }, (win) => {
      panelWindowId = win.id;
      chrome.windows.onRemoved.addListener((closedWindowId) => {
        if (closedWindowId === panelWindowId) {
          panelWindowId = null;
        }
      });
    });
  } catch (error) {
    console.log('创建窗口错误', error)
  }
}

// 启用插件
function enableExtension() {
  console.log('开启插件')
  // 设置角标文本和背景颜色
  chrome.action.setBadgeText({ text: 'ON' });
  chrome.action.setBadgeBackgroundColor({ color: '#00FF00' }); // 绿色背景

  // 在这里添加启用插件的逻辑，比如注入内容脚本等
  // chrome.scripting.executeScript({
  //     target: { allFrames: true },
  //     files: ['content.js']
  // });
}

// 禁用插件
function disableExtension() {
  console.log('关闭插件')
  // 设置角标文本和背景颜色
  chrome.action.setBadgeText({ text: 'OFF' });
  chrome.action.setBadgeBackgroundColor({ color: '#FF0000' }); // 红色背景

  // 在这里添加禁用插件的逻辑，比如移除内容脚本等
  // 注意：无法直接移除已注入的脚本，可以通过消息传递来通知内容脚本停止工作
  // chrome.tabs.query({}, function(tabs) {
  //     for (let tab of tabs) {
  //         chrome.tabs.sendMessage(tab.id, { action: "stopWorking" });
  //     }
  // });
}