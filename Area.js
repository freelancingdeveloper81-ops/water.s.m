document.addEventListener('DOMContentLoaded', () => {
    loadEmployeesToDropdown();
    loadAreas();

    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const html = document.documentElement;
        const isDark = html.getAttribute('data-theme') === 'dark';
        html.setAttribute('data-theme', isDark ? 'dark' : 'light');
        themeBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
});

// 1. Internal Link: Pull employees from EmployeeDB
function loadEmployeesToDropdown() {
    const list = JSON.parse(localStorage.getItem('employeeDB')) || [];
    const select = document.getElementById('empSelect');
    list.forEach(emp => {
        const opt = document.createElement('option');
        opt.value = emp.id;
        opt.innerHTML = `${emp.first} ${emp.last} (${emp.designation})`;
        select.appendChild(opt);
    });
}

// 2. Modal Controls
function toggleAreaModal(show) {
    const modal = document.getElementById('areaModal');
    modal.style.display = show ? 'flex' : 'none';
    if(show) document.getElementById('newAreaInput').focus();
}

// 3. Save New Area logic
function saveNewArea() {
    const areaName = document.getElementById('newAreaInput').value;
    if(!areaName) return alert("Enter Area Name!");

    let areas = JSON.parse(localStorage.getItem('areaList')) || [];
    areas.push({ name: areaName, customerCount: 0 });
    localStorage.setItem('areaList', JSON.stringify(areas));

    alert("✅ Area Added Successfully!");
    document.getElementById('newAreaInput').value = "";
    toggleAreaModal(false);
    loadAreas();
}

// 4. Load Areas into Table and Dropdown
function loadAreas() {
    const areas = JSON.parse(localStorage.getItem('areaList')) || [];
    const tbody = document.getElementById('areaTableBody');
    const select = document.getElementById('areaSelect');
    
    tbody.innerHTML = "";
    // Keep the default option
    select.innerHTML = '<option value="">SELECT AREA 🗺️</option>';

    areas.forEach((area, index) => {
        // Populate Table
        const row = `<tr>
            <td>${index + 1}</td>
            <td><strong>${area.name}</strong></td>
            <td>${area.customerCount}</td>
        </tr>`;
        tbody.innerHTML += row;

        // Populate Dropdown
        const opt = document.createElement('option');
        opt.value = area.name;
        opt.innerHTML = area.name;
        select.appendChild(opt);
    });
}

function assignArea() {
    const emp = document.getElementById('empSelect').value;
    const area = document.getElementById('areaSelect').value;
    if(!emp || !area) return alert("Select both Employee and Area!");
    
    alert(`🎯 SUCCESS: Area ${area} assigned to Selected Employee.`);
}