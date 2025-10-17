import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Player } from '@lottiefiles/react-lottie-player';
import { emailService } from '../../../../../consultation-frontend/src/services/emailService';

// AI Chat Component
interface AIChatToggleProps {}

export const AIChatToggle: React.FC<AIChatToggleProps> = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm your AI assistant. I can help you with questions about our services, pricing, or getting started. How can I assist you today?",
      timestamp: new Date()
    }
  ]);

  // Translation service - koristi backend API
  const translateText = async (text: string, targetLang: string): Promise<string> => {
    // If target language is English, return original text
    if (targetLang === 'en') return text;

    try {
      // Poziv backend translation servisa
      const response = await fetch('http://localhost:3088/api/translation/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          targetLanguage: targetLang,
          sourceLanguage: 'en'
        })
      });

      if (!response.ok) {
        throw new Error(`Translation service error: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error('Translation failed');
      }

      return result.data.translatedText || text;

    } catch (error) {
      console.error('Translation failed:', error);
      // Ako backend nije dostupan, vraćamo originalni tekst
      return text;
    }
  };

  // Update initial message when language changes
  React.useEffect(() => {
    const updateInitialMessage = async () => {
      const baseMessage = "Hi! I'm your AI assistant. I can help you with questions about our services, pricing, or getting started. How can I assist you today?";
      const translatedMessage = await translateText(baseMessage, selectedLanguage);
      
      setMessages([{
        id: 1,
        type: 'ai',
        content: translatedMessage,
        timestamp: new Date()
      }]);
    };

    updateInitialMessage();
  }, [selectedLanguage]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = newMessage;
    setNewMessage('');
    setIsTyping(true);

    try {
      // Poziv backend AI servisa
      const response = await fetch('http://localhost:3088/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          language: selectedLanguage
        })
      });

      if (!response.ok) {
        throw new Error(`AI service error: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error('AI response generation failed');
      }

      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: result.data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      // ✨ AI-Assisted Form Submission
      // Ako AI detektuje da ima dovoljno informacija, automatski submituje formu
      if (result.data.structuredData && result.data.structuredData.readyToSubmit) {
        const formData = result.data.structuredData.formData;
        
        console.log('🤖 AI has collected enough information, auto-submitting...');
        
        // Prikaži "typing" indikator dok submituje
        setIsTyping(true);

        try {
          // Automatski submituj formu sa prikupljenim podacima
          const submitResponse = await fetch('http://localhost:3088/api/ai/submit-booking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
          });

          const submitResult = await submitResponse.json();

          if (submitResult.success) {
            // Potvrdi uspešan submission
            const confirmationMessage = {
              id: messages.length + 3,
              type: 'ai',
              content: `✅ ${submitResult.data.message}\n\n📧 Confirmation has been sent to ${formData.email}`,
              timestamp: new Date()
            };
            setMessages(prev => [...prev, confirmationMessage]);
            
            console.log('✅ AI booking submitted successfully!', submitResult.data);
          } else {
            throw new Error(submitResult.error || 'Submission failed');
          }
        } catch (submitError) {
          console.error('❌ AI booking submission failed:', submitError);
          
          // Informiši korisnika da manuelno submituje
          const errorMessage = {
            id: messages.length + 3,
            type: 'ai',
            content: `I've collected your information, but there was an issue submitting it automatically. Please use the contact form below to submit your request manually. Thank you!`,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
        } finally {
          setIsTyping(false);
        }
      }

    } catch (error) {
      console.error('AI API Error:', error);

      // Ako backend nije dostupan, koristi simple fallback
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again or contact us directly at busines.watch.this@gmail.com",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Chat Toggle Button */}
      <Button
        variant="outline"
        size="md"
        onClick={handleToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: isExpanded ? 'linear-gradient(135deg, #8B5CF6, #7C3AED)' : 'rgba(139, 92, 246, 0.1)',
          color: isExpanded ? '#FFFFFF' : '#8B5CF6',
          border: '2px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '12px',
          padding: '12px 20px',
          fontSize: '15px',
          fontWeight: 600,
          transition: 'all 0.3s ease',
          boxShadow: isExpanded ? '0 8px 25px rgba(139, 92, 246, 0.3)' : '0 4px 12px rgba(139, 92, 246, 0.1)'
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        {isExpanded ? 'Close Chat' : 'AI Assistant'}
      </Button>

      {/* Chat Window with Animation */}
      {isExpanded && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '12px',
          zIndex: 1000,
          display: 'flex',
          gap: '16px',
          alignItems: 'flex-start'
        }}>
          {/* Lottie Animation */}
          <div style={{
            width: '200px',
            height: '200px',
            flexShrink: 0
          }}>
            <Player
              autoplay
              loop
              src="/animations/contact-animation.json"
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Chat Window */}
          <div style={{
            width: '380px',
            height: '500px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(229, 229, 231, 0.5)',
            display: 'flex',
            flexDirection: 'column'
          }}>
          {/* Chat Header */}
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid #F5F5F7',
            backgroundImage: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
            backgroundColor: 'transparent'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <path d="M12 17h.01" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    margin: 0,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                  }}>
                    AI Assistant
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    margin: 0
                  }}>
                    Online • Ready to help
                  </p>
                </div>
              </div>

              {/* Language Selector & Close Button */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                {/* Language Selector */}
                <div style={{
                  position: 'relative'
                }}>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      outline: 'none',
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                      backgroundPosition: 'right 8px center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '16px',
                      paddingRight: '28px'
                    }}
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="it">Italiano</option>
                    <option value="pt">Português</option>
                    <option value="ru">Русский</option>
                    <option value="ja">日本語</option>
                    <option value="ko">한국어</option>
                    <option value="zh">中文</option>
                    <option value="sr">Српски</option>
                  </select>
                </div>

                {/* Close Button */}
                <button
                  onClick={handleToggle}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: '#FFFFFF',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    outline: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  title="Close Chat"
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div style={{
                  maxWidth: '80%',
                  padding: '12px 16px',
                  borderRadius: '16px',
                  background: message.type === 'user'
                    ? 'linear-gradient(135deg, #8B5CF6, #7C3AED)'
                    : '#F8F9FA',
                  color: message.type === 'user' ? '#FFFFFF' : '#1D1D1F',
                  fontSize: '14px',
                  lineHeight: 1.5
                }}>
                  {message.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '12px 16px',
                  background: '#F8F9FA',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#6E6E73',
                    borderRadius: '50%',
                    animation: 'bounce 1.4s infinite ease-in-out'
                  }} />
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#6E6E73',
                    borderRadius: '50%',
                    animation: 'bounce 1.4s infinite ease-in-out 0.16s'
                  }} />
                  <div style={{
                    width: '6px',
                    height: '6px',
                    background: '#6E6E73',
                    borderRadius: '50%',
                    animation: 'bounce 1.4s infinite ease-in-out 0.32s'
                  }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} style={{
            padding: '20px 24px',
            borderTop: '1px solid #F5F5F7',
            background: '#FAFAFA'
          }}>
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-end'
            }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={selectedLanguage === 'en' ? "Ask me anything..." :
                           selectedLanguage === 'es' ? "Pregúntame cualquier cosa..." :
                           selectedLanguage === 'fr' ? "Demandez-moi n'importe quoi..." :
                           selectedLanguage === 'de' ? "Frag mich alles..." :
                           selectedLanguage === 'it' ? "Chiedimi qualsiasi cosa..." :
                           selectedLanguage === 'pt' ? "Pergunte-me qualquer coisa..." :
                           selectedLanguage === 'ru' ? "Спросите меня о чем угодно..." :
                           selectedLanguage === 'ja' ? "何でも聞いてください..." :
                           selectedLanguage === 'ko' ? "무엇이든 물어보세요..." :
                           selectedLanguage === 'zh' ? "问我任何问题..." :
                           "Ask me anything..."}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '2px solid #E5E5E7',
                  borderRadius: '12px',
                  fontSize: '15px',
                  outline: 'none',
                  background: '#FFFFFF',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#8B5CF6'}
                onBlur={(e) => e.target.style.borderColor = '#E5E5E7'}
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={!newMessage.trim()}
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundImage: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                  opacity: newMessage.trim() ? 1 : 0.6
                }}
              >
                {selectedLanguage === 'en' ? 'Send' :
                 selectedLanguage === 'es' ? 'Enviar' :
                 selectedLanguage === 'fr' ? 'Envoyer' :
                 selectedLanguage === 'de' ? 'Senden' :
                 selectedLanguage === 'it' ? 'Invia' :
                 selectedLanguage === 'pt' ? 'Enviar' :
                 selectedLanguage === 'ru' ? 'Отправить' :
                 selectedLanguage === 'ja' ? '送信' :
                 selectedLanguage === 'ko' ? '전송' :
                 selectedLanguage === 'zh' ? '发送' :
                 'Send'}
              </Button>
            </div>
          </form>
          </div>
        </div>
      )}

      {/* Bounce animation keyframes */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

/**
 * APPLE REDESIGN - Contact Page with AI Assistant
 * Modern contact form with expandable AI chat assistant
 */

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      await emailService.sendContactFormEmail(formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
        setSubmitStatus('error');
      console.error('Contact submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        padding: '160px 24px 100px',
        textAlign: 'center',
        backgroundImage: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
        backgroundColor: 'transparent',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          backgroundImage: 'radial-gradient(circle at center, rgba(0,113,227,0.05) 0%, transparent 70%)',
          backgroundColor: 'transparent',
          pointerEvents: 'none'
        }} />

        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '200px',
          height: '200px',
          backgroundImage: 'radial-gradient(circle, rgba(0,113,227,0.1) 0%, transparent 70%)',
          backgroundColor: 'transparent',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          width: '150px',
          height: '150px',
          backgroundImage: 'radial-gradient(circle, rgba(52,211,153,0.1) 0%, transparent 70%)',
          backgroundColor: 'transparent',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
            padding: '12px 24px',
            backgroundColor: 'rgba(0,113,227,0.1)',
            borderRadius: '50px',
            backdropFilter: 'blur(10px)'
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0071E3" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
            <span style={{
              fontSize: '14px',
            fontWeight: 600,
              color: '#0071E3',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Contact Us
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(48px, 6vw, 72px)',
            fontWeight: 700,
            lineHeight: 1.05,
            color: '#1D1D1F',
            marginBottom: '32px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            letterSpacing: '-0.02em'
          }}>
            Let's Start a Conversation
          </h1>

          <p style={{
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            lineHeight: 1.6,
            color: '#6E6E73',
            marginBottom: '0',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Ready to transform your ideas into reality? We're here to help you every step of the way.
              </p>
            </div>
      </section>

          {/* Contact Form */}
      <section style={{
        padding: '100px 24px',
        backgroundColor: '#FFFFFF',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'start'
        }}>
          {/* Form Side */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            padding: '56px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05), 0 8px 16px rgba(0, 0, 0, 0.02)',
            border: '1px solid rgba(229, 229, 231, 0.5)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '32px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundImage: 'linear-gradient(135deg, #0071E3, #0088FF)',
                backgroundColor: 'transparent',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#1D1D1F',
                  margin: 0,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                }}>
                  Send us a Message
                </h2>
                <p style={{
                  fontSize: '16px',
                  color: '#6E6E73',
                  margin: 0,
                  marginTop: '4px'
                }}>
                  We'll get back to you within 24 hours
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
              <label htmlFor="name" style={{
                display: 'block',
                    fontSize: '15px',
                    fontWeight: 600,
                color: '#1D1D1F',
                marginBottom: '8px'
              }}>
                Full Name *
                  </label>
                  <input
                    type="text"
                id="name"
                name="name"
                value={formData.name}
                    onChange={handleInputChange}
                    required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid #E5E5E7',
                  borderRadius: '12px',
                  fontSize: '16px',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  backgroundColor: '#FFFFFF'
                }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0071E3';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 113, 227, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#E5E5E7';
                      e.target.style.boxShadow = 'none';
                    }}
                placeholder="Enter your full name"
              />
              </div>

                <div>
              <label htmlFor="email" style={{
                display: 'block',
                    fontSize: '15px',
                    fontWeight: 600,
                color: '#1D1D1F',
                marginBottom: '8px'
              }}>
                Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid #E5E5E7',
                  borderRadius: '12px',
                  fontSize: '16px',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  backgroundColor: '#FFFFFF'
                }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0071E3';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 113, 227, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#E5E5E7';
                      e.target.style.boxShadow = 'none';
                    }}
                  placeholder="Enter your email address"
                />
                </div>
              </div>

              <div>
              <label htmlFor="subject" style={{
                display: 'block',
                  fontSize: '15px',
                  fontWeight: 600,
                color: '#1D1D1F',
                marginBottom: '8px'
              }}>
                Subject
                </label>
                <input
                type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid #E5E5E7',
                  borderRadius: '12px',
                  fontSize: '16px',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  backgroundColor: '#FFFFFF'
                }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0071E3';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 113, 227, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E5E5E7';
                    e.target.style.boxShadow = 'none';
                  }}
                placeholder="What's this about?"
              />
              </div>

              <div>
              <label htmlFor="message" style={{
                display: 'block',
                  fontSize: '15px',
                  fontWeight: 600,
                color: '#1D1D1F',
                marginBottom: '8px'
              }}>
                Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                rows={6}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid #E5E5E7',
                  borderRadius: '12px',
                  fontSize: '16px',
                  resize: 'vertical',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  backgroundColor: '#FFFFFF'
                }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0071E3';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 113, 227, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E5E5E7';
                    e.target.style.boxShadow = 'none';
                  }}
                placeholder="Tell us more about your inquiry..."
              />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                style={{
                  minWidth: '200px',
                  padding: '16px 32px',
                  fontSize: '16px',
                    fontWeight: 600,
                    borderRadius: '12px'
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
              </div>

              {submitStatus === 'success' && (
                <div style={{
                  padding: '16px 20px',
                  backgroundImage: 'linear-gradient(135deg, #D1FAE5, #A7F3D0)',
                  backgroundColor: 'transparent',
                  border: '1px solid #10B981',
                  borderRadius: '12px',
                  color: '#065F46',
                  fontSize: '15px',
                  textAlign: 'center',
                  fontWeight: 500
                }}>
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div style={{
                  padding: '16px 20px',
                  backgroundImage: 'linear-gradient(135deg, #FEE2E2, #FECACA)',
                  backgroundColor: 'transparent',
                  border: '1px solid #EF4444',
                  borderRadius: '12px',
                  color: '#991B1B',
                  fontSize: '15px',
                  textAlign: 'center',
                  fontWeight: 500
                }}>
                  ✗ Failed to send message. Please try again.
                </div>
              )}
            </form>
          </div>

          {/* Info Side */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            paddingTop: '56px'
          }}>
            <div>
              <h3 style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#1D1D1F',
                marginBottom: '16px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
              }}>
                Why Choose Us?
              </h3>
              <div style={{
                display: 'grid',
                gap: '20px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                      <path d="M9 12l2 2 4-4" />
                      <path d="M21 12c.552 0 1 .448 1 1v7a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-7c0-.552.448-1 1-1" />
                      <path d="M12 2v10" />
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>
                      Quick Response
                    </h4>
                    <p style={{ fontSize: '15px', color: '#6E6E73', lineHeight: 1.5 }}>
                      We typically respond to inquiries within one business day.
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>
                      Expert Team
                    </h4>
                    <p style={{ fontSize: '15px', color: '#6E6E73', lineHeight: 1.5 }}>
                      Work with experienced professionals who understand your industry.
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#1D1D1F', marginBottom: '4px' }}>
                      Tailored Solutions
                    </h4>
                    <p style={{ fontSize: '15px', color: '#6E6E73', lineHeight: 1.5 }}>
                      Every project is customized to meet your specific needs and goals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          <div style={{
            padding: '32px',
            backgroundImage: 'linear-gradient(135deg, #F8FAFC, #E2E8F0)',
            backgroundColor: 'transparent',
            borderRadius: '16px',
            textAlign: 'center'
          }}>
              <h4 style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#1D1D1F',
                marginBottom: '12px'
              }}>
                Need Immediate Help?
              </h4>
              <p style={{
                fontSize: '15px',
                color: '#6E6E73',
                marginBottom: '20px'
              }}>
                For urgent matters, chat with our AI assistant or schedule a consultation.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <AIChatToggle />
                <div style={{ height: '8px' }} />
                <a href="/booking" style={{ textDecoration: 'none' }}>
                  <Button variant="primary" size="md">
                    Book Consultation
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section style={{
        padding: '100px 24px',
        backgroundImage: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
        backgroundColor: 'transparent',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '64px'
          }}>
          <h2 style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 700,
            color: '#1D1D1F',
              marginBottom: '24px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              letterSpacing: '-0.02em'
            }}>
              Other Ways to Connect
          </h2>
            <p style={{
              fontSize: '20px',
              lineHeight: 1.6,
              color: '#6E6E73',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Prefer a different way to get in touch? We're available through multiple channels.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '32px'
          }}>
            {/* Email */}
            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '40px',
              borderRadius: '20px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 0, 0, 0.02)',
              textAlign: 'center',
              border: '1px solid rgba(229, 229, 231, 0.5)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.1), 0 6px 15px rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 0, 0, 0.02)';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(0,113,227,0.05) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />

              <div style={{
                width: '72px',
                height: '72px',
                backgroundImage: 'linear-gradient(135deg, #0071E3, #0088FF)',
                backgroundColor: 'transparent',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 28px',
                position: 'relative',
                zIndex: 1
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <path d="M22 6l-10 7L2 6" />
                </svg>
              </div>

              <h3 style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#1D1D1F',
                marginBottom: '12px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                position: 'relative',
                zIndex: 1
              }}>
                Email Us
              </h3>

              <p style={{
                fontSize: '17px',
                color: '#6E6E73',
                marginBottom: '20px',
                position: 'relative',
                zIndex: 1
              }}>
                Send us an email and we'll respond within 24 hours
              </p>

              <a
                href="mailto:busines.watch.this@gmail.com"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 24px',
                    backgroundImage: 'linear-gradient(135deg, #0071E3, #0088FF)',
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    zIndex: 1
                  }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 113, 227, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                busines.watch.this@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '40px',
              borderRadius: '20px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 0, 0, 0.02)',
              textAlign: 'center',
              border: '1px solid rgba(229, 229, 231, 0.5)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.1), 0 6px 15px rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 0, 0, 0.02)';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />

              <div style={{
                width: '72px',
                height: '72px',
                backgroundImage: 'linear-gradient(135deg, #10B981, #059669)',
                backgroundColor: 'transparent',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 28px',
                position: 'relative',
                zIndex: 1
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>

              <h3 style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#1D1D1F',
                marginBottom: '12px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                position: 'relative',
                zIndex: 1
              }}>
                Call Us
              </h3>

              <p style={{
                fontSize: '17px',
                color: '#6E6E73',
                marginBottom: '20px',
                position: 'relative',
                zIndex: 1
              }}>
                Speak directly with our team for immediate assistance
              </p>

              <a
                href="tel:+15551234567"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '14px 24px',
                    backgroundImage: 'linear-gradient(135deg, #10B981, #059669)',
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    zIndex: 1
                  }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                +1 (555) 123-4567
              </a>
            </div>

            {/* Location */}
            <div style={{
              backgroundColor: '#FFFFFF',
              padding: '40px',
              borderRadius: '20px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 0, 0, 0.02)',
              textAlign: 'center',
              border: '1px solid rgba(229, 229, 231, 0.5)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.1), 0 6px 15px rgba(0, 0, 0, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 0, 0, 0.02)';
            }}
            >
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />

              <div style={{
                width: '72px',
                height: '72px',
                backgroundImage: 'linear-gradient(135deg, #F59E0B, #D97706)',
                backgroundColor: 'transparent',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 28px',
                position: 'relative',
                zIndex: 1
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>

              <h3 style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#1D1D1F',
                marginBottom: '12px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                position: 'relative',
                zIndex: 1
              }}>
                Visit Our Office
              </h3>

              <p style={{
                fontSize: '17px',
                color: '#6E6E73',
                marginBottom: '20px',
                position: 'relative',
                zIndex: 1
              }}>
                Located in the heart of Belgrade, ready to welcome you
              </p>

              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 24px',
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                color: '#FFFFFF',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 600,
                position: 'relative',
                zIndex: 1
              }}>
                Belgrade, Serbia
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
