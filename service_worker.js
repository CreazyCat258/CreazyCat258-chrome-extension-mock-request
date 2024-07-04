// panel窗口的唯一标识
let panelWindowId = null;

// 【事件监听】浏览区工具栏点击插件
// 只有在没有设置 popup 弹窗页面的时候才会被触发
chrome.action.onClicked.addListener((tab) => {
  console.log('插件-弹窗-点击事件')

  // 创建/聚焦 操作面板窗口（单例）
  if (panelWindowId) {
    chrome.windows.update(panelWindowId, { focused: true }, (win) => {
      if(!win){
        createPanelWindow();
      }else if (chrome.runtime.lastError ) {
        console.log(chrome.runtime.lastError.message);
      }
    });
  } else {
    createPanelWindow();
  }
});

// 创建面板窗口
function createPanelWindow() {
  try {
    chrome.windows.create({
      url: "./test.html",
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