let products = []; 
let filteredProducts = []; 

async function fetchData() {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        products = data.products.slice(0, 30);
        filteredProducts = products; 
        displayData(filteredProducts);
    } catch (error) {
        console.error('Błąd przy pobieraniu danych:', error);
    }
}

function displayData(productsToDisplay) {
    const tableBody = document.querySelector('#products-table tbody');
    tableBody.innerHTML = '';

    productsToDisplay.forEach(product => {
        const imageUrl = product.images && product.images[0] ? product.images[0] : 'https://dummyjson.com/placeholder.png';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imageUrl}" alt="${product.title}" width="50"></td>
            <td>${product.title}</td>
            <td>${product.description}</td>
        `;
        tableBody.appendChild(row);
    });
}

function filterData() {
    const filterValue = document.querySelector('#filter-input').value.toLowerCase();
    filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(filterValue)
    );
    displayData(filteredProducts);
}

function sortData() {
    const sortValue = document.querySelector('#sort-select').value;
    let sortedProducts = [...filteredProducts];

    if (sortValue === 'asc') {
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === 'desc') {
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    if (sortValue === 'original') {
        sortedProducts = filteredProducts;
    }

    displayData(sortedProducts);
}

window.onload = fetchData;