import React, { useState, useRef, useEffect } from 'react';

const InterStationCommunication = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeStation, setActiveStation] = useState('Station 1');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        text: newMessage,
        sender: activeStation,
        timestamp: new Date().toLocaleTimeString(),
        id: Date.now()
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const styles = {
    chatContainer: {
      maxWidth: '800px',
      margin: '20px auto',
      background: '#fff',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      height: '600px',
    },
    header: {
      padding: '15px',
      borderBottom: '1px solid #eee',
    },
    stationSwitcher: {
      display: 'flex',
      gap: '10px',
      justifyContent: 'center',
    },
    stationBtn: (isActive) => ({
      padding: '8px 16px',
      border: 'none',
      borderRadius: '20px',
      background: isActive ? '#007bff' : '#f0f0f0',
      color: isActive ? 'white' : 'black',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }),
    messagesContainer: {
      flex: 1,
      overflowY: 'auto',
      padding: '20px',
      background: '#f8f9fa',
    },
    message: (isSent) => ({
      marginBottom: '15px',
      display: 'flex',
      justifyContent: isSent ? 'flex-end' : 'flex-start',
    }),
    messageContent: (isSent) => ({
      maxWidth: '70%',
      padding: '10px 15px',
      borderRadius: '15px',
      background: isSent ? '#007bff' : 'white',
      color: isSent ? 'white' : 'black',
      borderBottomRightRadius: isSent ? '5px' : '15px',
      borderBottomLeftRadius: isSent ? '15px' : '5px',
      boxShadow: isSent ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.1)',
    }),
    sender: {
      fontSize: '0.8em',
      marginBottom: '4px',
      fontWeight: 'bold',
    },
    text: {
      marginBottom: '4px',
    },
    timestamp: {
      fontSize: '0.7em',
      opacity: 0.7,
    },
    inputArea: {
      padding: '20px',
      borderTop: '1px solid #eee',
      display: 'flex',
      gap: '10px',
    },
    input: {
      flex: 1,
      padding: '10px 15px',
      border: '1px solid #ddd',
      borderRadius: '20px',
      outline: 'none',
    },
    sendButton: {
      padding: '10px 20px',
      background: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.header}>
        <div style={styles.stationSwitcher}>
          {['Station 1', 'Station 2'].map(station => (
            <button
              key={station}
              onClick={() => setActiveStation(station)}
              style={styles.stationBtn(activeStation === station)}
            >
              {station}
            </button>
          ))}
        </div>
      </div>
      
      <div style={styles.messagesContainer}>
        {messages.map(message => (
          <div key={message.id} style={styles.message(message.sender === activeStation)}>
            <div style={styles.messageContent(message.sender === activeStation)}>
              <div style={styles.sender}>{message.sender}</div>
              <div style={styles.text}>{message.text}</div>
              <div style={styles.timestamp}>{message.timestamp}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.inputArea}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          style={styles.input}
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

export default InterStationCommunication;