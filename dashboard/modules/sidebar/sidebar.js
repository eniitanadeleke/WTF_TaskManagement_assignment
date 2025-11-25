const navigationItems = [
    {
        icon: '📊',
        text: 'Dashboard',
        page: 'dashboard',
        active: true
    },
    {
        icon: '✅',
        text: 'Tasks',
        page: 'tasks',
        active: false
    },
    {
        icon: '',
        text: 'Community',
        page: 'community',
        active: false
    },
    {
        icon: '💰',
        text: 'Expenses',
        page: 'expenses',
        active: false
    },
    {
        icon: '📝',
        text: 'Notes',
        page: 'notes',
        active: false
    },
    {
        icon: '⚙️',
        text: 'Settings',
        page: 'settings',
        active: false
    }
];

function generateNavigation() {
    const navContainer = document.getElementById('sidebar-nav');
    
    if (!navContainer) {
        console.error('Navigation container not found!');
        return;
    }
    
    
    navContainer.innerHTML = '';
    

    navigationItems.forEach(item => {
        // Create nav item link
        const navLink = document.createElement('a');
        navLink.href = '#';
        navLink.className = 'nav-item';
        navLink.setAttribute('data-page', item.page);
        
        // Add active class if this is the active page
        if (item.active) {
            navLink.classList.add('active');
        }
        
        // Create icon container and insert SVG
        const iconContainer = document.createElement('span');
        iconContainer.className = 'nav-icon';
        iconContainer.innerHTML = item.iconHTML;
        
        // Create text span
        const textSpan = document.createElement('span');
        textSpan.className = 'nav-text';
        textSpan.textContent = item.text;
        
        // Append icon and text to nav link
        navLink.appendChild(iconContainer);
        navLink.appendChild(textSpan);
        
        // Add click event listener
        navLink.addEventListener('click', function(e) {
            e.preventDefault();
            handleNavigation(item.page);
        });
        
        // Append nav link to container
        navContainer.appendChild(navLink);
    });
    
    console.log('Navigation generated with', navigationItems.length, 'items');
}

// Function to handle navigation clicks
function handleNavigation(page) {
    console.log('Navigating to:', page);
    
    // Remove active class from all items
    navigationItems.forEach(item => item.active = false);
    
    // Set clicked item as active
    const clickedItem = navigationItems.find(item => item.page === page);
    if (clickedItem) {
        clickedItem.active = true;
    }
    
    // Re-generate navigation to update active state
    generateNavigation();
    
    // TODO: Load different page content based on selection
    // You can emit an event or call a function to change main content
}

// Wait for component-loader to finish loading sidebar.html
setTimeout(function() {
    generateNavigation();
    console.log('Sidebar navigation initialized!');
}, 500); // Wait 500ms for component loader to finish

// const userName = localStorage.getItem('userName') || 'User';
// const userEmail = localStorage.getItem('userEmail') || 'email@example.com';

// Get first letter for avatar
// const firstLetter = userName.charAt(0).toUpperCase();

// Update HTML
// document.getElementById('user-avatar-text').textContent = firstLetter;
// document.getElementById('user-name').textContent = userName;
// document.getElementById('user-email').textContent = userEmail;