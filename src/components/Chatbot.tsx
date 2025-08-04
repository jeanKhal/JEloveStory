import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
const chatbotIcon = '/images/icon.png';
import * as XLSX from 'xlsx';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Guest {
  firstName: string;
  lastName: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis l'espace de messages pour Joel & Eunice. Pour laisser un message, je dois d'abord vérifier votre identité. Pouvez-vous me donner votre prénom et nom ?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState<'name' | 'message'>('name');
  const [userName, setUserName] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleOpenChat = () => {
    setIsOpen(true);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    // Reset state when closing
    setCurrentStep('name');
    setUserName('');
    setUserMessage('');
    setIsVerified(false);
    setMessages([
      {
        id: 1,
        text: "Bonjour ! Je suis l'espace de messages pour Joel & Eunice. Pour laisser un message, je dois d'abord vérifier votre identité. Pouvez-vous me donner votre prénom et nom ?",
        isUser: false,
        timestamp: new Date()
      }
    ]);
  };

  const verifyGuest = async (firstName: string, lastName: string): Promise<boolean> => {
    try {
      const response = await fetch('/liste.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

      // Skip header row and check columns B (Prénom) and C (Nom)
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (row && row[1] && row[2]) {
          const guestFirstName = row[1].toString().toLowerCase().trim();
          const guestLastName = row[2].toString().toLowerCase().trim();
          
          if (guestFirstName === firstName.toLowerCase().trim() && 
              guestLastName === lastName.toLowerCase().trim()) {
            return true;
          }
        }
      }
      return false;
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
      return false;
    }
  };

  const saveMessage = async (firstName: string, lastName: string, message: string) => {
    try {
      const response = await fetch('/liste.xlsx');
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

      // Find the row with the matching guest name
      let guestRowIndex = -1;
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        if (row && row[1] && row[2]) {
          const guestFirstName = row[1].toString().toLowerCase().trim();
          const guestLastName = row[2].toString().toLowerCase().trim();
          
          if (guestFirstName === firstName.toLowerCase().trim() && 
              guestLastName === lastName.toLowerCase().trim()) {
            guestRowIndex = i;
            break;
          }
        }
      }

      if (guestRowIndex !== -1) {
        // Add message to column D (index 3) of the existing row
        const cellAddress = XLSX.utils.encode_cell({ r: guestRowIndex, c: 3 });
        worksheet[cellAddress] = { v: message, t: 's' };
        
        // Convert back to binary
        const newWorkbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(newWorkbook, worksheet, sheetName);
        const newArrayBuffer = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });
        
        // Note: In a real application, you would send this to a server
        // For now, we'll just simulate success
        console.log('Message saved in column D for guest:', { firstName, lastName, message });
        return true;
      } else {
        console.error('Guest not found for message saving');
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue.trim();
    setInputValue('');
    setIsTyping(true);

    setTimeout(async () => {
      if (currentStep === 'name') {
        // Parse name input
        const nameParts = currentInput.split(' ');
        if (nameParts.length < 2) {
          const botMessage: Message = {
            id: Date.now() + 1,
            text: "Veuillez entrer votre prénom ET votre nom séparés par un espace (exemple: Jean Dupont).",
            isUser: false,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botMessage]);
          setIsTyping(false);
          return;
        }

        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');
        setUserName(`${firstName} ${lastName}`);

        // Verify guest
        const verified = await verifyGuest(firstName, lastName);
        setIsVerified(verified);

        if (verified) {
          const botMessage: Message = {
            id: Date.now() + 1,
            text: `Merci ${firstName} ! Votre identité a été vérifiée. Maintenant, pouvez-vous laisser votre message pour Joel & Eunice ?`,
            isUser: false,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botMessage]);
          setCurrentStep('message');
        } else {
          const botMessage: Message = {
            id: Date.now() + 1,
            text: "Désolé, votre nom ne figure pas dans la liste des invités. Veuillez vérifier l'orthographe ou contacter les organisateurs.",
            isUser: false,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botMessage]);
        }
      } else if (currentStep === 'message') {
        setUserMessage(currentInput);
        
        // Save message
        const nameParts = userName.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');
        
        const saved = await saveMessage(firstName, lastName, currentInput);
        
        if (saved) {
          const botMessage: Message = {
            id: Date.now() + 1,
            text: "Merci pour votre beau message ! Il a été enregistré et sera transmis à Joel & Eunice. Ils seront touchés par vos mots. À bientôt !",
            isUser: false,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botMessage]);
          
          // Reset for next user
          setTimeout(() => {
            setCurrentStep('name');
            setUserName('');
            setUserMessage('');
            setIsVerified(false);
            setMessages([
              {
                id: Date.now() + 2,
                text: "Bonjour ! Je suis l'espace de messages pour Joel & Eunice. Pour laisser un message, je dois d'abord vérifier votre identité. Pouvez-vous me donner votre prénom et nom ?",
                isUser: false,
                timestamp: new Date()
              }
            ]);
          }, 3000);
        } else {
          const botMessage: Message = {
            id: Date.now() + 1,
            text: "Désolé, il y a eu un problème lors de l'enregistrement de votre message. Veuillez réessayer.",
            isUser: false,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, botMessage]);
        }
      }
      
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Bouton du chatbot */}
      <button 
        className="chatbot-toggle"
        onClick={handleOpenChat}
        aria-label="Laisser un message"
      >
        <img src={chatbotIcon} alt="Espace messages" />
      </button>

      {/* Modal du chatbot */}
      {isOpen && (
        <div className="chatbot-overlay" onClick={handleCloseChat}>
          <div className="chatbot-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-info">
                <img src={chatbotIcon} alt="Espace messages" className="chatbot-avatar" />
                <div>
                  <h3>Messages pour Joel & Eunice</h3>
                  <span className="status">En ligne</span>
                </div>
              </div>
              <button 
                className="chatbot-close"
                onClick={handleCloseChat}
                aria-label="Fermer le chat"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`message ${message.isUser ? 'user' : 'bot'}`}
                >
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-time">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="message bot">
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form className="chatbot-input" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={currentStep === 'name' ? "Prénom Nom (ex: Jean Dupont)" : "Votre message pour Joel & Eunice..."}
                disabled={isTyping}
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim() || isTyping}
                aria-label="Envoyer"
              >
                ➤
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot; 