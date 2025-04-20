const canvas = document.getElementById("analog-clock");
const ctx = canvas.getContext("2d");
const radius = canvas.width / 2;
ctx.translate(radius, radius);

function drawClock() {
  ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
  const now = new Date();
  drawFace();
  drawNumbers();
  drawTime(now);
  requestAnimationFrame(drawClock);
}

function drawFace() {
  ctx.beginPath();
  ctx.arc(0, 0, radius - 5, 0, 2 * Math.PI);
  ctx.fillStyle = "#1a1a1a";
  ctx.fill();
  ctx.strokeStyle = "#0f0";
  ctx.lineWidth = 3;
  ctx.stroke();
}

function drawNumbers() {
  ctx.fillStyle = "white";
  ctx.font = "16px Segoe UI";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let num = 1; num <= 12; num++) {
    let angle = (num * Math.PI) / 6;
    let x = Math.cos(angle - Math.PI / 2) * (radius - 30);
    let y = Math.sin(angle - Math.PI / 2) * (radius - 30);
    ctx.fillText(num.toString(), x, y);
  }
}

function drawTime(now) {
  let hour = now.getHours() % 12;
  let minute = now.getMinutes();
  let second = now.getSeconds();

  // Hour
  let hourAngle = ((hour + minute / 60) * Math.PI) / 6;
  drawHand(hourAngle, radius * 0.5, 6, 'lightblue');

  // Minute
  let minuteAngle = ((minute + second / 60) * Math.PI) / 30;
  drawHand(minuteAngle, radius * 0.75, 4, 'white');

  // Second
  let secondAngle = (second * Math.PI) / 30;
  drawHand(secondAngle, radius * 0.9, 2, 'red');
}

function drawHand(pos, length, width, color) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.moveTo(0, 0);
  ctx.lineTo(Math.cos(pos - Math.PI / 2) * length, Math.sin(pos - Math.PI / 2) * length);
  ctx.stroke();
}

drawClock();

// Digital clock
function updateDigitalClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString();
  document.getElementById("digital-clock").textContent = timeStr;
}
setInterval(updateDigitalClock, 1000);
updateDigitalClock();

// Speak time
document.getElementById("speak-btn").addEventListener("click", () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
  
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 0 to 12-hour format
  
    // Convert time to words
    let hourInWords = convertToWords(hours);
    let minuteInWords = minutes === 0 ? "o'clock" : convertToWords(minutes);
    let timeInWords = `${hourInWords} ${minuteInWords} ${period}`;
  
    // Speak the time
    const utterance = new SpeechSynthesisUtterance(`The time is ${timeInWords}`);
    speechSynthesis.speak(utterance);
  });
  
  
  //This are the  Function to convert numbers to words
  function convertToWords(num) {
    const words = [
      'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
      'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
      'eighteen', 'nineteen', 'twenty', 'twenty-one', 'twenty-two', 'twenty-three', 'twenty-four',
      'twenty-five', 'twenty-six', 'twenty-seven', 'twenty-eight', 'twenty-nine', 'thirty',
      'thirty-one', 'thirty-two', 'thirty-three', 'thirty-four', 'thirty-five', 'thirty-six',
      'thirty-seven', 'thirty-eight', 'thirty-nine', 'forty', 'forty-one', 'forty-two', 'forty-three',
      'forty-four', 'forty-five', 'forty-six', 'forty-seven', 'forty-eight', 'forty-nine', 'fifty',
      'fifty-one', 'fifty-two', 'fifty-three', 'fifty-four', 'fifty-five', 'fifty-six', 'fifty-seven',
      'fifty-eight', 'fifty-nine'
    ];
  
    if (num < 60) {
      return words[num];
    }
    return '';
  }
// let now Convert hours to 12-hour format
const now = new Date();
let hours = now.getHours();
const minutes = now.getMinutes();
const period = hours >= 12 ? "PM" : "AM";

hours = hours % 12 || 12; // convert 0 to 12-hour format

// let Convert time to words
let timeInWords = `${convertToWords(hours)} ${convertToWords(minutes)} ${period}`;

const utterance = new SpeechSynthesisUtterance(`The time is ${timeInWords}`);
speechSynthesis.speak(utterance);


let alarmTime = null;
let alarmSet = false;

document.getElementById("set-alarm-btn").addEventListener("click", () => {
  const hour = parseInt(document.getElementById("alarm-hour").value);
  const minute = parseInt(document.getElementById("alarm-minute").value);
  const period = document.getElementById("alarm-period").value;

  if (isNaN(hour) || isNaN(minute)) {
    alert("Please enter a valid time.");
    return;
  }

  alarmTime = `${hour}:${minute < 10 ? "0" + minute : minute} ${period}`;
  alarmSet = true;

  document.getElementById("alarm-status").textContent = `Alarm set for ${alarmTime}`;
});

  