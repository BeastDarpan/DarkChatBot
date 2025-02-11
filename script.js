// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Update Footer Year Dynamically
  const yearElement = document.getElementById('year');
  const currentYear = new Date().getFullYear();
  yearElement.textContent = currentYear;
  
  // Chat Functionality
  const chatBox = document.getElementById('chat-box');
  const userInput = document.getElementById('user-input');
  const sendButton = document.getElementById('send-button');
  
  // Function to add a message to the chat box
  const addMessage = (message, isUser) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
  };
  
  // Function to send user message to the backend
  const sendMessage = async () => {
    const userMessage = userInput.value.trim();
    if (!userMessage) return; // Don't send empty messages
  
    addMessage(userMessage, true); // Add user message to chat box
    userInput.value = ''; // Clear input field
  
    try {
      const response = await fetch('http://localhost:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });
  
      const data = await response.json();
      addMessage(data.message, false); // Add bot's reply to chat box
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage('Oops! Something went wrong. Please try again.', false);
    }
  };
  
  // Event Listeners
  sendButton.addEventListener('click', sendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });