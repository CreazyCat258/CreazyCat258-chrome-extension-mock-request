document.getElementById("btnChangeToPopupClick").addEventListener("click", () => {
  console.log('插件-弹窗-设置弹窗点击模式')
  // 关闭弹窗
  window.close();
  // 设置弹窗页面为空，此时 chrome.action.onClicked 监听会被响应
  chrome.action.setPopup({ popup: '' });
});