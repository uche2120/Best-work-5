
            document.addEventListener('DOMContentLoaded', function() {
            const itemInput = document.getElementById('item-input');
            const categorySelect = document.getElementById('category-select');
            const addItemBtn = document.getElementById('add-item-btn');
            const itemsContainer = document.getElementById('items-container');
            const emptyState = document.getElementById('empty-state');
            
            // Stats elements
            const totalCount = document.getElementById('total-count');
            const completedCount = document.getElementById('completed-count');
            const eatCount = document.getElementById('eat-count');
            const visitCount = document.getElementById('visit-count');
            
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
                    // Sort items so completed appear at bottom
                    const sortedItems = [...items].sort((a, b) => {
                        if (a.completed && !b.completed) return 1;
                        if (!a.completed && b.completed) return -1;
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    });
                    
                    sortedItems.forEach((item, index) => {
                        const itemElement = document.createElement('div');
                        itemElement.className = `item-card ${item.completed ? 'completed' : ''}`;
                        itemElement.style.setProperty('--category-color', categoryColors[item.category]);
                        
                        itemElement.innerHTML = `
                            <div class="item-content">
                                <input type="checkbox" class="item-checkbox" ${item.completed ? 'checked' : ''} data-index="${index}">
                                <span class="item-text">${item.text}</span>
                                <span class="item-category">${categoryIcons[item.category]} ${categoryLabels[item.category]}</span>
                            </div>
                            <div class="item-actions">
                                <div class="item-remove" data-index="${index}">&times;</div>
                            </div>
                        `;
                        itemsContainer.appendChild(itemElement);
                        
                        // Only animate if it's a new item (created within last 2 seconds)
                        if (new Date() - new Date(item.createdAt) < 2000) {
                            itemElement.classList.add('slide-in');
                        }
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
                
                const completedItems = items.filter(item => item.completed).length;
                const eatItems = items.filter(item => item.category === 'eat').length;
                const visitItems = items.filter(item => item.category === 'visit').length;
                
                completedCount.textContent = completedItems;
                eatCount.textContent = eatItems;
                visitCount.textContent = visitItems;
            }
            
            // Initial display
            updateItemsDisplay();
            
            // Add item function
            function addItem() {
                const itemText = itemInput.value.trim();
                const itemCategory = categorySelect.value;
                
                if (itemText) {
                    const newItem = {
                        text: itemText,
                        category: itemCategory,
                        completed: false,
                        createdAt: new Date().toISOString()
                    };
                    
                    // Add to beginning of array so it appears at top
                    items.unshift(newItem);
                    
                    updateItemsDisplay();
                    itemInput.value = '';
                    itemInput.focus();
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
            
            // Handle checkbox changes
            itemsContainer.addEventListener('change', function(e) {
                if (e.target.classList.contains('item-checkbox')) {
                    const index = e.target.getAttribute('data-index');
                    items[index].completed = e.target.checked;
                    items[index].completedAt = e.target.checked ? new Date().toISOString() : null;
                    updateItemsDisplay();
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



/**
 * function addItem() {
 * }
 */

// function greet() {33
//     return "Hello, World!";
// }

const greet = () => "Hello, World!";