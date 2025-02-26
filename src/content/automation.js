const MAX_DAILY_ACTIONS = 100;
let actionCount = 0;

function randomDelay(min=120000, max=600000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sendConnectionRequest(profile) {
  if(actionCount >= MAX_DAILY_ACTIONS) {
    chrome.runtime.sendMessage({type: "SHOW_COMPLIANCE_ALERT"});
    return;
  }
  
  setTimeout(() => {
    document.querySelector('button[aria-label="Connect"]').click();
    actionCount++;
  }, randomDelay());
}

// AI Hyper-Personalization
async function generateMessage(profileData) {
  const response = await chrome.runtime.sendMessage({
    type: "GENERATE_AI_MESSAGE",
    data: profileData
  });
  return response.message;
}