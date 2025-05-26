// DOM Elements
const settingsToggle = document.querySelector('.settings-toggle');
const settingsDropdown = document.querySelector('.settings-dropdown');
const attachmentButton = document.querySelector('.attachment-button');
const attachmentOptions = document.querySelector('.attachment-options');
const messageInput = document.querySelector('.message-input');
const sendButton = document.querySelector('.send-button');
const chatMessages = document.querySelector('.chat-messages');
const chatAvatar = document.getElementById('chat-avatar');
const chatName = document.getElementById('chat-name');
const chatStatus = document.getElementById('chat-status');

// Sample chat data (in a real app, this would come from your database)
const chatData = {
    "1": {
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        status: "online",
        messages: [
            {
                type: "received",
                content: "Hey there! How are you doing?",
                time: "10:30 AM"
            },
            {
                type: "sent",
                content: "I'm doing great! Just working on this new chat app.",
                time: "10:32 AM"
            }
        ]
    },
    "2": {
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        status: "last seen today at 12:45 PM",
        messages: [
            {
                type: "received",
                content: "Can we meet tomorrow?",
                time: "11:20 AM"
            }
        ]
    },
    "3": {
        name: "Mike Johnson",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        status: "online",
        messages: [
            {
                type: "received",
                content: "I sent you the files",
                time: "9:15 AM"
            },
            {
                type: "sent",
                content: "Thanks, I got them!",
                time: "9:30 AM"
            }
        ]
    }
};

// Initialize the chat room
function init() {
    // Get chat ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const chatId = urlParams.get('id');
    
    // Load chat data
    if (chatId && chatData[chatId]) {
        loadChat(chatData[chatId]);
    } else {
        // Default to first chat if no ID or invalid ID
        loadChat(chatData["1"]);
    }
    
    // Settings dropdown toggle
    settingsToggle.addEventListener('click', function() {
        settingsDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.matches('.settings-toggle') && !e.target.closest('.settings-dropdown')) {
            settingsDropdown.classList.remove('show');
        }
        
        if (!e.target.matches('.attachment-button') && !e.target.closest('.attachment-options')) {
            attachmentOptions.classList.remove('show');
        }
    });
    
    // Attachment menu toggle
    attachmentButton.addEventListener('click', function() {
        attachmentOptions.classList.toggle('show');
    });
    
    // Attachment options
    document.getElementById('attach-document').addEventListener('click', function() {
        console.log("Attach document clicked");
        alert("This would open a file picker to select a document");
    });
    
    document.getElementById('attach-camera').addEventListener('click', function() {
        console.log("Attach camera clicked");
        alert("This would open the camera to take a photo");
    });
    
    document.getElementById('attach-gallery').addEventListener('click', function() {
        console.log("Attach gallery clicked");
        alert("This would open the gallery to select a photo");
    });
    
    // Send message functionality
    messageInput.addEventListener('input', function() {
        sendButton.disabled = this.value.trim() === '';
    });
    
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
            sendMessage();
        }
    });
    
    sendButton.addEventListener('click', function() {
        if (messageInput.value.trim() !== '') {
            sendMessage();
        }
    });
}

// Load chat data
function loadChat(chat) {
    // Set header info
    chatAvatar.src = chat.avatar;
    chatAvatar.alt = chat.name;
    chatName.textContent = chat.name;
    chatStatus.textContent = chat.status;
    
    // Load messages
    renderMessages(chat.messages);
    
    // Scroll to bottom
    scrollToBottom();
}

// Render messages
function renderMessages(messages) {
    chatMessages.innerHTML = '';
    
    // Add date separator
    const dateElement = document.createElement('div');
    dateElement.className = 'message-date';
    dateElement.textContent = 'Today';
    chatMessages.appendChild(dateElement);
    
    // Add each message
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.type}`;
        messageElement.innerHTML = `
            <div class="message-content">${message.content}</div>
            <div class="message-time">${message.time}</div>
        `;
        chatMessages.appendChild(messageElement);
    });
}

// Send a new message
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText === '') return;
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = 'message sent';
    messageElement.innerHTML = `
        <div class="message-content">${messageText}</div>
        <div class="message-time">${getCurrentTime()}</div>
    `;
    
    // Add to chat
    chatMessages.appendChild(messageElement);
    
    // Clear input
    messageInput.value = '';
    sendButton.disabled = true;
    
    // Scroll to bottom
    scrollToBottom();
    
    // In a real app, this would send the message to the server
    console.log("Message sent:", messageText);
}

// Get current time in HH:MM format
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Scroll to bottom of chat
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Initialize the chat room when DOM is loaded
document.addEventListener('DOMContentLoaded', init);