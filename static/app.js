document.addEventListener('DOMContentLoaded', () => {
   
    var socket = io();

    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const messagesContainer = document.getElementById('messages');

    
    function sendMessage() {
        const message = messageInput.value;
        if (message) {
            // Sends the message to backend
            socket.send(message);
            // Clears the input field
            messageInput.value = '';
        }
    }

    // Sends the typed message to the backend when clicking the send button
    sendButton.addEventListener('click', sendMessage);

    // Sends the typed message to the backend when pressing the Enter key
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    // receives the message sent from the backend, and displays it to the front screen
    socket.on('message', (msg) => {
        // Creates a div element for each entered message
        const messageElement = document.createElement('div');
        // Set the text content of the div to the message
        messageElement.textContent = msg;
        // adds message-class to each of the created div
        messageElement.classList.add('message-class');
        // Append the new message div to the messages container
        messagesContainer.appendChild(messageElement);
    });
});

socket.on('connect', function() {
    socket.emit('my event', {data: 'I\'m connected!'});
});