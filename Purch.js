document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    themeBtn.addEventListener('click', () => {
        const isDark = html.getAttribute('data-theme') === 'dark';
        html.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeBtn.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
        localStorage.setItem('aquaTheme', isDark ? 'light' : 'dark');
    });

    // 2. Mock Data for Purchase History
    const purchases = [
        { id: "PUR-9821", date: "2023-10-24", vendor: "Indus Raw Water Co.", cat: "Bulk Raw Water", amount: "$4,500.00", status: "Paid" },
        { id: "PUR-9820", date: "2023-10-23", vendor: "PET-Pack Bottles", cat: "19L Jars Stock", amount: "$1,200.00", status: "Pending" },
        { id: "PUR-9819", date: "2023-10-22", vendor: "Global Filtration Ltd", cat: "Spare Filters", amount: "$850.00", status: "Paid" },
        { id: "PUR-9818", date: "2023-10-20", vendor: "Indus Raw Water Co.", cat: "Bulk Raw Water", amount: "$4,500.00", status: "Paid" },
        { id: "PUR-9817", date: "2023-10-18", vendor: "Crystal Seals", cat: "Bottle Caps", amount: "$320.00", status: "Pending" }
    ];

    const tableBody = document.getElementById('purchaseTableBody');

    // 3. Render Table Function
    const renderTable = (data) => {
        tableBody.innerHTML = "";
        data.forEach(item => {
            const row = `
                <tr>
                    <td style="font-weight:700; color:var(--primary)">${item.id}</td>
                    <td>${item.date}</td>
                    <td><strong>${item.vendor}</strong></td>
                    <td><i class="fas fa-tag" style="font-size:0.8rem; color:#94a3b8;"></i> ${item.cat}</td>
                    <td style="font-weight:700;">${item.amount}</td>
                    <td><span class="badge-${item.status.toLowerCase()}">${item.status}</span></td>
                    <td>
                        <button class="btn-action" title="View Details"><i class="fas fa-eye"></i></button>
                        <button class="btn-action" title="Edit Entry" style="margin-left:10px;"><i class="fas fa-pen-to-square"></i></button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    };

    // Initial Render
    renderTable(purchases);

    // 4. Simple Interaction for "Generate"
    document.querySelector('.btn-refresh').addEventListener('click', () => {
        alert("System is filtering procurement records for the selected parameters...");
    });

    // Update Status Bar Time
    setInterval(() => {
        const time = new Date().toLocaleTimeString();
        document.getElementById('syncTime').innerText = time;
    }, 1000);
});