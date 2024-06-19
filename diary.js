document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        dateClick: function(info) {
            showEntriesForDate(info.dateStr);
        }
    });
    calendar.render();
    loadEntries();
});

function addDiaryEntry() {
    const date = document.getElementById('date-input').value;
    const location = document.getElementById('location-input').value;
    const intensity = document.getElementById('intensity-input').value;
    const note = document.getElementById('note-input').value;

    const entry = {
        date: date,
        location: location,
        intensity: intensity,
        note: note
    };

    saveEntry(entry);
    displayEntry(entry, false);
}

function saveEntry(entry) {
    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    entries.push(entry);
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
}

function loadEntries() {
    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    entries.forEach(entry => {
        displayEntry(entry, false);
    });
}

function displayEntry(entry, visible) {
    const entryDiv = document.createElement('div');
    entryDiv.className = 'diary-entry';
    entryDiv.style.display = visible ? 'block' : 'none';
    entryDiv.innerHTML = `
        <p>날짜: ${entry.date}</p>
        <p>위치: ${entry.location}</p>
        <p>운동 강도: ${entry.intensity}</p>
        <p>${entry.note}</p>
        <button class="delete-button" onclick="deleteEntry(this)">삭제</button>
    `;
    document.getElementById('diary-entries').appendChild(entryDiv);
}

function showEntriesForDate(date) {
    document.querySelectorAll('.diary-entry').forEach(entry => {
        if (entry.innerHTML.includes(`날짜: ${date}`)) {
            entry.style.display = 'block';
        } else {
            entry.style.display = 'none';
        }
    });
}

function deleteEntry(button) {
    let entryDiv = button.parentElement;
    let date = entryDiv.querySelector('p').innerText.split(': ')[1];
    entryDiv.remove();
    removeEntryFromStorage(date);
}

function removeEntryFromStorage(date) {
    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    entries = entries.filter(entry => entry.date !== date);
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
}
