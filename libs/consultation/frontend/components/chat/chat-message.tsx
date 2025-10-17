import React from 'react';
import {
  FileText,
  Download,
  Image,
  User,
  CheckCircle,
  AlertCircle,
  X,
  ExternalLink
} from 'lucide-react';
import { ChatMessage as ChatMessageType } from '../../services/chat';

interface ChatMessageProps {
  message: ChatMessageType;
  isOwn: boolean;
  showAvatar?: boolean;
  onFileDownload?: (message: ChatMessageType) => void;
  onImageClick?: (message: ChatMessageType) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isOwn,
  showAvatar = true,
  onFileDownload,
  onImageClick
}) => {
  const [imageError, setImageError] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);

  const formatTime = (timestamp: any) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileDownload = async () => {
    if (!onFileDownload) return;

    setIsDownloading(true);
    try {
      await onFileDownload(message);
    } catch (error) {
      console.error('Error downloading file:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'text':
        return (
          <div className="break-words whitespace-pre-wrap">
            {message.content}
          </div>
        );

      case 'image':
        return (
          <div className="max-w-sm">
            {!imageError ? (
              <img
                src={message.content}
                alt="Shared image"
                className="rounded-lg cursor-pointer hover:opacity-90 transition-opacity max-w-full h-auto"
                onClick={() => onImageClick?.(message)}
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <div className="flex items-center gap-2 p-4 bg-error/10 border border-error/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-error" />
                <span className="text-sm text-error">Failed to load image</span>
              </div>
            )}
            {message.metadata?.fileName && (
              <div className="text-xs text-muted mt-1">
                {message.metadata.fileName}
              </div>
            )}
          </div>
        );

      case 'file':
        return (
          <div className="flex items-center gap-3 p-3 bg-bg-secondary rounded-lg border border-border">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-text text-sm truncate">
                {message.metadata?.fileName || 'Unknown file'}
              </div>
              <div className="text-xs text-muted">
                {message.metadata?.fileSize && formatFileSize(message.metadata.fileSize)}
              </div>
            </div>
            <button
              onClick={handleFileDownload}
              disabled={isDownloading}
              className="enterprise-btn enterprise-btn--ghost enterprise-btn--sm"
            >
              {isDownloading ? (
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
            </button>
          </div>
        );

      case 'system':
        return (
          <div className="flex items-center gap-2 p-2 bg-accent/10 border border-accent/20 rounded-lg">
            <AlertCircle className="w-4 h-4 text-accent" />
            <span className="text-sm text-accent italic">{message.content}</span>
          </div>
        );

      default:
        return (
          <div className="text-sm text-muted">
            Unsupported message type
          </div>
        );
    }
  };

  const readStatus = message.readBy.length > 0 ? (
    <div className="flex items-center gap-1">
      <CheckCircle className="w-3 h-3 text-success" />
      <span className="text-xs text-muted">
        {message.readBy.length === 1 ? 'Read' : `Read by ${message.readBy.length}`}
      </span>
    </div>
  ) : null;

  return (
    <div className={`flex gap-3 group ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      {/* Avatar */}
      {showAvatar && !isOwn && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {message.senderAvatar || message.senderName.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Message Bubble */}
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${isOwn ? 'order-1' : 'order-2'}`}>
        {/* Header */}
        {!isOwn && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-text">
              {message.senderName}
            </span>
            <span className="text-xs text-muted">
              {formatTime(message.timestamp)}
            </span>
          </div>
        )}

        {/* Message Content */}
        <div
          className={`enterprise-chat-bubble ${
            isOwn ? 'me' : 'them'
          } ${message.type === 'image' || message.type === 'file' ? 'p-2' : ''}`}
        >
          {renderMessageContent()}

          {/* Footer for own messages */}
          {isOwn && (
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20">
              <span className="text-xs text-white/70">
                {formatTime(message.timestamp)}
              </span>
              {readStatus}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {(message.type === 'image' || message.type === 'file') && (
          <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="enterprise-btn enterprise-btn--ghost enterprise-btn--sm">
              <ExternalLink className="w-3 h-3" />
            </button>
            {message.type === 'image' && onImageClick && (
              <button
                onClick={() => onImageClick(message)}
                className="enterprise-btn enterprise-btn--ghost enterprise-btn--sm"
              >
                <Image className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Own Avatar */}
      {showAvatar && isOwn && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-secondary-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 order-2">
          {message.senderAvatar || message.senderName.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
