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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis l\'assistant virtuel de Joel & Eunice. Comment puis-je vous aider ?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Réponses automatiques du chatbot
  const getBotResponse = useCallback((userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('bonjour') || lowerMessage.includes('salut') || lowerMessage.includes('hello')) {
      return 'Bonjour ! Je suis ravi de vous aider pour le mariage de Joel & Eunice !';
    }
    
    if (lowerMessage.includes('date') || lowerMessage.includes('quand')) {
      return 'Le mariage aura lieu le 29 Août 2025. Une date très spéciale pour Joel & Eunice !';
    }
    
    if (lowerMessage.includes('lieu') || lowerMessage.includes('où') || lowerMessage.includes('adresse')) {
                return 'La cérémonie se déroulera à l&apos;Église Saint-Pierre à 14h00, suivie de la réception au Château de Versailles à 18h00.';
    }
    
    if (lowerMessage.includes('rsvp') || lowerMessage.includes('confirmer') || lowerMessage.includes('présence')) {
      return 'Vous pouvez confirmer votre présence en visitant la section RSVP du site. C\'est très important pour l\'organisation !';
    }
    
    if (lowerMessage.includes('cadeau') || lowerMessage.includes('liste')) {
      return 'Votre présence est le plus beau cadeau ! Si vous souhaitez offrir quelque chose, une enveloppe sera appréciée.';
    }
    
    if (lowerMessage.includes('code') || lowerMessage.includes('tenue') || lowerMessage.includes('vestimentaire')) {
      return 'Le code vestimentaire est élégant et chic. Tenue de soirée recommandée pour la réception !';
    }
    
    if (lowerMessage.includes('merci') || lowerMessage.includes('thanks')) {
      return 'De rien ! Je suis là pour vous aider. N\'hésitez pas si vous avez d\'autres questions !';
    }
    
    if (lowerMessage.includes('au revoir') || lowerMessage.includes('bye')) {
      return 'Au revoir ! J\'espère vous voir le 29 Août pour célébrer ce beau mariage !';
    }
    
    // Réponses par défaut
    const defaultResponses = [
      'Je ne suis pas sûr de comprendre. Pouvez-vous reformuler votre question ?',
      'Je suis spécialement conçu pour répondre aux questions sur le mariage de Joel & Eunice. Essayez de me demander quelque chose sur la date, le lieu, ou le RSVP !',
      'Désolé, je n\'ai pas la réponse à cette question. Mais je peux vous aider avec les informations sur le mariage !',
      'Je suis là pour vous aider avec les détails du mariage. Que souhaitez-vous savoir ?'
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

    // Réponse du bot
    const response = getBotResponse(text);
    await simulateTyping(response);
  }, [getBotResponse, simulateTyping]);

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

  // Questions rapides
  const quickQuestions = [
    'Quelle est la date ?',
    'Où se déroule le mariage ?',
    'Comment confirmer ma présence ?',
    'Quel est le code vestimentaire ?'
  ];

  const handleQuickQuestion = useCallback((question: string) => {
    sendMessage(question);
  }, [sendMessage]);

  return (
    <div className="chatbot-container">
      {/* Bouton du chatbot */}
      <button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ouvrir le chat"
      >
        <img src={chatbotIcon} alt="Assistant virtuel" className="chatbot-icon" />
        {!isOpen && <span className="chatbot-pulse"></span>}
      </button>

      {/* Fenêtre du chat */}
      {isOpen ? (
        <div className="chatbot-window">
          {/* En-tête */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <img src={chatbotIcon} alt="Assistant" className="chatbot-header-icon" />
              <div>
                <h3>Assistant Joel & Eunice</h3>
                <span className="chatbot-status">En ligne</span>
              </div>
            </div>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Fermer le chat"
            >
              ×
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

          {/* Questions rapides */}
          {messages.length === 1 ? (
            <div className="quick-questions">
              <p>Questions fréquentes :</p>
              <div className="quick-questions-grid">
                {quickQuestions.map((question, index) => (
                  <button
                    key={`chatbot-question-${question.replace(/\s+/g, '-')}-${index}`}
                    className="quick-question-btn"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* Formulaire d'envoi */}
          <form className="chatbot-input-form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tapez votre message..."
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
      ) : null}
    </div>
  );
});

Chatbot.displayName = 'Chatbot';

export default Chatbot;