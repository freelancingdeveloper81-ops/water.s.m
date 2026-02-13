// Global variable to track which employee is being edited
let currentEditId = null;

document.addEventListener('DOMContentLoaded', () => {
    loadEmployees();

    // 1. Theme Logic
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const html = document.documentElement;
        const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
    });

    // 2. Default Date
    document.getElementById('joinDate').valueAsDate = new Date();

    // 3. Form Submission (Save or Update)
    const empForm = document.getElementById('employeeForm');
    empForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let list = JSON.parse(localStorage.getItem('employeeDB')) || [];

        const employeeData = {
            id: currentEditId ? currentEditId : Date.now(), // Purana ID rakho agar edit ho raha hai
            acc: currentEditId ? getAccById(currentEditId) : 'AC-' + Math.floor(100 + Math.random() * 900),
            date: document.getElementById('joinDate').value,
            first: document.getElementById('fName').value,
            last: document.getElementById('lName').value,
            nic: document.getElementById('empNic').value,
            contact: document.getElementById('empContact').value,
            designation: document.getElementById('empDesignation').value,
            status: document.getElementById('empStatus').value,
            address: document.getElementById('empAddress').value,
            uname: document.getElementById('uName').value
        };

        if (currentEditId) {
            // Update Existing Record
            const index = list.findIndex(emp => emp.id === currentEditId);
            list[index] = employeeData;
            alert("✨ Record Updated Successfully!");
        } else {
            // Add New Record
            list.push(employeeData);
            alert("✅ New Employee Saved!");
        }

        localStorage.setItem('employeeDB', JSON.stringify(list));
        resetForm();
        loadEmployees();
    });

    // 4. Show Password Logic
    document.getElementById('showPass').addEventListener('change', function() {
        document.getElementById('uPass').type = this.checked ? 'text' : 'password';
    });
});

// 5. Function to load data into form for Editing
function editEmployee(id) {
    const list = JSON.parse(localStorage.getItem('employeeDB')) || [];
    const emp = list.find(e => e.id === id);

    if (emp) {
        currentEditId = id; // Set the edit mode
        
        // Fill form fields
        document.getElementById('joinDate').value = emp.date;
        document.getElementById('fName').value = emp.first;
        document.getElementById('lName').value = emp.last;
        document.getElementById('empNic').value = emp.nic;
        document.getElementById('empContact').value = emp.contact;
        document.getElementById('empDesignation').value = emp.designation;
        document.getElementById('empStatus').value = emp.status;
        document.getElementById('empAddress').value = emp.address;
        document.getElementById('uName').value = emp.uname;

        // Visual feedback
        document.querySelector('.btn-save').innerText = "Update ✅";
        document.querySelector('.btn-save').style.background = "#27ae60"; // Green for update
    }
}

// 6. Reset Form
function resetForm() {
    currentEditId = null;
    document.getElementById('employeeForm').reset();
    document.getElementById('joinDate').valueAsDate = new Date();
    document.querySelector('.btn-save').innerText = "Save ✅";
    document.querySelector('.btn-save').style.background = ""; // Back to default blue
}

// 7. Helper to keep the same Account Number during edit
function getAccById(id) {
    const list = JSON.parse(localStorage.getItem('employeeDB')) || [];
    const emp = list.find(e => e.id === id);
    return emp ? emp.acc : 'AC-000';
}

// 8. Load Table
function loadEmployees() {
    const list = JSON.parse(localStorage.getItem('employeeDB')) || [];
    const tbody = document.getElementById('employeeData');
    tbody.innerHTML = "";

    list.forEach((emp, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td><b style="color:var(--primary)">${emp.acc}</b></td>
            <td>${emp.first}</td>
            <td>${emp.designation}</td>
        `;
        
        // Row par click karne se Edit mode on ho jaye
        row.onclick = () => {
            document.querySelectorAll('tr').forEach(r => r.classList.remove('selected-row'));
            row.classList.add('selected-row');
            editEmployee(emp.id);
        };

        tbody.appendChild(row);
    });
}