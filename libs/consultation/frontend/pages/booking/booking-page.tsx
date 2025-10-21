import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Player } from '@lottiefiles/react-lottie-player';
import { CustomCalendar } from '../../components/ui/CustomCalendar';
import { CustomTimePicker } from '../../components/ui/CustomTimePicker';
import { emailService } from '../../../../../consultation-frontend/src/services/emailService';
import { bookingService } from '../../../../../consultation-frontend/src/services/bookingService';

/**
 * APPLE REDESIGN - Booking Page
 * Elegant form with premium styling and smooth interactions
 * Now with AI Booking Assistant!
 */

export const BookingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationError, setValidationError] = useState<string>('');

  // Custom Calendar & Time Picker State
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  // Load booked dates on mount
  useEffect(() => {
    const dates = bookingService.getBookedDates();
    setBookedDates(dates);
  }, []);

  // Load booked times when date changes
  useEffect(() => {
    if (selectedDate) {
      const times = bookingService.getBookedTimes(selectedDate);
      setBookedTimes(times);
    } else {
      setBookedTimes([]);
    }
  }, [selectedDate]);

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
    setValidationError(''); // Clear validation error when user selects date
    setSubmitStatus('idle'); // Reset submit status
    setFormData(prev => ({
      ...prev,
      preferredDate: date.toISOString().split('T')[0]
    }));
  };

  // Handle time selection
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setValidationError(''); // Clear validation error when user selects time
    setSubmitStatus('idle'); // Reset submit status
    setFormData(prev => ({
      ...prev,
      preferredTime: time
    }));
  };

  // AI Chat State
  const [isAIChatExpanded, setIsAIChatExpanded] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [isAITyping, setIsAITyping] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);
  
  // Store original English messages for translation
  const [originalMessages, setOriginalMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hi! I'm your AI assistant. I can help you book a consultation. Just tell me what you need and I'll handle everything for you!",
      originalContent: "Hi! I'm your AI assistant. I can help you book a consultation. Just tell me what you need and I'll handle everything for you!",
      timestamp: new Date()
    }
  ]);
  
  const [messages, setMessages] = useState(originalMessages);

  // Translate all messages when language changes
  React.useEffect(() => {
    const translateMessages = async () => {
      if (selectedLanguage === 'en') {
        // If English, just use original messages
        setMessages(originalMessages);
        return;
      }

      setIsTranslating(true);

      try {
        const translatedMessages = await Promise.all(
          originalMessages.map(async (msg) => {
            try {
              const response = await fetch('http://localhost:3088/api/translation/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  text: msg.originalContent || msg.content,
                  targetLanguage: selectedLanguage,
                  sourceLanguage: 'en'
                })
              });

              if (response.ok) {
                const result = await response.json();
                return {
                  ...msg,
                  content: result.data?.translatedText || result.translatedText || msg.content,
                  originalContent: msg.originalContent || msg.content
                };
              }
            } catch (error) {
              console.error('Translation failed for message:', error);
            }
            return msg;
          })
        );

        setMessages(translatedMessages);
      } catch (error) {
        console.error('Failed to translate messages:', error);
      } finally {
        setIsTranslating(false);
      }
    };

    translateMessages();
  }, [selectedLanguage, originalMessages]);

  const handleAIChatToggle = () => {
    setIsAIChatExpanded(!isAIChatExpanded);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: newMessage,
      originalContent: newMessage, // Store for translation
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setOriginalMessages(prev => [...prev, userMessage]);
    const currentMessage = newMessage;
    setNewMessage('');
    setIsAITyping(true);

    try {
      // Pripremi conversation history - isključi inicijalnu AI poruku
      const conversationHistory = messages
        .slice(1) // Skip first AI greeting message
        .map(msg => ({
          role: msg.type === 'user' ? 'user' as const : 'ai' as const,
          content: msg.content
        }));

      const response = await fetch('http://localhost:3088/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentMessage,
          language: selectedLanguage,
          conversationHistory: conversationHistory // 🧠 Conversation Memory!
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
        originalContent: result.data.originalResponse || result.data.response, // Store English version
        timestamp: new Date()
      };

      // Update both messages and originalMessages
      setMessages(prev => [...prev, aiMessage]);
      setOriginalMessages(prev => [...prev, {
        ...aiMessage,
        content: result.data.originalResponse || result.data.response,
        originalContent: result.data.originalResponse || result.data.response
      }]);

      // AI-Assisted Form Submission
      if (result.data.structuredData && result.data.structuredData.readyToSubmit) {
        const aiFormData = result.data.structuredData.formData;
        
        console.log('AI has collected enough information, auto-submitting...');
        setIsAITyping(true);

        try {
          const submitResponse = await fetch('http://localhost:3088/api/ai/submit-booking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aiFormData)
          });

          const submitResult = await submitResponse.json();

          if (submitResult.success) {
            const confirmationMessage = {
              id: messages.length + 3,
              type: 'ai',
              content: `Your booking request has been submitted successfully!\n\nConfirmation has been sent to ${aiFormData.email}`,
              originalContent: `Your booking request has been submitted successfully!\n\nConfirmation has been sent to ${aiFormData.email}`,
              timestamp: new Date()
            };
            setMessages(prev => [...prev, confirmationMessage]);
            setOriginalMessages(prev => [...prev, confirmationMessage]);
          } else {
            throw new Error(submitResult.error || 'Submission failed');
          }
        } catch (submitError) {
          console.error('AI booking submission failed:', submitError);
          const errorMessage = {
            id: messages.length + 3,
            type: 'ai',
            content: `I've collected your information, but there was an issue submitting it automatically. Please use the booking form below to submit your request manually. Thank you!`,
            originalContent: `I've collected your information, but there was an issue submitting it automatically. Please use the booking form below to submit your request manually. Thank you!`,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, errorMessage]);
          setOriginalMessages(prev => [...prev, errorMessage]);
        } finally {
          setIsAITyping(false);
        }
      }

    } catch (error) {
      console.error('AI API Error:', error);
      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again or use the booking form below.",
        originalContent: "I'm sorry, I'm having trouble connecting right now. Please try again or use the booking form below.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setOriginalMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsAITyping(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error and submit status when user starts typing
    if (validationError) {
      setValidationError('');
    }
    if (submitStatus === 'error') {
      setSubmitStatus('idle');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // IMPORTANT: Validate ALL fields BEFORE setting isSubmitting to prevent race conditions
    const errors: string[] = [];
    
    // Check required fields
    if (!formData.firstName || formData.firstName.trim() === '') {
      errors.push('First name is required');
    }
    if (!formData.lastName || formData.lastName.trim() === '') {
      errors.push('Last name is required');
    }
    if (!formData.email || formData.email.trim() === '') {
      errors.push('Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    if (!formData.service || formData.service === '') {
      errors.push('Please select a service');
    }
    if (!formData.message || formData.message.trim() === '') {
      errors.push('Project description is required');
    }
    if (!selectedDate) {
      errors.push('Please select a date');
    }
    if (!selectedTime) {
      errors.push('Please select a time slot');
    }
    
    // If there are validation errors, display them and stop
    if (errors.length > 0) {
      setValidationError(errors.join('. '));
      // Don't set submitStatus to 'error' here - only show validation message
      // Scroll to top of form to see error
      const formSection = document.querySelector('.form-section');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return; // Exit early without setting isSubmitting
    }

    // Clear validation errors if all checks pass
    setValidationError('');
    
    // Only set isSubmitting AFTER validation passes
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Try to book the slot
      const bookingSuccess = bookingService.addBooking(
        selectedDate!,
        selectedTime!,
        formData.email,
        `${formData.firstName} ${formData.lastName}`
      );

      if (!bookingSuccess) {
        setValidationError('This time slot is already booked. Please select another time.');
        setIsSubmitting(false);
        // Scroll to time picker
        const timePickerSection = document.querySelector('.calendar-time-grid');
        if (timePickerSection) {
          timePickerSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // Send email confirmation
      await emailService.sendConsultationEmail(formData);
      setSubmitStatus('success');
      setValidationError(''); // Clear any validation errors on success
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        timeline: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
      });
      
      // Reset calendar & time picker
      setSelectedDate(null);
      setSelectedTime(null);
      
      // Reload booked dates
      const dates = bookingService.getBookedDates();
      setBookedDates(dates);
    } catch (error) {
      setSubmitStatus('error');
      setValidationError('There was an error submitting your booking. Please try again.');
      console.error('Booking submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Base input style
  const inputBaseStyle: React.CSSProperties = {
    width: '100%',
    padding: '16px',
    border: '2px solid #E5E7EB',
    borderRadius: '14px',
    fontSize: 'clamp(14px, 3.2vw, 16px)',
    outline: 'none',
    transition: 'all 0.2s ease',
    backgroundColor: '#FAFAFA',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#0071E3';
    e.target.style.backgroundColor = '#FFFFFF';
    e.target.style.boxShadow = '0 0 0 4px rgba(0, 113, 227, 0.08)';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#E5E7EB';
    e.target.style.backgroundColor = '#FAFAFA';
    e.target.style.boxShadow = 'none';
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 'clamp(11px, 2.7vw, 13px)',
    fontWeight: 600,
    color: '#1D1D1F',
    marginBottom: '8px',
    letterSpacing: '0.02em',
    textTransform: 'uppercase'
  };

  return (
    <div style={{ 
      backgroundColor: '#F5F5F7', 
      minHeight: '100vh', 
      padding: 'clamp(24px, 5vw, 40px) clamp(16px, 4vw, 24px)',
      maxWidth: '100vw',
      overflowX: 'hidden'
    }}>
      <div style={{ maxWidth: '100%', margin: '0 auto', padding: '0 clamp(8px, 2vw, 16px)' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: '#1D1D1F',
            marginBottom: '12px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Book Your Consultation
          </h1>
          <p style={{
            fontSize: 'clamp(14px, 3.2vw, 16px)',
            lineHeight: 1.5,
            color: '#6E6E73',
            margin: 0
          }}>
            Fill out the form below and we'll get back to you within 24 hours
          </p>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} noValidate className="form-section" style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: 'clamp(16px, 4vw, 32px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(0, 0, 0, 0.06)'
        }}>
          {/* Two Column Layout */}
          <div className="booking-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', gap: 'clamp(16px, 4vw, 24px) clamp(16px, 4vw, 32px)' }}>
            {/* Left Column - Contact */}
            <div style={{ gridColumn: '1 / -1' }}>
              <h3 style={{
                fontSize: 'clamp(14px, 3.2vw, 16px)',
                fontWeight: 600,
                color: '#1D1D1F',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '2px solid #E5E7EB',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
              }}>
                Contact Information
              </h3>
              </div>

                  <div>
              <label htmlFor="firstName" style={labelStyle}>First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                required
                style={inputBaseStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="John"
                    />
                  </div>

                  <div>
              <label htmlFor="lastName" style={labelStyle}>Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                required
                style={inputBaseStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Doe"
              />
                </div>

                  <div>
              <label htmlFor="email" style={labelStyle}>Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                required
                style={inputBaseStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="john.doe@email.com"
                    />
                  </div>

                  <div>
              <label htmlFor="phone" style={labelStyle}>Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                style={inputBaseStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="+1 555 123 4567"
                    />
                  </div>

                  <div>
              <label htmlFor="company" style={labelStyle}>Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                style={inputBaseStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Your Company Name"
                    />
                  </div>

            {/* Project Details */}
            <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
              <h3 style={{
                fontSize: 'clamp(14px, 3.2vw, 16px)',
                fontWeight: 600,
                color: '#1D1D1F',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '2px solid #E5E7EB',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
              }}>
                Project Details
              </h3>
                </div>

                <div>
              <label htmlFor="service" style={labelStyle}>Service *</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                    onChange={handleInputChange}
                required
                style={{ ...inputBaseStyle, cursor: 'pointer' }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              >
                <option value="">Select service</option>
                <option value="web-development">Web Development</option>
                <option value="mobile-app">Mobile App</option>
                <option value="digital-marketing">Digital Marketing</option>
                <option value="business-consulting">Business Consulting</option>
                <option value="support-maintenance">Support & Maintenance</option>
                <option value="other">Other</option>
              </select>
                </div>

                  <div>
              <label htmlFor="budget" style={labelStyle}>Budget</label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                style={{ ...inputBaseStyle, cursor: 'pointer' }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              >
                <option value="">Select budget</option>
                <option value="<10k">Under $10k</option>
                <option value="10k-25k">$10k – $25k</option>
                <option value="25k-50k">$25k – $50k</option>
                <option value=">50k">Above $50k</option>
                    </select>
                  </div>

                  <div>
              <label htmlFor="timeline" style={labelStyle}>Timeline</label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                style={{ ...inputBaseStyle, cursor: 'pointer' }}
                onFocus={handleFocus}
                onBlur={handleBlur}
                    >
                      <option value="">Select timeline</option>
                <option value="asap">ASAP</option>
                <option value="1-3-months">1–3 months</option>
                <option value="3-6-months">3–6 months</option>
                <option value=">6-months">6+ months</option>
                    </select>
                </div>

            {/* Date & Time Selection - Full Width */}
            <div style={{ gridColumn: '1 / -1' }}>
              <h3 style={{
                fontSize: 'clamp(14px, 3.2vw, 16px)',
                fontWeight: 600,
                color: '#1D1D1F',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '2px solid #E5E7EB',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
              }}>
                Select Date & Time
              </h3>
            </div>

            {/* Calendar & Time Picker Side by Side */}
            <div className="calendar-time-grid" style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: 'clamp(16px, 4vw, 24px)' }}>
              <CustomCalendar
                selectedDate={selectedDate}
                onSelectDate={handleDateSelect}
                bookedDates={bookedDates}
              />
              <CustomTimePicker
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSelectTime={handleTimeSelect}
                bookedTimes={bookedTimes}
              />
            </div>

            {/* Message - Full Width */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label htmlFor="message" style={labelStyle}>Project Description *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    style={{ ...inputBaseStyle, resize: 'vertical', lineHeight: 1.5 }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="Tell us about your project..."
                  />
                </div>

            {/* Validation Error Display */}
            {validationError && (
              <div style={{ 
                gridColumn: '1 / -1', 
                backgroundColor: '#FEE2E2',
                border: '2px solid #EF4444',
                borderRadius: '12px',
                padding: '16px',
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                animation: 'shake 0.3s ease-in-out'
              }}>
                <span style={{ fontSize: '24px' }}>⚠️</span>
                <div style={{ flex: 1 }}>
                  <p style={{ 
                    color: '#DC2626', 
                    fontWeight: 600, 
                    fontSize: 'clamp(14px, 3.2vw, 16px)',
                    margin: 0,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                  }}>
                    {validationError}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setValidationError('')}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#DC2626',
                    fontSize: '20px',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FCA5A5'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  ×
                </button>
              </div>
            )}

            {/* Submit - Full Width */}
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '8px' }}>
              <Button
                  type="submit"
                variant="primary"
                size="lg"
                  disabled={isSubmitting}
                style={{
                  minWidth: '200px',
                  padding: '14px 40px',
                  fontSize: 'clamp(14px, 3.2vw, 16px)',
                  fontWeight: 600
                }}
              >
                {isSubmitting ? 'Sending...' : 'Submit Request'}
              </Button>

            {submitStatus === 'success' && (
              <div style={{
                  marginTop: '16px',
                padding: '12px 20px',
                backgroundColor: '#D1FAE5',
                  border: '1px solid #10B981',
                  borderRadius: '12px',
                  color: '#065F46',
                  fontSize: 'clamp(12px, 2.8vw, 14px)',
                  fontWeight: 600
                }}>
                  Request sent! We'll get back to you within 24 hours.
                </div>
              )}

            {submitStatus === 'error' && (
              <div style={{
                  marginTop: '16px',
                padding: '12px 20px',
                backgroundColor: '#FEE2E2',
                  border: '1px solid #EF4444',
                  borderRadius: '12px',
                  color: '#991B1B',
                  fontSize: 'clamp(12px, 2.8vw, 14px)',
                  fontWeight: 600
                }}>
                  Failed to send. Please try again or email us directly.
                </div>
              )}
            </div>
          </div>
        </form>

        {/* AI Chat Assistant - Fixed Position */}
        <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 9999 }}>
          <Button
            variant="outline"
            size="md"
            onClick={handleAIChatToggle}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundImage: isAIChatExpanded ? 'linear-gradient(135deg, #8B5CF6, #7C3AED)' : 'none',
              backgroundColor: isAIChatExpanded ? 'transparent' : 'rgba(139, 92, 246, 0.1)',
              color: isAIChatExpanded ? '#FFFFFF' : '#8B5CF6',
              border: '2px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '12px',
              padding: '12px 20px',
              fontSize: 'clamp(13px, 3vw, 15px)',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              boxShadow: isAIChatExpanded ? '0 8px 25px rgba(139, 92, 246, 0.3)' : '0 4px 12px rgba(139, 92, 246, 0.1)'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {isAIChatExpanded ? 'Close Chat' : 'AI Assistant'}
          </Button>

          {/* Chat Window with Animation */}
          {isAIChatExpanded && (
            <div style={{
              position: 'absolute',
              bottom: '100%',
              right: 0,
              marginBottom: '12px',
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
                  src="/animations/booking-animation.json"
                  style={{ width: '100%', height: '100%' }}
                />
              </div>

              {/* Chat Window */}
              <div className="ai-chat-container" style={{
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
                padding: 'clamp(16px, 3.5vw, 20px) clamp(16px, 4vw, 24px)',
                borderBottom: '1px solid #F5F5F7',
                backgroundImage: 'linear-gradient(135deg, #8B5CF6, #7C3AED)'
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
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
                        fontSize: 'clamp(14px, 3.2vw, 16px)',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        margin: 0,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
                      }}>
                        AI Assistant
                      </h3>
                      <p style={{
                        fontSize: 'clamp(11px, 2.7vw, 13px)',
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
                    {/* Language Dropdown */}
                    <select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        color: '#FFFFFF',
                        fontSize: 'clamp(11px, 2.7vw, 13px)',
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

                    {/* Close Button */}
                    <button
                      onClick={handleAIChatToggle}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        color: '#FFFFFF',
                        fontSize: 'clamp(14px, 3.2vw, 16px)',
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
                {messages.map((message: any) => (
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
                      backgroundImage: message.type === 'user'
                        ? 'linear-gradient(135deg, #8B5CF6, #7C3AED)'
                        : 'none',
                      backgroundColor: message.type === 'user'
                        ? 'transparent'
                        : '#F8F9FA',
                      color: message.type === 'user' ? '#FFFFFF' : '#1D1D1F',
                      fontSize: 'clamp(12px, 2.8vw, 14px)',
                      lineHeight: 1.5,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word'
                    }}>
                      {message.content}
                    </div>
                  </div>
                ))}

                {isAITyping && (
                  <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                      padding: '12px 16px',
                  backgroundColor: '#F8F9FA',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <div style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#6E6E73',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s infinite ease-in-out'
                      }} />
                      <div style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#6E6E73',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s infinite ease-in-out 0.16s'
                      }} />
                      <div style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#6E6E73',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s infinite ease-in-out 0.32s'
                      }} />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} style={{
                padding: 'clamp(16px, 3.5vw, 20px) clamp(16px, 4vw, 24px)',
                borderTop: '1px solid #F5F5F7',
                backgroundColor: '#FAFAFA'
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
                    placeholder="Ask me anything..."
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      border: '2px solid #E5E5E7',
                      borderRadius: '12px',
                      fontSize: 'clamp(13px, 3vw, 15px)',
                      outline: 'none',
                      backgroundColor: '#FFFFFF',
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
                      fontSize: 'clamp(12px, 2.8vw, 14px)',
                      fontWeight: 600,
                      cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                      opacity: newMessage.trim() ? 1 : 0.6
                    }}
                  >
                    Send
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

            /* Mobile responsive overrides */
            @media (max-width: 768px) {
              /* Ensure single column layout on mobile */
              .booking-form-grid {
                grid-template-columns: 1fr !important;
                gap: 16px !important;
              }
              
              /* Optimize AI chat on mobile */
              .ai-chat-container {
                width: 100% !important;
                max-width: calc(100vw - 32px) !important;
              }
              
              /* Better spacing on mobile */
              .form-section {
                padding: 16px !important;
              }
              
              /* Adjust calendar and time picker for mobile */
              .calendar-time-grid {
                grid-template-columns: 1fr !important;
                gap: 12px !important;
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
