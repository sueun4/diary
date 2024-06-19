// script.js
document.addEventListener("DOMContentLoaded", function() {
    flatpickr("#note-date", {
        dateFormat: "Y년 m월 d일",
        onChange: function(selectedDates, dateStr, instance) {
            document.getElementById('note-date').value = dateStr;
        }
    });
    updateCurrentMonth();
});

function addNote() {
    const noteDate = document.getElementById('note-date').value;
    const location = document.getElementById('location').value;
    const intensity = document.getElementById('intensity').value;
    const noteContent = document.getElementById('note-content').value;

    if (!noteDate || !location || !noteContent) {
        alert('날짜, 위치, 운동 강도, 한 줄 소감을 입력하세요.');
        return;
    }

    const notesContainer = document.getElementById('notes-container');

    const noteElement = document.createElement('li');
    noteElement.classList.add('note');

    const noteDateElement = document.createElement('div');
    noteDateElement.classList.add('note-date');
    noteDateElement.textContent = noteDate;

    const noteLocationElement = document.createElement('div');
    noteLocationElement.classList.add('note-location');
    noteLocationElement.textContent = `운동한 위치: ${location}`;

    const noteIntensityElement = document.createElement('div');
    noteIntensityElement.classList.add('note-intensity');
    noteIntensityElement.textContent = `운동 강도: ${intensity}`;

    const noteContentElement = document.createElement('div');
    noteContentElement.classList.add('note-content');
    noteContentElement.textContent = noteContent;

    noteElement.appendChild(noteDateElement);
    noteElement.appendChild(noteLocationElement);
    noteElement.appendChild(noteIntensityElement);
    noteElement.appendChild(noteContentElement);

    notesContainer.appendChild(noteElement);

    // Clear inputs
    document.getElementById('note-date').value = '';
    document.getElementById('location').value = '';
    document.getElementById('intensity').value = '상';
    document.getElementById('note-content').value = '';
}

function updateCurrentMonth() {
    const now = new Date();
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();
    document.getElementById('current-month').textContent = `${year}년 ${month}`;
}

