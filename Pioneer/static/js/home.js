
const chatData = [
    {
        id: 1,
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        lastMessage: "Hey, how are you doing?",
        time: "10:30 AM",
        unread: 2
    },
    {
        id: 2,
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        lastMessage: "Can we meet tomorrow?",
        time: "Yesterday",
        unread: 0
    },
    {
        id: 3,
        name: "Mike Johnson",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        lastMessage: "I sent you the files",
        time: "Yesterday",
        unread: 1
    },
    {
        id: 4,
        name: "Sarah Williams",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        lastMessage: "Thanks for your help!",
        time: "Monday",
        unread: 0
    },
    {
        id: 5,
        name: "David Brown",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        lastMessage: "Let me know when you're free",
        time: "Sunday",
        unread: 0
    },

    {
        id: 6,
        name: "David Brown",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        lastMessage: "Let me know when you're free",
        time: "Sunday",
        unread: 0
    },
    {
        id: 7,
        name: "David Brown",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        lastMessage: "Let me know when you're free",
        time: "Sunday",
        unread: 0
    },
    {
        id: 8,
        name: "David Brown",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        lastMessage: "Let me know when you're free",
        time: "Sunday",
        unread: 0
    },
    {
        id: 9,
        name: "David Brown",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        lastMessage: "Let me know when you're free",
        time: "Sunday",
        unread: 0
    },
    {
        id: 10,
        name: "David Brown",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        lastMessage: "Let me know when you're free",
        time: "Sunday",
        unread: 0
    },
    {
        id: 11,
        name: "David Brown",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        lastMessage: "Let me know when you're free",
        time: "Sunday",
        unread: 0
    }
];

// DOM Elements
const chatLogs = document.querySelector('.chat-logs');
const emptyState = document.querySelector('.empty-state');
const searchBar = document.querySelector('.search-bar');
const newChatButton = document.querySelector('.new-chat-button');

// Render chat list
function renderChatList(chats) {
    chatLogs.innerHTML = '';

    if (chats.length === 0) {
        emptyState.style.display = 'flex';
        return;
    }

    emptyState.style.display = 'none';

    chats.forEach(chat => {
        const chatItem = document.createElement('li');
        chatItem.className = 'chat-item';
        chatItem.dataset.id = chat.id;

        chatItem.innerHTML = `
            <img src="${chat.avatar}" alt="${chat.name}" class="chat-avatar">
            <div class="chat-info">
                <h3 class="chat-name">${chat.name}</h3>
                <p class="chat-preview">${chat.lastMessage}</p>
            </div>
            <span class="chat-time">${chat.time}</span>
        `;

        chatLogs.appendChild(chatItem);
    });
}

// Initialize the app
function init() {
    renderChatList(chatData);

    // Toggle settings dropdown
    document.querySelector('.settings-toggle').addEventListener('click', function () {
        document.querySelector('.settings-dropdown').classList.toggle('show');
    });

    // Close dropdown when clicking outside
    window.addEventListener('click', function (e) {
        if (!e.target.matches('.settings-toggle')) {
            const dropdowns = document.querySelectorAll('.settings-dropdown');
            dropdowns.forEach(dropdown => {
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            });
        }
    });

    // Avatar click to show modal
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('chat-avatar')) {
            e.stopPropagation();
            const modal = document.querySelector('.avatar-modal');
            const modalAvatar = modal.querySelector('.modal-avatar');
            const modalName = modal.querySelector('.modal-name');

            // Set modal content
            modalAvatar.src = e.target.src;
            modalName.textContent = e.target.alt;

            // Show modal
            modal.classList.add('show');
        }
    });

    // Close modal
    document.addEventListener('click', function (e) {
        const modal = document.querySelector('.avatar-modal');
        const modalContent = document.querySelector('.avatar-modal-content');

        if (modal.classList.contains('show') && !modalContent.contains(e.target) && !e.target.classList.contains('chat-avatar')) {
            modal.classList.remove('show');
        }
    });

    // Chat item click to open chat

    document.addEventListener('click', function (e) {
        const chatItem = e.target.closest('.chat-item');
        if (chatItem) {
            const chatId = chatItem.dataset.id;
            const chatName = chatItem.querySelector('.chat-name').textContent;
            const chatAvatar = chatItem.querySelector('.chat-avatar').src;

            // Navigate to chat room with parameters
            window.location.href = `chat-room.html?id=${chatId}&name=${encodeURIComponent(chatName)}&avatar=${encodeURIComponent(chatAvatar)}`;
        }
    });

    // New chat button
    newChatButton.addEventListener('click', function () {
        console.log('Opening new chat screen');
        window.location.href = 'new-chat.html';
    });

    // Search functionality
    searchBar.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm === '') {
            renderChatList(chatData);
            return;
        }

        const filteredChats = chatData.filter(chat =>
            chat.name.toLowerCase().includes(searchTerm) ||
            chat.lastMessage.toLowerCase().includes(searchTerm)
        );

        renderChatList(filteredChats);
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);