console.log("Content script loaded");

document.body.style.border = "4px solid red";

chrome.runtime.onMessage.addListener((message, sender, _) => {
  console.log("Received message", message, sender);
  return true;
});
