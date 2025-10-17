import React from 'react';
import {
  Search,
  MessageSquare,
  Plus,
  Settings,
  Users,
  MoreVertical,
  Phone,
  Video,
  Archive,
  Trash2,
  UserPlus
} from 'lucide-react';
import { ChatWindow } from './chat-window';
import { ChatConversation, chatService } from '../../services/chat';

interface ChatContainerProps {
  currentUserId: string;
  currentUserName: string;
  onNewConversation?: () => void;
  onVideoCall?: () => void;
  onAudioCall?: () => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  currentUserId,
  currentUserName,
  onNewConversation,
  onVideoCall,
  onAudioCall
}) => {
  const [conversations, setConversations] = React.useState<ChatConversation[]>([]);
  const [selectedConversation, setSelectedConversation] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = chatService.subscribeToConversations(currentUserId, (newConversations) => {
      setConversations(newConversations);
      setIsLoading(false);

      // Auto-select first conversation if none selected
      if (newConversations.length > 0 && !selectedConversation) {
        setSelectedConversation(newConversations[0].id);
      }
    });

    return unsubscribe;
  }, [currentUserId, selectedConversation]);

  const filteredConversations = conversations.filter(conv =>
    conv.participantNames &&
    Object.values(conv.participantNames).some(name =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const selectedConversationData = conversations.find(conv => conv.id === selectedConversation);

  const formatLastMessageTime = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'now';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d`;
    return date.toLocaleDateString();
  };

  const getConversationName = (conversation: ChatConversation) => {
    const otherParticipants = Object.keys(conversation.participantNames)
      .filter(id => id !== currentUserId);

    if (otherParticipants.length === 1) {
      return conversation.participantNames[otherParticipants[0]];
    } else if (otherParticipants.length > 1) {
      return `${conversation.participantNames[otherParticipants[0]]} +${otherParticipants.length - 1}`;
    }
    return 'Unknown Conversation';
  };

  const getConversationAvatar = (conversation: ChatConversation) => {
    const otherParticipants = Object.keys(conversation.participantNames)
      .filter(id => id !== currentUserId);

    if (otherParticipants.length === 1) {
      const userId = otherParticipants[0];
      return conversation.participantAvatars?.[userId] ||
             conversation.participantNames[userId].charAt(0).toUpperCase();
    } else if (otherParticipants.length > 1) {
      return 'G'; // Group chat
    }
    return 'U';
  };

  const getUnreadCount = (conversation: ChatConversation) => {
    return conversation.unreadCount?.[currentUserId] || 0;
  };

  const ConversationItem = ({ conversation, index }: { conversation: ChatConversation, index: number }) => (
    <button
      onClick={() => setSelectedConversation(conversation.id)}
      className={`w-full p-4 text-left hover:bg-hover transition-colors border-b border-border ${
        selectedConversation === conversation.id ? 'bg-primary/5 border-primary/20' : ''
      }`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white font-bold">
            {getConversationAvatar(conversation)}
          </div>
          {conversation.status === 'active' && (
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-surface"></div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-text truncate">
              {getConversationName(conversation)}
            </h3>
            <div className="flex items-center gap-2">
              {conversation.lastMessageTime && (
                <span className="text-xs text-muted">
                  {formatLastMessageTime(conversation.lastMessageTime)}
                </span>
              )}
              {getUnreadCount(conversation) > 0 && (
                <div className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  {getUnreadCount(conversation)}
                </div>
              )}
            </div>
          </div>

          {conversation.lastMessage && (
            <p className="text-sm text-muted truncate">
              {conversation.lastMessage.senderId === currentUserId ? 'You: ' : ''}
              {conversation.lastMessage.type === 'text'
                ? conversation.lastMessage.content
                : conversation.lastMessage.type === 'image'
                ? '📷 Image'
                : conversation.lastMessage.type === 'file'
                ? '📎 File'
                : 'System message'
              }
            </p>
          )}

          {/* Metadata */}
          {conversation.metadata?.bookingId && (
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-xs text-muted">
                Consultation #{conversation.metadata.bookingId}
              </span>
            </div>
          )}
        </div>
      </div>
    </button>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-bg">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r border-border flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text">Messages</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={onNewConversation}
                className="enterprise-btn enterprise-btn--primary enterprise-btn--sm"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button className="enterprise-btn enterprise-btn--ghost enterprise-btn--sm">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-muted" />
            </div>
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="enterprise-form-input pl-10 w-full"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted" />
              <h3 className="font-medium text-text mb-2">No conversations yet</h3>
              <p className="text-sm text-muted mb-4">
                Start a conversation with your consultants or clients
              </p>
              <button
                onClick={onNewConversation}
                className="enterprise-btn enterprise-btn--outline"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Start New Chat</span>
              </button>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredConversations.map((conversation, index) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="p-4 border-t border-border bg-bg-secondary">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-primary">
                {conversations.filter(c => c.status === 'active').length}
              </div>
              <div className="text-xs text-muted">Active Chats</div>
            </div>
            <div>
              <div className="text-lg font-bold text-accent">
                {conversations.reduce((acc, c) => acc + (c.unreadCount?.[currentUserId] || 0), 0)}
              </div>
              <div className="text-xs text-muted">Unread</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1">
        {selectedConversation && selectedConversationData ? (
          <ChatWindow
            conversationId={selectedConversation}
            currentUserId={currentUserId}
            currentUserName={currentUserName}
            onVideoCall={onVideoCall}
            onAudioCall={onAudioCall}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted" />
              <h3 className="text-lg font-medium text-text mb-2">Select a conversation</h3>
              <p className="text-muted mb-6">
                Choose a conversation from the sidebar to start chatting
              </p>
              <button
                onClick={onNewConversation}
                className="enterprise-btn enterprise-btn--primary"
              >
                <Plus className="w-4 h-4" />
                <span>New Conversation</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
