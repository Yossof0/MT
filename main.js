// DOM elements
const form = document.getElementById('myForm');
const inputField = document.getElementById('inputField');
const numberField = document.getElementById('NumberField');
const tableContainer = document.getElementById('tableContainer');
const chartCanvas = document.getElementById('multiplicationChart');
const themeButtons = document.querySelectorAll('.theme-option');
const downloadButtons = document.querySelectorAll('.download-option');
const themeDropdown = document.querySelector('.theme-dropdown');
const downloadDropdown = document.querySelector('.download-dropdown');
const themeButton = document.querySelector('.theme-button');
const downloadButton = document.querySelector('.download-button');

// Generate multiplication table
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const input = parseInt(inputField.value);
    const number = parseInt(numberField.value);
    generateTable(input, number);
    generateChart(input, number);
});

function generateTable(input, number) {
    tableContainer.innerHTML = ''; // Clear previous table
    const table = document.createElement('table');
    table.className = 'multiplication-table';

    // Create header row
    let headerRow = table.insertRow();
    headerRow.appendChild(createCell('×', 'header-cell'));
    for (let i = 1; i <= number; i++) {
        headerRow.appendChild(createCell(i, 'header-cell'));
    }

    // Create multiplication rows
    for (let i = 1; i <= input; i++) {
        let row = table.insertRow();
        row.appendChild(createCell(i, 'header-cell'));
        for (let j = 1; j <= number; j++) {
            row.appendChild(createCell(i * j, 'data-cell'));
        }
    }

    tableContainer.appendChild(table);
}

function createCell(value, className) {
    const cell = document.createElement('td');
    cell.textContent = value;
    cell.className = className;
    return cell;
}

// Generate multiplication chart
function generateChart(input, number) {
    

    const labels = [];
    const data = [];

    for (let i = 1; i <= number; i++) {
        labels.push(i);
        data.push(input * i);
    }

    const ctx = chartCanvas.getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Multiplication Table for ${input}`,
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Theme switching
themeButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        const theme = this.getAttribute('data-theme');
        document.body.className = theme;
        closeDropdowns();
    });
});

// Download options
downloadButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        const format = this.getAttribute('data-format');
        if (format === 'pdf') {
            downloadAsPDF();
        } else if (format === 'txt') {
            downloadAsText();
        }
        closeDropdowns();
    });
});

// Dropdown toggling
themeButton.addEventListener('click', function() {
    themeDropdown.classList.toggle('active');
    downloadDropdown.classList.remove('active');
});

downloadButton.addEventListener('click', function() {
    downloadDropdown.classList.toggle('active');
    themeDropdown.classList.remove('active');
});

function closeDropdowns() {
    themeDropdown.classList.remove('active');
    downloadDropdown.classList.remove('active');
}

// Download as Text function
function downloadAsText() {
    const input = parseInt(inputField.value);
    const number = parseInt(numberField.value);
    let textContent = `Multiplication Table for ${input}\n\n`;

    for (let i = 1; i <= input; i++) {
        for (let j = 1; j <= number; j++) {
            textContent += `${i} × ${j} = ${i * j}\n`;
        }
        textContent += '\n';
    }

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `multiplication_table_${input}.txt`;
    a.click();

    URL.revokeObjectURL(url);
}

// Download as PDF function
function downloadAsPDF() {
    const input = parseInt(inputField.value);
    const number = parseInt(numberField.value);
    let textContent = `Multiplication Table for ${input}\n\n`;

    for (let i = 1; i <= input; i++) {
        for (let j = 1; j <= number; j++) {
            textContent += `${i} × ${j} = ${i * j}\n`;
        }
        textContent += '\n';
    }

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `multiplication_table_${input}.pdf`;
    a.click();

    URL.revokeObjectURL(url);
}