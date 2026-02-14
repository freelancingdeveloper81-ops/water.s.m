let currentEditId = null;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("joinDate").valueAsDate = new Date();
    loadEmployees();

    document.getElementById("employeeForm").addEventListener("submit", saveEmployee);
});

/* SAVE / UPDATE */
function saveEmployee(e) {
    e.preventDefault();

    let list = JSON.parse(localStorage.getItem("employeeDB")) || [];

    const data = {
        id: currentEditId || Date.now(),
        acc: currentEditId ? getAcc(currentEditId) : "AC-" + Math.floor(100 + Math.random() * 900),
        date: joinDate.value,
        first: fName.value,
        last: lName.value,
        nic: empNic.value,
        contact: empContact.value,
        designation: empDesignation.value,
        status: empStatus.value
    };

    if (currentEditId) {
        const index = list.findIndex(e => e.id === currentEditId);
        list[index] = data;
        alert("Updated Successfully");
    } else {
        list.push(data);
        alert("Saved Successfully");
    }

    localStorage.setItem("employeeDB", JSON.stringify(list));
    resetForm();
    loadEmployees();
}

/* LOAD TABLE */
function loadEmployees() {
    const list = JSON.parse(localStorage.getItem("employeeDB")) || [];
    const tbody = document.getElementById("employeeData");
    tbody.innerHTML = "";

    list.forEach((emp, i) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${i + 1}</td>
            <td>${emp.acc}</td>
            <td>${emp.first} ${emp.last}</td>
            <td>${emp.designation}</td>
        `;

        row.onclick = () => editEmployee(emp.id);
        tbody.appendChild(row);
    });
}

/* EDIT */
function editEmployee(id) {
    const list = JSON.parse(localStorage.getItem("employeeDB")) || [];
    const emp = list.find(e => e.id === id);

    if (!emp) return;

    currentEditId = id;

    joinDate.value = emp.date;
    fName.value = emp.first;
    lName.value = emp.last;
    empNic.value = emp.nic;
    empContact.value = emp.contact;
    empDesignation.value = emp.designation;
    empStatus.value = emp.status;
}
