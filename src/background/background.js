const SAFETY_THRESHOLDS = {
    connectionsPerDay: 100,
    messagesPerHour: 30
  };
  
  // Keep service worker alive
  console.log("Background script loaded");
  
  setInterval(() => console.log("Keeping service worker alive..."), 25000);
  
  // Listen for messages from other parts of the extension
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "CHECK_SAFETY") {
      chrome.storage.local.get(['usage'], (result) => {
        const safetyScore = calculateSafetyScore(result.usage || {});
        sendResponse({ score: safetyScore });
      });
      return true; // Indicates we will send a response asynchronously
    }
  });
  
  // Calculate a safety score based on user activity
  function calculateSafetyScore(usage) {
    let score = 100;
    if ((usage.connections || 0) > 80) score -= 30;
    if ((usage.messages || 0) > 25) score -= 20;
    return Math.max(score, 30);
  }
  
  // Test script execution on LinkedIn when the extension icon is clicked
  chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => alert("Hello from LinkGenie! Your LinkedIn automation is active."),
    });
  });
  