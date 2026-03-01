
document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule');
  const searchInput = document.getElementById('search');
  let talks = [];

  // Fetch talk data
  fetch('../data/talks.json')
    .then(response => response.json())
    .then(data => {
      talks = data;
      renderSchedule(talks);
    });

  // Render the schedule
  function renderSchedule(talksToRender) {
    scheduleContainer.innerHTML = '';
    talksToRender.forEach(talk => {
      const talkElement = document.createElement('div');
      talkElement.classList.add('talk');
      talkElement.innerHTML = `
        <h2>${talk.title}</h2>
        <div class="time">${talk.startTime} - ${talk.endTime}</div>
        <div class="speakers">Speakers: ${talk.speakers.join(', ')}</div>
        <p>${talk.description}</p>
        <div class="categories">
          ${talk.categories.map(category => `<span class="category">${category}</span>`).join('')}
        </div>
      `;
      scheduleContainer.appendChild(talkElement);
    });
  }

  // Filter talks based on search input
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredTalks = talks.filter(talk => {
      return talk.categories.some(category => category.toLowerCase().includes(searchTerm));
    });
    renderSchedule(filteredTalks);
  });
});
