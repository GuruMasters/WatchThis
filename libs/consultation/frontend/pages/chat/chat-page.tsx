import React from 'react';
import { ChatContainer } from '../../components/chat/chat-container';
import { useAuth } from '../../hooks/useAuth.tsx';

export const ChatPage: React.FC = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted">Loading chat...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text mb-4">Access Denied</h2>
          <p className="text-muted mb-6">Please sign in to access the chat.</p>
          <a href="/auth" className="enterprise-btn enterprise-btn--primary">
            Sign In
          </a>
        </div>
      </div>
    );
  }

  const handleNewConversation = () => {
    // This would open a modal to select a consultant or client
    console.log('New conversation requested');
  };

  const handleVideoCall = () => {
    // This would initiate a video call with the current conversation
    console.log('Video call requested');
  };

  const handleAudioCall = () => {
    // This would initiate an audio call with the current conversation
    console.log('Audio call requested');
  };

  return (
    <div className="h-screen bg-bg">
      <ChatContainer
        currentUserId={user.uid}
        currentUserName={profile.displayName}
        onNewConversation={handleNewConversation}
        onVideoCall={handleVideoCall}
        onAudioCall={handleAudioCall}
      />
    </div>
  );
};

export default ChatPage;
