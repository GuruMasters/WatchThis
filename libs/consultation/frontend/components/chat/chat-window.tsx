import React from 'react';
import {
  Send,
  Paperclip,
  Image,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Users,
  Settings
} from 'lucide-react';
import { ChatMessage } from './chat-message';
import { ChatMessage as ChatMessageType, chatService } from '../../services/chat';

interface ChatWindowProps {
  conversationId: string;
  currentUserId: string;
  currentUserName: string;
  onSendMessage?: (content: string) => void;
  onFileUpload?: (file: File) => void;
  onImageClick?: (message: ChatMessageType) => void;
  onVideoCall?: () => void;
  onAudioCall?: () => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  conversationId,
  currentUserId,
  currentUserName,
  onSendMessage,
  onFileUpload,
  onImageClick,
  onVideoCall,
  onAudioCall
}) => {
  const [messages, setMessages] = React.useState<ChatMessageType[]>([]);
  const [newMessage, setNewMessage] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const [typingUsers, setTypingUsers] = React.useState<{ name: string; timestamp: Date }[]>([]);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const unsubscribe = chatService.subscribeToMessages(conversationId, (newMessages) => {
      setMessages(newMessages);
    });

    return unsubscribe;
  }, [conversationId]);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  React.useEffect(() => {
    if (newMessage.length > 0) {
      chatService.setTypingStatus(conversationId, currentUserId, currentUserName, true);

      const timeout = setTimeout(() => {
        chatService.setTypingStatus(conversationId, currentUserId, currentUserName, false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [newMessage, conversationId, currentUserId, currentUserName]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await chatService.sendMessage(
        conversationId,
        currentUserId,
        currentUserName,
        newMessage.trim()
      );

      setNewMessage('');

      // Mark conversation as read
      await chatService.markConversationAsRead(conversationId, currentUserId);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await chatService.uploadFile(conversationId, file, currentUserId, currentUserName);
    } catch (error) {
      console.error('Error uploading file:', error);
    }

    // Reset input
    e.target.value = '';
  };

  const handleFileDownload = async (message: ChatMessageType) => {
    if (message.type === 'file' || message.type === 'image') {
      try {
        const link = document.createElement('a');
        link.href = message.content;
        link.download = message.metadata?.fileName || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    }
  };

  const formatMessageDate = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const groupMessagesByDate = (messages: ChatMessageType[]) => {
    const groups: { [date: string]: ChatMessageType[] } = {};

    messages.forEach(message => {
      const dateKey = formatMessageDate(message.timestamp);
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(message);
    });

    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col h-full bg-bg">
      {/* Chat Header */}
      <div className="enterprise-header">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white font-bold">
            C
          </div>
          <div>
            <h3 className="font-semibold text-text">Consultation Chat</h3>
            <p className="text-sm text-muted">Online • {messages.length} messages</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onAudioCall}
            className="enterprise-btn enterprise-btn--ghost p-2"
            title="Audio Call"
          >
            <Phone className="w-5 h-5" />
          </button>
          <button
            onClick={onVideoCall}
            className="enterprise-btn enterprise-btn--ghost p-2"
            title="Video Call"
          >
            <Video className="w-5 h-5" />
          </button>
          <button className="enterprise-btn enterprise-btn--ghost p-2">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(messageGroups).map(([date, dateMessages]) => (
          <div key={date}>
            {/* Date Separator */}
            <div className="flex items-center justify-center mb-6">
              <div className="px-3 py-1 bg-surface rounded-lg border border-border">
                <span className="text-sm text-muted font-medium">{date}</span>
              </div>
            </div>

            {/* Messages */}
            {dateMessages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isOwn={message.senderId === currentUserId}
                onFileDownload={handleFileDownload}
                onImageClick={onImageClick}
              />
            ))}
          </div>
        ))}

        {/* Typing Indicator */}
        {typingUsers.length > 0 && (
          <div className="flex items-center gap-3 text-sm text-muted">
            <div className="flex -space-x-2">
              {typingUsers.slice(0, 3).map((user, index) => (
                <div
                  key={index}
                  className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold border-2 border-bg"
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span>{typingUsers[0].name} is typing...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border">
        <div className="flex items-end gap-3">
          {/* File Upload */}
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.pptx"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="enterprise-btn enterprise-btn--ghost p-2"
              title="Attach file"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => imageInputRef.current?.click()}
              className="enterprise-btn enterprise-btn--ghost p-2"
              title="Share image"
            >
              <Image className="w-5 h-5" />
            </button>
          </div>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="enterprise-form-input resize-none py-3 pr-12 min-h-[44px] max-h-32"
              rows={1}
              style={{ height: 'auto' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = Math.min(target.scrollHeight, 128) + 'px';
              }}
            />

            {/* Emoji Button */}
            <button className="absolute right-3 top-3 enterprise-btn enterprise-btn--ghost p-1">
              <Smile className="w-4 h-4" />
            </button>
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="enterprise-btn enterprise-btn--primary p-3"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Message Actions */}
        <div className="flex items-center justify-between mt-2 text-xs text-muted">
          <span>Press Enter to send, Shift+Enter for new line</span>
          <span>{newMessage.length}/2000</span>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
