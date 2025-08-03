import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Chatbot.css';
import chatbotIcon from '../images/chat.png';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatbotRef = useRef<HTMLDivElement>(null);

  // Auto-scroll vers le bas
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Focus sur l'input quand le chat s'ouvre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Fermer le chatbot en cliquant en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && chatbotRef.current && !chatbotRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Fermer le chatbot avec la touche Echap
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Animation de chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // Animation de 5 secondes pour mieux apercevoir l'animation

    return () => clearTimeout(timer);
  }, []);

  // Réponses automatiques pour les messages
  const getBotResponse = useCallback((userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
      return 'Merci pour votre message ! Joel & Eunice seront touchés par vos mots doux ! 💕';
    }
    
    if (lowerMessage.includes('félicitations') || lowerMessage.includes('félicitation') || lowerMessage.includes('bravo')) {
      return 'Merci beaucoup ! Vos félicitations réchauffent le cœur de Joel & Eunice ! 🎉';
    }
    
    if (lowerMessage.includes('bonheur') || lowerMessage.includes('heureux') || lowerMessage.includes('joie')) {
      return 'Vos souhaits de bonheur touchent profondément Joel & Eunice ! Merci ! ✨';
    }
    
    if (lowerMessage.includes('amour') || lowerMessage.includes('aimer') || lowerMessage.includes('cœur')) {
      return 'Vos mots d\'amour sont précieux pour Joel & Eunice ! Merci de partager votre affection ! 💖';
    }
    
    if (lowerMessage.includes('mariage') || lowerMessage.includes('union') || lowerMessage.includes('cérémonie')) {
      return 'Joel & Eunice sont émus par vos mots sur leur mariage ! Merci ! 💒';
    }
    
    if (lowerMessage.includes('merci') || lowerMessage.includes('thanks')) {
      return 'Merci à vous ! Joel & Eunice apprécient énormément vos messages ! 🙏';
    }
    
    if (lowerMessage.includes('au revoir') || lowerMessage.includes('bye') || lowerMessage.includes('à bientôt')) {
      return 'Au revoir ! Joel & Eunice ont hâte de vous voir le jour J ! 👋';
    }
    
    // Réponses par défaut pour les messages
    const defaultResponses = [
      'Merci pour votre beau message ! Joel & Eunice sont touchés par vos mots ! 💕',
      'Vos mots sont précieux pour Joel & Eunice ! Merci de partager votre affection ! ✨',
      'Joel & Eunice sont émus par votre message ! Merci ! 💖',
      'Votre message réchauffe le cœur de Joel & Eunice ! Merci ! 🌟'
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }, []);

  // Simuler la frappe du bot
  const simulateTyping = useCallback(async (response: string) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    setIsTyping(false);
    
    const botMessage: Message = {
      id: Date.now().toString(),
      text: response,
      isUser: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMessage]);
  }, []);

  // Envoyer un message
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Réponse automatique simple
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Merci pour votre message ! Joel & Eunice seront ravis de le lire ! 💕',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  }, []);

  // Gérer la soumission du formulaire
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  }, [inputValue, sendMessage]);

  // Gérer les touches du clavier
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  }, [inputValue, sendMessage]);

  return (
    <div className="chatbot-container" ref={chatbotRef}>
      {/* Animation de chargement */}
      {isLoading ? (
        <div className="loading-animation">
          <div className="loading-ring">
            <img src={chatbotIcon} alt="Messages pour Joel & Eunice" className="loading-icon" />
          </div>
          <div className="wedding-date">
            <span className="date-text">29 Août 2025</span>
            <span className="date-subtitle">Joel & Eunice</span>
          </div>
        </div>
      ) : (
        <>
          {/* Bouton du chatbot */}
          <button
            className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Ouvrir l'espace de messages"
          >
            <img src={chatbotIcon} alt="Messages pour Joel & Eunice" className="chatbot-icon" />
          </button>

          {/* Overlay modal */}
          <div 
            className={`chatbot-overlay ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          />

          {/* Fenêtre du chat - Modal */}
          <div className={`chatbot-window ${isOpen ? 'active' : ''}`}>
            {/* En-tête */}
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <img src={chatbotIcon} alt="Assistant" className="chatbot-header-icon" />
                <div>
                  <h3>Messages pour Joel & Eunice</h3>
                  <span className="chatbot-status">Laissez un mot doux</span>
                </div>
              </div>
              <button
                className="chatbot-close"
                onClick={() => setIsOpen(false)}
                aria-label="Fermer l'espace de messages"
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
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
                      {message.timestamp.toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Indicateur de frappe */}
              {isTyping ? (
                <div className="message bot">
                  <div className="message-content">
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              ) : null}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Formulaire d'envoi */}
            <form className="chatbot-input-form" onSubmit={handleSubmit}>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Laissez un message pour Joel & Eunice..."
                className="chatbot-input"
                disabled={isTyping}
              />
              <button
                type="submit"
                className="chatbot-send"
                disabled={inputValue.trim() === '' || isTyping}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22,2 15,22 11,13 2,9"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
});

Chatbot.displayName = 'Chatbot';

export default Chatbot;