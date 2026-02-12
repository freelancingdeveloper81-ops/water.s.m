document.addEventListener('DOMContentLoaded', () => {
    // Page load hote hi data display karein
    displayProducts();

    // 1. Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const html = document.documentElement;
        const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        themeBtn.innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });

    // 2. Form Submission & Storage Logic
    const productForm = document.getElementById('productForm');
    productForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Data capture karein
        const product = {
            id: Date.now(), // Unique ID for each product
            name: document.getElementById('pName').value,
            sku: document.getElementById('pSKU').value,
            cat: document.getElementById('pCat').value,
            qty: document.getElementById('pQty').value,
            unit: document.getElementById('pUnit').value,
            buy: document.getElementById('pBuy').value,
            sell: document.getElementById('pSell').value
        };

        // LocalStorage se purana data nikalein (ya khali array banayein)
        let products = JSON.parse(localStorage.getItem('myInventory')) || [];
        
        // Naya product array mein dalein
        products.push(product);

        // Wapas save karein
        localStorage.setItem('myInventory', JSON.stringify(products));

        // UI Update karein
        alert("✅ Product Saved Successfully!");
        productForm.reset();
        displayProducts();
    });
});

// 3. Data Display Function
function displayProducts() {
    const products = JSON.parse(localStorage.getItem('myInventory')) || [];
    const tableBody = document.getElementById('productData');
    const itemCount = document.getElementById('itemCount');
    
    tableBody.innerHTML = ""; // Purana table clear karein
    itemCount.innerText = products.length;

    products.forEach((p, index) => {
        const row = `
            <tr>
                <td><strong>${p.name}</strong><br><small>${p.cat}</small></td>
                <td>${p.sku}</td>
                <td><span class="badge">${p.qty} Units</span></td>
                <td>$${p.buy}</td>
                <td>$${p.sell}</td>
                <td>
                    <button onclick="deleteProduct(${p.id})" class="btn-danger-sm"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// 4. Delete Single Product
function deleteProduct(id) {
    if(confirm("Are you sure you want to delete this product?")) {
        let products = JSON.parse(localStorage.getItem('myInventory')) || [];
        products = products.filter(p => p.id !== id);
        localStorage.setItem('myInventory', JSON.stringify(products));
        displayProducts();
    }
}

// 5. Clear All Data
function clearAllData() {
    if(confirm("WARNING: This will delete ALL stored products. Continue?")) {
        localStorage.removeItem('myInventory');
        displayProducts();
    }
}