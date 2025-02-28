const form = document.getElementById('logForm');
const searchButton = document.getElementById('searchButton');

const taskList = document.getElementById('taskList');
const noteList = document.getElementById('noteList');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task');
    const approvalInput = document.querySelector('input[name="approval"]:checked');
            const salesNameInput = document.getElementById('salesName').value;
            const newTask = document.createElement('li');
            newTask.textContent = `${salesNameInput}: ${taskInput.value}`; // Corrected to include sales name


    if (approvalInput) {
        if (approvalInput.value === 'approve') {
            newTask.classList.add('approved');
        } else if (approvalInput.value === 'reject') {
            newTask.classList.add('rejected');
        }
    }

    if (approvalInput) {
        if (approvalInput.value === 'approve') {
            newTask.classList.add('approved');
        } else if (approvalInput.value === 'reject') {
            newTask.classList.add('rejected');
        }
    }
    
    taskList.appendChild(newTask);

    taskInput.value = '';

});

function searchTasks() {
    const searchName = document.getElementById('searchName').value.toLowerCase();
    const searchDate = document.getElementById('searchDate').value;
    const tasks = taskList.getElementsByTagName('li');
    const results = [];

    for (let i = 0; i < tasks.length; i++) {
        const taskText = tasks[i].textContent.toLowerCase();
        // Assuming tasks are saved in a format that includes the date
        if (taskText.includes(searchName) && (searchDate === "" || taskText.includes(searchDate))) {
            results.push(tasks[i].textContent);
        }
    }

    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = results.length > 0 ? results.map(task => `<li>${task}</li>`).join('') : 'No tasks found';
}

searchButton.addEventListener('click', searchTasks);

function addNote() {
    const noteInput = document.getElementById('note');
    const newNote = document.createElement('li');
    newNote.textContent = noteInput.value;
    noteList.appendChild(newNote);
    noteInput.value = '';
}

const noteForm = document.getElementById('noteForm');
noteForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addNote();
});

// Function to export tasks and notes as a PDF
function exportToPDF() {
    const doc = new jsPDF();
    doc.text("Daily Log Sheet", 10, 10);
    doc.text("Tasks:", 10, 20);
    
    const tasks = taskList.getElementsByTagName('li');
    for (let i = 0; i < tasks.length; i++) {
        doc.text(`- ${tasks[i].textContent}`, 10, 30 + (i * 10));
    }

    doc.text("Notes:", 10, 30 + (tasks.length * 10));
    const notes = noteList.getElementsByTagName('li');
    for (let i = 0; i < notes.length; i++) {
        doc.text(`- ${notes[i].textContent}`, 10, 40 + (tasks.length * 10) + (i * 10));
    }

    doc.save('daily_log.pdf');
}

// Add export button functionality
const exportButton = document.createElement('button');
exportButton.textContent = 'Export to PDF';
exportButton.addEventListener('click', exportToPDF);
document.body.appendChild(exportButton);
