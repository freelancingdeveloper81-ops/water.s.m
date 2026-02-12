document.addEventListener('DOMContentLoaded', () => {
    // 1. Set Default Date
    document.getElementById('orderDate').valueAsDate = new Date();

    // 2. Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const html = document.documentElement;
        const isDark = html.getAttribute('data-theme') === 'dark';
        html.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeBtn.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });
});

// 3. Modal Controls (The Popup Logic)
function openPaymentModal() {
    document.getElementById('paymentModal').style.display = 'flex';
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

// 4. Confirm Payment Logic
function confirmPayment() {
    const amount = document.getElementById('modalPayInput').value;
    document.getElementById('paidDisplay').innerText = amount;
    alert(`💰 Payment of $${amount} recorded successfully.`);
    closePaymentModal();
}

// 5. Logic: Search Customer
function searchCustomer() {
    const id = document.getElementById('custSearchId').value;
    const customers = JSON.parse(localStorage.getItem('myCustomers')) || [];
    const cust = customers.find(c => c.id.toString().includes(id));

    if(cust) {
        document.getElementById('resId').value = cust.id.toString().slice(-5);
        document.getElementById('resName').value = cust.name;
        document.getElementById('resAddr').value = cust.area;
    } else {
        alert("❌ No customer found with that ID.");
    }
}

// 6. Logic: Billing Calculations
function updatePrice() {
    const select = document.getElementById('selectProduct');
    document.getElementById('unitPrice').value = select.value || 0;
    calculateLine();
}

function calculateLine() {
    const price = parseFloat(document.getElementById('unitPrice').value) || 0;
    const qty = parseInt(document.getElementById('sQty').value) || 0;
    document.getElementById('lineTotal').value = (price * qty).toFixed(2);
}

// 7. Add Item to Table
function addItemToList() {
    const select = document.getElementById('selectProduct');
    const name = select.options[select.selectedIndex].text;
    const price = document.getElementById('unitPrice').value;
    const qty = document.getElementById('sQty').value;
    const total = document.getElementById('lineTotal').value;

    if(!name || qty <= 0) return alert("Please select product and quantity!");

    const tbody = document.getElementById('billItemsBody');
    tbody.innerHTML += `<tr><td>${name}</td><td>${price}</td><td>${qty}</td><td>0</td><td>${total}</td></tr>`;

    // Update Grand Total
    const gTotal = document.getElementById('grandTotal');
    gTotal.innerText = (parseFloat(gTotal.innerText) + parseFloat(total)).toFixed(2);
}