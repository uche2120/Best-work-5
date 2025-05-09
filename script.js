
    document.addEventListener('DOMContentLoaded', function() {
    const itemInput = document.getElementById('item-input');
    const categorySelect = document.getElementById('category-select');
    const addItemBtn = document.getElementById('add-item-btn');
    const itemsContainer = document.getElementById('items-container');
    const emptyState = document.getElementById('empty-state');
    
    // Stats elements
    const totalCount = document.getElementById('total-count');
    const eatCount = document.getElementById('eat-count');
    const visitCount = document.getElementById('visit-count');
    const doCount = document.getElementById('do-count');
    
    // Category colors
    const categoryColors = {
        'eat': '#00b894',
        'visit': '#0984e3',
        'do': '#6c5ce7',
        'buy': '#e84393',
        'other': '#fdcb6e'
    };
    
    // Category icons
    const categoryIcons = {
        'eat': '🍽️',
        'visit': '✈️',
        'do': '✅',
        'buy': '🛍️',
        'other': '✨'
    };
    
    // Category labels
    const categoryLabels = {
        'eat': 'Food/Drink',
        'visit': 'Place to Visit',
        'do': 'Thing to Do',
        'buy': 'Thing to Buy',
        'other': 'Other'
    };
    
    // Load items from localStorage if available
    let items = JSON.parse(localStorage.getItem('wishlistItems')) || [];
    
    // Function to update the display of items
    function updateItemsDisplay() {
        itemsContainer.innerHTML = '';
        
        if (items.length === 0) {
            itemsContainer.appendChild(emptyState);
        } else {
            items.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'item-card fade-in';
                itemElement.style.setProperty('--category-color', categoryColors[item.category]);
                
                itemElement.innerHTML = `
                    <div class="item-content">
                        <span class="item-text">${item.text}</span>
                        <span class="item-category">${categoryIcons[item.category]} ${categoryLabels[item.category]}</span>
                    </div>
                    <div class="item-remove" data-index="${index}">&times;</div>
                `;
                itemsContainer.appendChild(itemElement);
            });
        }
        
        // Update statistics
        updateStatistics();
        
        // Save to localStorage
        localStorage.setItem('wishlistItems', JSON.stringify(items));
    }
    
    // Function to update statistics
    function updateStatistics() {
        totalCount.textContent = items.length;
        
        const eatItems = items.filter(item => item.category === 'eat').length;
        const visitItems = items.filter(item => item.category === 'visit').length;
        const doItems = items.filter(item => item.category === 'do').length;
        
        eatCount.textContent = eatItems;
        visitCount.textContent = visitItems;
        doCount.textContent = doItems;
    }
    
    // Initial display
    updateItemsDisplay();
    
    // Add item function
    function addItem() {
        const itemText = itemInput.value.trim();
        const itemCategory = categorySelect.value;
        
        if (itemText) {
            items.push({
                text: itemText,
                category: itemCategory,
                createdAt: new Date().toISOString()
            });
            
            updateItemsDisplay();
            itemInput.value = '';
            itemInput.focus();
            
            // Show a quick animation on the added category stat
            const statElement = document.getElementById(`${itemCategory}-count`);
            if (statElement) {
                statElement.classList.add('pulse');
                setTimeout(() => {
                    statElement.classList.remove('pulse');
                }, 1500);
            }
        }
    }
    
    // Add item on button click
    addItemBtn.addEventListener('click', addItem);
    
    // Add item on Enter key
    itemInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addItem();
        }
    });
    
    // Remove item when clicking the remove button
    itemsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('item-remove')) {
            const index = e.target.getAttribute('data-index');
            items.splice(index, 1);
            updateItemsDisplay();
        }
    });
    
    // Focus the input field on page load
    itemInput.focus();
});