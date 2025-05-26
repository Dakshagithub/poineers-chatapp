// Sample registered users (would come from database in real app)
const registeredUsers = [
    {
        id: 1,
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        online: true
    },
    {
        id: 2,
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        online: false
    },
    {
        id: 3,
        name: "Mike Johnson",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        online: true
    },
    {
        id: 4,
        name: "Sarah Williams",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        online: false
    },
    {
        id: 5,
        name: "David Brown",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        online: true
    }
];

// DOM Elements
const newContactOption = document.getElementById('new-contact');
const newGroupOption = document.getElementById('new-group');
const contactSelection = document.getElementById('contact-selection');
const contactsList = document.getElementById('contacts-list');
const contactSearch = document.getElementById('contact-search');
const cancelSearch = document.getElementById('cancel-search');

// Initialize the page
function init() {
    // New Contact Option
    newContactOption.addEventListener('click', function() {
        // Hide options and show contact selection
        document.querySelector('.new-chat-options').classList.add('hidden');
        contactSelection.classList.remove('hidden');
        
        // Populate contacts list
        renderContacts(registeredUsers);
    });
    
    // New Group Option
    newGroupOption.addEventListener('click', function() {
        alert("This would navigate to a page where you can select contacts to form a new group");
    });
    
    // Search functionality
    contactSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredContacts = registeredUsers.filter(user => 
            user.name.toLowerCase().includes(searchTerm)
        );
        renderContacts(filteredContacts);
    });
    
    // Cancel button
    cancelSearch.addEventListener('click', function() {
        contactSelection.classList.add('hidden');
        document.querySelector('.new-chat-options').classList.remove('hidden');
        contactSearch.value = '';
    });
}

// Render contacts to the list
function renderContacts(contacts) {
    contactsList.innerHTML = '';
    
    if (contacts.length === 0) {
        contactsList.innerHTML = '<div class="no-contacts">No contacts found</div>';
        return;
    }
    
    contacts.forEach(user => {
        const contactElement = document.createElement('div');
        contactElement.className = 'contact';
        contactElement.innerHTML = `
            <img src="${user.avatar}" alt="${user.name}" class="contact-avatar">
            <div class="contact-info">
                <span class="contact-name">${user.name}</span>
                <span class="contact-status ${user.online ? 'online' : 'offline'}">
                    ${user.online ? 'Online' : 'Offline'}
                </span>
            </div>
        `;
        
        contactElement.addEventListener('click', function() {
            // In a real app, this would start a chat with the selected user
            alert(`Starting chat with ${user.name}`);
            // window.location.href = `chat.html?userId=${user.id}`;
        });
        
        contactsList.appendChild(contactElement);
    });
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', init);