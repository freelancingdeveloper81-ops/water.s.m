document.addEventListener('DOMContentLoaded', () => {
    loadCustomers();

    // 1. Theme Logic
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeBtn.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });

    // Default Date
    document.getElementById('payDate').valueAsDate = new Date();
});

// 2. Load Customers from Internal Storage (Linking to cust.html data)
function loadCustomers() {
    const customers = JSON.parse(localStorage.getItem('myCustomers')) || [];
    const tbody = document.getElementById('customerTableBody');
    tbody.innerHTML = "";

    customers.forEach((c, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${c.id.toString().slice(-4)}</td>
            <td>${c.name}</td>
            <td>${c.area}</td>
            <td>${c.phone}</td>
            <td>Active</td>
        `;

        // Row Selection Logic (Populate form on click)
        row.onclick = () => {
            document.querySelectorAll('tr').forEach(r => r.classList.remove('selected-row'));
            row.classList.add('selected-row');
            
            document.getElementById('accNum').value = c.id.toString().slice(-4);
            document.getElementById('custName').value = c.name;
            document.getElementById('balBottle').value = c.bottles || 0;
            document.getElementById('balAmount').value = c.balance || 0;
            
            // Activate Payment Button
            document.getElementById('payBtn').style.background = "#22c55e"; // Green
            document.getElementById('payBtn').style.color = "white";
        };
        tbody.appendChild(row);
    });
}

// 3. Search Filter Logic
function filterTable() {
    const val = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#customerTableBody tr');
    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(val) ? "" : "none";
    });
}

function resetForm() {
    document.getElementById('paymentForm').reset();
    document.getElementById('payBtn').style.background = "#88a1b1"; // Reset to disabled grey
}