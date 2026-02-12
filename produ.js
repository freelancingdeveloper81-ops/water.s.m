document.addEventListener('DOMContentLoaded', () => {
    displayProducts();

    // 1. Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const html = document.documentElement;
        const newTheme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
    });

    // 2. Form Submit & Store Data
    const productForm = document.getElementById('productForm');
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('pName').value;
        const price = document.getElementById('pPrice').value;
        const type = document.getElementById('pType').value;

        const newProduct = {
            id: Date.now(),
            name: name,
            price: price,
            type: type
        };

        // Get from storage
        let products = JSON.parse(localStorage.getItem('waterInventory')) || [];
        products.push(newProduct);
        
        // Save to storage
        localStorage.setItem('waterInventory', JSON.stringify(products));

        alert("✅ Product Stored Successfully!");
        productForm.reset();
        displayProducts();
    });
});

// 3. Display Data in Table
function displayProducts() {
    const products = JSON.parse(localStorage.getItem('waterInventory')) || [];
    const tbody = document.getElementById('productData');
    const itemCount = document.getElementById('itemCount');
    
    tbody.innerHTML = "";

    products.forEach((p, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${p.name}</td>
            <td>${p.price}</td>
            <td>${p.type}</td>
            <td><button onclick="deleteProduct(${p.id})" style="color:red; border:none; background:none; cursor:pointer;"><i class="fas fa-trash"></i></button></td>
        `;
        // Row selection effect like the image
        row.onclick = () => {
            document.querySelectorAll('tr').forEach(r => r.classList.remove('selected-row'));
            row.classList.add('selected-row');
        };
        tbody.appendChild(row);
    });

    if(itemCount) itemCount.innerText = products.length;
}

// 4. Delete Function
function deleteProduct(id) {
    if(confirm("Are you sure?")) {
        let products = JSON.parse(localStorage.getItem('waterInventory')) || [];
        products = products.filter(p => p.id !== id);
        localStorage.setItem('waterInventory', JSON.stringify(products));
        displayProducts();
    }
}

// 5. Reset Form
function resetForm() {
    document.getElementById('productForm').reset();
}