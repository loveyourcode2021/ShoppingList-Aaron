const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;

try {
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.start();
} catch (error) {
  console.log("Speech Recognition API not loaded");
}


export { recognition }