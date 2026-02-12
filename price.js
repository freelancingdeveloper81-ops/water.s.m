document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    // 1. Theme Logic
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const html = document.documentElement;
        const isDark = html.getAttribute('data-theme') === 'dark';
        html.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeBtn.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });

    // 2. Set New Price Submission
    const setForm = document.getElementById('setPriceForm');
    setForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pName = document.getElementById('newSelectProduct').value;
        const price = document.getElementById('newPriceInput').value;

        alert(`✅ SUCCESS: Fixed price for "${pName}" set to $${price} for this client.`);
        addPriceToTable(pName, price);
        setForm.reset();
    });
});

// 3. INTERNAL LINK: Load Products from Produ.html Storage
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('waterInventory')) || [];
    const select = document.getElementById('newSelectProduct');
    
    products.forEach(p => {
        let opt = document.createElement('option');
        opt.value = p.name;
        opt.innerHTML = `${p.name} (${p.type}) 📦`;
        select.appendChild(opt);
    });
}

// 4. INTERNAL LINK: Search Customer from CRM Storage
function searchCustomer() {
    const searchId = document.getElementById('custSearchId').value;
    const allCustomers = JSON.parse(localStorage.getItem('myCustomers')) || [];
    
    // Find customer by partial ID matching
    const cust = allCustomers.find(c => c.id.toString().includes(searchId));

    if(cust) {
        document.getElementById('resCustId').value = cust.id.toString().slice(-6);
        document.getElementById('resCustName').value = cust.name;
        document.getElementById('resCustAddr').value = cust.area;
        // Logic would follow to load specific prices for THIS customer
    } else {
        alert("❌ Error: Customer record not found in system.");
    }
}

// 5. Add to UI Table
let sno = 1;
function addPriceToTable(name, price) {
    const tbody = document.getElementById('priceTableBody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${sno++}</td>
        <td><strong>${name}</strong></td>
        <td><b>$ ${price}</b></td>
    `;
    
    row.onclick = () => {
        document.querySelectorAll('tr').forEach(r => r.classList.remove('selected-row'));
        row.classList.add('selected-row');
        // Fill update form
        document.getElementById('updateProductName').value = name;
        document.getElementById('updatePriceInput').value = price;
    };

    tbody.appendChild(row);
}