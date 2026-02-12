document.addEventListener('DOMContentLoaded', () => {
    // Initial Load from Storage
    initializeData();

    // 1. Theme Logic
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        themeBtn.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        localStorage.setItem('aquaTheme', newTheme);
    });

    // 2. Form Submission (Internal Link to Balance)
    const pForm = document.getElementById('purchaseForm');
    pForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const selectedVendorName = document.getElementById('vSelect').value;
        const amount = parseFloat(document.getElementById('pAmount').value);

        let vendors = JSON.parse(localStorage.getItem('myVendors'));

        // Update balance logic: Purchase increases what we owe (Debt/Payable)
        const vIndex = vendors.findIndex(v => v.name === selectedVendorName);
        if (vIndex !== -1) {
            vendors[vIndex].balance -= amount; // Adding to debt
            localStorage.setItem('myVendors', JSON.stringify(vendors));
            
            alert(`✅ PURCHASE LOGGED\nVendor: ${selectedVendorName}\nAmount: $${amount}\nLedger Updated.`);
            pForm.reset();
            openTab('list');
            renderVendors();
        }
    });

    // Set Default Date
    document.getElementById('pDate').valueAsDate = new Date();
});

// 3. Initialize Data (Default Vendors)
function initializeData() {
    if (!localStorage.getItem('myVendors')) {
        const defaultVendors = [
            { name: "Indus Raw Water Ltd", type: "Raw Water 🌊", contact: "021-3344556", balance: -2400 },
            { name: "Poly-Pack Plastics", type: "Bottles/Caps 🍼", contact: "0300-1122334", balance: 500 },
            { name: "Clear Blue Tankers", type: "Raw Water 🌊", contact: "0333-9988776", balance: -4500 }
        ];
        localStorage.setItem('myVendors', JSON.stringify(defaultVendors));
    }
    renderVendors();
}

// 4. Render Table and Stats
function renderVendors() {
    const vendors = JSON.parse(localStorage.getItem('myVendors')) || [];
    const tbody = document.getElementById('vendorTableBody');
    const vSelect = document.getElementById('vSelect');
    
    // Stats elements
    const statActive = document.getElementById('activeVendorsCount');
    const statPayable = document.getElementById('totalPayableAmount');

    tbody.innerHTML = "";
    vSelect.innerHTML = '<option value="">-- Choose Vendor --</option>';
    
    let totalDebt = 0;

    vendors.forEach(v => {
        // Stats Logic
        if(v.balance < 0) totalDebt += Math.abs(v.balance);

        // Table Row Logic
        const balStyle = v.balance < 0 ? 'color: #ef4444; font-weight: bold' : (v.balance > 0 ? 'color: #22c55e; font-weight: bold' : '');
        const balText = v.balance < 0 ? `Payable: $${Math.abs(v.balance)}` : (v.balance > 0 ? `Credit: $${v.balance}` : 'Clear');

        tbody.innerHTML += `
            <tr>
                <td><strong>${v.name}</strong></td>
                <td><span class="badge">${v.type}</span></td>
                <td>${v.contact}</td>
                <td style="${balStyle}">${balText}</td>
                <td>
                    <button class="btn-sm" onclick="alert('Displaying secure ledger for ${v.name}')"><i class="fas fa-file-invoice"></i> Ledger</button>
                </td>
            </tr>
        `;

        // Populate Form Dropdown
        vSelect.innerHTML += `<option value="${v.name}">${v.name}</option>`;
    });

    // Update Header Cards
    statActive.innerText = vendors.length;
    statPayable.innerText = `$${totalDebt.toLocaleString()}`;
    document.getElementById('totalOrdersCount').innerText = Math.floor(Math.random() * 100) + 20; // Simulated order count
}

// Tab Switcher
window.openTab = (tabId) => {
    document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
    document.querySelectorAll('.tab-link').forEach(tl => tl.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    if(event) event.currentTarget.classList.add('active');
};

function resetVendors() {
    if(confirm("Restore default vendor list?")) {
        localStorage.removeItem('myVendors');
        location.reload();
    }
}