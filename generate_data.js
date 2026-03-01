
const fs = require('fs');

const talks = [];
const startTime = new Date('2024-10-26T10:00:00');
const lunchBreakTime = new Date('2024-10-26T13:20:00');

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

let currentTime = startTime;

for (let i = 1; i <= 6; i++) {
  if (i === 4) {
    currentTime = addMinutes(currentTime, 60); // Lunch break
  }

  const talk = {
    title: `Talk ${i}: The Future of JavaScript`,
    speakers: i % 2 === 0 ? [`Speaker ${i}a`, `Speaker ${i}b`] : [`Speaker ${i}`],
    categories: [`Category ${i}`],
    duration: 60,
    description: `This is a description for Talk ${i}. It will cover exciting new developments in the world of JavaScript.`,
    startTime: formatTime(currentTime),
    endTime: formatTime(addMinutes(currentTime, 60)),
  };

  talks.push(talk);

  currentTime = addMinutes(currentTime, 70); // 60-minute talk + 10-minute break
}

fs.writeFileSync('data/talks.json', JSON.stringify(talks, null, 2));

console.log('Successfully generated talks data!');
