document.addEventListener('DOMContentLoaded', function () {
    const table = document.querySelector('table');
    if (!table) return;
    const rows = table.rows;
    const d = new Date();
    let day = d.getDay();;
    console.log(day);
    for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
        for (let cellIndex = 1; cellIndex < rows[rowIndex].cells.length; cellIndex++) {
            let count = cellIndex - 1;
            let cell = rows[rowIndex].cells[cellIndex];
            if (day === count) {
                console.log(count);
                rows[0].cells[cellIndex].style.backgroundColor='rgb(2,2,2)';
                for (let r = 1; r < rows.length; r++) {
                    if (rows[r].cells[cellIndex]) {
                        rows[r].cells[cellIndex].classList.add('col-shadow');
                    }
                }
            }
        }
    }

});

// Map table days to JS getDay() values (Sunday=0, Monday=1, ..., Saturday=6)
const dayMap = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

// Get current day and time
const now = new Date();
const currentDay = dayMap[now.getDay()]; // e.g., 'SUNDAY'
const currentHour = now.getHours();
const currentMinute = now.getMinutes();

// Define your time slots as in your table
const timeSlots = [
    { start: { h: 8, m: 0 }, end: { h: 9, m: 20 } },   // 8:00 am - 9:20 am
    { start: { h: 8, m: 0 }, end: { h: 10, m: 50 } },  // 8:00 am - 10:50 am
    { start: { h: 11, m: 0 }, end: { h: 12, m: 20 } }, // 11:00 am - 12:20 pm
    { start: { h: 12, m: 30 }, end: { h: 13, m: 50 } },// 12:30 pm - 1:50 pm
    { start: { h: 14, m: 0 }, end: { h: 15, m: 20 } }  // 2:00 pm - 3:20 pm
];

// Find the current time slot index
function getCurrentTimeSlotIndex() {
    for (let i = 0; i < timeSlots.length; i++) {
        const slot = timeSlots[i];
        const start = slot.start.h * 60 + slot.start.m;
        const end = slot.end.h * 60 + slot.end.m;
        const nowMinutes = currentHour * 60 + currentMinute;
        if (nowMinutes >= start && nowMinutes <= end) {
            return i;
        }
    }
    return -1;
}

// Highlight the cell
function highlightCurrentCell() {
    const slotIndex = getCurrentTimeSlotIndex();
    if (slotIndex === -1) return; // Not in any slot

    // Find the table
    const table = document.querySelector('table');
    if (!table) return;

    // Find the header row to get day indexes
    const headerCells = table.rows[0].cells;
    let dayCol = -1;
    for (let i = 1; i < headerCells.length; i++) {
        if (headerCells[i].textContent.trim().toUpperCase() === currentDay) {
            
            dayCol = i;
            break;
        }
    }
    if (dayCol === -1) return;

    // Remove previous highlights
    table.querySelectorAll('.highlight').forEach(cell => cell.classList.remove('highlight'));

    // Highlight the cell at (slotIndex+1, dayCol)
    const row = table.rows[slotIndex + 1]; // +1 because first row is header
    if (row) {
        const cell = row.cells[dayCol];
        if (cell && cell.innerText.trim()!=''){
            cell.classList.add('highlight');
        }
    }
    
    
    
}

// Add CSS for highlight
const style = document.createElement('style');
style.innerHTML = `.highlight { background-color:rgba(2,2,2,0.4) !important; color: white; border-radius: 10px; font-weight:600; letter-spacing:0.09rem; outline: 2.5px solid rgb(66, 66, 66); outline-offset: -2px;}`;
document.head.appendChild(style);

// Run and update every minute
highlightCurrentCell();
setInterval(highlightCurrentCell, 60000);

