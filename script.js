async function fetchFruits() {
    const grid = document.getElementById('fruit-grid');
    
    try {
        const response = await fetch('https://api.api-onepiece.com/v2/fruits/en');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const fruits = await response.json();
        
        grid.innerHTML = ''; 
        
        fruits.forEach(fruit => {
            const card = document.createElement('div');
            card.className = 'card';
            
           
            const imageHtml = fruit.filename 
                ? `<img src="${fruit.filename}" alt="${fruit.name}" onerror="this.style.display='none'">` 
                : `<p><em>No image available</em></p>`;
            
            card.innerHTML = `
                <h2>${fruit.name}</h2>
                <h3>(${fruit.roman_name})</h3>
                <p><strong>Type:</strong> ${fruit.type}</p>
                ${imageHtml}
                <p>${fruit.description}</p>
            `;
            
            grid.appendChild(card);
        });
        
    } catch (error) {
        console.error('Fetch error:', error);
        grid.innerHTML = `<p>Error loading data: ${error.message}</p>`;
    }
}

fetchFruits();