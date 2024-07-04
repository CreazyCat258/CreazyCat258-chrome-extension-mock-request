chrome.devtools.panels.create(
  "RequestMock",             // 面板标题
  "../images/icon16.png",             // 面板图标（可选）
  "devtools/panel.html",  // 面板内容的 HTML 文件
  (panel) => {
    console.log("自定义DevTools面板创建成功");
  }
);